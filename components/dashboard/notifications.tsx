"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, Truck, AlertTriangle } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: "success" | "info" | "warning"
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Delivery Confirmed",
    message: "Antibiotics shipment #1234 has been delivered to Red Cross NGO",
    time: "2 hours ago",
    type: "success",
    read: false
  },
  {
    id: "2",
    title: "Shipment Update",
    message: "Pain Medication #5678 is in transit to Doctors Without Borders",
    time: "5 hours ago",
    type: "info",
    read: false
  },
  {
    id: "3",
    title: "Expiry Alert",
    message: "Batch #9012 will expire in 30 days. Consider expedited shipping.",
    time: "1 day ago",
    type: "warning",
    read: true
  }
]

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "info":
      return <Truck className="h-5 w-5 text-blue-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
  }
}

export function Notifications() {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                {unreadCount} new
              </span>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-4 rounded-lg border p-4 ${
                notification.read ? 'bg-background' : 'bg-muted'
              }`}
            >
              {getIcon(notification.type)}
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 