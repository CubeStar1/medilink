import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill, User, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Medication {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  status: string
  expiryDate: string
  createdAt: string
  donor: {
    name: string
    email: string
  }
}

interface RecentMedicationsProps {
  medications: Medication[]
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'available':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'reserved':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    case 'expired':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

export function RecentMedications({ medications }: RecentMedicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Medications</CardTitle>
        <CardDescription>Latest medications added to the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No recent medications
            </p>
          ) : (
            medications.map((medication) => (
              <div
                key={medication.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Pill className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{medication.name}</p>
                      <Badge variant="outline">{medication.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {medication.donor.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Expires {formatDistanceToNow(new Date(medication.expiryDate), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{medication.quantity}</p>
                    <p className="text-sm text-muted-foreground">{medication.unit}</p>
                  </div>
                  <Badge className={getStatusColor(medication.status)}>
                    {medication.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
} 