"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { FileUpload } from '@/components/file-upload'
import { ComparisonAnimation } from '@/components/comparison-animation'

interface UploadedFile {
  file: File
  name: string
  size: string
}

export default function UploadPage() {
  const router = useRouter()
  const [file1, setFile1] = useState<UploadedFile | null>(null)
  const [file2, setFile2] = useState<UploadedFile | null>(null)
  const [policyType, setPolicyType] = useState<string>('')
  const [isComparing, setIsComparing] = useState(false)
  const [error, setError] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFileUpload = (file: File, fileNumber: 1 | 2) => {
    const uploadedFile: UploadedFile = {
      file,
      name: file.name,
      size: formatFileSize(file.size)
    }

    if (fileNumber === 1) {
      setFile1(uploadedFile)
    } else {
      setFile2(uploadedFile)
    }
    setError('')
  }

  const handleCompare = async () => {
    if (!file1 || !file2 || !policyType) {
      setError('Please upload both files and select a policy type')
      return
    }

    setIsComparing(true)
    setError('')
    setProgress(0)

    try {
      // Step 1: Compress files
      setCurrentStep('Compressing documents...')
      setProgress(20)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Step 2: Detect policy subtypes
      setCurrentStep('Analyzing policy types...')
      setProgress(40)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Step 3: Run comparison
      setCurrentStep('Running detailed comparison...')
      setProgress(70)
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Step 4: Generate report
      setCurrentStep('Generating report...')
      setProgress(90)
      await new Promise(resolve => setTimeout(resolve, 1000))

      setProgress(100)
      
      // Navigate to results page
      setTimeout(() => {
        router.push('/results')
      }, 500)

    } catch (err) {
      setError('An error occurred during comparison. Please try again.')
      setIsComparing(false)
    }
  }

  if (isComparing) {
    return (
      <ComparisonAnimation 
        progress={progress}
        currentStep={currentStep}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compare Insurance Policies</h1>
        <p className="text-muted-foreground">
          Upload two PDF policy documents to get a detailed AI-powered comparison
        </p>
      </div>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* File 1 Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Document 1</CardTitle>
            <CardDescription>Upload the first policy document (PDF, max 50MB)</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              onFileSelect={(file) => handleFileUpload(file, 1)}
              uploadedFile={file1}
              fileNumber={1}
            />
          </CardContent>
        </Card>

        {/* File 2 Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Document 2</CardTitle>
            <CardDescription>Upload the second policy document (PDF, max 50MB)</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              onFileSelect={(file) => handleFileUpload(file, 2)}
              uploadedFile={file2}
              fileNumber={2}
            />
          </CardContent>
        </Card>
      </div>

      {/* Policy Type Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Policy Type</CardTitle>
          <CardDescription>Select the type of insurance policy you're comparing</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={policyType} onValueChange={setPolicyType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="personal" id="personal" />
              <Label htmlFor="personal" className="cursor-pointer">
                <div>
                  <div className="font-medium">Personal Insurance</div>
                  <div className="text-sm text-muted-foreground">
                    Homeowners, Auto, Personal Umbrella (HO3, HO5, etc.)
                  </div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="commercial" id="commercial" />
              <Label htmlFor="commercial" className="cursor-pointer">
                <div>
                  <div className="font-medium">Commercial Insurance</div>
                  <div className="text-sm text-muted-foreground">
                    Business Owner's Policy, General Liability (BOP, GL, etc.)
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Compare Button */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          onClick={handleCompare}
          disabled={!file1 || !file2 || !policyType}
          className="px-12"
        >
          Compare Documents
        </Button>
      </div>

      {/* Instructions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Upload two PDF policy documents (maximum 50MB each)</p>
          <p>• Select the appropriate policy type (Personal or Commercial)</p>
          <p>• Click "Compare Documents" to start the AI-powered analysis</p>
          <p>• The comparison process typically takes 1-2 minutes</p>
          <p>• You can configure comparison parameters in the Settings page</p>
        </CardContent>
      </Card>
    </div>
  )
}
