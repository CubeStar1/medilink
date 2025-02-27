import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface Location {
  lat: number
  lng: number
  name: string
  timestamp: string
}

interface MapViewProps {
  currentLocation: Location
  checkpoints: Location[]
}

export function MapView({ currentLocation, checkpoints }: MapViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/9] bg-muted rounded-lg">
          {/* Map integration will go here */}
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Map integration coming soon</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Current Location:</span>
            </div>
            <span className="text-sm">{currentLocation.name}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {currentLocation.timestamp}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 