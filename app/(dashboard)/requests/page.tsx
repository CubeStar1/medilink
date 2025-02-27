"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Package2, Calendar, ArrowUpRight, Building2 } from "lucide-react"
import Link from "next/link"

// Temporary data for demonstration
const requests = [
  {
    id: "1",
    medication: {
      id: 1,
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      quantity: 5000,
      unit: "tablets",
      expiryDate: "2025-06-15",
      ngo: "Red Cross",
      image: "https://placehold.co/400x300",
    },
    requestStatus: "Pending",
    requestDate: "2024-03-15",
    requestedQuantity: 1000,
    urgency: "High",
    purpose: "For local clinic distribution",
  },
  {
    id: "2",
    medication: {
      id: 2,
      name: "Paracetamol 650mg",
      category: "Pain Relief",
      quantity: 10000,
      unit: "tablets",
      expiryDate: "2025-08-20",
      ngo: "Doctors Without Borders",
      image: "https://placehold.co/400x300",
    },
    requestStatus: "Approved",
    requestDate: "2024-03-14",
    requestedQuantity: 5000,
    urgency: "Medium",
    purpose: "Hospital emergency stock",
  },
  {
    id: "3",
    medication: {
      id: 3,
      name: "First Aid Kit",
      category: "First Aid",
      quantity: 200,
      unit: "kits",
      expiryDate: "2026-01-10",
      ngo: "WHO",
      image: "https://placehold.co/400x300",
    },
    requestStatus: "In Transit",
    requestDate: "2024-03-13",
    requestedQuantity: 50,
    urgency: "Low",
    purpose: "Community health center supplies",
  },
]

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

export default function RequestsPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medication Requests</h1>
          <p className="text-muted-foreground">Track and manage your medication requests</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search requests..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="inTransit">In Transit</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Most Recent</SelectItem>
                <SelectItem value="urgencyHigh">Urgency: High to Low</SelectItem>
                <SelectItem value="urgencyLow">Urgency: Low to High</SelectItem>
                <SelectItem value="quantityHigh">Quantity: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="cursor-pointer">
            Pending
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            Approved
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            In Transit
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            High Urgency
          </Badge>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">
            Showing {requests.length} requests
          </p>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {requests.map((request) => (
              <Card key={request.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={request.medication.image}
                    alt={request.medication.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge className={getStatusColor(request.requestStatus)}>
                      {request.requestStatus}
                    </Badge>
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {request.urgency}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{request.medication.name}</CardTitle>
                  <CardDescription>{request.medication.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Package2 className="h-4 w-4 text-muted-foreground" />
                      <span>{request.requestedQuantity} {request.medication.unit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(request.requestDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{request.medication.ngo}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{request.purpose}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/requests/${request.id}`} className="w-full">
                    <Button className="w-full">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <div className="rounded-lg border">
            <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
              <div className="col-span-2">Medication</div>
              <div>Quantity</div>
              <div>Request Date</div>
              <div>Status</div>
              <div>Urgency</div>
              <div>Action</div>
            </div>
            {requests.map((request) => (
              <div key={request.id} className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                <div className="col-span-2">
                  <div className="font-medium">{request.medication.name}</div>
                  <div className="text-sm text-muted-foreground">{request.medication.category}</div>
                </div>
                <div>{request.requestedQuantity} {request.medication.unit}</div>
                <div>{new Date(request.requestDate).toLocaleDateString()}</div>
                <div>
                  <Badge className={getStatusColor(request.requestStatus)}>
                    {request.requestStatus}
                  </Badge>
                </div>
                <div>
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency}
                  </Badge>
                </div>
                <div>
                  <Link href={`/requests/${request.id}`}>
                    <Button size="sm">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 