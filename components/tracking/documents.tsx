import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface Document {
  name: string
  type: string
}

interface DocumentsProps {
  documents: Document[]
}

export function Documents({ documents }: DocumentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <Button key={index} variant="outline" className="w-full justify-start" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              {doc.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 