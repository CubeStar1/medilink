"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ArrowRight, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DonationItem {
  id: string
  title: string
  time: string
  status: "In Transit" | "Delivered" | "Processing"
  ngo: string
  quantity: number
  category: string
}

const donations: DonationItem[] = [
  {
    id: "1234",
    title: "Antibiotics Batch #1234",
    time: "2 hours ago",
    status: "In Transit",
    ngo: "Red Cross",
    quantity: 500,
    category: "Antibiotics"
  },
  {
    id: "5678",
    title: "Pain Medication #5678",
    time: "5 hours ago",
    status: "Delivered",
    ngo: "Doctors Without Borders",
    quantity: 1000,
    category: "Pain Relief"
  },
  {
    id: "9012",
    title: "First Aid Kits #9012",
    time: "1 day ago",
    status: "Processing",
    ngo: "UNICEF",
    quantity: 200,
    category: "First Aid"
  }
]

const getStatusColor = (status: DonationItem["status"]) => {
  switch (status) {
    case "Delivered":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "In Transit":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "Processing":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
  }
}

export function RecentDonations() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>
              You have made {donations.length} donations this month
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
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
                    {donation.title}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {donation.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-right">
                  <p className="font-medium">{donation.ngo}</p>
                  <p className="text-muted-foreground">
                    {donation.quantity} units
                  </p>
                </div>
                <Badge variant="secondary" className={getStatusColor(donation.status)}>
                  {donation.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 