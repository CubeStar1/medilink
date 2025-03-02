"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ArrowRight, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import type { Medication } from "@/lib/types/schema"
import { Skeleton } from "@/components/ui/skeleton"

interface RecentDonationsProps {
  donations?: Medication[]
}

async function fetchRecentDonations() {
  const response = await axios.get<{ data: Medication[] }>('/api/medications/list')
  return response.data.data.slice(0, 3) // Only show 3 most recent donations
}

const getStatusColor = (status: Medication['status']) => {
  switch (status) {
    case "available":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "reserved":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "delivered":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
  }
}

const formatDate = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  return 'Just now'
}

function DonationSkeleton() {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div>
          <Skeleton className="h-4 w-[150px] mb-1" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-right">
          <Skeleton className="h-4 w-[80px] mb-1" />
          <Skeleton className="h-3 w-[60px]" />
        </div>
        <Skeleton className="h-6 w-[80px]" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  )
}

export function RecentDonations({ donations: initialDonations }: RecentDonationsProps) {
  const { data: donations = initialDonations, isLoading } = useQuery({
    queryKey: ['recent-donations'],
    queryFn: fetchRecentDonations,
    initialData: initialDonations,
    refetchInterval: 30000 // Refetch every 30 seconds
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Loading recent donations...</CardDescription>
            </div>
            <Button variant="outline" size="sm" disabled>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <DonationSkeleton />
            <DonationSkeleton />
            <DonationSkeleton />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!donations?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>No donations found</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>
              You have made {donations.length} donations recently
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/donations">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/5 rounded-full">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none mb-1">
                    {donation.name}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(donation.createdAt)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-right">
                  <p className="font-medium">{donation.category}</p>
                  <p className="text-muted-foreground">
                    {donation.quantity} {donation.unit}
                  </p>
                </div>
                <Badge variant="secondary" className={getStatusColor(donation.status)}>
                  {donation.status}
                </Badge>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/donations/${donation.id}`}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 