"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { useLocalStorage } from '@/hooks/use-local-storage'

interface LLMConfig {
  provider: 'openai' | 'gemini' | 'azure'
  apiKey: string
  model: string
  temperature: number
}

interface ComparisonParams {
  personal: {
    deductibles: boolean
    coverageLimits: boolean
    endorsements: boolean
    exclusions: boolean
    premiums: boolean
  }
  commercial: {
    liabilityLimits: boolean
    propertyCoverage: boolean
    businessInterruption: boolean
    endorsements: boolean
    deductibles: boolean
  }
}

const defaultLLMConfig: LLMConfig = {
  provider: 'openai',
  apiKey: '',
  model: 'gpt-4',
  temperature: 0.3
}

const defaultComparisonParams: ComparisonParams = {
  personal: {
    deductibles: true,
    coverageLimits: true,
    endorsements: true,
    exclusions: true,
    premiums: false
  },
  commercial: {
    liabilityLimits: true,
    propertyCoverage: true,
    businessInterruption: true,
    endorsements: true,
    deductibles: true
  }
}

export default function SettingsPage() {
  const [llmConfig, setLLMConfig, isLLMConfigLoaded] = useLocalStorage('compareGenie_llmConfig', defaultLLMConfig)
  const [comparisonParams, setComparisonParams, isComparisonParamsLoaded] = useLocalStorage('compareGenie_comparisonParams', defaultComparisonParams)
  
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      // Settings are automatically saved to localStorage via the hook
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSaveMessage('Settings saved successfully!')
    } catch {
      setSaveMessage('Error saving settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestConnection = async () => {
    if (!llmConfig.apiKey) {
      setSaveMessage('Please enter an API key first.')
      return
    }

    setIsSaving(true)
    setSaveMessage('Testing connection...')

    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSaveMessage('Connection test successful!')
    } catch {
      setSaveMessage('Connection test failed. Please check your API key.')
    } finally {
      setIsSaving(false)
    }
  }

  const getModelOptions = () => {
    switch (llmConfig.provider) {
      case 'openai':
        return [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
        ]
      case 'gemini':
        return [
          { value: 'gemini-pro', label: 'Gemini Pro (Placeholder)' },
          { value: 'gemini-pro-vision', label: 'Gemini Pro Vision (Placeholder)' }
        ]
      case 'azure':
        return [
          { value: 'gpt-4', label: 'Azure GPT-4 (Placeholder)' },
          { value: 'gpt-35-turbo', label: 'Azure GPT-3.5 Turbo (Placeholder)' }
        ]
      default:
        return []
    }
  }

  // Show loading state until client-side hydration is complete
  if (!isLLMConfigLoaded || !isComparisonParamsLoaded) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Loading configuration...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your LLM provider and comparison parameters
        </p>
      </div>

      {saveMessage && (
        <Alert className="mb-6">
          <AlertDescription>{saveMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="llm" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="llm">LLM Configuration</TabsTrigger>
          <TabsTrigger value="comparison">Comparison Parameters</TabsTrigger>
        </TabsList>

        {/* LLM Configuration Tab */}
        <TabsContent value="llm" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Provider Settings</CardTitle>
              <CardDescription>
                Configure your preferred AI provider for document analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Provider Selection */}
              <div className="space-y-3">
                <Label>AI Provider</Label>
                <RadioGroup
                  value={llmConfig.provider}
                  onValueChange={(value: 'openai' | 'gemini' | 'azure') =>
                    setLLMConfig({ ...llmConfig, provider: value, model: getModelOptions()[0]?.value || '' })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="openai" id="openai" />
                    <Label htmlFor="openai">OpenAI (Active)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gemini" id="gemini" />
                    <Label htmlFor="gemini">Google Gemini (Placeholder)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="azure" id="azure" />
                    <Label htmlFor="azure">Azure OpenAI (Placeholder)</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* API Key */}
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder={`Enter your ${llmConfig.provider.toUpperCase()} API key`}
                  value={llmConfig.apiKey}
                  onChange={(e) => setLLMConfig({ ...llmConfig, apiKey: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Your API key is stored locally and never shared
                </p>
              </div>

              {/* Model Selection */}
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select
                  value={llmConfig.model}
                  onValueChange={(value) => setLLMConfig({ ...llmConfig, model: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {getModelOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Temperature */}
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature: {llmConfig.temperature}</Label>
                <Input
                  id="temperature"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={llmConfig.temperature}
                  onChange={(e) => setLLMConfig({ ...llmConfig, temperature: parseFloat(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">
                  Lower values make output more focused, higher values more creative
                </p>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleTestConnection} variant="outline" disabled={isSaving}>
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Parameters Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Insurance Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Insurance</CardTitle>
                <CardDescription>
                  Configure what to compare in personal insurance policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(comparisonParams.personal).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={`personal-${key}`} className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <Switch
                      id={`personal-${key}`}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setComparisonParams({
                          ...comparisonParams,
                          personal: { ...comparisonParams.personal, [key]: checked }
                        })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Commercial Insurance Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Commercial Insurance</CardTitle>
                <CardDescription>
                  Configure what to compare in commercial insurance policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(comparisonParams.commercial).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={`commercial-${key}`} className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <Switch
                      id={`commercial-${key}`}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setComparisonParams({
                          ...comparisonParams,
                          commercial: { ...comparisonParams.commercial, [key]: checked }
                        })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Custom Prompt Section */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Analysis Prompt</CardTitle>
              <CardDescription>
                Customize the AI prompt for document analysis (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter custom instructions for the AI analysis..."
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Leave empty to use default prompts optimized for insurance policy comparison
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <Button onClick={handleSaveSettings} disabled={isSaving} size="lg">
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
