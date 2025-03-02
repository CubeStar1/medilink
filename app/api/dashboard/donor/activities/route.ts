import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import type { Medication } from '@/lib/types/schema';
import type { Timestamp } from 'firebase-admin/firestore';

interface Activity {
  id: string
  title: string
  description: string
  value?: string
  type: "delivery" | "shipment" | "expiry" | "processing"
  timestamp: string
}

interface FirestoreMedication extends Omit<Medication, 'createdAt' | 'updatedAt' | 'expiryDate'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiryDate: Timestamp;
}

export async function GET() {
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
    const decodedClaims = await auth.verifyIdToken(sessionCookie);

    // Get user profile to verify role
    const userDoc = await db.collection('users').doc(decodedClaims.uid).get();
    const userProfile = userDoc.data();

    if (!userProfile || userProfile.role !== 'donor') {
      return NextResponse.json(
        { error: 'Forbidden', details: 'Access restricted to donor users' },
        { status: 403 }
      );
    }

    // Fetch only medications for now
    const medicationsSnapshot = await db.collection('medications')
      .where('donorId', '==', decodedClaims.uid)
      .limit(20)
      .get();

    // Process medications into activities
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const medicationActivities: Activity[] = medicationsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }) as FirestoreMedication)
      .filter(med => med.expiryDate.toDate() <= thirtyDaysFromNow)
      .map(med => ({
        id: med.id,
        title: med.name,
        description: `Expiring on ${med.expiryDate.toDate().toLocaleDateString()}`,
        type: "expiry" as const,
        value: `${med.quantity} ${med.unit}`,
        timestamp: med.updatedAt.toDate().toISOString()
      }));

    // Sort activities by timestamp
    const activities = medicationActivities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5); // Only return 5 most recent activities

    return NextResponse.json(activities);

  } catch (error) {
    console.error('Error fetching donor activities:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 