"use client"

import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"
import { StatisticsCards } from "@/components/dashboard/statistics-cards"
import { Analytics } from "@/components/dashboard/analytics"
import { Reports } from "@/components/dashboard/reports"
import { Notifications } from "@/components/dashboard/notifications"
import { OverviewSection } from "@/components/dashboard/overview-section"

export default function DonorDashboardPage() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Donor Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
        
        <StatisticsCards />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <OverviewSection/>
          </TabsContent>
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
          <TabsContent value="reports">
            <Reports />
          </TabsContent>
          <TabsContent value="notifications">
            <Notifications />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
} 