"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Package2, Calendar, ArrowUpRight, Building2 } from "lucide-react"
import Link from "next/link"
import RequestsLoading from "./loading"
import type { Request } from "@/lib/types/schema"

// Function to fetch requests
async function fetchRequests() {
  const { data } = await axios.get('/api/requests/list')
  return data.data
}

// Helper function to get status color
const getStatusColor = (status: Request['status']) => {
  switch (status) {
    case 'approved':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'in-transit':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'rejected':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    case 'delivered':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

// Helper function to get priority color
const getPriorityColor = (priority: Request['priority']) => {
  switch (priority) {
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
  // Fetch requests using React Query
  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ['requests'],
    queryFn: fetchRequests
  })

  if (isLoading) {
    return <RequestsLoading />
  }

  if (error) {
    return <div>Error loading requests</div>
  }

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
                <SelectItem value="priorityHigh">Priority: High to Low</SelectItem>
                <SelectItem value="priorityLow">Priority: Low to High</SelectItem>
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
            High Priority
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
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {requests.map((request: Request) => (
              <Card key={request.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src="https://placehold.co/400x300"
                    alt={request.medicationId}
                    className="object-cover w-full h-full"
                  />
                  <Badge className={`absolute top-2 right-2 ${getStatusColor(request.status)}`}>
                    {request.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{request.medicationName}</CardTitle>
                  <CardDescription>Priority: {request.priority}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Package2 className="h-4 w-4 text-muted-foreground" />
                      <span>{request.quantity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{typeof request.createdAt === 'string' ? new Date(request.createdAt).toLocaleDateString() : request.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{request.requesterDetails?.organizationName || 'Individual'}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{request.reason}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/requests/status/${request.id}`}>
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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
              <div>Priority</div>
              <div>Action</div>
            </div>
            {requests.map((request: Request) => (
              <div key={request.id} className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                <div className="col-span-2">
                  <div className="font-medium">{request.medicationName}</div>
                  <div className="text-sm text-muted-foreground">{request.requesterDetails?.organizationName || 'Individual'}</div>
                </div>
                <div>{request.quantity}</div>
                <div>{typeof request.createdAt === 'string' ? new Date(request.createdAt).toLocaleDateString() : request.createdAt.toLocaleDateString()}</div>
                <div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
                <div>
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                </div>
                <div>
                  <Link href={`/requests/status/${request.id}`}>
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