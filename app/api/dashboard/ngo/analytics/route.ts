import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import type { Request } from '@/lib/types/schema';

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

    const decodedClaims = await auth.verifyIdToken(sessionCookie);

    // Get user profile to verify role
    const userProfileDoc = await db.collection('users').doc(decodedClaims.uid).get();
    const userProfile = userProfileDoc.data();

    // if (!userProfile || userProfile.role !== 'ngo') {
    //   return NextResponse.json(
    //     { error: 'Forbidden', details: 'Access restricted to NGO users' },
    //     { status: 403 }
    //   );
    // }

    // Get all requests for this NGO from the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const requestsQuery = await db.collection('requests')
      .where('requesterId', '==', decodedClaims.uid)
      .where('createdAt', '>=', sixMonthsAgo)
      .get();

    const requests = requestsQuery.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        status: data.status || 'pending'
      };
    }) as (Request & { createdAt: Date })[];

    // Sort requests by createdAt after fetching
    const sortedRequests = requests.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    // Group requests by month and calculate metrics
    const monthlyData = sortedRequests.reduce((acc: Record<string, { requests: number, fulfilled: number }>, request) => {
      const month = request.createdAt.toLocaleString('default', { month: 'long' });
      
      if (!acc[month]) {
        acc[month] = { requests: 0, fulfilled: 0 };
      }
      
      acc[month].requests++;
      if (request.status === 'delivered') {
        acc[month].fulfilled++;
      }
      
      return acc;
    }, {});

    // Convert to array format and fill in missing months
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const currentMonth = new Date().getMonth();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - i + 12) % 12;
      return months[monthIndex];
    }).reverse();

    const trendsData = last6Months.map(month => ({
      month,
      requests: monthlyData[month]?.requests || 0,
      fulfilled: monthlyData[month]?.fulfilled || 0
    }));

    // Calculate percentage changes
    const totalRequests = trendsData.reduce((sum, month) => sum + month.requests, 0);
    const totalFulfilled = trendsData.reduce((sum, month) => sum + month.fulfilled, 0);
    
    const previousTotalRequests = trendsData.slice(0, 3).reduce((sum, month) => sum + month.requests, 0);
    const currentTotalRequests = trendsData.slice(3).reduce((sum, month) => sum + month.requests, 0);
    
    const requestsChange = previousTotalRequests > 0
      ? ((currentTotalRequests - previousTotalRequests) / previousTotalRequests) * 100
      : 0;

    const fulfillmentRate = totalRequests > 0
      ? (totalFulfilled / totalRequests) * 100
      : 0;

    return NextResponse.json({
      trendsData,
      metrics: {
        requestsChange: Math.round(requestsChange * 10) / 10,
        fulfillmentRate: Math.round(fulfillmentRate)
      }
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 