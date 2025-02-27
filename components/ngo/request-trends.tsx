"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
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

const monthlyData = [
  { month: "January", requests: 65, fulfilled: 45 },
  { month: "February", requests: 59, fulfilled: 40 },
  { month: "March", requests: 80, fulfilled: 60 },
  { month: "April", requests: 81, fulfilled: 70 },
  { month: "May", requests: 56, fulfilled: 45 },
  { month: "June", requests: 55, fulfilled: 45 },
]

const trendConfig = {
  requests: {
    label: "Requests Made",
    color: "hsl(var(--chart-1))",
  },
  fulfilled: {
    label: "Requests Fulfilled",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function RequestTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Trends</CardTitle>
        <CardDescription>Monthly request patterns for 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trendConfig}>
          <LineChart
            data={monthlyData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="requests"
              type="monotone"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-requests)"
            />
            <Line
              dataKey="fulfilled"
              type="monotone"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-fulfilled)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Requests increased by 12.5% <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Fulfillment rate at 85% <TrendingUp className="inline h-4 w-4 text-green-500" />
        </div>
      </CardFooter>
    </Card>
  )
} 