"use client"

import { DonationTrends } from "./charts/donation-trends"
import { CategoryDistribution } from "./charts/category-distribution"
import { ValueDistribution } from "./charts/value-distribution"
import { DeliveryStatus } from "./charts/delivery-status"
import { NGODistribution } from "./charts/ngo-distribution"
import { ExpiryForecast } from "./charts/expiry-forecast"

export function Analytics() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <DonationTrends />
      <CategoryDistribution />
      <ValueDistribution />
      <DeliveryStatus />
      <NGODistribution />
      <ExpiryForecast />
    </div>
  )
} 