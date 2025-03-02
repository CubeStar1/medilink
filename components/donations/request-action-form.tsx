"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, CheckCircle2, XCircle } from "lucide-react"

interface RequestActionFormProps {
  onSubmit: (data: {
    action: 'approve' | 'reject'
    note?: string
    estimatedDeliveryDate?: string
    reason?: string
  }) => void
  isSubmitting?: boolean
}

export function RequestActionForm({ onSubmit, isSubmitting }: RequestActionFormProps) {
  const [note, setNote] = useState('')
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState<Date>()
  const [rejectionReason, setRejectionReason] = useState('')

  const handleSubmit = (action: 'approve' | 'reject') => {
    if (action === 'reject' && !rejectionReason) {
      return
    }

    onSubmit({
      action,
      note,
      estimatedDeliveryDate: estimatedDeliveryDate ? format(estimatedDeliveryDate, 'yyyy-MM-dd') : undefined,
      reason: rejectionReason
    })

    // Reset form
    setNote('')
    setEstimatedDeliveryDate(undefined)
    setRejectionReason('')
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Request Actions</h3>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>Notes</Label>
          <Textarea
            placeholder="Add any notes about this request..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>Estimated Delivery Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !estimatedDeliveryDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {estimatedDeliveryDate ? format(estimatedDeliveryDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={estimatedDeliveryDate}
                onSelect={setEstimatedDeliveryDate}
                disabled={{ before: new Date() }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <Label>Rejection Reason</Label>
          <Textarea
            placeholder="Provide a reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={() => handleSubmit('approve')}
            disabled={isSubmitting}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleSubmit('reject')}
            disabled={isSubmitting || !rejectionReason}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>
      </div>
    </div>
  )
} 