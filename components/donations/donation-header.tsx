"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getStatusColor } from "@/lib/utils"
import type { Medication } from "@/lib/types/schema"

interface DonationHeaderProps {
  name: string
  category: string
  status: Medication['status']
}

export function DonationHeader({ name, category, status }: DonationHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <Link 
        href="/donations" 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Donations
      </Link>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
          <p className="text-muted-foreground">{category}</p>
        </div>
        <Badge className={`text-base px-4 py-1 ${getStatusColor(status)}`}>
          {status}
        </Badge>
      </div>
    </div>
  )
} 