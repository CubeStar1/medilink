import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

interface MedicationDetailsProps {
  name: string
  quantity: string
  donor: string
  recipient: string
}

export function MedicationDetails({ name, quantity, donor, recipient }: MedicationDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Medication Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">
            Quantity: {quantity}
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>From: {donor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>To: {recipient}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 