import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Building2, MapPin } from "lucide-react"
import type { UserProfile } from "@/lib/types/schema"

interface UserProfileCardProps {
  user: UserProfile
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>User's basic information and role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{user.displayName || 'N/A'}</p>
            <p className="text-sm text-muted-foreground">Full Name</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{user.email}</p>
            <p className="text-sm text-muted-foreground">Email Address</p>
          </div>
        </div>
        {user.phoneNumber && (
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{user.phoneNumber}</p>
              <p className="text-sm text-muted-foreground">Phone Number</p>
            </div>
          </div>
        )}
        {(user.organization || user.donorOrganization) && (
          <div className="flex items-center gap-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {user.organization?.name || user.donorOrganization?.name}
              </p>
              <p className="text-sm text-muted-foreground">Organization</p>
            </div>
          </div>
        )}
        {user.address && (
          <div className="flex items-center gap-4">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {`${user.address.street}, ${user.address.city}, ${user.address.state}`}
              </p>
              <p className="text-sm text-muted-foreground">Address</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 