"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

interface ActivityItem {
  title: string
  description: string
  value: string
  type: "delivery" | "shipment" | "expiry" | "processing"
  timestamp: string
}

const activities: ActivityItem[] = [
  {
    title: "Antibiotics Shipment #1234",
    description: "Delivered to Red Cross NGO",
    value: "+$1,999.00",
    type: "delivery",
    timestamp: "2 hours ago"
  },
  {
    title: "Pain Medication #5678",
    description: "In transit to Doctors Without Borders",
    value: "+$39.00",
    type: "shipment",
    timestamp: "5 hours ago"
  },
  {
    title: "Vaccine Batch #4532",
    description: "Expiring in 30 days",
    value: "$12,500.00",
    type: "expiry",
    timestamp: "1 day ago"
  },
  {
    title: "First Aid Supplies #7890",
    description: "Processing for WHO",
    value: "+$750.00",
    type: "processing",
    timestamp: "2 days ago"
  }
]

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "delivery":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "shipment":
      return <Truck className="h-5 w-5 text-blue-500" />
    case "expiry":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    case "processing":
      return <Package className="h-5 w-5 text-purple-500" />
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              You have made {activities.length} donations this month
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              {getActivityIcon(activity.type)}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {activity.value}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 