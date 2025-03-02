"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package2, Calendar, Thermometer, LayoutGrid, List } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import type { Medication } from "@/lib/types/schema"

interface AvailableMedicationsProps {
  medications?: Medication[]
}

async function fetchAvailableMedications() {
  const response = await axios.get<{ data: Medication[] }>('/api/medications/list', {
    params: { status: 'available' }
  })
  return response.data.data.slice(0, 4)
}

function getStatusColor(status: Medication['status']) {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'reserved':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'delivered':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export function AvailableMedications({ medications: initialMedications }: AvailableMedicationsProps) {
  const [view, setView] = useState<"grid" | "list">("grid")
  const { data: medications = initialMedications } = useQuery({
    queryKey: ['available-medications'],
    queryFn: fetchAvailableMedications,
    initialData: initialMedications,
    refetchInterval: 30000
  })

  if (!medications?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Available Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No available medications found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Available Medications</CardTitle>
        <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as "grid" | "list")}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        {view === "grid" ? (
          <div className="grid gap-4 grid-cols-2">
            {medications.map((medication) => (
              <Link 
                key={medication.id} 
                href={`/requests/create/${medication.id}`}
                className="block"
              >
                <div className="overflow-hidden rounded-lg border">
                  <div className="aspect-[4/3] relative bg-muted">
                    <img
                      src="https://placehold.co/400x300"
                      alt={medication.name}
                      className="object-cover w-full h-full"
                    />
                    <Badge className={`absolute top-2 right-2 ${getStatusColor(medication.status)}`}>
                      {medication.status}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="font-medium line-clamp-1">{medication.name}</h3>
                      <p className="text-sm text-muted-foreground">{medication.category}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Package2 className="h-4 w-4 text-muted-foreground" />
                        <span>{medication.quantity} {medication.unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Expires {new Date(medication.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-muted-foreground" />
                        <span>{medication.storageTemp}°C</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {medications.map((medication) => (
              <Link 
                key={medication.id} 
                href={`/requests/create/${medication.id}`}
                className="block"
              >
                <div className="flex items-start justify-between space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{medication.name}</p>
                    <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Package2 className="h-4 w-4" />
                        <span>{medication.quantity} {medication.unit}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Expires {new Date(medication.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-4 w-4" />
                        <span>{medication.storageTemp}°C</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(medication.status)}>
                    {medication.status}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 