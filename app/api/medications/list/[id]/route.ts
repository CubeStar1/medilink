import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import type { MedicationWithRequests, Request as MedicationRequest } from '@/lib/types/schema';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    // Get the medication document
    const medicationRef = db.collection('medications').doc(id);
    const medicationDoc = await medicationRef.get();
    
    if (!medicationDoc.exists) {
      return NextResponse.json(
        { error: 'Not Found', details: 'Medication not found' },
        { status: 404 }
      );
    }

    // Get the medication data
    const medicationData = medicationDoc.data();
    
    // Check if user has access to this medication
    if (medicationData?.donorId !== decodedClaims.uid && decodedClaims.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden', details: 'You do not have access to this medication' },
        { status: 403 }
      );
    }

    // Get all requests for this medication
    const requestsSnapshot = await db.collection('requests')
      .where('medicationId', '==', id)
      .orderBy('createdAt', 'desc')
      .get();

    const requests = await Promise.all(requestsSnapshot.docs.map(async doc => {
      const data = doc.data();

      // Get requester details
      const requesterDoc = await db.collection('users').doc(data.requesterId).get();
      const requesterData = requesterDoc.data();
      
      let requesterDetails: MedicationRequest['requesterDetails'] = {
        name: requesterData?.displayName || '',
        location: requesterData?.address?.city || '',
        contactEmail: requesterData?.email || '',
        phoneNumber: requesterData?.phoneNumber
      };

      // Add specific fields based on requester type
      if (data.requesterType === 'ngo' && requesterData?.organization) {
        requesterDetails = {
          ...requesterDetails,
          organizationName: requesterData.organization.name,
          registrationNumber: requesterData.organization.registrationNumber
        };
      } else if (data.requesterType === 'individual' && requesterData?.individualProfile) {
        requesterDetails = {
          ...requesterDetails,
          idProof: requesterData.individualProfile.idProof
        };
      }

      return {
        id: doc.id,
        requesterId: data.requesterId,
        requesterType: data.requesterType,
        medicationId: data.medicationId,
        status: data.status,
        quantity: data.quantity,
        priority: data.priority,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        requesterDetails,
        reason: data.reason,
        deliveryTracking: data.deliveryTracking ? {
          ...data.deliveryTracking,
          lastUpdated: data.deliveryTracking.lastUpdated?.toDate() || new Date()
        } : undefined
      } as MedicationRequest;
    }));

    // Format the response
    const response: MedicationWithRequests = {
      id: medicationDoc.id,
      name: medicationData?.name || '',
      category: medicationData?.category || '',
      quantity: medicationData?.quantity || 0,
      unit: medicationData?.unit || '',
      description: medicationData?.description,
      composition: medicationData?.composition,
      batchNumber: medicationData?.batchNumber || '',
      expiryDate: medicationData?.expiryDate?.toDate() || new Date(),
      storageTemp: medicationData?.storageTemp || 0,
      status: medicationData?.status || 'available',
      donorId: medicationData?.donorId || '',
      createdAt: medicationData?.createdAt?.toDate() || new Date(),
      updatedAt: medicationData?.updatedAt?.toDate() || new Date(),
      documents: medicationData?.documents || { images: [], prescriptions: [], other: [] },
      requests,
      trackingNumber: medicationData?.trackingNumber,
      location: medicationData?.location
    };

    // Return the response
    return NextResponse.json(response);

  } catch (error) {
    console.error('Error in GET /api/medications/[id]:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 