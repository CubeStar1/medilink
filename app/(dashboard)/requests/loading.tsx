import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function RequestsLoading() {
  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[200px] mt-2" />
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton className="h-10 flex-1" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Grid View */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-5 w-[100px]" />
              </div>
              <Skeleton className="h-16 w-full mt-4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 