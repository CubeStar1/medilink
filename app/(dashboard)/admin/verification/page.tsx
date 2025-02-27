"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, FileText, Building2, ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Temporary data for demonstration
const verificationRequests = [
  {
    id: "VER-2024-001",
    name: "Global Health Initiative",
    type: "NGO",
    status: "Pending Review",
    documents: [
      { name: "Registration Certificate", type: "PDF" },
      { name: "Tax Exemption", type: "PDF" },
      { name: "Annual Report", type: "PDF" },
      { name: "Board Resolution", type: "PDF" },
      { name: "Financial Statements", type: "PDF" },
    ],
    submittedAt: "2024-03-14T09:00:00",
    submittedBy: "John Doe",
  },
  {
    id: "VER-2024-002",
    name: "MedPharm Solutions",
    type: "Donor",
    status: "Under Review",
    documents: [
      { name: "Business License", type: "PDF" },
      { name: "Quality Certifications", type: "PDF" },
      { name: "Drug License", type: "PDF" },
      { name: "Compliance Report", type: "PDF" },
    ],
    submittedAt: "2024-03-14T11:30:00",
    submittedBy: "Jane Smith",
  },
  {
    id: "VER-2024-003",
    name: "Care Connect Foundation",
    type: "NGO",
    status: "Additional Info Required",
    documents: [
      { name: "Registration Certificate", type: "PDF" },
      { name: "Tax Exemption", type: "PDF" },
      { name: "Annual Report", type: "PDF" },
    ],
    submittedAt: "2024-03-13T15:45:00",
    submittedBy: "Mike Johnson",
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending review':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    case 'under review':
      return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
    case 'additional info required':
      return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
    case 'approved':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'rejected':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

export default function VerificationPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verification Requests</h1>
          <p className="text-muted-foreground">Review and manage verification requests</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Queue</CardTitle>
          <CardDescription>Review and process verification requests from organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search requests..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ngo">NGO</SelectItem>
                <SelectItem value="donor">Donor</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="info">Additional Info Required</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verificationRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {request.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {request.type}
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
                      <div>
                        <p>{new Date(request.submittedAt).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">by {request.submittedBy}</p>
                      </div>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 