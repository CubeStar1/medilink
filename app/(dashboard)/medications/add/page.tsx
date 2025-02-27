"use client"

import { AddMedicationForm } from "@/components/medications/add-medication-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Toaster } from "sonner"

export default function AddMedicationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="flex w-full flex-col px-4 py-8 sm:px-8 md:px-12">
        <div className="mx-auto w-full max-w-3xl space-y-4">
          <Link 
            href="/medications" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Medications
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Add New Medication</h1>
            <p className="text-muted-foreground">
              Fill in the details below to add a new medication to the donation network. All fields marked with * are required.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 bg-muted/10">
        <AddMedicationForm />
      </div>

      <Toaster />
    </div>
  )
} 