"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, XCircle, Loader2, Lock } from "lucide-react"
import Link from "next/link"
import { use } from 'react'
import { toast } from "sonner"
import type { UserProfile, ActivityLog } from "@/lib/types/schema"
import { UserHeader } from "@/components/admin/users/user-header"
import { UserProfileCard } from "@/components/admin/users/user-profile-card"
import { UserStatusCard } from "@/components/admin/users/user-status-card"
import { UserRoleSpecificCard } from "@/components/admin/users/user-role-specific-card"
import { UserActivityCard } from "@/components/admin/users/user-activity-card"
import { UserStatusDialog } from "@/components/admin/users/user-status-dialog"

interface UserDetails extends UserProfile {
  id: string;
  activityLog: (ActivityLog & { timestamp: string })[];
}

// Function to fetch user details
async function fetchUserDetails(userId: string) {
  const { data } = await axios.get<UserDetails>(`/api/admin/users/${userId}`)
  return data
}

// Function to update user status
async function updateUserStatus({ userId, status, reason }: { 
  userId: string; 
  status: UserProfile['status']; 
  reason?: string 
}) {
  const { data } = await axios.patch(`/api/admin/users/${userId}`, { status, reason })
  return data
}

export default function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const queryClient = useQueryClient()
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [newStatus, setNewStatus] = useState<UserProfile['status']>('active')
  const [statusReason, setStatusReason] = useState('')

  // Fetch user details using React Query
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserDetails(id)
  })

  // Status update mutation
  const { mutate: updateStatus, isPending: updating } = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] })
      setShowStatusDialog(false)
      toast.success('User status updated successfully')
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Failed to update status')
    }
  })

  const handleStatusUpdate = () => {
    updateStatus({
      userId: id,
      status: newStatus,
      reason: statusReason
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <XCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold">Error loading user details</h1>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      <UserHeader 
        userStatus={userData.status} 
        onStatusUpdate={() => {
          setNewStatus(userData.status === 'suspended' ? 'active' : 'suspended')
          setShowStatusDialog(true)
        }} 
      />

      <div className="grid gap-6 md:grid-cols-2">
        <UserProfileCard user={userData} />
        <UserStatusCard user={userData} />
      </div>

      <UserRoleSpecificCard user={userData} />

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="mt-6">
          <UserActivityCard activities={userData.activityLog} />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage account security and access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Password Reset</p>
                      <p className="text-sm text-muted-foreground">Send password reset email</p>
                    </div>
                  </div>
                  <Button variant="outline">Send Reset Link</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Documents</CardTitle>
              <CardDescription>View and manage user's verification documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.role === 'ngo' && userData.organization?.verificationDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <p className="font-medium">Document {index + 1}</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={doc} target="_blank">View Document</Link>
                    </Button>
                  </div>
                ))}
                {userData.role === 'donor' && userData.donorOrganization?.verificationDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <p className="font-medium">Document {index + 1}</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={doc} target="_blank">View Document</Link>
                    </Button>
                  </div>
                ))}
                {userData.role === 'individual' && userData.individualProfile?.idProof && (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <p className="font-medium">ID Proof</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={userData.individualProfile.idProof} target="_blank">View Document</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <UserStatusDialog
        open={showStatusDialog}
        onOpenChange={setShowStatusDialog}
        status={newStatus}
        reason={statusReason}
        onStatusChange={setNewStatus}
        onReasonChange={setStatusReason}
        onSubmit={handleStatusUpdate}
        isUpdating={updating}
      />
    </div>
  )
} 