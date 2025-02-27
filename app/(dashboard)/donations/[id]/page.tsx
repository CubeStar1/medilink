"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Package2, 
  Calendar, 
  Building2, 
  Users,
  ThermometerIcon,
  ClockIcon,
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  Truck,
  CheckCircle2,
  XCircle,
  Info
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

// Temporary data - Replace with API call
const getDonationDetails = (id: string) => ({
  id,
  name: "Amoxicillin 500mg",
  category: "Antibiotics",
  quantity: 5000,
  unit: "tablets",
  expiryDate: "2025-06-15",
  addedDate: "2024-03-10",
  status: "In Transit",
  recipient: "Doctors Without Borders",
  location: "Ethiopia",
  image: "https://placehold.co/800x400",
  deliveryDate: "2024-03-15",
  trackingNumber: "TRK123456789",
  manufacturer: "PharmaCorp Ltd.",
  batchNumber: "AMX2024001",
  temperature: "Room Temperature",
  description: "Broad-spectrum antibiotic used to treat various bacterial infections.",
  composition: "Amoxicillin trihydrate equivalent to amoxicillin 500mg",
  warnings: [
    "Keep out of reach of children",
    "Store below 25°C",
    "Protect from light and moisture"
  ],
  requests: [
    {
      id: 1,
      ngo: "Doctors Without Borders",
      location: "Ethiopia",
      requestDate: "2024-03-08",
      quantity: 2000,
      status: "Pending",
      urgency: "High",
      reason: "Urgent need for antibiotics in rural clinics",
      contactPerson: "Dr. Sarah Johnson",
      contactEmail: "sarah.j@dwb.org"
    },
    {
      id: 2,
      ngo: "Red Cross",
      location: "Sudan",
      requestDate: "2024-03-07",
      quantity: 1500,
      status: "Pending",
      urgency: "Medium",
      reason: "Restocking medical facilities",
      contactPerson: "John Smith",
      contactEmail: "j.smith@redcross.org"
    }
  ]
})

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
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

export default function DonationDetailsPage({ params }: { params: { id: string } }) {
  const donation = getDonationDetails(params.id)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleRequest = async (requestId: number, action: 'approve' | 'reject') => {
    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`Request ${action === 'approve' ? 'approved' : 'rejected'} successfully`)
    } catch (err: unknown) {
      console.error('Failed to process request:', err)
      toast.error('Failed to process request')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-6">
      <div className="w-full max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/donations" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Donations
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{donation.name}</h1>
              <p className="text-muted-foreground">{donation.category}</p>
            </div>
            <Badge className={`text-base px-4 py-1 ${getStatusColor(donation.status)}`}>
              {donation.status}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="aspect-video relative">
                <img
                  src={donation.image}
                  alt={donation.name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <p className="text-muted-foreground">{donation.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Composition</h3>
                  <p className="text-sm text-muted-foreground">{donation.composition}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Warnings and Storage Instructions
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {donation.warnings.map((warning, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="select-none">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Requests Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pending Requests
                  <Badge variant="outline" className="ml-2">
                    {donation.requests.length} requests
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donation.requests.map((request) => (
                    <Card key={request.id} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {request.ngo}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {request.location}
                              </p>
                            </div>
                            <Badge className={`${getUrgencyColor(request.urgency)}`}>
                              {request.urgency} Priority
                            </Badge>
                          </div>

                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Package2 className="h-4 w-4 text-muted-foreground" />
                              <span>Requested: {request.quantity} {donation.unit}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Requested on: {new Date(request.requestDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Info className="h-4 w-4 text-muted-foreground" />
                              <span>{request.reason}</span>
                            </div>
                          </div>

                          <div className="text-sm">
                            <p className="font-medium">Contact Information:</p>
                            <p>{request.contactPerson} - {request.contactEmail}</p>
                          </div>

                          <div className="flex gap-2 mt-2">
                            <Button
                              className="flex-1"
                              onClick={() => handleRequest(request.id, 'approve')}
                              disabled={isProcessing}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleRequest(request.id, 'reject')}
                              disabled={isProcessing}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {donation.requests.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      No pending requests for this donation
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tracking Section - Only show for In Transit items */}
            {donation.status === "In Transit" && donation.trackingNumber && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Shipment Tracking</span>
                    <Link 
                      href={`/tracking/${donation.trackingNumber}`}
                      className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      View Full Tracking
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">In Transit to {donation.location}</p>
                      <p className="text-sm text-muted-foreground">Tracking Number: {donation.trackingNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Package2 className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium">{donation.quantity} {donation.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Added Date</p>
                      <p className="font-medium">{new Date(donation.addedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{new Date(donation.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Storage Temperature</p>
                      <p className="font-medium">{donation.temperature}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Batch Number</p>
                      <p className="font-medium">{donation.batchNumber}</p>
                    </div>
                  </div>
                  {donation.recipient && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">Recipient</p>
                        <p className="font-medium">{donation.recipient}</p>
                      </div>
                    </div>
                  )}
                  {donation.location && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">Destination</p>
                        <p className="font-medium">{donation.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {donation.status === "In Transit" && (
                  <Link href={`/tracking/${donation.trackingNumber}`}>
                    <Button className="w-full" variant="outline">
                      Track Shipment
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 