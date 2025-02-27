import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ThermometerSun, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface TemperatureReading {
  timestamp: string
  temperature: number
}

interface TemperatureMonitorProps {
  currentTemp: string
  minThreshold: number
  maxThreshold: number
  readings: TemperatureReading[]
}

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function TemperatureMonitor({ currentTemp, minThreshold, maxThreshold, readings }: TemperatureMonitorProps) {
  const currentTempNum = parseFloat(currentTemp)
  const isOutOfRange = currentTempNum < minThreshold || currentTempNum > maxThreshold
  
  // Calculate temperature trend
  const lastTwoReadings = readings.slice(-2)
  const tempDiff = lastTwoReadings.length === 2 
    ? lastTwoReadings[1].temperature - lastTwoReadings[0].temperature
    : 0
  const trendPercentage = lastTwoReadings.length === 2
    ? ((tempDiff / lastTwoReadings[0].temperature) * 100).toFixed(1)
    : "0.0"
  const isIncreasing = tempDiff > 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ThermometerSun className="h-5 w-5" />
            Temperature Monitoring
          </CardTitle>
          {isOutOfRange && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Temperature Alert
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current Temperature</p>
              <p className="text-2xl font-bold">{currentTemp}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <div>Min: {minThreshold}°C</div>
              <div>Max: {maxThreshold}°C</div>
            </div>
          </div>
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={readings}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
              height={200}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[
                  Math.min(minThreshold - 1, Math.min(...readings.map(r => r.temperature))),
                  Math.max(maxThreshold + 1, Math.max(...readings.map(r => r.temperature)))
                ]}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
              <Area
                dataKey="temperature"
                type="monotone"
                fill="var(--color-temperature)"
                fillOpacity={0.2}
                stroke="var(--color-temperature)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Temperature {isIncreasing ? "up" : "down"} by {Math.abs(parseFloat(trendPercentage))}% {" "}
              {isIncreasing ? (
                <TrendingUp className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-500" />
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Last updated: {new Date(readings[readings.length - 1].timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
} 