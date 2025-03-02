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
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface AnalyticsData {
  trendsData: Array<{
    month: string
    requests: number
    fulfilled: number
  }>
  metrics: {
    requestsChange: number
    fulfillmentRate: number
  }
}

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

async function fetchAnalytics() {
  const response = await axios.get<AnalyticsData>('/api/dashboard/ngo/analytics')
  return response.data
}

export function RequestTrends() {
  const { data, isLoading } = useQuery({
    queryKey: ['ngo-analytics'],
    queryFn: fetchAnalytics,
    refetchInterval: 30000 // Refetch every 30 seconds
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Request Trends</CardTitle>
          <CardDescription>Loading analytics data...</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse w-full h-full bg-muted rounded-md" />
        </CardContent>
      </Card>
    )
  }

  const isPositiveChange = (data?.metrics.requestsChange ?? 0) > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Trends</CardTitle>
        <CardDescription>Monthly request patterns for {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trendConfig}>
          <LineChart
            data={data?.trendsData}
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
          Requests {isPositiveChange ? 'increased' : 'decreased'} by {Math.abs(data?.metrics.requestsChange ?? 0)}%{' '}
          {isPositiveChange ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Fulfillment rate at {data?.metrics.fulfillmentRate ?? 0}%{' '}
          {(data?.metrics.fulfillmentRate ?? 0) >= 80 ? (
            <TrendingUp className="inline h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="inline h-4 w-4 text-red-500" />
          )}
        </div>
      </CardFooter>
    </Card>
  )
} 