"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userProfile) {
      console.log(userProfile);
      switch (userProfile.role) {
        case 'donor':
          router.push('/donor');
          break;
        case 'ngo':
          router.push('/ngo');
          break;
        case 'individual':
          router.push('/individual');
          break;
        case 'admin':
          router.push('/admin');
          break;
        default:
          // If role is not recognized, redirect to a default page
          router.push('/default');
      }
    }
  }, [userProfile, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-semibold">Redirecting to your dashboard...</h1>
      </div>
    </div>
  );
} 