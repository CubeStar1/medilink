import { NextResponse } from "next/server"
import { auth, db } from "@/lib/firebase/admin"
import { cookies } from "next/headers"

export async function GET(
  req: Request,
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

    // Verify the session cookie exists
    await auth.verifyIdToken(sessionCookie);

    const requestRef = db.collection('requests').doc(id);
    const requestDoc = await requestRef.get();

    if (!requestDoc.exists) {
      return NextResponse.json(
        { error: 'Not Found', details: 'Request not found' },
        { status: 404 }
      );
    }

    const requestData = requestDoc.data();
    if (!requestData) {
      return NextResponse.json(
        { error: 'Not Found', details: 'Request data not found' },
        { status: 404 }
      );
    }

    // Convert Firestore timestamps to ISO strings
    const formattedData = {
      ...requestData,
      donorId: requestData.donorId || '',
      createdAt: requestData.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
      updatedAt: requestData.updatedAt?.toDate()?.toISOString() || new Date().toISOString()
    };

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error('Error fetching request:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 