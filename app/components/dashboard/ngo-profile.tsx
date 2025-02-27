import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Mail, Phone, MapPin, Globe, Users } from "lucide-react"

export function NgoProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NGO Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <div className="relative">
                <Building2 className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="Enter organization name" className="pl-8" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="Enter email address" className="pl-8" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="phone" placeholder="Enter phone number" className="pl-8" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="website" placeholder="Enter website URL" className="pl-8" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="address" placeholder="Enter address" className="pl-8" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficiaries">Number of Beneficiaries</Label>
              <div className="relative">
                <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="beneficiaries" type="number" placeholder="Enter number of beneficiaries" className="pl-8" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Organization Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter a brief description of your organization" 
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 