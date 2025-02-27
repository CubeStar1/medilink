"use client"

import { PieChart, Pie, Cell } from "recharts"
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

const statusData = [
  { name: "Delivered", value: 540, color: "hsl(var(--success))" },
  { name: "In Transit", value: 320, color: "hsl(var(--warning))" },
  { name: "Processing", value: 210, color: "hsl(var(--muted))" },
]

const statusConfig = {
  status: {
    label: "Delivery Status",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function DeliveryStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Status</CardTitle>
        <CardDescription>Current status of all donations</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={statusConfig}>
          <PieChart width={300} height={300}>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-3 gap-4 w-full">
          {statusData.map((status, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-sm font-medium">{status.name}</div>
              <div className="text-2xl font-bold">{status.value}</div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
} 