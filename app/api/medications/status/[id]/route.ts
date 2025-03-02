import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Get the session token from cookies
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session')?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify the session cookie
    const decodedClaims = await auth.verifyIdToken(sessionCookie);
    
    // Get the request body
    const data = await request.json();
    
    // Get the medication document
    const medicationRef = db.collection('medications').doc(id);
    const medicationDoc = await medicationRef.get();
    
    if (!medicationDoc.exists) {
      return NextResponse.json(
        { error: 'Not Found', details: 'Medication not found' },
        { status: 404 }
      );
    }

    // Check if user has access to this medication
    const medicationData = medicationDoc.data();
    if (medicationData?.donorId !== decodedClaims.uid && decodedClaims.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden', details: 'You do not have access to this medication' },
        { status: 403 }
      );
    }

    // Update the medication status
    await medicationRef.update({
      status: data.status,
      statusReason: data.reason,
      trackingNumber: data.trackingNumber,
      updatedAt: new Date()
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating medication status:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 