import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MedicationsLoading() {
  return (
    <div className="py-6 space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Available Medications</h1>
          <Skeleton className="h-4 w-64 mt-1" />
        </div>
        <Skeleton className="h-9 w-[140px]" />
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-sm">
          <Skeleton className="h-9 w-full" />
        </div>
        <Skeleton className="h-9 w-[150px]" />
        <Skeleton className="h-9 w-[150px]" />
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-4">
        <Tabs defaultValue="grid" className="w-full">
          <TabsList>
            <TabsTrigger value="grid" disabled>Grid View</TabsTrigger>
            <TabsTrigger value="list" disabled>List View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Grid View */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-video" />
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-1" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>

              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 flex-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}