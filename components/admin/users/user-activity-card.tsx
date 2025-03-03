import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import type { ActivityLog } from "@/lib/types/schema"
import { User, AlertCircle, FileText } from "lucide-react"

interface UserActivityCardProps {
  activities: ActivityLog[]
}

function formatActivityDetails(details: ActivityLog['details']) {
  if (!details) return null;

  if (details.location || details.device) {
    return `${details.location ? `From ${details.location}` : ''} ${details.device ? `using ${details.device}` : ''}`.trim();
  }

  if (details.newStatus) {
    return `Status changed to ${details.newStatus}${details.reason ? `: ${details.reason}` : ''}`;
  }

  if (details.changes) {
    return `Updated: ${Object.keys(details.changes).join(', ')}`;
  }

  return null;
}

export function UserActivityCard({ activities }: UserActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>Recent user activities and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                No activity recorded yet
              </p>
            ) : (
              activities.map((activity, index) => (
                <div key={activity.id || index} className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {activity.action === 'login' && <User className="h-4 w-4 text-muted-foreground" />}
                      {activity.action === 'status_update' && <AlertCircle className="h-4 w-4 text-muted-foreground" />}
                      {activity.action === 'profile_update' && <FileText className="h-4 w-4 text-muted-foreground" />}
                      <p className="font-medium capitalize">{activity.action.replace('_', ' ')}</p>
                    </div>
                    <time className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </time>
                  </div>
                  {activity.details && (
                    <p className="text-sm text-muted-foreground">
                      {formatActivityDetails(activity.details)}
                    </p>
                  )}
                  {activity.ip && (
                    <p className="text-xs text-muted-foreground">IP: {activity.ip}</p>
                  )}
                  {index !== activities.length - 1 && (
                    <hr className="my-2 border-border" />
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 