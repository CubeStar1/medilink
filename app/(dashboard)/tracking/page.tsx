"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Package2, Calendar, ArrowUpRight, Building2, ThermometerSun, Truck } from "lucide-react"
import Link from "next/link"

// Temporary data for demonstration
const trackingItems = [
  {
    id: "TRK-2024-001",
    medication: {
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      quantity: "5000 units",
      image: "https://placehold.co/400x300",
    },
    status: "In Transit",
    currentLocation: "City Highway",
    estimatedDelivery: "2024-03-20",
    currentTemp: "15°C",
    lastUpdated: "2024-03-15 14:30",
    handler: {
      name: "Mike Smith",
      organization: "MedLogistics Inc."
    }
  },
  {
    id: "TRK-2024-002",
    medication: {
      name: "Insulin",
      category: "Diabetes",
      quantity: "200 vials",
      image: "https://placehold.co/400x300",
    },
    status: "Quality Check",
    currentLocation: "Distribution Center",
    estimatedDelivery: "2024-03-21",
    currentTemp: "2.5°C",
    lastUpdated: "2024-03-15 16:45",
    handler: {
      name: "Sarah Johnson",
      organization: "ColdChain Solutions"
    }
  },
  {
    id: "TRK-2024-003",
    medication: {
      name: "First Aid Kits",
      category: "Emergency",
      quantity: "100 kits",
      image: "https://placehold.co/400x300",
    },
    status: "Picked Up",
    currentLocation: "Regional Hub",
    estimatedDelivery: "2024-03-22",
    currentTemp: "18°C",
    lastUpdated: "2024-03-15 09:15",
    handler: {
      name: "John Doe",
      organization: "Red Cross"
    }
  }
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'in transit':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'picked up':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'quality check':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

export default function TrackingPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medication Tracking</h1>
          <p className="text-muted-foreground">Track all medications in transit</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by tracking ID or medication..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="inTransit">In Transit</SelectItem>
                <SelectItem value="pickedUp">Picked Up</SelectItem>
                <SelectItem value="qualityCheck">Quality Check</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="delivery">Delivery Date</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="cursor-pointer">
            In Transit
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            Quality Check
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            Temperature Alert
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
            Showing {trackingItems.length} items
          </p>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trackingItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={item.medication.image}
                    alt={item.medication.name}
                    className="object-cover w-full h-full"
                  />
                  <Badge className={`absolute top-2 right-2 ${getStatusColor(item.status)}`}>
                    {item.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{item.medication.name}</CardTitle>
                  <CardDescription>{item.medication.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Package2 className="h-4 w-4 text-muted-foreground" />
                      <span>{item.medication.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>{item.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThermometerSun className="h-4 w-4 text-muted-foreground" />
                      <span>{item.currentTemp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Delivery: {item.estimatedDelivery}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground w-full">
                    <Building2 className="h-4 w-4" />
                    <span>{item.handler.name} - {item.handler.organization}</span>
                  </div>
                  <Link href={`/tracking/${item.id}`} className="w-full">
                    <Button className="w-full">
                      Track Shipment
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
              <div>Status</div>
              <div>Location</div>
              <div>Temperature</div>
              <div>Delivery</div>
              <div>Action</div>
            </div>
            {trackingItems.map((item) => (
              <div key={item.id} className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                <div className="col-span-2">
                  <div className="font-medium">{item.medication.name}</div>
                  <div className="text-sm text-muted-foreground">{item.medication.category}</div>
                </div>
                <div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <div className="text-sm">{item.currentLocation}</div>
                <div className="text-sm">{item.currentTemp}</div>
                <div className="text-sm">{item.estimatedDelivery}</div>
                <div>
                  <Link href={`/tracking/${item.id}`}>
                    <Button size="sm">
                      Track
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