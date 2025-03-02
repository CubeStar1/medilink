import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function MedicationDetailsLoading() {
  return (
    <div className="container py-6 space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" className="gap-2">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-24 mt-1" />
            </div>
            <Skeleton className="h-6 w-24" />
          </div>

          {/* Main Image */}
          <Card>
            <Skeleton className="aspect-video w-full" />
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </CardContent>
          </Card>

          {/* Storage Instructions */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-36" />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>

              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}