"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Package2,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  Search,
  Filter,
  LayoutGrid,
  List as ListIcon
} from "lucide-react"
import DonationsLoading from "./loading"
import type { Medication } from "@/lib/types/schema"
import { getStatusColor } from "@/lib/utils"
import axios, { AxiosError } from "axios"

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'available':
      return CheckCircle2
    case 'reserved':
      return Clock
    case 'delivered':
      return Truck
    default:
      return AlertCircle
  }
}

async function fetchDonations() {
  try {
    const response = await axios.get('/api/medications/list');
    
    if (!response.data) {
      console.warn('No data in response:', response);
      return { data: [] };
    }

    // Convert date strings to Date objects
    const data = response.data.data.map((donation: Omit<Medication, 'createdAt' | 'updatedAt' | 'expiryDate'> & {
      createdAt: string;
      updatedAt: string;
      expiryDate: string;
    }) => ({
      ...donation,
      createdAt: donation.createdAt ? new Date(donation.createdAt) : new Date(),
      updatedAt: donation.updatedAt ? new Date(donation.updatedAt) : new Date(),
      expiryDate: donation.expiryDate ? new Date(donation.expiryDate) : new Date()
    }));

    return { data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Error fetching donations:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch donations');
    }
    throw error;
  }
}

interface MedicationsResponse {
  data: Medication[];
  error?: string;
  message?: string;
}

export default function DonationsPage() {
  const { data: { data: donations = [] } = {}, isLoading, error } = useQuery<MedicationsResponse>({
    queryKey: ['donations'],
    queryFn: fetchDonations,
  });

  // Calculate statistics
  const stats = {
    total: donations.length,
    available: donations.filter(d => d.status === 'available').length,
    reserved: donations.filter(d => d.status === 'reserved').length,
    delivered: donations.filter(d => d.status === 'delivered').length
  }

  if (isLoading) {
    return <DonationsLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <p>Error loading donations. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Donations</h1>
        <p className="text-muted-foreground">Track and manage your medication donations</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Package2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.available}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reserved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <Truck className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <div className="grid gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search donations..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="expiringSoon">Expiring Soon</SelectItem>
                <SelectItem value="quantityHigh">Quantity: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grid View
            </TabsTrigger>
            <TabsTrigger value="list">
              <ListIcon className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">
            Showing {donations.length} donations
          </p>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {donations.map((donation) => (
              <Card key={donation.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  {donation.documents?.images?.[0] ? (
                    <img
                      src={donation.documents.images[0]}
                      alt={donation.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package2 className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  <Badge 
                    className={`absolute top-2 right-2 border ${getStatusColor(donation.status)}`}
                  >
                    {donation.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{donation.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{donation.category}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Package2 className="h-4 w-4 text-muted-foreground" />
                      <span>{donation.quantity} {donation.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Added: {donation.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.location.href = `/donations/${donation.id}`}
                  >
                    View Details
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card>
            <div className="rounded-lg border">
              <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                <div className="col-span-2">Medication</div>
                <div>Status</div>
                <div>Quantity</div>
                <div>Added Date</div>
                <div>Expiry Date</div>
                <div>Action</div>
              </div>
              {donations.map((donation) => (
                <div key={donation.id} className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                  <div className="col-span-2">
                    <div className="font-medium">{donation.name}</div>
                    <div className="text-sm text-muted-foreground">{donation.category}</div>
                  </div>
                  <div>
                    <Badge className={`border ${getStatusColor(donation.status)}`}>
                      <span className="flex items-center gap-1">
                        {React.createElement(getStatusIcon(donation.status), { className: "h-3 w-3" })}
                        {donation.status}
                      </span>
                    </Badge>
                  </div>
                  <div>{donation.quantity} {donation.unit}</div>
                  <div>{donation.createdAt.toLocaleDateString()}</div>
                  <div>{donation.expiryDate.toLocaleDateString()}</div>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.href = `/donations/${donation.id}`}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 