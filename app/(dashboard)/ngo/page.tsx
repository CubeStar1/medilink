"use client"

import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"
import { StatisticsCards } from "@/components/ngo/statistics-cards"
import { RecentRequests } from "@/components/ngo/recent-requests"
import { AvailableMedications } from "@/components/ngo/available-medications"
import { RequestTrends } from "@/components/ngo/request-trends"
import { BeneficiaryGrowth } from "@/components/ngo/beneficiary-growth"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { Request, Medication } from "@/lib/types/schema"
import NgoDashboardLoading from "./loading"

interface DashboardStats {
  activeRequests: number
  pendingDeliveries: number
  medicationsReceived: number
  peopleHelped: number
}

async function fetchDashboardStats() {
  const response = await axios.get<DashboardStats>('/api/dashboard/ngo/stats')
  return response.data
}

async function fetchRecentRequests() {
  const response = await axios.get<{ data: Request[] }>('/api/requests/list')
  return response.data.data.slice(0, 4)
}

async function fetchAvailableMedications() {
  const response = await axios.get<{ data: Medication[] }>('/api/medications/list', {
    params: { status: 'available' }
  })
  return response.data.data.slice(0, 4)
}

export default function NgoDashboardPage() {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['ngo-dashboard-stats'],
    queryFn: fetchDashboardStats,
    refetchInterval: 30000
  })

  const { data: recentRequests, isLoading: isLoadingRequests } = useQuery({
    queryKey: ['recent-requests'],
    queryFn: fetchRecentRequests,
    refetchInterval: 30000
  })

  const { data: availableMedications, isLoading: isLoadingMedications } = useQuery({
    queryKey: ['available-medications'],
    queryFn: fetchAvailableMedications,
    refetchInterval: 30000
  })

  const isLoading = isLoadingStats || isLoadingRequests || isLoadingMedications

  if (isLoading) {
    return <NgoDashboardLoading />
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">NGO Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <StatisticsCards stats={stats} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <RecentRequests requests={recentRequests} />
            <AvailableMedications medications={availableMedications} />
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <RecentRequests requests={recentRequests} />
            <RequestTrends />
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <AvailableMedications medications={availableMedications} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <RequestTrends />
            <BeneficiaryGrowth />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 