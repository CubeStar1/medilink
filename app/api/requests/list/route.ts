import { NextResponse } from "next/server";
import { auth, db } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session')?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'No session cookie found' },
        { status: 401 }
      );
    }

    // Verify the session cookie
    let decodedClaims;
    try {
      decodedClaims = await auth.verifyIdToken(sessionCookie);
    } catch (verifyError) {
      console.error('Session verification failed:', verifyError);
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid session' },
        { status: 401 }
      );
    }

    // Get user profile to check role
    const userDoc = await db.collection('users').doc(decodedClaims.uid).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'User profile not found' },
        { status: 401 }
      );
    }

    const userProfile = userDoc.data();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    // Build query
    const query = db.collection('requests')
      .orderBy('createdAt', 'desc');

    // Add user filter based on role - only filter if user is not admin
    if (userProfile && userProfile.role !== 'admin') {
      // For NGOs and individuals, only show their own requests
      query.where('requesterId', '==', decodedClaims.uid);
    }

    // Add status filter if provided
    if (status) {
      query.where('status', '==', status);
    }

    // Add priority filter if provided
    if (priority) {
      query.where('priority', '==', priority);
    }

    // Execute query
    const snapshot = await query.get();
    
    if (snapshot.empty) {
      return NextResponse.json({ data: [] });
    }

    // Format response
    const requests = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        medicationId: data.medicationId || '',
        medicationName: data.medicationName || '',
        donorId: data.donorId || '',
        status: data.status || 'pending',
        priority: data.priority || 'low',
        quantity: data.quantity || 0,
        reason: data.reason || '',
        deliveryAddress: data.deliveryAddress || '',
        contactNumber: data.contactNumber || '',
        requesterDetails: data.requesterDetails || {},
        createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
      };
    });

    return NextResponse.json({ data: requests });

  } catch (error) {
    console.error('Error listing requests:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 