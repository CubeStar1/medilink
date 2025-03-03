import { Button } from "@/components/ui/button"
import { Ban, Key } from "lucide-react"
import type { UserProfile } from "@/lib/types/schema"

interface UserHeaderProps {
  userStatus: UserProfile['status']
  onStatusUpdate: () => void
}

export function UserHeader({ userStatus, onStatusUpdate }: UserHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
        <p className="text-muted-foreground">View and manage user account</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="gap-2">
          <Key className="h-4 w-4" />
          Reset Password
        </Button>
        <Button 
          variant={userStatus === 'suspended' ? 'outline' : 'destructive'} 
          className="gap-2"
          onClick={onStatusUpdate}
        >
          <Ban className="h-4 w-4" />
          {userStatus === 'suspended' ? 'Reactivate Account' : 'Suspend Account'}
        </Button>
      </div>
    </div>
  )
} 