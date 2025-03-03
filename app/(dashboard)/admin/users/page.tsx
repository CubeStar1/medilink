"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
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
import { Search, Filter, MoreVertical, Loader2, XCircle } from "lucide-react"
import Link from "next/link"
import type { UserProfile } from "@/lib/types/schema"
import { getAccountStatusColor } from "@/lib/utils"

interface User extends Pick<UserProfile, 'email' | 'role' | 'status' | 'isVerified'> {
  id: string;
  displayName: string | null;
  organization: string | null;
  lastActive: string | null;
}

// Function to fetch users with filters
async function fetchUsers({ role, status, search }: { 
  role?: string; 
  status?: string; 
  search?: string 
}) {
  const params = new URLSearchParams()
  if (role && role !== 'all') params.append('role', role)
  if (status && status !== 'all') params.append('status', status)
  if (search) params.append('search', search)

  const { data } = await axios.get<User[]>(`/api/admin/users?${params}`)
  return data
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Fetch users using React Query
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users', roleFilter, statusFilter, searchQuery],
    queryFn: () => fetchUsers({ 
      role: roleFilter, 
      status: statusFilter, 
      search: searchQuery 
    })
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    refetch()
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <XCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold">Error loading users</h1>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

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
          <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="donor">Donor</SelectItem>
                <SelectItem value="ngo">NGO</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Search</Button>
          </form>

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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.displayName || 'N/A'}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{user.organization || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.role}
                          {user.isVerified && (
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getAccountStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never'}
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/users/${user.id}`}>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 