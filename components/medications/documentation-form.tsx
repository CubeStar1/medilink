"use client"

import { Button } from "@/components/ui/button"
import { FileStack, Upload, FileText, X, AlertCircle } from "lucide-react"
import { useState } from "react"

export function DocumentationForm() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  // Simulate file upload
  const handleFileUpload = () => {
    const newFile = `Document-${uploadedFiles.length + 1}.pdf`
    setUploadedFiles([...uploadedFiles, newFile])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <FileStack className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Documentation</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div 
          onClick={handleFileUpload}
          className="group relative border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer transition-all hover:border-primary"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
          <p className="text-sm text-muted-foreground mb-1 group-hover:text-foreground transition-colors">
            Drag and drop or click to upload medication photos
          </p>
          <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">
            Supported formats: JPG, PNG, PDF
          </p>
        </div>

        <div className="space-y-2">
          {uploadedFiles.map((file, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 bg-muted rounded-lg hover:bg-muted/70 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{file}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {uploadedFiles.length === 0 && (
            <div className="flex items-center justify-center h-[120px] text-sm text-muted-foreground">
              No files uploaded yet
            </div>
          )}
        </div>
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