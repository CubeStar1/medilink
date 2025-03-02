"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Activity {
  id: string
  title: string
  description: string
  value?: string
  type: "delivery" | "shipment" | "expiry" | "processing"
  timestamp: string
}

async function fetchActivities() {
  const response = await axios.get<Activity[]>('/api/dashboard/donor/activities')
  return response.data
}

const getActivityIcon = (type: Activity["type"]) => {
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

const formatTimeAgo = (timestamp: string) => {
  const now = new Date()
  const date = new Date(timestamp)
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  return 'Just now'
}

export function RecentActivity() {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: fetchActivities,
    refetchInterval: 30000 // Refetch every 30 seconds
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Loading activities...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="h-5 w-5 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Recent updates to your donations and requests
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              {getActivityIcon(activity.type)}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  {activity.value && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {activity.value}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 