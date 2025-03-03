import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"

interface VerificationHeaderProps {
  status: 'pending' | 'approved' | 'rejected'
  onStatusUpdate: () => void
}

export function VerificationHeader({ status, onStatusUpdate }: VerificationHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verification Review</h1>
        <p className="text-muted-foreground">Review verification request details</p>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant={status === 'approved' ? 'destructive' : 'default'}
          className="gap-2"
          onClick={onStatusUpdate}
        >
          {status === 'approved' ? (
            <>
              <XCircle className="h-4 w-4" />
              Reject Verification
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Approve Verification
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 