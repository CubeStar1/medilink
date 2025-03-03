import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface UsersFilterProps {
  searchQuery: string
  roleFilter: string
  statusFilter: string
  onSearchChange: (value: string) => void
  onRoleChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function UsersFilter({
  searchQuery,
  roleFilter,
  statusFilter,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onSubmit
}: UsersFilterProps) {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search users..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={roleFilter} onValueChange={onRoleChange}>
        <SelectTrigger className="w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="donor">Donor</SelectItem>
          <SelectItem value="ngo">NGO</SelectItem>
          <SelectItem value="individual">Individual</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  )
} 