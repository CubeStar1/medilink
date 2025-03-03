import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Building2, ArrowUpRight, Loader2 } from "lucide-react"
import Link from "next/link"
import type { UserProfile } from "@/lib/types/schema"

interface VerificationRequest {
  id: string
  userId: string
  user: Pick<UserProfile, 'email' | 'role' | 'displayName' | 'organization' | 'donorOrganization'>
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  documents: string[]
  notes?: string
}

interface VerificationListProps {
  requests: VerificationRequest[]
  isLoading: boolean
}

function getStatusColor(status: VerificationRequest['status']) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    case 'approved':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'rejected':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

export function VerificationList({ requests, isLoading }: VerificationListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization/User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              </TableCell>
            </TableRow>
          ) : requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No verification requests found
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {request.user.organization?.name || 
                       request.user.donorOrganization?.name || 
                       request.user.displayName || 
                       'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground">{request.user.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {request.user.role}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {request.documents.length} files
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(request.submittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/verification/${request.id}`}>
                    <Button variant="outline" size="sm">
                      Review
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 