import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Building2, Globe, Briefcase } from "lucide-react"
import type { UserProfile } from "@/lib/types/schema"

interface UserRoleSpecificCardProps {
  user: UserProfile
}

export function UserRoleSpecificCard({ user }: UserRoleSpecificCardProps) {
  if (user.role === 'ngo' && user.organization) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>NGO Details</CardTitle>
          <CardDescription>Organization specific information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{user.organization.registrationNumber}</p>
              <p className="text-sm text-muted-foreground">Registration Number</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{user.organization.type}</p>
              <p className="text-sm text-muted-foreground">Organization Type</p>
            </div>
          </div>
          {user.organization.website && (
            <div className="flex items-center gap-4">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{user.organization.website}</p>
                <p className="text-sm text-muted-foreground">Website</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (user.role === 'donor' && user.donorOrganization) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Donor Organization Details</CardTitle>
          <CardDescription>Organization specific information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{user.donorOrganization.license}</p>
              <p className="text-sm text-muted-foreground">License Number</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{user.donorOrganization.type}</p>
              <p className="text-sm text-muted-foreground">Organization Type</p>
            </div>
          </div>
          {user.donorOrganization.website && (
            <div className="flex items-center gap-4">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{user.donorOrganization.website}</p>
                <p className="text-sm text-muted-foreground">Website</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (user.role === 'individual' && user.individualProfile?.occupation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Individual Profile</CardTitle>
          <CardDescription>Individual donor information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{user.individualProfile.occupation}</p>
              <p className="text-sm text-muted-foreground">Occupation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
} 