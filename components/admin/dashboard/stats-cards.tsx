import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ClipboardCheck } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalUsers: number
    pendingVerifications: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            Registered users on the platform
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
          <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
          <p className="text-xs text-muted-foreground">
            Verification requests awaiting review
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 