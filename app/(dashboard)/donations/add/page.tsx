"use client"

import { AddMedicationForm } from "@/components/medications/add-medication-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function AddMedicationPage() {
  return (
    <div className="container py-6 mx-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <Link href="/medications">
              <ChevronLeft className="h-4 w-4" />
              Back to Medications
            </Link>
          </Button>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Add New Medication</h1>
          <p className="text-muted-foreground">
            Fill in the details below to add a new medication to the donation network. All fields marked with * are required.
          </p>
        </div>

        <AddMedicationForm />
      </div>
    </div>
  )
} 