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
  { month: "January", donations: 186, value: 4000 },
  { month: "February", donations: 305, value: 3000 },
  { month: "March", donations: 237, value: 5000 },
  { month: "April", donations: 173, value: 4500 },
  { month: "May", donations: 209, value: 3500 },
  { month: "June", donations: 214, value: 3200 },
]

const trendConfig = {
  donations: {
    label: "Number of Donations",
    color: "hsl(var(--chart-1))",
  },
  value: {
    label: "Donation Value ($)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DonationTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Trends</CardTitle>
        <CardDescription>Monthly donation patterns for 2024</CardDescription>
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
              dataKey="donations"
              type="monotone"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-donations)"
            />
            <Line
              dataKey="value"
              type="monotone"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-value)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Donations trending up by 15.2% <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Value decreased by 8.5% compared to last month <TrendingDown className="inline h-4 w-4 text-red-500" />
        </div>
      </CardFooter>
    </Card>
  )
} 