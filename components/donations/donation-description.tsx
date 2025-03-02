"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package2, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

interface DonationDescriptionProps {
  description?: string
  composition?: string
  documents?: {
    images?: string[]
    prescriptions?: string[]
  }
}

export function DonationDescription({ description, composition, documents }: DonationDescriptionProps) {
  return (
    <Card>
      <div className="aspect-video relative bg-muted">
        {documents?.images?.[0] ? (
          <img
            src={documents.images[0]}
            alt="Medication"
            className="object-cover w-full h-full rounded-t-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package2 className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>Description</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Composition</h3>
          <p className="text-sm text-muted-foreground">{composition}</p>
        </div>
        {documents?.prescriptions && documents.prescriptions.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Prescriptions</h3>
            <div className="grid gap-2">
              {documents.prescriptions.map((prescription, index) => (
                <Link 
                  key={index}
                  href={prescription}
                  target="_blank"
                  className="text-sm text-blue-500 hover:underline flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Prescription {index + 1}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 