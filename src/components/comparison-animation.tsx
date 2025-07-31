"use client"

import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'

interface ComparisonAnimationProps {
  progress: number
  currentStep: string
}

export function ComparisonAnimation({ progress, currentStep }: ComparisonAnimationProps) {
  const steps = [
    { id: 1, title: 'Compressing documents...', description: 'Optimizing file sizes for faster processing' },
    { id: 2, title: 'Analyzing policy types...', description: 'Detecting document structure and content' },
    { id: 3, title: 'Running detailed comparison...', description: 'AI-powered analysis of policy differences' },
    { id: 4, title: 'Generating report...', description: 'Creating comprehensive comparison report' }
  ]

  const getCurrentStepIndex = () => {
    if (progress <= 20) return 0
    if (progress <= 40) return 1
    if (progress <= 70) return 2
    return 3
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="p-8">
          <CardContent className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Comparing Your Policies</h1>
              <p className="text-muted-foreground">
                Our AI is analyzing your documents to provide detailed insights
              </p>
            </div>

            {/* Animation Area */}
            <div className="flex justify-center py-8">
              <div className="relative">
                {/* Document Icons */}
                <div className="flex items-center space-x-8">
                  <div className="relative">
                    <div className="w-16 h-20 bg-primary/10 rounded-lg flex items-center justify-center animate-pulse">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                      Policy 1
                    </div>
                  </div>

                  {/* Comparison Arrow */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-0.5 bg-primary animate-pulse"></div>
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-spin">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    </div>
                    <div className="w-8 h-0.5 bg-primary animate-pulse"></div>
                  </div>

                  <div className="relative">
                    <div className="w-16 h-20 bg-primary/10 rounded-lg flex items-center justify-center animate-pulse">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                      Policy 2
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{currentStep}</span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Steps List */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-start space-x-3 ${
                    index <= currentStepIndex ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      index < currentStepIndex
                        ? 'bg-primary text-primary-foreground'
                        : index === currentStepIndex
                        ? 'bg-primary text-primary-foreground animate-pulse'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index < currentStepIndex ? '✓' : step.id}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${index === currentStepIndex ? 'text-primary' : ''}`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated Time */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Estimated time remaining: {Math.max(0, Math.ceil((100 - progress) / 20))} minutes</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
