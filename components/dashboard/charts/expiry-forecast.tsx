"use client"

import { Area, AreaChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const expiryData = [
  { month: "Jul", expiring: 50 },
  { month: "Aug", expiring: 75 },
  { month: "Sep", expiring: 120 },
  { month: "Oct", expiring: 85 },
  { month: "Nov", expiring: 45 },
  { month: "Dec", expiring: 30 },
]

const expiryConfig = {
  expiring: {
    label: "Expiring Items",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig

export function ExpiryForecast() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expiry Forecast</CardTitle>
        <CardDescription>Upcoming medicine expirations</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={expiryConfig}>
          <AreaChart
            data={expiryData}
            margin={{
              left: 0,
              right: 0,
              top: 10,
              bottom: 0,
            }}
            height={300}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="expiring"
              stroke="var(--color-expiring)"
              fill="var(--color-expiring)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Peak expiration period expected in September
        </div>
      </CardFooter>
    </Card>
  )
} 