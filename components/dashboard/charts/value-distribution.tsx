"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
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

const categoryData = [
  { category: "Antibiotics", count: 156, value: 15600 },
  { category: "Pain Relief", count: 123, value: 12300 },
  { category: "First Aid", count: 97, value: 9700 },
  { category: "Vaccines", count: 85, value: 8500 },
  { category: "Chronic Care", count: 76, value: 7600 },
]

const valueConfig = {
  value: {
    label: "Value ($)",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function ValueDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Value Distribution</CardTitle>
        <CardDescription>Total value by category ($)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={valueConfig}>
          <BarChart
            data={categoryData}
            margin={{
              left: 0,
              right: 0,
              top: 10,
              bottom: 0,
            }}
            height={300}
          >
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="value"
              fill="var(--color-value)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Showing monetary value distribution across categories
        </div>
      </CardFooter>
    </Card>
  )
} 