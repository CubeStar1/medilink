"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VerificationFilter } from "@/components/admin/verification/verification-filter"
import { VerificationList } from "@/components/admin/verification/verification-list"
import type { UserProfile } from "@/lib/types/schema"

interface VerificationRequest {
  id: string
  userId: string
  user: Pick<UserProfile, 'email' | 'role' | 'displayName' | 'organization' | 'donorOrganization'>
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  documents: string[]
  notes?: string
}

// Function to fetch verification requests with filters
async function fetchVerificationRequests({ 
  role, 
  status, 
  search 
}: { 
  role?: string
  status?: string
  search?: string 
}) {
  const params = new URLSearchParams()
  if (role && role !== 'all') params.append('role', role)
  if (status && status !== 'all') params.append('status', status)
  if (search) params.append('search', search)

  const { data } = await axios.get<VerificationRequest[]>(`/api/admin/verification?${params}`)
  return data
}

export default function VerificationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Fetch verification requests using React Query
  const { data: requests = [], isLoading, error, refetch } = useQuery({
    queryKey: ['verification-requests', roleFilter, statusFilter, searchQuery],
    queryFn: () => fetchVerificationRequests({ 
      role: roleFilter, 
      status: statusFilter, 
      search: searchQuery 
    })
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verification Requests</h1>
          <p className="text-muted-foreground">Review and manage verification requests</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Requests</CardTitle>
          <CardDescription>A list of all verification requests from users</CardDescription>
        </CardHeader>
        <CardContent>
          <VerificationFilter
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            onSearchChange={setSearchQuery}
            onRoleChange={setRoleFilter}
            onStatusChange={setStatusFilter}
            onSubmit={handleSearch}
          />

          <VerificationList
            requests={requests}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
} 