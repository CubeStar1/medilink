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
    let decodedClaims;
    try {
      decodedClaims = await auth.verifyIdToken(sessionCookie);
    } catch (verifyError) {
      console.error('Session verification failed:', verifyError);
      return NextResponse.json(
        { error: 'Unauthorized', details: 'Invalid session' },
        { status: 401 }
      );
    }

    // Get user profile to verify admin role
    const userDoc = await db.collection('users').doc(decodedClaims.uid).get();
    const userProfile = userDoc.data();

    if (!userProfile || userProfile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden', details: 'Access restricted to admin users' },
        { status: 403 }
      );
    }

    // Get total users count
    const usersSnapshot = await db.collection('users').count().get();
    const totalUsers = usersSnapshot.data().count;

    // Get pending verification requests count
    const verificationSnapshot = await db.collection('verificationRequests')
      .where('status', '==', 'pending')
      .count()
      .get();
    const pendingVerifications = verificationSnapshot.data().count;

    // Get recent medication requests
    const recentRequestsSnapshot = await db.collection('requests')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();

    const recentRequests = await Promise.all(recentRequestsSnapshot.docs.map(async doc => {
      const data = doc.data();
      
      // Get requester details
      const requesterDoc = await db.collection('users').doc(data.requesterId).get();
      const requesterData = requesterDoc.data();

      return {
        id: doc.id,
        medicationName: data.medicationName,
        status: data.status,
        priority: data.priority,
        createdAt: data.createdAt.toDate().toISOString(),
        requester: {
          name: requesterData?.displayName || requesterData?.organization?.name || 'Unknown',
          email: requesterData?.email,
          role: requesterData?.role
        }
      };
    }));

    // Get recent medications
    const recentMedicationsSnapshot = await db.collection('medications')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();

    const recentMedications = await Promise.all(recentMedicationsSnapshot.docs.map(async doc => {
      const data = doc.data();
      
      // Get donor details
      const donorDoc = await db.collection('users').doc(data.donorId).get();
      const donorData = donorDoc.data();

      return {
        id: doc.id,
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        unit: data.unit,
        status: data.status,
        expiryDate: data.expiryDate.toDate().toISOString(),
        createdAt: data.createdAt.toDate().toISOString(),
        donor: {
          name: donorData?.displayName || donorData?.donorOrganization?.name || 'Unknown',
          email: donorData?.email
        }
      };
    }));

    return NextResponse.json({
      stats: {
        totalUsers,
        pendingVerifications
      },
      recentRequests,
      recentMedications
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 