"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Package2, ThermometerIcon, ClockIcon, Building2, AlertTriangle, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { use } from "react"
import type { MedicationWithRequests } from "@/lib/types/schema"
import { getStatusColor } from "@/lib/utils"
import MedicationDetailsLoading from "./loading"

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

export default function MedicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  
  // Fetch medication details using React Query
  const { data: medication, isLoading, error } = useQuery({
    queryKey: ['medication', id],
    queryFn: () => fetchMedicationDetails(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    throwOnError: false
  })

  if (isLoading) {
    return (
      <div className="container py-6 space-y-6 mx-auto">
        <MedicationDetailsLoading/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-6 space-y-6 mx-auto">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Error Loading Medication</h2>
              <p className="text-muted-foreground mt-2">
                {error instanceof Error ? error.message : 'Failed to load medication details'}
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

  if (!medication) {
    return (
      <div className="container py-6 space-y-6 mx-auto">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Medication Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The medication you&apos;re looking for doesn&apos;t exist or has been removed.
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

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-6">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{medication.name}</h1>
            <p className="text-muted-foreground">{medication.category}</p>
          </div>
          <Badge className={`text-base px-4 py-1 ${getStatusColor(medication.status)}`}>
            {medication.status}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="aspect-video relative">
                <img
                  src="https://placehold.co/800x400"
                  alt={medication.name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <CardDescription>{medication.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Warnings and Storage Instructions
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="select-none">•</span>
                      Keep out of reach of children
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="select-none">•</span>
                      Store below {medication.storageTemp}°C
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="select-none">•</span>
                      Protect from light and moisture
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medication Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Package2 className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Quantity Available</p>
                      <p className="font-medium">{medication.quantity} {medication.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{new Date(medication.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Storage Temperature</p>
                      <p className="font-medium">{medication.storageTemp}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Batch Number</p>
                      <p className="font-medium">{medication.batchNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Added On</p>
                      <p className="font-medium">{new Date(medication.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Donor Organization</p>
                      <p className="font-medium">{medication.donorId}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => router.push(`/requests/create/${id}`)}
                >
                  Request Medication
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 