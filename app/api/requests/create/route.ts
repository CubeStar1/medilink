import { NextResponse } from "next/server"
import { auth, db } from "@/lib/firebase/admin"
import { z } from "zod"
import type { UserProfile } from "@/lib/types/schema"
import { cookies } from "next/headers"
import * as admin from "firebase-admin"

const requestSchema = z.object({
  medicationId: z.string(),
  quantity: z.number().min(1),
  priority: z.enum(["low", "medium", "high"]),
  reason: z.string().min(10),
  deliveryAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  contactNumber: z.string(),
})

export async function POST(req: Request) {
  try {
    // Get session token from cookies
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session')?.value;

    if (!sessionCookie) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the session cookie
    let decodedClaims;
    try {
      decodedClaims = await auth.verifyIdToken(sessionCookie);
    } catch (verifyError) {
      console.error('Session verification failed:', verifyError);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json()
    const validatedData = requestSchema.parse(body)

    // Get user profile
    const userRef = db.collection('users').doc(decodedClaims.uid)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      return new NextResponse("User profile not found", { status: 404 })
    }

    const userData = userDoc.data() as UserProfile
    if (!userData) {
      return new NextResponse("User data not found", { status: 404 })
    }

    // Check if user is verified
    // TODO: Implement verification
    // if (!userData.isVerified) {
    //   return new NextResponse("User is not verified", { status: 403 })
    // }

    // Get medication details
    const medicationRef = db.collection('medications').doc(validatedData.medicationId)
    const medicationDoc = await medicationRef.get()

    if (!medicationDoc.exists) {
      return new NextResponse("Medication not found", { status: 404 })
    }

    const medicationData = medicationDoc.data()
    if (!medicationData) {
      return new NextResponse("Medication data not found", { status: 404 })
    }

    // Check if medication is available
    if (medicationData.status !== 'available') {
      return new NextResponse("Medication is not available", { status: 400 })
    }

    // Check if requested quantity is available
    if (validatedData.quantity > medicationData.quantity) {
      return new NextResponse("Requested quantity exceeds available quantity", { status: 400 })
    }

    // Calculate remaining quantity
    const remainingQuantity = medicationData.quantity - validatedData.quantity;

    // Prepare requester details based on user type
    const requesterDetails = {
      name: userData.displayName || '',
      location: `${validatedData.deliveryAddress.city}, ${validatedData.deliveryAddress.state}`,
      contactEmail: userData.email,
      phoneNumber: validatedData.contactNumber,
    }

    if (userData.role === 'ngo' && userData.organization) {
      Object.assign(requesterDetails, {
        organizationName: userData.organization.name,
        registrationNumber: userData.organization.registrationNumber,
        type: userData.organization.type,
      })
    } else if (userData.role === 'individual' && userData.individualProfile) {
      Object.assign(requesterDetails, {
        idProof: userData.individualProfile.idProof,
      })
    }

    // Create request document
    const requestRef = db.collection('requests').doc()
    const requestData = {
      id: requestRef.id,
      medicationId: validatedData.medicationId,
      medicationName: medicationData.name,
      donorId: medicationData.donorId,
      requesterId: decodedClaims.uid,
      requesterType: userData.role as 'ngo' | 'individual',
      status: 'pending',
      quantity: validatedData.quantity,
      priority: validatedData.priority,
      reason: validatedData.reason,
      deliveryAddress: validatedData.deliveryAddress,
      contactNumber: validatedData.contactNumber,
      requesterDetails,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    }

    await requestRef.set(requestData)

    return NextResponse.json({
      id: requestRef.id,
      message: "Request created successfully",
    })
  } catch (error) {
    console.error("[REQUESTS_CREATE]", error)
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 400 })
    }
    return new NextResponse("Internal error", { status: 500 })
  }
} 