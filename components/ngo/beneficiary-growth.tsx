"use client"

import { TrendingUp } from "lucide-react"
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
  { month: "January", beneficiaries: 200 },
  { month: "February", beneficiaries: 250 },
  { month: "March", beneficiaries: 300 },
  { month: "April", beneficiaries: 450 },
  { month: "May", beneficiaries: 500 },
  { month: "June", beneficiaries: 550 },
]

const trendConfig = {
  beneficiaries: {
    label: "People Helped",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BeneficiaryGrowth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Beneficiary Growth</CardTitle>
        <CardDescription>Monthly beneficiary growth for 2024</CardDescription>
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
              dataKey="beneficiaries"
              type="monotone"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-beneficiaries)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Beneficiaries increased by 175% <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Reached 550 people in June 2024
        </div>
      </CardFooter>
    </Card>
  )
} 