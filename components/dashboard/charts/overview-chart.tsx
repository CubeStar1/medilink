"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Generate 3 months of sample data
const generateChartData = () => {
  const data = []
  const startDate = new Date('2024-01-01')
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    data.push({
      date: date.toISOString().split('T')[0],
      donations: Math.floor(Math.random() * 50) + 10,
      value: Math.floor(Math.random() * 10000) + 1000,
    })
  }
  return data
}

const chartData = generateChartData()

const chartConfig = {
  views: {
    label: "Donations Overview",
  },
  donations: {
    label: "Number of Donations",
    color: "hsl(var(--chart-1))",
  },
  value: {
    label: "Donation Value ($)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Overview() {
  const [activeChart, setActiveChart] = 
    React.useState<keyof typeof chartConfig>("donations")

  const total = React.useMemo(
    () => ({
      donations: chartData.reduce((acc, curr) => acc + curr.donations, 0),
      value: chartData.reduce((acc, curr) => acc + curr.value, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Donation Statistics</CardTitle>
          <CardDescription>
            Overview of donations for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["donations", "value"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {chart === 'value' 
                    ? `$${total[chart].toLocaleString()}`
                    : total[chart].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar 
              dataKey={activeChart} 
              fill={`var(--color-${activeChart})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 