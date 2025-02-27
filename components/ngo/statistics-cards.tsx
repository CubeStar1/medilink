import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Truck, Pill, HeartPulse } from "lucide-react"

interface StatsData {
  activeRequests: number
  pendingDeliveries: number
  medicationsReceived: number
  peopleHelped: number
}

interface StatisticsCardsProps {
  stats: StatsData
}

export function StatisticsCards({ stats }: StatisticsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeRequests}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
          <Truck className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingDeliveries}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Medications Received</CardTitle>
          <Pill className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.medicationsReceived}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">People Helped</CardTitle>
          <HeartPulse className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.peopleHelped}</div>
        </CardContent>
      </Card>
    </div>
  )
} 