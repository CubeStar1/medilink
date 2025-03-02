import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft } from "lucide-react"

export default function RequestStatusLoading() {
  return (
    <div className="container py-6 space-y-6 mx-auto">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="gap-2"
        disabled
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request Status</CardTitle>
                <Skeleton className="h-6 w-24" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-32 mt-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>

              <div>
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-32 mt-1" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Skeleton className="h-4 w-32 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              <div>
                <Skeleton className="h-4 w-32 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 