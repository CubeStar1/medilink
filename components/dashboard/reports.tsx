"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Printer, Share2 } from "lucide-react"

interface Report {
  id: string
  title: string
  description: string
  date: string
  type: "Monthly" | "Quarterly" | "Annual"
}

const reports: Report[] = [
  {
    id: "1",
    title: "Monthly Donation Summary",
    description: "Detailed breakdown of all donations for the current month",
    date: "March 2024",
    type: "Monthly"
  },
  {
    id: "2",
    title: "Q1 2024 Impact Report",
    description: "Comprehensive analysis of donation impact and reach",
    date: "Q1 2024",
    type: "Quarterly"
  },
  {
    id: "3",
    title: "2023 Annual Report",
    description: "Complete overview of donation activities and achievements",
    date: "2023",
    type: "Annual"
  }
]

export function Reports() {
  return (
    <div className="grid gap-4">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle>{report.title}</CardTitle>
              </div>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Report Period: {report.date}</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">
                {report.type}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 