"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Package2, Calendar, Building2, Thermometer, Pill, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Temporary data - In real app, fetch based on ID
const requestDetails = {
  id: "1",
  medication: {
    id: 1,
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    quantity: 5000,
    unit: "tablets",
    expiryDate: "2025-06-15",
    temperature: "Room Temperature",
    ngo: "Red Cross",
    status: "Available",
    image: "https://placehold.co/400x300",
  },
  requestStatus: "Pending",
  requestDate: "2024-03-15",
  requestedQuantity: 1000,
  urgency: "High",
  purpose: "For local clinic distribution",
  deliveryAddress: "123 Healthcare St, Medical District",
  contactPerson: "Dr. Jane Smith",
  contactPhone: "+1234567890",
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'in transit':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'rejected':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

const getUrgencyColor = (urgency: string) => {
  switch (urgency.toLowerCase()) {
    case 'high':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'low':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

export default function RequestDetailsPage() {
  const params = useParams()
  const isExistingRequest = requestDetails.id === params.id

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/requests">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isExistingRequest ? "Request Details" : "New Request"}
            </h1>
            <p className="text-muted-foreground">
              {isExistingRequest 
                ? "View and manage your medication request" 
                : "Submit a new request for medication"}
            </p>
          </div>
        </div>
        {isExistingRequest && (
          <Badge className={getStatusColor(requestDetails.requestStatus)}>
            {requestDetails.requestStatus}
          </Badge>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Medication Details */}
        <Card>
          <CardHeader>
            <CardTitle>Medication Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img
                src={requestDetails.medication.image}
                alt={requestDetails.medication.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{requestDetails.medication.name}</h3>
              <p className="text-muted-foreground">{requestDetails.medication.category}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Package2 className="h-4 w-4 text-muted-foreground" />
                <span>{requestDetails.medication.quantity} {requestDetails.medication.unit}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Exp: {new Date(requestDetails.medication.expiryDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <span>{requestDetails.medication.temperature}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{requestDetails.medication.ngo}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Form/Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isExistingRequest ? "Request Details" : "Request Form"}
            </CardTitle>
            {isExistingRequest && (
              <CardDescription>
                Requested on {new Date(requestDetails.requestDate).toLocaleDateString()}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Required</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  placeholder={`Enter quantity (in ${requestDetails.medication.unit})`}
                  defaultValue={isExistingRequest ? requestDetails.requestedQuantity : ""}
                  disabled={isExistingRequest}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <select 
                  id="urgency" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  defaultValue={isExistingRequest ? requestDetails.urgency.toLowerCase() : ""}
                  disabled={isExistingRequest}
                >
                  <option value="">Select urgency level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Textarea 
                  id="purpose" 
                  placeholder="Explain why you need this medication"
                  defaultValue={isExistingRequest ? requestDetails.purpose : ""}
                  disabled={isExistingRequest}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea 
                  id="address" 
                  placeholder="Enter complete delivery address"
                  defaultValue={isExistingRequest ? requestDetails.deliveryAddress : ""}
                  disabled={isExistingRequest}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input 
                    id="contact" 
                    placeholder="Enter contact person name"
                    defaultValue={isExistingRequest ? requestDetails.contactPerson : ""}
                    disabled={isExistingRequest}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input 
                    id="phone" 
                    placeholder="Enter contact phone number"
                    defaultValue={isExistingRequest ? requestDetails.contactPhone : ""}
                    disabled={isExistingRequest}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {isExistingRequest ? (
              <>
                <Button variant="outline">Cancel Request</Button>
                <Button>Update Request</Button>
              </>
            ) : (
              <Button type="submit">Submit Request</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 