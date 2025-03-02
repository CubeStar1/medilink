"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package2, Calendar, Building2, LayoutGrid, List } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import type { Request } from "@/lib/types/schema"

interface RecentRequestsProps {
  requests?: Request[]
}

async function fetchRecentRequests() {
  const response = await axios.get<{ data: Request[] }>('/api/requests/list')
  return response.data.data.slice(0, 4)
}

function getStatusColor(status: Request['status']) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'in-transit':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'delivered':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

function getPriorityColor(priority: Request['priority']) {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'low':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export function RecentRequests({ requests: initialRequests }: RecentRequestsProps) {
  const [view, setView] = useState<"grid" | "list">("grid")
  const { data: requests = initialRequests } = useQuery({
    queryKey: ['recent-requests'],
    queryFn: fetchRecentRequests,
    initialData: initialRequests,
    refetchInterval: 30000
  })

  if (!requests?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent requests found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Requests</CardTitle>
        <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as "grid" | "list")}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        {view === "grid" ? (
          <div className="grid gap-4 grid-cols-2">
            {requests.map((request) => (
              <Link 
                key={request.id} 
                href={`/requests/status/${request.id}`}
                className="block"
              >
                <div className="overflow-hidden rounded-lg border">
                  <div className="aspect-[4/3] relative bg-muted">
                    <img
                      src="https://placehold.co/400x300"
                      alt={request.medicationName}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="font-medium line-clamp-1">{request.medicationName}</h3>
                      <p className="text-sm text-muted-foreground">Request #{request.id}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Package2 className="h-4 w-4 text-muted-foreground" />
                        <span>{request.quantity} units</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{request.requesterDetails?.organizationName || 'Individual'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Link 
                key={request.id} 
                href={`/requests/status/${request.id}`}
                className="block"
              >
                <div className="flex items-start justify-between space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{request.medicationName}</p>
                    <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Package2 className="h-4 w-4" />
                        <span>{request.quantity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{request.requesterDetails?.organizationName || 'Individual'}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 