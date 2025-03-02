import { NextResponse } from "next/server";
import { auth, db } from "@/lib/firebase/admin";
import { cookies } from "next/headers";
import { z } from "zod";
import * as admin from "firebase-admin";
import type { Request as DonationRequest } from "@/lib/types/schema";

const updateRequestSchema = z.object({
  requestId: z.string(),
  status: z.enum(['approved', 'rejected', 'in-transit', 'delivered']),
  note: z.string().optional(),
  estimatedDeliveryDate: z.string().optional(), // ISO date string
  reason: z.string().optional(), // Required for rejection
});

type FirestoreData = {
  [key: string]: any;
  status: DonationRequest['status'];
  updatedAt: admin.firestore.Timestamp;
  statusUpdates: admin.firestore.FieldValue;
  approvalDetails?: {
    approvedBy: string;
    approvedAt: admin.firestore.Timestamp;
    note?: string;
    estimatedDeliveryDate?: admin.firestore.Timestamp | null;
  };
  rejectionDetails?: {
    rejectedBy: string;
    rejectedAt: admin.firestore.Timestamp;
    reason: string;
  };
};

export async function PUT(request: Request) {
  try {
    // Get and verify session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session')?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'No session cookie found' },
        { status: 401 }
      );
    }

    // Verify the session cookie and get user claims
    const decodedClaims = await auth.verifyIdToken(sessionCookie);

    // Get user profile to verify donor
    const userDoc = await db.collection('users').doc(decodedClaims.uid).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'User profile not found' },
        { status: 401 }
      );
    }

    const userData = userDoc.data();
    if (!userData || userData.role !== 'donor') {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Only donors can update request status' },
        { status: 403 }
      );
    }

    // Validate request body
    const body = await request.json();
    const validatedData = updateRequestSchema.parse(body);

    // Get request document
    const requestRef = db.collection('requests').doc(validatedData.requestId);
    const requestDoc = await requestRef.get();

    if (!requestDoc.exists) {
      return NextResponse.json(
        { error: 'Not Found', message: 'Request not found' },
        { status: 404 }
      );
    }

    const requestData = requestDoc.data() as DonationRequest;
    if (!requestData) {
      return NextResponse.json(
        { error: 'Not Found', message: 'Request data not found' },
        { status: 404 }
      );
    }

    // Verify that the donor owns this request
    if (requestData.donorId !== decodedClaims.uid) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'You can only update your own requests' },
        { status: 403 }
      );
    }

    // If the request is being approved, update medication quantity
    if (validatedData.status === 'approved') {
      const medicationRef = db.collection('medications').doc(requestData.medicationId);
      const medicationDoc = await medicationRef.get();
      
      if (!medicationDoc.exists) {
        return NextResponse.json({ error: 'Medication not found' }, { status: 404 });
      }

      const medicationData = medicationDoc.data();
      
      if (!medicationData) {
        return NextResponse.json({ error: 'Medication data not found' }, { status: 404 });
      }

      const remainingQuantity = medicationData.quantity - requestData.quantity;

      if (remainingQuantity < 0) {
        return NextResponse.json(
          { error: 'Insufficient medication quantity available' },
          { status: 400 }
        );
      }

      // Update medication quantity and status
      await medicationRef.update({
        quantity: remainingQuantity,
        status: remainingQuantity === 0 ? 'reserved' : 'available',
        updatedAt: admin.firestore.Timestamp.now(),
      });
    }

    // Prepare update data
    const now = admin.firestore.Timestamp.now();
    const statusUpdate = {
      status: validatedData.status,
      timestamp: now,
      updatedBy: decodedClaims.uid,
      note: validatedData.note,
    };

    const updateData: FirestoreData = {
      status: validatedData.status,
      updatedAt: now,
      statusUpdates: admin.firestore.FieldValue.arrayUnion(statusUpdate),
    };

    // Add approval or rejection details
    if (validatedData.status === 'approved') {
      updateData.approvalDetails = {
        approvedBy: decodedClaims.uid,
        approvedAt: now,
        note: validatedData.note,
        estimatedDeliveryDate: validatedData.estimatedDeliveryDate 
          ? admin.firestore.Timestamp.fromDate(new Date(validatedData.estimatedDeliveryDate))
          : null,
      };
    } else if (validatedData.status === 'rejected') {
      if (!validatedData.reason) {
        return NextResponse.json(
          { error: 'Bad Request', message: 'Reason is required for rejection' },
          { status: 400 }
        );
      }
      updateData.rejectionDetails = {
        rejectedBy: decodedClaims.uid,
        rejectedAt: now,
        reason: validatedData.reason,
      };
    }

    // Update request
    await requestRef.update(updateData);

    return NextResponse.json({
      message: `Request ${validatedData.status} successfully`,
      requestId: validatedData.requestId,
    });

  } catch (error) {
    console.error('[REQUEST_UPDATE]', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 