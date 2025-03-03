import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill, User } from "lucide-react"

interface Request {
  id: string
  medicationName: string
  status: string
  priority: string
  createdAt: string
  requester: {
    name: string
    email: string
    role: string
  }
}

interface RecentRequestsProps {
  requests: Request[]
}

function getPriorityColor(priority: string) {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    case 'low':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    case 'approved':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'rejected':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

export function RecentRequests({ requests }: RecentRequestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Medication Requests</CardTitle>
        <CardDescription>Latest medication requests from users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No recent requests
            </p>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Pill className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{request.medicationName}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      {request.requester.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
} 