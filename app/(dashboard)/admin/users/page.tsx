"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreVertical } from "lucide-react"
import Link from "next/link"

// Temporary data for demonstration
const users = [
  {
    id: "USR-2024-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "NGO Admin",
    organization: "Global Health Initiative",
    status: "Active",
    lastActive: "2024-03-15T14:30:00",
    verified: true,
  },
  {
    id: "USR-2024-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Donor",
    organization: "MedPharm Solutions",
    status: "Pending",
    lastActive: "2024-03-14T09:15:00",
    verified: false,
  },
  {
    id: "USR-2024-003",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    role: "NGO Staff",
    organization: "Global Health Initiative",
    status: "Active",
    lastActive: "2024-03-15T11:45:00",
    verified: true,
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    case 'inactive':
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage and monitor user accounts</p>
        </div>
        <Button>Add User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>A list of all users in the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ngo-admin">NGO Admin</SelectItem>
                <SelectItem value="ngo-staff">NGO Staff</SelectItem>
                <SelectItem value="donor">Donor</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{user.organization}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.role}
                        {user.verified && (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.lastActive).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/users/${user.id}`}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 