import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreVertical } from "lucide-react"
import Link from "next/link"
import type { UserProfile } from "@/lib/types/schema"
import { getAccountStatusColor } from "@/lib/utils"

interface User extends Pick<UserProfile, 'email' | 'role' | 'status' | 'isVerified'> {
  id: string;
  displayName: string | null;
  organization: string | null;
  lastActive: string | null;
}

interface UserRowProps {
  user: User
}

export function UserRow({ user }: UserRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div>
          <p className="font-medium">{user.displayName || 'N/A'}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </TableCell>
      <TableCell>{user.organization || 'N/A'}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {user.role}
          {user.isVerified && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
              Verified
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge className={getAccountStatusColor(user.status)}>
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>
        {user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never'}
      </TableCell>
      <TableCell>
        <Link href={`/admin/users/${user.id}`}>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
} 