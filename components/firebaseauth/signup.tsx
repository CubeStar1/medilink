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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Icons } from "@/components/ui/icons";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

const ngoSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  type: z.string().min(1, "Organization type is required"),
  website: z.string().url().optional().or(z.literal("")),
  operatingAreas: z.array(z.string()).optional().default([])
});

const donorOrgSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  type: z.string().min(1, "Organization type is required"),
  license: z.string().min(1, "License number is required"),
  website: z.string().url().optional().or(z.literal("")),
});

const individualSchema = z.object({
  occupation: z.string().optional(),
});

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(6, { message: "Password is too short" }),
  "confirm-pass": z.string().min(6, { message: "Password is too short" }),
  userType: z.enum(["donor", "requester"] as const),
  accountType: z.enum(["individual", "organization"] as const),
  role: z.enum(["donor", "ngo", "individual"] as const),
  displayName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: addressSchema,
  // Optional fields based on role
  ngoDetails: ngoSchema.optional(),
  donorOrgDetails: donorOrgSchema.optional(),
  individualDetails: individualSchema.optional(),
}).refine((data) => data["confirm-pass"] === data.password, {
  message: "Passwords don't match",
  path: ["confirm-pass"],
}).refine((data) => {
  if (data.role === "ngo") return !!data.ngoDetails;
  if (data.role === "donor" && data.accountType === "organization") return !!data.donorOrgDetails;
  return true;
}, {
  message: "Please fill in the required organization details",
  path: ["role"],
});

type FormStep = 'user-type' | 'account' | 'details' | 'organization';

