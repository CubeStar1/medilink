"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Building2, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar, 
  User, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Download
} from "lucide-react"

// Temporary data for demonstration
const verificationRequest = {
  id: "VER-2024-001",
  name: "Global Health Initiative",
  type: "NGO",
  status: "Pending Review",
  email: "contact@ghi.org",
  phone: "+1 (555) 123-4567",
  website: "https://www.ghi.org",
  address: "123 Healthcare Ave, Medical District, NY 10001",
  documents: [
    { 
      name: "Registration Certificate",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2024-03-14T09:00:00",
      status: "Verified"
    },
    { 
      name: "Tax Exemption",
      type: "PDF",
      size: "1.8 MB",
      uploadedAt: "2024-03-14T09:00:00",
      status: "Pending"
    },
    { 
      name: "Annual Report",
      type: "PDF",
      size: "5.2 MB",
      uploadedAt: "2024-03-14T09:00:00",
      status: "Pending"
    },
    { 
      name: "Board Resolution",
      type: "PDF",
      size: "1.1 MB",
      uploadedAt: "2024-03-14T09:00:00",
      status: "Pending"
    },
    { 
      name: "Financial Statements",
      type: "PDF",
      size: "3.7 MB",
      uploadedAt: "2024-03-14T09:00:00",
      status: "Pending"
    }
  ],
  submittedAt: "2024-03-14T09:00:00",
  submittedBy: "John Doe",
  verificationHistory: [
    {
      action: "Submitted",
      timestamp: "2024-03-14T09:00:00",
      by: "John Doe",
      notes: "Initial submission of verification request"
    },
    {
      action: "Document Verified",
      timestamp: "2024-03-14T10:30:00",
      by: "System",
      notes: "Registration Certificate automatically verified"
    },
    {
      action: "Under Review",
      timestamp: "2024-03-14T11:00:00",
      by: "Admin",
      notes: "Started manual review of documents"
    }
  ]
}

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
    case 'verified':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

export default function VerificationDetailsPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verification Review</h1>
          <p className="text-muted-foreground">Review verification request details</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Request Info
          </Button>
          <Button variant="destructive" className="gap-2">
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Approve
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
            <CardDescription>Basic information about the organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{verificationRequest.name}</p>
                <p className="text-sm text-muted-foreground">Organization Name</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{verificationRequest.email}</p>
                <p className="text-sm text-muted-foreground">Email Address</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{verificationRequest.phone}</p>
                <p className="text-sm text-muted-foreground">Phone Number</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{verificationRequest.website}</p>
                <p className="text-sm text-muted-foreground">Website</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{verificationRequest.address}</p>
                <p className="text-sm text-muted-foreground">Address</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Details</CardTitle>
            <CardDescription>Information about the verification request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{verificationRequest.submittedBy}</p>
                <p className="text-sm text-muted-foreground">Submitted By</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {new Date(verificationRequest.submittedAt).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Submission Date</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{verificationRequest.type}</p>
                <p className="text-sm text-muted-foreground">Organization Type</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <div>
                <Badge className={getStatusColor(verificationRequest.status)}>
                  {verificationRequest.status}
                </Badge>
                <p className="text-sm text-muted-foreground">Current Status</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="notes">Review Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>Review and verify submitted documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationRequest.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification History</CardTitle>
              <CardDescription>Timeline of verification process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationRequest.verificationHistory.map((event, index) => (
                  <div key={index} className="flex gap-4 pb-4 last:pb-0 relative">
                    <div className="w-[2px] bg-border absolute top-8 bottom-0 left-[11px]" />
                    <div className="h-6 w-6 rounded-full bg-muted mt-1.5" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{event.action}</p>
                        <span className="text-sm text-muted-foreground">
                          • {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">by {event.by}</p>
                      <p className="text-sm">{event.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Notes</CardTitle>
              <CardDescription>Add notes and comments about the verification</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add your review notes here..."
                className="min-h-[200px]"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Notes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 