"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  Package,
  Truck,
  CheckCircle2
} from "lucide-react"

interface StatisticCard {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}

const statistics: StatisticCard[] = [
  {
    title: "Total Donations",
    value: "2,543",
    change: "+20.1% from last month",
    icon: <Package className="h-4 w-4 text-muted-foreground" />
  },
  {
    title: "Active Shipments",
    value: "124",
    change: "+12 new today",
    icon: <Truck className="h-4 w-4 text-muted-foreground" />
  },
  {
    title: "Completed Deliveries",
    value: "2,350",
    change: "+180 this month",
    icon: <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
  },
  {
    title: "Impact Value",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />
  }
]

export function StatisticsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statistics.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 