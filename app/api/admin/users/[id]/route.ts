import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Schema for user status update
const updateUserSchema = z.object({
  status: z.enum(['active', 'inactive', 'suspended']),
  reason: z.string().optional(),
});

// Mock activity log data
const mockActivityLog = [
  {
    id: '1',
    userId: '',
    action: 'login',
    details: {
      location: 'New York, USA',
      device: 'Chrome on Windows'
    },
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    userId: '',
    action: 'profile_update',
    details: {
      changes: {
        phoneNumber: 'updated',
        address: 'updated'
      }
    },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    userId: '',
    action: 'status_update',
    details: {
      newStatus: 'active',
      reason: 'Account verification completed'
    },
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  }
];

export async function GET(
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

    // Verify admin role
    const adminDoc = await db.collection('users').doc(decodedClaims.uid).get();
    const adminProfile = adminDoc.data();

    if (!adminProfile || adminProfile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden', details: 'Access restricted to admin users' },
        { status: 403 }
      );
    }

    // Get user document
    const userDoc = await db.collection('users').doc(id).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Not Found', details: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    // Use mock activity log data
    const activityLog = mockActivityLog.map(log => ({
      ...log,
      userId: id // Set the correct user ID
    }));

    // Format response
    const response = {
      id: userDoc.id,
      email: userData?.email,
      role: userData?.role,
      displayName: userData?.displayName,
      phoneNumber: userData?.phoneNumber,
      organization: userData?.organization || userData?.donorOrganization,
      status: userData?.status || 'active',
      isVerified: userData?.isVerified || false,
      createdAt: userData?.createdAt?.toDate().toISOString(),
      lastActive: userData?.lastActive?.toDate().toISOString(),
      activityLog
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching user details:', error);
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

    // Verify admin role
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
    const validatedData = updateUserSchema.parse(body);

    // Get user document
    const userRef = db.collection('users').doc(id);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Not Found', details: 'User not found' },
        { status: 404 }
      );
    }

    // Update user status
    await userRef.update({
      status: validatedData.status,
      updatedAt: new Date(),
      statusUpdatedBy: decodedClaims.uid,
      statusUpdatedAt: new Date(),
      statusReason: validatedData.reason || null
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 