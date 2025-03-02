import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft } from "lucide-react"

export default function CreateRequestLoading() {
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
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Request Medication</CardTitle>
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-32 w-full" />
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i}>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </div>

                <Skeleton className="h-10 w-full mt-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medication Details Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Medication Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32 mt-1" />
                <Skeleton className="h-6 w-24 mt-2" />
              </div>
              
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 