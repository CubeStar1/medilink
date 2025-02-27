import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package2, Calendar, Building2, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface Request {
  id: number
  medication: string
  quantity: number
  status: string
  requestDate: string
  donor: string
  urgency: string
  image?: string
}

interface RecentRequestsProps {
  requests: Request[]
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'in transit':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'rejected':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

const getUrgencyColor = (urgency: string) => {
  switch (urgency.toLowerCase()) {
    case 'high':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'low':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

export function RecentRequests({ requests }: RecentRequestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Requests</CardTitle>
        <CardDescription>Your most recent medication requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-2">
          {requests.map((request) => (
            <div key={request.id} className="overflow-hidden rounded-lg border">
              <div className="aspect-[4/3] relative bg-muted">
                <img
                  src={request.image || "https://placehold.co/400x300"}
                  alt={request.medication}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-medium line-clamp-1">{request.medication}</h3>
                  <p className="text-sm text-muted-foreground">Request #{request.id}</p>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Package2 className="h-4 w-4 text-muted-foreground" />
                    <span>{request.quantity} units</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(request.requestDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{request.donor}</span>
                  </div>
                </div>
                <Link href={`/requests/${request.id}`} className="block">
                  <Button variant="outline" className="w-full" size="sm">
                    View Details
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 