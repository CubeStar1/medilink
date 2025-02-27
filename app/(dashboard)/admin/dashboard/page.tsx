"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { 
  AlertCircle, 
  Users, 
  Building2, 
  Package2, 
  Bell, 
  ShieldCheck, 
  Activity,
  ArrowUpRight
} from "lucide-react"
import Link from "next/link"

// Temporary data for demonstration
const systemStats = {
  totalUsers: 1250,
  activeUsers: 890,
  pendingVerifications: 45,
  activeDeliveries: 128,
  systemUptime: "99.9%",
  activeAlerts: 3,
}

const recentAlerts = [
  {
    id: 1,
    type: "Temperature",
    message: "Temperature deviation detected in delivery TRK-2024-002",
    severity: "high",
    timestamp: "2024-03-15T14:30:00",
  },
  {
    id: 2,
    type: "Verification",
    message: "New NGO verification request pending review",
    severity: "medium",
    timestamp: "2024-03-15T13:15:00",
  },
  {
    id: 3,
    type: "System",
    message: "Database backup completed successfully",
    severity: "low",
    timestamp: "2024-03-15T12:00:00",
  },
]

const pendingVerifications = [
  {
    id: "VER-2024-001",
    name: "Global Health Initiative",
    type: "NGO",
    status: "Pending",
    documents: 5,
    submittedAt: "2024-03-14T09:00:00",
  },
  {
    id: "VER-2024-002",
    name: "MedPharm Solutions",
    type: "Donor",
    status: "Under Review",
    documents: 7,
    submittedAt: "2024-03-14T11:30:00",
  },
]

const getAlertColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'high':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'low':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {systemStats.activeUsers} active now
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.pendingVerifications}</div>
            <p className="text-xs text-muted-foreground">
              Requires review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
            <Package2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeDeliveries}</div>
            <p className="text-xs text-muted-foreground">
              In transit
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Recent alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <Alert key={alert.id} className={getAlertColor(alert.severity)}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="flex items-center gap-2">
                  {alert.type}
                  <span className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
            <CardDescription>Organizations awaiting verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingVerifications.map((verification) => (
              <div key={verification.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{verification.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>{verification.type}</span>
                  </div>
                </div>
                <Link href={`/admin/verification/${verification.id}`}>
                  <Button size="sm" variant="outline">
                    Review
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
            <Link href="/admin/verification" className="block">
              <Button className="w-full" variant="outline">
                View All Verifications
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system metrics and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">System Uptime</p>
                  <p className="text-2xl font-bold">{systemStats.systemUptime}</p>
                </div>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Active Alerts</p>
                  <p className="text-2xl font-bold">{systemStats.activeAlerts}</p>
                </div>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/users">
              <Button className="w-full" variant="outline">
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/verification">
              <Button className="w-full" variant="outline">
                Review Verifications
              </Button>
            </Link>
            <Button className="w-full" variant="outline">
              System Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 