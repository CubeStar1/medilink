import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
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
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    // Build query
    let query = db.collection('medications')
      .orderBy('createdAt', 'desc')
      .limit(limit);

    // Add user filter if not admin
    if (decodedClaims.role !== 'admin') {
      query = query.where('donorId', '==', decodedClaims.uid);
    }

    if (status) {
      query = query.where('status', '==', status);
    }

    // Execute query
    try {
      const snapshot = await query.get();
      
      if (!snapshot.docs.length) {
        return NextResponse.json({ data: [] });
      }

      // Format response
      const medications = snapshot.docs.map(doc => {
        const data = doc.data();
        try {
          return {
            id: doc.id,
            name: data.name || '',
            category: data.category || '',
            quantity: data.quantity || 0,
            unit: data.unit || '',
            description: data.description || '',
            composition: data.composition || '',
            batchNumber: data.batchNumber || '',
            status: data.status || 'available',
            donorId: data.donorId || '',
            documents: data.documents || { images: [], prescriptions: [], other: [] },
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            expiryDate: data.expiryDate?.toDate() || new Date(),
            storageTemp: data.storageTemp || 'room'
          };
        } catch (docError) {
          console.error('Error processing document:', doc.id, docError);
          return null;
        }
      }).filter(Boolean);

      return NextResponse.json({ data: medications });

    } catch (error) {
      console.error('Database query error:', error instanceof Error ? error.message : 'Unknown error');
      return NextResponse.json({ 
        error: 'Database error', 
        message: 'Failed to fetch medications' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Request error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ 
      error: 'Internal server error',
      message: 'Failed to process request'
    }, { status: 500 });
  }
} 