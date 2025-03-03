import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertCircle, Calendar, History } from "lucide-react"
import type { UserProfile } from "@/lib/types/schema"
import { getAccountStatusColor } from "@/lib/utils"

interface UserStatusCardProps {
  user: UserProfile
}

export function UserStatusCard({ user }: UserStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Status</CardTitle>
        <CardDescription>Current account status and permissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{user.role}</p>
              {user.isVerified && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Account Role</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
          <div>
            <Badge className={getAccountStatusColor(user.status)}>
              {user.status}
            </Badge>
            <p className="text-sm text-muted-foreground">Account Status</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground">Join Date</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <History className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">
              {user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never'}
            </p>
            <p className="text-sm text-muted-foreground">Last Active</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 