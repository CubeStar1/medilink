import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package2, Calendar, Building2, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface Medication {
  id: number
  name: string
  category: string
  quantity: number
  expiryDate: string
  donor: string
  status: string
  image: string
}

interface AvailableMedicationsProps {
  medications: Medication[]
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'available':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'low stock':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'out of stock':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

export function AvailableMedications({ medications }: AvailableMedicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Medications</CardTitle>
        <CardDescription>Medications available for request</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-2">
          {medications.map((medication) => (
            <div key={medication.id} className="overflow-hidden rounded-lg border">
              <div className="aspect-[4/3] relative bg-muted">
                <img
                  src={medication.image}
                  alt={medication.name}
                  className="object-cover w-full h-full"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${getStatusColor(medication.status)}`}
                >
                  {medication.status}
                </Badge>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-medium line-clamp-1">{medication.name}</h3>
                  <p className="text-sm text-muted-foreground">{medication.category}</p>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Package2 className="h-4 w-4 text-muted-foreground" />
                    <span>{medication.quantity} units</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(medication.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{medication.donor}</span>
                  </div>
                </div>
                <Link href={`/requests/new?medicationId=${medication.id}`} className="block">
                  <Button className="w-full" size="sm">
                    Request Medication
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 