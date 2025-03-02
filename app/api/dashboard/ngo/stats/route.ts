import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session')?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No session cookie found' },
        { status: 401 }
      );
    }

    // Verify the session cookie and get the user
    const decodedClaims = await auth.verifyIdToken(sessionCookie);

    // Get user profile to verify role
    const userProfileDoc = await db.collection('users').doc(decodedClaims.uid).get();
    const userProfile = userProfileDoc.data();

    // if (!userProfile || userProfile.role !== 'ngo') {
    //   return NextResponse.json(
    //     { error: 'Forbidden', details: 'Access restricted to NGO users' },
    //     { status: 403 }
    //   );
    // }

    // Query requests collection for this NGO
    const requestsQuery = await db.collection('requests')
      .where('requesterId', '==', decodedClaims.uid)
      .get();

    const requests = requestsQuery.docs.map(doc => doc.data());

    // Calculate statistics
    const stats = {
      activeRequests: requests.filter(r => r.status === 'pending' || r.status === 'approved').length,
      pendingDeliveries: requests.filter(r => r.status === 'in-transit').length,
      medicationsReceived: requests.filter(r => r.status === 'delivered').length,
      // Estimate impact based on delivered medications
      peopleHelped: requests.filter(r => r.status === 'delivered')
        .reduce((total, req) => total + (req.quantity * 10), 0) // Assuming each medication helps 10 people
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error fetching NGO stats:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 