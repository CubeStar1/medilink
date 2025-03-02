"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package2, Truck, CheckCircle2, Users } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface DashboardStats {
  activeRequests: number
  pendingDeliveries: number
  medicationsReceived: number
  peopleHelped: number
}

interface StatisticsCardsProps {
  stats?: DashboardStats
}

async function fetchDashboardStats() {
  const response = await axios.get<DashboardStats>('/api/dashboard/ngo/stats')
  return response.data
}

export function StatisticsCards({ stats: initialStats }: StatisticsCardsProps) {
  const { data: stats = initialStats } = useQuery({
    queryKey: ['ngo-dashboard-stats'],
    queryFn: fetchDashboardStats,
    initialData: initialStats,
    refetchInterval: 30000 // Refetch every 30 seconds
  })

  const cards = [
    {
      title: "Active Requests",
      value: stats?.activeRequests ?? 0,
      icon: <Package2 className="h-4 w-4 text-muted-foreground" />,
      description: "Pending and approved requests"
    },
    {
      title: "Pending Deliveries",
      value: stats?.pendingDeliveries ?? 0,
      icon: <Truck className="h-4 w-4 text-muted-foreground" />,
      description: "Medications in transit"
    },
    {
      title: "Medications Received",
      value: stats?.medicationsReceived ?? 0,
      icon: <CheckCircle2 className="h-4 w-4 text-muted-foreground" />,
      description: "Successfully delivered"
    },
    {
      title: "People Helped",
      value: stats?.peopleHelped ?? 0,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      description: "Estimated impact"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 