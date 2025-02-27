"use client"

import { BarChart, XAxis, YAxis, Bar } from "recharts"
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

const categoryConfig = {
  count: {
    label: "Donation Count",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function CategoryDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Categories</CardTitle>
        <CardDescription>Distribution by medicine type</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={categoryConfig}>
          <BarChart
            data={categoryData}
            layout="vertical"
            margin={{
              left: -20,
              right: 10,
              top: 10,
              bottom: 0,
            }}
            height={300}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Antibiotics remain the most donated category
        </div>
      </CardFooter>
    </Card>
  )
} 