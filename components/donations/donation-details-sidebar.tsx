"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package2, Calendar, ThermometerIcon, ClockIcon } from "lucide-react"

interface DonationDetailsSidebarProps {
  quantity: number
  unit: string
  expiryDate: Date
  storageTemp: number
  createdAt: Date
}

export function DonationDetailsSidebar({
  quantity,
  unit,
  expiryDate,
  storageTemp,
  createdAt
}: DonationDetailsSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Package2 className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Quantity</p>
            <p className="text-sm text-muted-foreground">
              {quantity} {unit}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Expiry Date</p>
            <p className="text-sm text-muted-foreground">
              {new Date(expiryDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Storage Temperature</p>
            <p className="text-sm text-muted-foreground">
              {storageTemp}°C
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Listed On</p>
            <p className="text-sm text-muted-foreground">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 