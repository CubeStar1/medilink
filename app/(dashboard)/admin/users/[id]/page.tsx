"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  User,
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  Shield,
  AlertCircle,
  Ban,
  History,
  Lock,
  Key
} from "lucide-react"
import Link from "next/link"

// Temporary data for demonstration
const userData = {
  id: "USR-2024-001",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  role: "NGO Admin",
  organization: "Global Health Initiative",
  status: "Active",
  verified: true,
  joinedAt: "2024-01-15T09:00:00",
  lastActive: "2024-03-15T14:30:00",
  permissions: [
    "Manage Requests",
    "View Inventory",
    "Create Reports",
    "Manage Staff",
  ],
  activityLog: [
    {
      action: "Login",
      timestamp: "2024-03-15T14:30:00",
      details: "Logged in from Chrome/Windows",
      ip: "192.168.1.1"
    },
    {
      action: "Created Request",
      timestamp: "2024-03-15T12:15:00",
      details: "Created medication request #REQ-2024-015",
      ip: "192.168.1.1"
    },
    {
      action: "Updated Profile",
      timestamp: "2024-03-14T16:45:00",
      details: "Updated contact information",
      ip: "192.168.1.1"
    },
    {
      action: "Password Changed",
      timestamp: "2024-03-10T10:30:00",
      details: "Changed account password",
      ip: "192.168.1.1"
    }
  ],
  securityLog: [
    {
      event: "Password Changed",
      timestamp: "2024-03-10T10:30:00",
      status: "Success",
      location: "New York, USA"
    },
    {
      event: "Failed Login Attempt",
      timestamp: "2024-03-09T15:20:00",
      status: "Failed",
      location: "Unknown"
    },
    {
      event: "Two-Factor Authentication Enabled",
      timestamp: "2024-03-08T11:00:00",
      status: "Success",
      location: "New York, USA"
    }
  ]
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    case 'inactive':
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    case 'suspended':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

const getEventStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'success':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'failed':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    case 'warning':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

export default function UserDetailsPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
          <p className="text-muted-foreground">View and manage user account</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Key className="h-4 w-4" />
            Reset Password
          </Button>
          <Button variant="destructive" className="gap-2">
            <Ban className="h-4 w-4" />
            Suspend Account
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>User's basic information and role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{userData.name}</p>
                <p className="text-sm text-muted-foreground">Full Name</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{userData.email}</p>
                <p className="text-sm text-muted-foreground">Email Address</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{userData.phone}</p>
                <p className="text-sm text-muted-foreground">Phone Number</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{userData.organization}</p>
                <p className="text-sm text-muted-foreground">Organization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Current account status and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{userData.role}</p>
                  {userData.verified && (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Account Role</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <div>
                <Badge className={getStatusColor(userData.status)}>
                  {userData.status}
                </Badge>
                <p className="text-sm text-muted-foreground">Account Status</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {new Date(userData.joinedAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">Join Date</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <History className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {new Date(userData.lastActive).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Last Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="permissions">
        <TabsList>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="permissions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Manage user's access and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <p className="font-medium">{permission}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Revoke
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Add Permission
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Recent account activity and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.activityLog.map((activity, index) => (
                  <div key={index} className="flex gap-4 pb-4 last:pb-0 relative">
                    <div className="w-[2px] bg-border absolute top-8 bottom-0 left-[11px]" />
                    <div className="h-6 w-6 rounded-full bg-muted mt-1.5" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{activity.action}</p>
                        <span className="text-sm text-muted-foreground">
                          • {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{activity.details}</p>
                      <p className="text-sm text-muted-foreground">IP: {activity.ip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>Account security and authentication events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.securityLog.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{event.event}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{new Date(event.timestamp).toLocaleString()}</span>
                          <span>•</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getEventStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 