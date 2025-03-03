import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Mail, Globe } from "lucide-react"
import type { UserProfile } from "@/lib/types/schema"

interface VerificationUserCardProps {
  user: Pick<UserProfile, 'email' | 'role' | 'displayName' | 'organization' | 'donorOrganization'>
}

export function VerificationUserCard({ user }: VerificationUserCardProps) {
  const organizationName = user.organization?.name || user.donorOrganization?.name
  const organizationType = user.organization?.type || user.donorOrganization?.type
  const website = user.organization?.website || user.donorOrganization?.website

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>Information about the user requesting verification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{organizationName || user.displayName || 'N/A'}</p>
            <p className="text-sm text-muted-foreground">
              {organizationName ? 'Organization Name' : 'Full Name'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{user.email}</p>
            <p className="text-sm text-muted-foreground">Email Address</p>
          </div>
        </div>
        {organizationType && (
          <div className="flex items-center gap-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{organizationType}</p>
              <p className="text-sm text-muted-foreground">Organization Type</p>
            </div>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-4">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{website}</p>
              <p className="text-sm text-muted-foreground">Website</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 