"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { use } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Package2, Truck, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import type { Request } from "@/lib/types/schema"
import RequestStatusLoading from "./loading"

// Function to fetch request details
async function fetchRequestDetails(id: string) {
  try {
    const response = await axios.get<Request>(`/api/requests/${id}`)
    if (!response.data) {
      throw new Error('Request not found')
    }
    return response.data
  } catch (err) {
    console.error('Error fetching request:', err)
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch request details')
  }
}

// Helper function to get status color
function getRequestStatusColor(status: Request['status']) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'in-transit':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'delivered':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

// Helper function to get status icon
function getRequestStatusIcon(status: Request['status']) {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5" />
    case 'approved':
      return <Package2 className="h-5 w-5" />
    case 'rejected':
      return <AlertTriangle className="h-5 w-5" />
    case 'in-transit':
      return <Truck className="h-5 w-5" />
    case 'delivered':
      return <CheckCircle2 className="h-5 w-5" />
    default:
      return null
  }
}

export default function RequestStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  const { data: request, isLoading } = useQuery({
    queryKey: ['request', id],
    queryFn: () => fetchRequestDetails(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <RequestStatusLoading />
  }

  if (!request) {
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
              <h2 className="text-lg font-semibold">Request Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The request you&apos;re looking for doesn&apos;t exist or has been removed.
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request Status</CardTitle>
                <Badge className={getRequestStatusColor(request.status)}>
                  <span className="flex items-center gap-2">
                    {getRequestStatusIcon(request.status)}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Request Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Request ID</p>
                    <p className="font-medium">#{request.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium">{request.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <p className="font-medium capitalize">{request.priority}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created On</p>
                    <p className="font-medium">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Reason for Request</h3>
                <p className="text-sm">{request.reason}</p>
              </div>

              {request.status === 'in-transit' && request.deliveryTracking && (
                <div>
                  <h3 className="font-medium mb-2">Delivery Tracking</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <p className="font-medium">
                        {request.deliveryTracking.currentLocation ? (
                          `${request.deliveryTracking.currentLocation.lat}, ${request.deliveryTracking.currentLocation.lng}`
                        ) : (
                          'Not available'
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-medium">
                        {request.deliveryTracking.temperature ? 
                          `${request.deliveryTracking.temperature}°C` : 
                          'Not available'
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium">
                        {new Date(request.deliveryTracking.lastUpdated).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Delivery Address</h3>
                <div className="space-y-1">
                  <p className="text-sm">{request.requesterDetails?.name}</p>
                  <p className="text-sm">{request.requesterDetails?.location}</p>
                  <p className="text-sm">{request.requesterDetails?.phoneNumber}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Contact Information</h3>
                <div className="space-y-1">
                  <p className="text-sm">{request.requesterDetails?.contactEmail}</p>
                  {request.requesterDetails?.organizationName && (
                    <>
                      <p className="text-sm">{request.requesterDetails.organizationName}</p>
                      <p className="text-sm">Reg. No: {request.requesterDetails.registrationNumber}</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 