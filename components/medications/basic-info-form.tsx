"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pill, Layers } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "./schema"

const categories = [
  "Antibiotics",
  "Analgesics",
  "Antivirals",
  "Antidiabetics",
  "Cardiovascular",
  "Respiratory",
  "Gastrointestinal",
  "Other"
] as const;

const units = [
  "Tablets",
  "Capsules",
  "Bottles",
  "Vials",
  "Ampoules",
  "Strips",
  "Boxes",
  "Other"
] as const;

interface BasicInfoFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export function BasicInfoForm({ form }: BasicInfoFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Pill className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Basic Information</h2>
      </div>

      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medication Name *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Pill className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter medication name" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Layers className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="number" 
                      placeholder="Enter quantity" 
                      className="pl-9"
                      {...field}
                      onChange={e => field.onChange(e.target.valueAsNumber)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit.toLowerCase()}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
} 