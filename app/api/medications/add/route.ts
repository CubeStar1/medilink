import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import type { Medication } from '@/lib/types/schema';



export async function POST(request: Request) {
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
      } catch (authError) {
        console.error('Session verification failed:', authError);
        return NextResponse.json(
          { error: 'Unauthorized', details: 'Invalid session' },
          { status: 401 }
        );
      }
      
      // Get the request body
      let data;
      try {
        data = await request.json();
      } catch (parseError) {
        console.error('Failed to parse request body:', parseError);
        return NextResponse.json(
          { error: 'Bad Request', details: 'Invalid request body' },
          { status: 400 }
        );
      }
      
      if (!data) {
        return NextResponse.json(
          { error: 'Bad Request', details: 'Missing request body' },
          { status: 400 }
        );
      }
  
      // Create a new medication document
      const medicationData: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'> = {
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        unit: data.unit,
        description: data.description,
        composition: data.composition,
        batchNumber: data.batchNumber,
        expiryDate: new Date(data.expiryDate),
        storageTemp: data.storageTemp,
        status: 'available',
        donorId: decodedClaims.uid,
        documents: data.documents || {
          images: [],
          prescriptions: [],
          other: []
        }
      };
  
      // Add to Firestore with server timestamp
      const docRef = await db.collection('medications').add({
        ...medicationData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      return NextResponse.json({
        success: true,
        id: docRef.id,
        data: medicationData
      }, { status: 201 });
  
    } catch (error) {
      console.error('Error creating medication:', error);
      return NextResponse.json({
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
  }