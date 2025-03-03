"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { StatsCards } from "@/components/admin/dashboard/stats-cards"
import { RecentRequests } from "@/components/admin/dashboard/recent-requests"
import { RecentMedications } from "@/components/admin/dashboard/recent-medications"

// Function to fetch dashboard stats
async function fetchDashboardStats() {
  const { data } = await axios.get('/api/admin/dashboard/stats')
  return data
}

export default function AdminDashboardPage() {
  // Fetch dashboard stats using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    refetchInterval: 30000 // Refetch every 30 seconds
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Error loading dashboard</h1>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform's activity
        </p>
      </div>

      <StatsCards stats={data.stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentRequests requests={data.recentRequests} />
        <RecentMedications medications={data.recentMedications} />
      </div>
    </div>
  )
} 