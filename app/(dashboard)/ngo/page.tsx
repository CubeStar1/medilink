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
import { ProfileForm } from "@/components/ngo/profile-form"

// Temporary data for demonstration
const stats = {
  activeRequests: 12,
  pendingDeliveries: 5,
  medicationsReceived: 150,
  peopleHelped: 1200
}

const recentRequests = [
  {
    id: 1,
    medication: "Amoxicillin 500mg",
    quantity: 1000,
    status: "Pending",
    requestDate: "2024-03-15",
    donor: "Red Cross",
    urgency: "High",
    image: "https://placehold.co/400x300"
  },
  {
    id: 2,
    medication: "Paracetamol 650mg",
    quantity: 5000,
    status: "Approved",
    requestDate: "2024-03-14",
    donor: "Doctors Without Borders",
    urgency: "Medium",
    image: "https://placehold.co/400x300"
  },
  {
    id: 3,
    medication: "First Aid Kit",
    quantity: 50,
    status: "In Transit",
    requestDate: "2024-03-13",
    donor: "WHO",
    urgency: "Low",
    image: "https://placehold.co/400x300"
  },
  {
    id: 4,
    medication: "Insulin",
    quantity: 200,
    status: "Pending",
    requestDate: "2024-03-12",
    donor: "Local Hospital",
    urgency: "High",
    image: "https://placehold.co/400x300"
  }
]

const availableMedications = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    quantity: 5000,
    expiryDate: "2025-06-15",
    donor: "Red Cross",
    status: "Available",
    image: "https://placehold.co/400x300"
  },
  {
    id: 2,
    name: "Paracetamol 650mg",
    category: "Pain Relief",
    quantity: 10000,
    expiryDate: "2025-08-20",
    donor: "Doctors Without Borders",
    status: "Low Stock",
    image: "https://placehold.co/400x300"
  },
  {
    id: 3,
    name: "First Aid Kit",
    category: "First Aid",
    quantity: 200,
    expiryDate: "2026-01-10",
    donor: "WHO",
    status: "Available",
    image: "https://placehold.co/400x300"
  },
  {
    id: 4,
    name: "Insulin",
    category: "Diabetes",
    quantity: 0,
    expiryDate: "2025-12-25",
    donor: "Local Hospital",
    status: "Out of Stock",
    image: "https://placehold.co/400x300"
  }
]

export default function NgoDashboardPage() {
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <StatisticsCards stats={stats} />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <RecentRequests requests={recentRequests} />
            <AvailableMedications medications={availableMedications} />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <RequestTrends />
            <BeneficiaryGrowth />
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <AvailableMedications medications={availableMedications} />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <ProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  )
} 