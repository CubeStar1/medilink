"use client"

import { FileUp, ImageIcon, FileText, File, X, AlertCircle, FileStack } from "lucide-react"
import { useState, ChangeEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DocumentationForm() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0)
    
    if (totalSize > 10 * 1024 * 1024) { // 10MB limit
      setError("Total file size exceeds 10MB limit")
      return
    }

    setError(null)
    setSelectedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <FileStack className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Documentation</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-4">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-medium">Upload Images</h3>
              <p className="text-sm text-muted-foreground">
                Add photos of the medication
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id="image-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="image-upload"
              className="flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <FileUp className="h-4 w-4" />
              Choose Files
            </label>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-medium">Upload Prescriptions</h3>
              <p className="text-sm text-muted-foreground">
                Add any relevant prescriptions
              </p>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              className="hidden"
              id="prescription-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="prescription-upload"
              className="flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <FileUp className="h-4 w-4" />
              Choose Files
            </label>
          </CardContent>
        </Card>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-4">
            <File className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-medium">Other Documents</h3>
            <p className="text-sm text-muted-foreground">
              Add any other relevant documentation
            </p>
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            multiple
            className="hidden"
            id="other-upload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="other-upload"
            className="flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <FileUp className="h-4 w-4" />
            Choose Files
          </label>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-muted rounded-md"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm">{file.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFile(index)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-900">
        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500">
            Important Notice
          </p>
          <p className="text-sm text-yellow-600/90 dark:text-yellow-500/90">
            Please ensure all information is accurate and up-to-date. Incorrect information may delay the donation process.
          </p>
        </div>
      </div>
    </div>
  )
} 