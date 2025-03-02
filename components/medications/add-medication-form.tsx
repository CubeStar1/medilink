"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronLeft, CheckCircle2, ClipboardList, FileText, FileStack, Loader2 } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formSchema } from "./schema"
import { BasicInfoForm } from "./basic-info-form"
import { AdditionalDetailsForm } from "./additional-details-form"
import { DocumentationForm } from "./documentation-form"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"

type FormField = keyof z.infer<typeof formSchema>

interface Step {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  fields: FormField[]
}

const steps: Step[] = [
  {
    id: 1,
    title: "Basic Information",
    description: "Enter the basic details of the medication",
    icon: ClipboardList,
    fields: ["name", "category", "quantity", "unit"],
  },
  {
    id: 2,
    title: "Additional Details",
    description: "Provide storage and batch information",
    icon: FileText,
    fields: ["expiryDate", "storageTemp", "batchNumber", "composition", "description"],
  },
  {
    id: 3,
    title: "Documentation",
    description: "Upload relevant documentation and photos",
    icon: FileStack,
    fields: [],
  },
]

export function AddMedicationForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [direction, setDirection] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      composition: "",
      batchNumber: "",
      documents: {
        images: [],
        prescriptions: [],
        other: []
      }
    },
  })

  const validateStep = async (stepNumber: number) => {
    const fields = steps[stepNumber - 1].fields
    const result = await form.trigger(fields)
    return result
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Form submission triggered. Current step:', step);
    
    if (step !== steps.length || isSubmitting) {
      console.log('Preventing submission - not on last step or already submitting');
      return;
    }

    const isValid = await validateStep(step)
    if (!isValid) {
      console.log('Form validation failed');
      toast.error("Please fill in all required fields correctly")
      return
    }

    console.log('Submitting form with values:', values);
    setIsSubmitting(true)
    
    try {
      const response = await axios.post('/api/medications/add', values);
      console.log('API Response:', response.data);

      toast.success("Medication added successfully!");
      form.reset();
      setStep(1);
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.details || error.response?.data?.message || "Failed to add medication");
      } else {
        toast.error("Failed to add medication");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleBack = () => {
    setDirection(-1)
    setStep(step - 1)
  }

  const handleNext = async () => {
    console.log('Next button clicked. Current step:', step);
    const isValid = await validateStep(step)
    if (!isValid) {
      console.log('Step validation failed');
      toast.error("Please fill in all required fields correctly")
      return
    }
    setDirection(1)
    setStep(step + 1)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      position: "absolute" as const
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      position: "absolute" as const
    })
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 md:px-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  {i > 0 && <Separator className="w-12 mx-4" />}
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all",
                        step === s.id ? "border-primary bg-primary/10 scale-110" : "border-muted",
                        step > s.id && "border-primary bg-primary text-white"
                      )}
                    >
                      {step > s.id ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <s.icon className="h-6 w-6" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className={cn(
                        "font-medium text-sm transition-colors",
                        step === s.id ? "text-primary" : "text-muted-foreground"
                      )}>
                        {s.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[120px]">
                        {s.description}
                      </p>
                    </div>
                  </div>
                  {i < steps.length - 1 && <Separator className="w-12 mx-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[500px] sm:min-h-[600px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 w-full bg-card rounded-lg p-4 sm:p-8 shadow-lg border border-border/50 backdrop-blur-sm"
              >
                {step === 1 && <BasicInfoForm form={form} />}
                {step === 2 && <AdditionalDetailsForm form={form} />}
                {step === 3 && <DocumentationForm />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="transition-transform hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              type="button"
              onClick={step === steps.length ? form.handleSubmit(onSubmit) : handleNext}
              disabled={isSubmitting}
              className="transition-transform hover:scale-105"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {step === steps.length ? (
                isSubmitting ? "Submitting..." : "Submit"
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 