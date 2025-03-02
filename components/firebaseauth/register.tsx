"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import SignUp from "./signup";
import { Suspense } from 'react'


export default function Register() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  return (
    <Suspense>
    <div className="w-full max-w-[600px] mx-auto shadow sm:p-5 border dark:border-zinc-800 rounded-md">
      <div className="p-5 space-y-5">
        <div className="text-center space-y-3">
          <Image
            src="/medilink-logo.webp"
            alt="MediLink Logo"
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
          <h1 className="font-bold">Create Account</h1>
          <p className="text-sm">
            Welcome! Please fill in the details to get started.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex-1 h-[0.5px] w-full bg-zinc-400 dark:bg-zinc-800"></div>
          <div className="text-sm">Email Sign Up</div>
          <div className="flex-1 h-[0.5px] w-full bg-zinc-400 dark:bg-zinc-800"></div>
        </div>
        <SignUp redirectTo={next} />
      </div>
    </div>
    </Suspense>
  );
} 