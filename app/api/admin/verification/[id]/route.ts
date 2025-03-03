import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } =  await params;

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
    const adminDoc = await db.collection('users').doc(decodedClaims.uid).get();
    const adminProfile = adminDoc.data();

    if (!adminProfile || adminProfile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden', details: 'Access restricted to admin users' },
        { status: 403 }
      );
    }

    // Get verification request document
    const requestDoc = await db.collection('verificationRequests').doc(id).get();
    
    if (!requestDoc.exists) {
      return NextResponse.json(
        { error: 'Not Found', details: 'Verification request not found' },
        { status: 404 }
      );
    }

    const data = requestDoc.data();

    // Format response
    const response = {
      id: requestDoc.id,
      userId: data?.userId,
      user: {
        email: data?.user.email,
        role: data?.user.role,
        displayName: data?.user.displayName,
        organization: data?.user.organization,
        donorOrganization: data?.user.donorOrganization,
      },
      status: data?.status,
      submittedAt: data?.submittedAt.toDate().toISOString(),
      documents: data?.documents,
      notes: data?.notes,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching verification request:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
    const adminDoc = await db.collection('users').doc(decodedClaims.uid).get();
    const adminProfile = adminDoc.data();

    if (!adminProfile || adminProfile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden', details: 'Access restricted to admin users' },
        { status: 403 }
      );
    }

    // Get and validate request body
    const body = await request.json();
    const { status, notes } = body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Bad Request', details: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Get verification request document
    const requestRef = db.collection('verificationRequests').doc(id);
    const requestDoc = await requestRef.get();
    
    if (!requestDoc.exists) {
      return NextResponse.json(
        { error: 'Not Found', details: 'Verification request not found' },
        { status: 404 }
      );
    }

    // Start a transaction to update both the verification request and user
    await db.runTransaction(async (transaction) => {
      // Update verification request
      transaction.update(requestRef, {
        status,
        notes: notes || null,
        updatedAt: new Date(),
        updatedBy: decodedClaims.uid
      });

      // If approved, update user's verified status
      if (status === 'approved') {
        const data = requestDoc.data();
        const userRef = db.collection('users').doc(data?.userId);
        transaction.update(userRef, {
          isVerified: true,
          verifiedAt: new Date(),
          verifiedBy: decodedClaims.uid
        });
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating verification request:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 