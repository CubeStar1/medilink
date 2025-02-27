import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, ThermometerSun } from "lucide-react"
import { getStatusColor } from "@/lib/utils"

interface TimelineEvent {
  status: string
  location: string
  timestamp: string
  handler: string
  temperature: string
  notes?: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracking Timeline</CardTitle>
        <CardDescription>Real-time updates on your medication&apos;s journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-blue-500" : "bg-gray-300"}`} />
                {index !== events.length - 1 && (
                  <div className="absolute top-3 left-1.5 w-px h-full bg-gray-200" />
                )}
              </div>
              <div className="flex-1 bg-muted rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                    <p className="mt-1 font-medium">{event.location}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{event.timestamp}</span>
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>Handler: {event.handler}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThermometerSun className="h-4 w-4 text-muted-foreground" />
                    <span>Temperature: {event.temperature}</span>
                  </div>
                  {event.notes && (
                    <p className="text-muted-foreground">{event.notes}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 