export default function SignUp({ redirectTo }: { redirectTo: string }) {
  const [step, setStep] = useState<FormStep>('user-type');
  const [passwordReveal, setPasswordReveal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      "confirm-pass": "",
      userType: "donor",
      accountType: "individual",
      role: "individual",
      displayName: "",
      phoneNumber: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    },
  });

  const userType = form.watch("userType");
  const accountType = form.watch("accountType");

  const updateRole = (userType: string, accountType: string) => {
    if (userType === "requester") {
      form.setValue("role", "ngo");
    } else if (userType === "donor") {
      form.setValue("role", accountType === "individual" ? "individual" : "donor");
    }
  };

  const nextStep = () => {
    switch (step) {
      case 'user-type':
        setStep('account');
        break;
      case 'account':
        setStep('details');
        break;
      case 'details':
        if (accountType === 'organization') {
          setStep('organization');
        }
        break;
      default:
        break;
    }
  };

  const prevStep = () => {
    switch (step) {
      case 'account':
        setStep('user-type');
        break;
      case 'details':
        setStep('account');
        break;
      case 'organization':
        setStep('details');
        break;
      default:
        break;
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!isPending) {
      startTransition(async () => {
        try {
          console.log('Form data:', data);
          
          // Create the base profile data
          const profileData = {
            role: data.role,
            displayName: data.displayName,
            phoneNumber: data.phoneNumber,
            address: data.address,
          };

          // Add organization details if it's an NGO
          if (data.role === "ngo" && data.ngoDetails) {
            Object.assign(profileData, {
              organization: {
                name: data.ngoDetails.name,
                registrationNumber: data.ngoDetails.registrationNumber,
                type: data.ngoDetails.type,
                website: data.ngoDetails.website || null,
                operatingAreas: []
              }
            });
          }

          // Add donor organization details if it's a donor organization
          if (data.role === "donor" && data.accountType === "organization" && data.donorOrgDetails) {
            Object.assign(profileData, {
              donorOrganization: {
                name: data.donorOrgDetails.name,
                type: data.donorOrgDetails.type,
                license: data.donorOrgDetails.license,
                website: data.donorOrgDetails.website || null
              }
            });
          }

          // Add individual details if present
          if (data.role === "individual" && data.individualDetails) {
            Object.assign(profileData, {
              individualProfile: {
                occupation: data.individualDetails.occupation || null
              }
            });
          }

          await signUp(data.email, data.password, profileData);
          router.push(redirectTo);
          toast.success("Account created successfully");
        } catch (error) {
          console.error('Signup error:', error);
          toast.error("Could not create account");
        }
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
        <p className="text-sm text-muted-foreground">
          {step === 'user-type' && "Choose how you want to use MediLink"}
          {step === 'account' && "Set up your account credentials"}
          {step === 'details' && "Tell us about yourself"}
          {step === 'organization' && "Organization Details"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 'user-type' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className={cn(
                  "p-6 rounded-lg border-2 cursor-pointer transition-all hover:border-primary hover:bg-accent",
                  userType === "donor" && "border-primary bg-accent"
                )}
                onClick={() => {
                  form.setValue("userType", "donor");
                  updateRole("donor", accountType);
                }}
              >
                <h3 className="text-xl font-semibold mb-2">Donor</h3>
                <p className="text-muted-foreground">
                  I want to donate medications
                </p>
              </div>
              <div 
                className={cn(
                  "p-6 rounded-lg border-2 cursor-pointer transition-all hover:border-primary hover:bg-accent",
                  userType === "requester" && "border-primary bg-accent"
                )}
                onClick={() => {
                  form.setValue("userType", "requester");
                  updateRole("requester", accountType);
                }}
              >
                <h3 className="text-xl font-semibold mb-2">Requester</h3>
                <p className="text-muted-foreground">
                  I want to request medications
                </p>
              </div>
            </div>
          )}

          {step === 'account' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className={cn(
                    "p-6 rounded-lg border-2 cursor-pointer transition-all hover:border-primary hover:bg-accent",
                    accountType === "individual" && "border-primary bg-accent"
                  )}
                  onClick={() => {
                    form.setValue("accountType", "individual");
                    updateRole(userType, "individual");
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">Individual</h3>
                  <p className="text-muted-foreground">
                    Personal account
                  </p>
                </div>
                <div 
                  className={cn(
                    "p-6 rounded-lg border-2 cursor-pointer transition-all hover:border-primary hover:bg-accent",
                    accountType === "organization" && "border-primary bg-accent"
                  )}
                  onClick={() => {
                    form.setValue("accountType", "organization");
                    updateRole(userType, "organization");
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">Organization</h3>
                  <p className="text-muted-foreground">
                    {userType === "donor" ? "Healthcare facility or pharmaceutical company" : "NGO or healthcare provider"}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <FormField
                    control={form.control}
                    name="confirm-pass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type={passwordReveal ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Postal Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {userType === "donor" && accountType === "individual" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Additional Information</h3>
                  <FormField
                    control={form.control}
                    name="individualDetails.occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Occupation (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          )}

          {step === 'organization' && (
            <div className="space-y-8">
              {userType === "requester" ? (
                // NGO Details
                <>
                  <FormField
                    control={form.control}
                    name="ngoDetails.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Organization Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="ngoDetails.type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Organization Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hospital">Hospital</SelectItem>
                              <SelectItem value="clinic">Clinic</SelectItem>
                              <SelectItem value="pharmacy">Pharmacy</SelectItem>
                              <SelectItem value="ngo">NGO</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ngoDetails.registrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Registration Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="ngoDetails.website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Website (Optional)</FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                // Donor Organization Details
                <>
                  <FormField
                    control={form.control}
                    name="donorOrgDetails.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Organization Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="donorOrgDetails.type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Organization Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pharmaceutical">Pharmaceutical Company</SelectItem>
                              <SelectItem value="hospital">Hospital</SelectItem>
                              <SelectItem value="distributor">Distributor</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="donorOrgDetails.license"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">License Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="donorOrgDetails.website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Website (Optional)</FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          )}

          <div className="flex justify-between gap-6 pt-4">
            {step !== 'user-type' && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="min-w-[100px]"
              >
                Back
              </Button>
            )}
            
            {step === 'organization' || (step === 'details' && accountType === 'individual') ? (
              <Button
                type="submit"
                className="ml-auto min-w-[140px]"
                disabled={isPending}
              >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Account
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                className="ml-auto min-w-[100px]"
              >
                Continue
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={redirectTo ? `/signin?next=${redirectTo}` : "/signin"}
          className="text-primary hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
} 