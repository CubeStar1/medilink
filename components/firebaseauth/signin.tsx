"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(6, { message: "Password is too short" }),
});

export default function SignIn() {
  const queryString = typeof window !== "undefined" ? window?.location.search : "";
  const urlParams = new URLSearchParams(queryString);
  const next = urlParams.get("next");

  const [passwordReveal, setPasswordReveal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { signIn } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!isPending) {
      startTransition(async () => {
        try {
          await signIn(data.email, data.password);
          router.push(next || "/");
          toast.success("Signed in successfully");
        } catch (error) {
          console.error(error);
          toast.error("Could not sign in");
        }
      });
    }
  }

  return (
    <div className="w-full max-w-[400px] mx-auto p-6 space-y-6 border rounded-lg shadow-sm">
      <div className="space-y-2 text-center">
        <Image
          src="/medilink-logo.webp"
          alt="MediLink Logo"
          width={100}
          height={100}
          className="rounded-full mx-auto"
        />
        <h1 className="text-2xl font-semibold tracking-tight">Sign in to MediLink</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Please sign in to continue
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex-1 h-[0.5px] w-full bg-muted" />
        <div className="text-sm text-muted-foreground">Email Sign In</div>
        <div className="flex-1 h-[0.5px] w-full bg-muted" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordReveal ? "text" : "password"}
                      {...field}
                    />
                    <div
                      className="absolute right-2 top-[30%] cursor-pointer group"
                      onClick={() => setPasswordReveal(!passwordReveal)}
                    >
                      {passwordReveal ? (
                        <FaRegEye className="group-hover:scale-105 transition-all" />
                      ) : (
                        <FaRegEyeSlash className="group-hover:scale-105 transition-all" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href={next ? `/register?next=${next}` : "/register"}
          className="text-primary hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
} 