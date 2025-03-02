"use client";
import Register from '@/components/firebaseauth/register';
import { Suspense } from 'react'


export default function RegisterPage() {
  return(
    <Suspense>
    <Register />
    </Suspense>
  ) 
}