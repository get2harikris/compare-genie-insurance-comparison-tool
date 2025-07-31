"use client"

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface UploadedFile {
  file: File
  name: string
  size: string
}

interface FileUploadProps {
  onFileSelect: (file: File) => void
  uploadedFile: UploadedFile | null
  fileNumber: number
}

export function FileUpload({ onFileSelect, uploadedFile, fileNumber }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file')
      return
    }

    // Validate file size (50MB = 50 * 1024 * 1024 bytes)
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      alert('File size must be less than 50MB')
      return
    }

    onFileSelect(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file')
      return
    }

    // Validate file size
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      alert('File size must be less than 50MB')
      return
    }

    onFileSelect(file)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    // Reset the uploaded file by calling onFileSelect with a dummy file
    // This is a workaround since we can't directly reset the parent state
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {!uploadedFile ? (
        <Card
          className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="font-medium mb-2">Upload PDF Document</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your PDF file here, or click to browse
            </p>
            <Button variant="outline" size="sm">
              Choose File
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Maximum file size: 50MB
            </p>
          </div>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-lg">📄</span>
              </div>
              <div>
                <p className="font-medium text-sm">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">{uploadedFile.size}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClick}
            >
              Replace
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
