"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List as ListIcon,
  Package2, 
  Calendar,
  Building2,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Truck,
  Users
} from "lucide-react"

// Temporary data for demonstration
const donations = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    quantity: 5000,
    unit: "tablets",
    expiryDate: "2025-06-15",
    addedDate: "2024-03-10",
    status: "Delivered",
    recipient: "Doctors Without Borders",
    location: "Ethiopia",
    image: "https://placehold.co/400x300",
    deliveryDate: "2024-03-15",
    trackingNumber: "TRK123456789"
  },
  {
    id: 2,
    name: "Paracetamol 650mg",
    category: "Pain Relief",
    quantity: 10000,
    unit: "tablets",
    expiryDate: "2025-08-20",
    addedDate: "2024-03-08",
    status: "In Transit",
    recipient: "Red Cross",
    location: "Sudan",
    image: "https://placehold.co/400x300",
    deliveryDate: null,
    trackingNumber: "TRK987654321"
  },
  {
    id: 3,
    name: "First Aid Kit",
    category: "First Aid",
    quantity: 200,
    unit: "kits",
    expiryDate: "2026-01-10",
    addedDate: "2024-03-05",
    status: "Pending",
    recipient: null,
    location: null,
    image: "https://placehold.co/400x300",
    deliveryDate: null,
    trackingNumber: null
  },
  {
    id: 4,
    name: "Insulin",
    category: "Diabetes",
    quantity: 1000,
    unit: "vials",
    expiryDate: "2024-12-25",
    addedDate: "2024-03-01",
    status: "Rejected",
    recipient: "WHO",
    location: "Yemen",
    image: "https://placehold.co/400x300",
    deliveryDate: null,
    trackingNumber: null,
    rejectionReason: "Storage temperature requirements not met"
  }
]

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

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return CheckCircle2
    case 'in transit':
      return Truck
    case 'pending':
      return Clock
    case 'rejected':
      return XCircle
    default:
      return AlertCircle
  }
}

export default function DonationsPage() {
  // Calculate statistics
  const stats = {
    total: donations.length,
    delivered: donations.filter(d => d.status === 'Delivered').length,
    inTransit: donations.filter(d => d.status === 'In Transit').length,
    pending: donations.filter(d => d.status === 'Pending').length
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
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inTransit}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
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
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="inTransit">In Transit</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Most Recent</SelectItem>
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
                <div className="aspect-video relative">
                  <img
                    src={donation.image}
                    alt={donation.name}
                    className="object-cover w-full h-full"
                  />
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
                      <span>Added: {new Date(donation.addedDate).toLocaleDateString()}</span>
                    </div>
                    {donation.recipient && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{donation.recipient}</span>
                      </div>
                    )}
                    {donation.location && (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{donation.location}</span>
                      </div>
                    )}
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
              <div className="grid grid-cols-8 gap-4 p-4 font-medium border-b">
                <div className="col-span-2">Medication</div>
                <div>Status</div>
                <div>Quantity</div>
                <div>Added Date</div>
                <div>Recipient</div>
                <div>Location</div>
                <div>Action</div>
              </div>
              {donations.map((donation) => (
                <div key={donation.id} className="grid grid-cols-8 gap-4 p-4 items-center hover:bg-muted/50">
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
                  <div>{new Date(donation.addedDate).toLocaleDateString()}</div>
                  <div>{donation.recipient || "-"}</div>
                  <div>{donation.location || "-"}</div>
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