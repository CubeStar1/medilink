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

const ngoData = [
  { name: "Red Cross", donations: 245, value: 24500 },
  { name: "Doctors Without Borders", donations: 189, value: 18900 },
  { name: "UNICEF", donations: 156, value: 15600 },
  { name: "WHO", donations: 134, value: 13400 },
  { name: "Local Clinics", donations: 98, value: 9800 },
]

const ngoConfig = {
  donations: {
    label: "Number of Donations",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export function NGODistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NGO Distribution</CardTitle>
        <CardDescription>Donations by organization</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={ngoConfig}>
          <BarChart
            data={ngoData}
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
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={150}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="donations"
              fill="var(--color-donations)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Red Cross received the most donations this period
        </div>
      </CardFooter>
    </Card>
  )
} 