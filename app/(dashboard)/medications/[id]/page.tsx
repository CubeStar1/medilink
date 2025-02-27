"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Package2, Pill, ThermometerIcon, ClockIcon, Building2, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

// Temporary data - Replace with API call
const getMedicationDetails = (id: string) => ({
  id,
  name: "Amoxicillin 500mg",
  category: "Antibiotics",
  quantity: 5000,
  unit: "tablets",
  expiryDate: "2025-06-15",
  temperature: "Room Temperature",
  ngo: "Red Cross",
  status: "Available",
  image: "https://placehold.co/800x400",
  description: "Broad-spectrum antibiotic used to treat various bacterial infections.",
  composition: "Amoxicillin trihydrate equivalent to amoxicillin 500mg",
  batchNumber: "AMX2024001",
  manufacturer: "PharmaCorp Ltd.",
  warnings: [
    "Keep out of reach of children",
    "Store below 25°C",
    "Protect from light and moisture"
  ]
})

export default function MedicationDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const medication = getMedicationDetails(params.id)

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-6">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{medication.name}</h1>
            <p className="text-muted-foreground">{medication.category}</p>
          </div>
          <Badge variant={medication.status === "Available" ? "default" : "secondary"} className="text-base px-4 py-1">
            {medication.status}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="aspect-video relative">
                <img
                  src={medication.image}
                  alt={medication.name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <CardDescription>{medication.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Composition</h3>
                  <p className="text-sm text-muted-foreground">{medication.composition}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Warnings and Storage Instructions
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {medication.warnings.map((warning, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="select-none">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medication Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Package2 className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Quantity Available</p>
                      <p className="font-medium">{medication.quantity} {medication.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{new Date(medication.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Storage Temperature</p>
                      <p className="font-medium">{medication.temperature}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Batch Number</p>
                      <p className="font-medium">{medication.batchNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Manufacturer</p>
                      <p className="font-medium">{medication.manufacturer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Donating NGO</p>
                      <p className="font-medium">{medication.ngo}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => router.push(`/medications/${params.id}/request`)}
                >
                  Request Medication
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 