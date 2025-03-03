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

interface VerificationStatusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  status: 'pending' | 'approved' | 'rejected'
  notes: string
  onStatusChange: (value: 'pending' | 'approved' | 'rejected') => void
  onNotesChange: (value: string) => void
  onSubmit: () => void
  isUpdating: boolean
}

export function VerificationStatusDialog({
  open,
  onOpenChange,
  status,
  notes,
  onStatusChange,
  onNotesChange,
  onSubmit,
  isUpdating
}: VerificationStatusDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Verification Status</DialogTitle>
          <DialogDescription>
            {status === 'rejected' 
              ? 'Are you sure you want to reject this verification request? This will notify the user.'
              : 'Are you sure you want to approve this verification request? This will grant the user verified status.'
            }
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Select 
              value={status} 
              onValueChange={(value: 'pending' | 'approved' | 'rejected') => onStatusChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Add notes about your decision..."
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant={status === 'rejected' ? 'destructive' : 'default'}
            onClick={onSubmit}
            disabled={isUpdating}
          >
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {status === 'rejected' ? 'Reject' : 'Approve'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 