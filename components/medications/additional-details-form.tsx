"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, FileText, Thermometer, Barcode } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "./schema"

interface AdditionalDetailsFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export function AdditionalDetailsForm({ form }: AdditionalDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <FileText className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Additional Details</h2>
      </div>

      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Date *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2100-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storageTemp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage Temperature *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select storage requirements" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="room">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      <span>Room Temperature (20-25°C)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="cool">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      <span>Cool (8-15°C)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="refrigerated">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      <span>Refrigerated (2-8°C)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="frozen">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      <span>Frozen (-20°C)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="batchNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Number *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Barcode className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter batch number" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="composition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Composition *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter medication composition"
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter medication description"
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include any additional information about the medication.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
} 