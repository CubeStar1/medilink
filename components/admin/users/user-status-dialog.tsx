import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import type { UserProfile } from "@/lib/types/schema"

interface UserStatusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  status: UserProfile['status']
  reason: string
  onStatusChange: (value: UserProfile['status']) => void
  onReasonChange: (value: string) => void
  onSubmit: () => void
  isUpdating: boolean
}

export function UserStatusDialog({
  open,
  onOpenChange,
  status,
  reason,
  onStatusChange,
  onReasonChange,
  onSubmit,
  isUpdating
}: UserStatusDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Status</DialogTitle>
          <DialogDescription>
            {status === 'suspended' 
              ? 'Are you sure you want to suspend this user? This will prevent them from accessing the platform.'
              : 'Are you sure you want to reactivate this user? This will restore their access to the platform.'
            }
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Reason for status change"
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant={status === 'suspended' ? 'destructive' : 'default'}
            onClick={onSubmit}
            disabled={isUpdating}
          >
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 