import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { UserRow } from "./user-row"
import type { UserProfile } from "@/lib/types/schema"

interface User extends Pick<UserProfile, 'email' | 'role' | 'status' | 'isVerified'> {
  id: string;
  displayName: string | null;
  organization: string | null;
  lastActive: string | null;
}

interface UsersListProps {
  users: User[]
  isLoading: boolean
}

export function UsersList({ users, isLoading }: UsersListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
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
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 