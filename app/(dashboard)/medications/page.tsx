"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Pill, Thermometer, Calendar, Package2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Temporary data for demonstration
const medications = [
  {
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
  {
    id: 2,
    name: "Paracetamol 650mg",
    category: "Pain Relief",
    quantity: 10000,
    unit: "tablets",
    expiryDate: "2025-08-20",
    temperature: "Room Temperature",
    ngo: "Doctors Without Borders",
    status: "Limited",
    image: "https://placehold.co/400x300",
  },
  {
    id: 3,
    name: "First Aid Kit",
    category: "First Aid",
    quantity: 200,
    unit: "kits",
    expiryDate: "2026-01-10",
    temperature: "Room Temperature",
    ngo: "WHO",
    status: "Available",
    image: "https://placehold.co/400x300",
  },
]

export default function MedicationsPage() {
  const router = useRouter()

  const handleRequestClick = (medicationId: number) => {
    router.push(`/requests/${medicationId}`)
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Medications</h1>
          <p className="text-muted-foreground">Browse and request available medications for donation.</p>
        </div>
        <Link href="/medications/add">
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Medication
          </Button>
        </Link>
      </div>

      {/* Filters Section */}
      <div className="grid gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search medications..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="antibiotics">Antibiotics</SelectItem>
                <SelectItem value="painRelief">Pain Relief</SelectItem>
                <SelectItem value="firstAid">First Aid</SelectItem>
                <SelectItem value="vaccines">Vaccines</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Most Recent</SelectItem>
                <SelectItem value="expiringSoon">Expiring Soon</SelectItem>
                <SelectItem value="quantityHigh">Quantity: High to Low</SelectItem>
                <SelectItem value="quantityLow">Quantity: Low to High</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="cursor-pointer">
            Available Now
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            Expiring Soon
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            Cold Storage
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            Room Temperature
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
            Showing {medications.length} medications
          </p>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {medications.map((medication) => (
              <Card key={medication.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={medication.image}
                    alt={medication.name}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-2 right-2" variant={medication.status === "Available" ? "default" : "secondary"}>
                    {medication.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{medication.name}</CardTitle>
                  <CardDescription>{medication.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Package2 className="h-4 w-4 text-muted-foreground" />
                      <span>{medication.quantity} {medication.unit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Exp: {new Date(medication.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span>{medication.temperature}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Pill className="h-4 w-4 text-muted-foreground" />
                      <span>{medication.ngo}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleRequestClick(medication.id)}
                  >
                    Request Medication
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <div className="rounded-lg border">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
              <div className="col-span-2">Medication</div>
              <div>Quantity</div>
              <div>Expiry Date</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            {medications.map((medication) => (
              <div key={medication.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-muted/50">
                <div className="col-span-2">
                  <div className="font-medium">{medication.name}</div>
                  <div className="text-sm text-muted-foreground">{medication.category}</div>
                </div>
                <div>{medication.quantity} {medication.unit}</div>
                <div>{new Date(medication.expiryDate).toLocaleDateString()}</div>
                <div>
                  <Badge variant={medication.status === "Available" ? "default" : "secondary"}>
                    {medication.status}
                  </Badge>
                </div>
                <div>
                  <Button 
                    size="sm"
                    onClick={() => handleRequestClick(medication.id)}
                  >
                    Request
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 