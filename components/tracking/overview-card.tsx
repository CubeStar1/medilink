import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package2, Truck, ThermometerSun } from "lucide-react"
import { getStatusColor } from "@/lib/utils"

interface TrackingOverviewProps {
  id: string
  status: string
  estimatedDelivery: string
  currentTemp: string
}

export function TrackingOverview({ id, status, estimatedDelivery, currentTemp }: TrackingOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package2 className="h-5 w-5" />
          Tracking Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium">Tracking ID</p>
            <p className="text-2xl font-bold">{id}</p>
          </div>
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <ThermometerSun className="h-4 w-4 text-muted-foreground" />
            <span>Current Temperature: {currentTemp}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span>Estimated Delivery: {estimatedDelivery}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 