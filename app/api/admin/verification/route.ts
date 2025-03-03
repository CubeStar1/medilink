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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    // Build query
    let query = db.collection('verificationRequests')
      .orderBy('submittedAt', 'desc');

    // Add role filter if provided
    if (role && role !== 'all') {
      query = query.where('user.role', '==', role);
    }

    // Add status filter if provided
    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }

    // Execute query
    const snapshot = await query.get();
    
    // Process results
    let requests = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        user: {
          email: data.user.email,
          role: data.user.role,
          displayName: data.user.displayName,
          organization: data.user.organization,
          donorOrganization: data.user.donorOrganization,
        },
        status: data.status,
        submittedAt: data.submittedAt.toDate().toISOString(),
        documents: data.documents,
        notes: data.notes,
      };
    });

    // Apply search filter if provided
    if (search) {
      requests = requests.filter(request => 
        request.user.email.toLowerCase().includes(search) ||
        (request.user.displayName && request.user.displayName.toLowerCase().includes(search)) ||
        (request.user.organization?.name && request.user.organization.name.toLowerCase().includes(search)) ||
        (request.user.donorOrganization?.name && request.user.donorOrganization.name.toLowerCase().includes(search))
      );
    }

    return NextResponse.json(requests);

  } catch (error) {
    console.error('Error fetching verification requests:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 