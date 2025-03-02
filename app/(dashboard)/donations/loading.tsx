import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function DonationsLoading() {
  return (
    <div className="container py-6 space-y-6 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-1" />
        </div>
        <Skeleton className="h-9 w-[140px]" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-[120px]" />
        <Skeleton className="h-9 w-[120px]" />
        <Skeleton className="h-9 w-[120px]" />
      </div>

      {/* Grid */}
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
                <Skeleton className="h-9 w-9" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-[100px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="h-9 w-[100px]" />
      </div>
    </div>
  )
} 