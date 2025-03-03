import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import type { UserProfile } from '@/lib/types/schema';

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
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    let query = db.collection('users')
      .orderBy('createdAt', 'desc')
      .limit(limit);

    // Add role filter if provided
    if (role && role !== 'all') {
      query = query.where('role', '==', role);
    }

    // Add status filter if provided
    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }

    // Execute query
    const snapshot = await query.get();
    
    // Process results
    let users = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        role: data.role,
        displayName: data.displayName || null,
        phoneNumber: data.phoneNumber || null,
        organization: data.organization?.name || data.donorOrganization?.name || null,
        status: data.status || 'active',
        isVerified: data.isVerified || false,
        createdAt: data.createdAt?.toDate().toISOString() || null,
        lastActive: data.lastActive?.toDate().toISOString() || null,
      };
    });

    // Apply search filter if provided
    if (search) {
      users = users.filter(user => 
        user.email.toLowerCase().includes(search) ||
        (user.displayName && user.displayName.toLowerCase().includes(search)) ||
        (user.organization && user.organization.toLowerCase().includes(search))
      );
    }

    return NextResponse.json(users);

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 