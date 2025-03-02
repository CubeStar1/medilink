"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package2, Calendar, Info, Users } from "lucide-react"
import { getUrgencyColor } from "@/lib/utils"
import { RequestActionForm } from "./request-action-form"
import type { Request } from "@/lib/types/schema"

interface PendingRequestsProps {
  requests: Request[]
  unit: string
  onRequestAction: (data: {
    requestId: string
    action: 'approve' | 'reject'
    note?: string
    estimatedDeliveryDate?: string
    reason?: string
  }) => void
  isSubmitting?: boolean
}

export function PendingRequests({ requests, unit, onRequestAction, isSubmitting }: PendingRequestsProps) {
  const pendingRequests = requests.filter(request => request.status === 'pending')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Pending Requests
          <Badge variant="outline" className="ml-2">
            {pendingRequests.length} requests
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <Card key={request.id} className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {request.requesterDetails?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {request.requesterDetails?.location}
                      </p>
                    </div>
                    <Badge className={`${getUrgencyColor(request.priority)}`}>
                      {request.priority} Priority
                    </Badge>
                  </div>

                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Package2 className="h-4 w-4 text-muted-foreground" />
                      <span>Requested: {request.quantity} {unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Requested on: {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span>{request.reason}</span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="font-medium">Contact Information:</p>
                    <p>{request.requesterDetails?.name} - {request.requesterDetails?.contactEmail}</p>
                  </div>

                  <RequestActionForm
                    onSubmit={(data) => onRequestAction({ requestId: request.id, ...data })}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {pendingRequests.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No pending requests for this donation
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 