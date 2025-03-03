"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XCircle, Loader2 } from "lucide-react"
import { use } from 'react'
import { toast } from "sonner"
import type { UserProfile } from "@/lib/types/schema"
import { VerificationHeader } from "@/components/admin/verification/verification-header"
import { VerificationUserCard } from "@/components/admin/verification/verification-user-card"
import { VerificationDocuments } from "@/components/admin/verification/verification-documents"
import { VerificationStatusDialog } from "@/components/admin/verification/verification-status-dialog"

interface VerificationRequest {
  id: string
  userId: string
  user: Pick<UserProfile, 'email' | 'role' | 'displayName' | 'organization' | 'donorOrganization'>
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  documents: string[]
  notes?: string
}

// Function to fetch verification request details
async function fetchVerificationDetails(requestId: string) {
  const { data } = await axios.get<VerificationRequest>(`/api/admin/verification/${requestId}`)
  return data
}

// Function to update verification status
async function updateVerificationStatus({ 
  requestId, 
  status, 
  notes 
}: { 
  requestId: string
  status: VerificationRequest['status']
  notes?: string 
}) {
  const { data } = await axios.patch(`/api/admin/verification/${requestId}`, { status, notes })
  return data
}

export default function VerificationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const queryClient = useQueryClient()
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [newStatus, setNewStatus] = useState<VerificationRequest['status']>('pending')
  const [notes, setNotes] = useState('')

  // Fetch verification details using React Query
  const { data: verificationData, isLoading, error } = useQuery({
    queryKey: ['verification', id],
    queryFn: () => fetchVerificationDetails(id)
  })

  // Status update mutation
  const { mutate: updateStatus, isPending: updating } = useMutation({
    mutationFn: updateVerificationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verification', id] })
      setShowStatusDialog(false)
      toast.success('Verification status updated successfully')
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Failed to update status')
    }
  })

  const handleStatusUpdate = () => {
    updateStatus({
      requestId: id,
      status: newStatus,
      notes: notes.trim() || undefined
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !verificationData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <XCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold">Error loading verification details</h1>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      <VerificationHeader 
        status={verificationData.status}
        onStatusUpdate={() => {
          setNewStatus(verificationData.status === 'approved' ? 'rejected' : 'approved')
          setShowStatusDialog(true)
        }}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <VerificationUserCard user={verificationData.user} />
        
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Current verification status and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Status</p>
              <p className="text-sm text-muted-foreground capitalize">{verificationData.status}</p>
            </div>
            <div>
              <p className="font-medium">Submitted At</p>
              <p className="text-sm text-muted-foreground">
                {new Date(verificationData.submittedAt).toLocaleString()}
              </p>
            </div>
            {verificationData.notes && (
              <div>
                <p className="font-medium">Notes</p>
                <p className="text-sm text-muted-foreground">{verificationData.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents" className="mt-6">
          <VerificationDocuments documents={verificationData.documents} />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification History</CardTitle>
              <CardDescription>Timeline of verification process</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <VerificationStatusDialog
        open={showStatusDialog}
        onOpenChange={setShowStatusDialog}
        status={newStatus}
        notes={notes}
        onStatusChange={setNewStatus}
        onNotesChange={setNotes}
        onSubmit={handleStatusUpdate}
        isUpdating={updating}
      />
    </div>
  )
} 