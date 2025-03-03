import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

interface VerificationDocumentsProps {
  documents: string[]
}

export function VerificationDocuments({ documents }: VerificationDocumentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Documents</CardTitle>
        <CardDescription>Review submitted verification documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No documents submitted
            </p>
          ) : (
            documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Document {index + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.split('/').pop()}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={doc} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
} 