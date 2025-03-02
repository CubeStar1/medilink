import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NgoDashboardLoading() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">NGO Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-[200px]" />
          <Skeleton className="h-9 w-[140px]" />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-[100px]" />
              <Skeleton className="h-4 w-[140px] mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" disabled>Overview</TabsTrigger>
          <TabsTrigger value="requests" disabled>Requests</TabsTrigger>
          <TabsTrigger value="medications" disabled>Medications</TabsTrigger>
          <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
        </TabsList>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* Recent Requests Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-[140px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Available Medications Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-[160px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}