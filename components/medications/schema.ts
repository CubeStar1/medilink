import * as z from "zod"

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Medication name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  quantity: z.number().min(1, {
    message: "Quantity must be at least 1.",
  }),
  unit: z.string({
    required_error: "Please select a unit.",
  }),
  expiryDate: z.date({
    required_error: "Please select an expiry date.",
  }),
  storageTemp: z.string({
    required_error: "Please specify storage temperature requirements.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  composition: z.string().min(5, {
    message: "Composition must be at least 5 characters.",
  }),
  batchNumber: z.string().min(3, {
    message: "Batch number must be at least 3 characters.",
  }),
}) 