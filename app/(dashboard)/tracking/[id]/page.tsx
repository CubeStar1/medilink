"use client"

import { Timeline } from "@/components/tracking/timeline"
import { Documents } from "@/components/tracking/documents"
import { MapView } from "@/components/tracking/map-view"
import { TemperatureMonitor } from "@/components/tracking/temperature-monitor"
import { Handler } from "@/components/tracking/handler"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package2, Truck, ThermometerSun } from "lucide-react"
import { use } from 'react'


// Temporary data for demonstration
const trackingData = {
  id: "TRK-2024-001",
  status: "In Transit",
  estimatedDelivery: "2024-03-20",
  currentTemp: "15°C",
  medication: {
    name: "Amoxicillin 500mg",
    quantity: "5000 units",
    donor: "Red Cross",
    recipient: "Local Hospital",
  },
  timeline: [
    {
      status: "Picked Up",
      location: "Red Cross Warehouse",
      timestamp: "2024-03-15 09:00",
      handler: "John Smith",
      temperature: "18°C",
      notes: "Package collected in good condition",
    },
    {
      status: "In Transit",
      location: "Distribution Center",
      timestamp: "2024-03-15 14:30",
      handler: "Logistics Team A",
      temperature: "15°C",
      notes: "Temperature checks completed",
    },
    {
      status: "Quality Check",
      location: "Regional Hub",
      timestamp: "2024-03-16 10:15",
      handler: "Quality Control",
      temperature: "16°C",
      notes: "All parameters within acceptable range",
    },
  ],
  documents: [
    { name: "Shipping Label", type: "PDF" },
    { name: "Quality Certificate", type: "PDF" },
    { name: "Customs Declaration", type: "PDF" },
  ],
}

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
    case 'issue':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

const trackingEvents = [
  {
    status: "Picked Up",
    location: "Donor Warehouse",
    timestamp: "2024-03-20T10:00:00",
    handler: "John Doe",
    temperature: "2.5°C",
    notes: "Medication collected from donor facility"
  },
  {
    status: "In Transit",
    location: "City Highway",
    timestamp: "2024-03-20T11:30:00",
    handler: "Mike Smith",
    temperature: "2.8°C",
    notes: "En route to distribution center"
  },
  {
    status: "Arrived",
    location: "Distribution Center",
    timestamp: "2024-03-20T13:00:00",
    handler: "Sarah Johnson",
    temperature: "2.6°C",
    notes: "Arrived at main distribution hub"
  }
]

const documents = [
  { name: "Shipping Manifest", type: "pdf" },
  { name: "Quality Certificate", type: "pdf" },
  { name: "Temperature Log", type: "csv" }
]

const currentLocation = {
  lat: 12.9716,
  lng: 77.5946,
  name: "Distribution Center",
  timestamp: "2024-03-20T13:00:00"
}

const checkpoints = [
  {
    lat: 12.9716,
    lng: 77.5946,
    name: "Donor Warehouse",
    timestamp: "2024-03-20T10:00:00"
  },
  {
    lat: 12.9816,
    lng: 77.5846,
    name: "Distribution Center",
    timestamp: "2024-03-20T13:00:00"
  }
]

const temperatureReadings = [
  { timestamp: "2024-03-20T10:00:00", temperature: 2.5 },
  { timestamp: "2024-03-20T11:00:00", temperature: 2.7 },
  { timestamp: "2024-03-20T12:00:00", temperature: 2.8 },
  { timestamp: "2024-03-20T13:00:00", temperature: 2.6 }
]

const currentHandler = {
  name: "Sarah Johnson",
  organization: "MedLogistics Inc.",
  phone: "+1 (555) 123-4567",
  email: "sarah.j@medlogistics.com",
  role: "Distribution Manager",
  since: "2024-03-20T13:00:00"
}

export default function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tracking Details</h2>
          <p className="text-muted-foreground">Track your medication delivery in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">ID: {id}</p>
          <Badge className={getStatusColor(trackingData.status)}>
            {trackingData.status}
          </Badge>
        </div>
      </div>

      <Card className="mt-2">
        <CardHeader className="py-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package2 className="h-5 w-5" />
            Tracking Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 pb-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm font-medium">Tracking ID</p>
              <p className="text-2xl font-bold">{trackingData.id}</p>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <ThermometerSun className="h-4 w-4 text-muted-foreground" />
              <span>Current Temperature: {trackingData.currentTemp}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>Estimated Delivery: {trackingData.estimatedDelivery}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="overview" className="relative px-4 w-full">Overview</TabsTrigger>
          <TabsTrigger value="map" className="relative px-4 w-full">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Handler handler={currentHandler} />
            <Documents documents={documents} />
            <div className="md:col-span-2">
              <Timeline events={trackingEvents} />
            </div>
            <div className="md:col-span-2">
              <TemperatureMonitor
                currentTemp="2.6°C"
                minThreshold={2.0}
                maxThreshold={8.0}
                readings={temperatureReadings}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-4 space-y-4">
          <div className="grid gap-4">
            <MapView currentLocation={currentLocation} checkpoints={checkpoints} />
            <div className="grid gap-4 md:grid-cols-2">
              <Handler handler={currentHandler} />
              <Documents documents={documents} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 