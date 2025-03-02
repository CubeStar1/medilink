import * as z from "zod"

export const temperatureOptions = [
  { label: "Room Temperature (20-25°C)", value: "room", temp: 23 },
  { label: "Cool (8-15°C)", value: "cool", temp: 12 },
  { label: "Refrigerated (2-8°C)", value: "refrigerated", temp: 5 },
  { label: "Frozen (-15 to -25°C)", value: "frozen", temp: -20 },
] as const;

export const formSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Medication name is required"),
  category: z.string().min(1, "Category is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Unit is required"),

  // Additional Details
  expiryDate: z.date({
    required_error: "Expiry date is required",
    invalid_type_error: "Invalid date format",
  }).refine((date) => date > new Date(), {
    message: "Expiry date must be in the future",
  }),
  
  storageTemp: z.enum(["room", "cool", "refrigerated", "frozen"] as const, {
    required_error: "Storage temperature is required",
  }),

  batchNumber: z.string().min(1, "Batch number is required"),
  composition: z.string().min(1, "Composition is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),

  // Documentation
  documents: z.object({
    images: z.array(z.string()).optional(),
    prescriptions: z.array(z.string()).optional(),
    other: z.array(z.string()).optional(),
  }).optional(),
}); 