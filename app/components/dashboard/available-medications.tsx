import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Package2, Building2, ArrowUpRight, Search, Filter } from "lucide-react"

interface Medication {
  id: number
  name: string
  category: string
  quantity: number
  donor: string
  expiryDate: string
  location: string
}

interface AvailableMedicationsProps {
  medications: Medication[]
}

export function AvailableMedications({ medications }: AvailableMedicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Available Medications
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 w-[200px]" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((med) => (
            <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">{med.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package2 className="h-4 w-4" />
                  <span>{med.quantity} units</span>
                  <span>•</span>
                  <Building2 className="h-4 w-4" />
                  <span>{med.location}</span>
                </div>
              </div>
              <Button size="sm">
                Request
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 