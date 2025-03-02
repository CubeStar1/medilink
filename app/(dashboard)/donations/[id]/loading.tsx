import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DonationDetailsLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-6">
      <div className="w-full max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/donations" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Donations
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
            <Skeleton className="h-7 w-24" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <Skeleton className="aspect-video rounded-t-lg" />
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Composition</h3>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* Requests Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pending Requests
                  <Badge variant="outline" className="ml-2">
                    <Skeleton className="h-4 w-8" />
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <Skeleton className="h-5 w-40" />
                              <Skeleton className="h-4 w-24 mt-1" />
                            </div>
                            <Skeleton className="h-6 w-24" />
                          </div>

                          <div className="grid gap-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-56" />
                          </div>

                          <div>
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-4 w-48 mt-1" />
                          </div>

                          <div className="flex gap-2 mt-2">
                            <Skeleton className="h-9 flex-1" />
                            <Skeleton className="h-9 flex-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 