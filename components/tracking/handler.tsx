import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User2, Building2, Phone, Mail } from "lucide-react"

interface HandlerInfo {
  name: string
  organization: string
  phone: string
  email: string
  role: string
  since: string
}

interface HandlerProps {
  handler: HandlerInfo
}

export function Handler({ handler }: HandlerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User2 className="h-5 w-5" />
          Current Handler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-2xl font-bold">{handler.name}</p>
            <p className="text-sm text-muted-foreground">{handler.role}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{handler.organization}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{handler.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{handler.email}</span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Handling since: {new Date(handler.since).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 