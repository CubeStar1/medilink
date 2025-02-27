"use client"

import { Overview } from "./charts/overview-chart"
import { RecentActivity } from "./recent-activity"
import { RecentDonations } from "./recent-donations"

export function OverviewSection() {
  return (
    <div className="space-y-4">
      <Overview />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-1 md:col-span-1 lg:col-span-4">
          <RecentDonations />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
} 