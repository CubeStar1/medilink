"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { use } from "react"
import axios from "axios"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft } from "lucide-react"
import { toast } from "sonner"
import type { MedicationWithRequests } from "@/lib/types/schema"
import { getStatusColor } from "@/lib/utils"
import CreateRequestLoading from "./loading"

// Form schema
const requestFormSchema = z.object({
  quantity: z.coerce
    .number()
    .min(1, "Quantity must be at least 1")
    .max(1000, "Quantity cannot exceed 1000"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority level",
  }),
  reason: z.string()
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason cannot exceed 500 characters"),
  deliveryAddress: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  contactNumber: z.string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number cannot exceed 15 digits"),
})

type RequestFormValues = z.infer<typeof requestFormSchema>

// Function to fetch medication details
async function fetchMedicationDetails(id: string) {
  try {
    const response = await axios.get<MedicationWithRequests>(`/api/medications/list/${id}`)
    if (!response.data) {
      throw new Error('Medication not found')
    }
    return response.data
  } catch (err) {
    console.error('Error fetching medication:', err)
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch medication details')
  }
}

export default function CreateRequestPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      quantity: 1,
      priority: "low",
      reason: "",
      deliveryAddress: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
      },
      contactNumber: ""
    }
  })

  // Fetch medication details using React Query
  const { data: medication, isLoading } = useQuery({
    queryKey: ['medication', id],
    queryFn: () => fetchMedicationDetails(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    throwOnError: false
  })

  if (isLoading) {
    return <CreateRequestLoading />
  }

  if (!medication) {
    return (
      <div className="container py-6 space-y-6">
        <Button 
          variant="ghost" 
          className="gap-2"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Medication Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The medication you&apos;re trying to request doesn&apos;t exist or has been removed.
              </p>
              <Button className="mt-4" onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  async function onSubmit(data: RequestFormValues) {
    try {
      const response = await axios.post(`/api/requests/create`, {
        medicationId: id,
        ...data,
      })

      if (response.data.id) {
        toast.success("Request submitted successfully")
        router.push(`/requests/status/${response.data.id}`)
      }
    } catch (error) {
      toast.error("Failed to submit request. Please try again.")
      console.error('Request submission error:', error)
    }
  }

  return (
    <div className="container py-6 space-y-6 mx-auto">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="gap-2"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Request Medication</CardTitle>
              <CardDescription>
                Please fill in the details below to submit your request.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity Required</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Available: {medication.quantity} {medication.unit}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the urgency level of your request
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Request</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please explain why you need this medication..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Delivery Address</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="deliveryAddress.street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="deliveryAddress.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="deliveryAddress.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="deliveryAddress.postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="deliveryAddress.country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Medication Details Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Medication Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{medication.name}</h3>
                <p className="text-sm text-muted-foreground">{medication.category}</p>
                <Badge className={`mt-2 ${getStatusColor(medication.status)}`}>
                  {medication.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-sm">{medication.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-medium">{medication.quantity} {medication.unit}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expiry Date</p>
                  <p className="font-medium">
                    {new Date(medication.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Storage</p>
                  <p className="font-medium">{medication.storageTemp}°C</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Batch</p>
                  <p className="font-medium">#{medication.batchNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 