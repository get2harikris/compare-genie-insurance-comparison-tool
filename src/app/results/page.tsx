"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Mock data for demonstration
const mockResults = {
  policyInfo: {
    policy1: {
      type: "Personal",
      subtype: "HO3 - Homeowners",
      carrier: "ABC Insurance",
      policyNumber: "HO-123456789"
    },
    policy2: {
      type: "Personal", 
      subtype: "HO5 - Homeowners",
      carrier: "XYZ Insurance",
      policyNumber: "HO-987654321"
    }
  },
  customerSummary: {
    keyChanges: [
      "Coverage limit increased from $300,000 to $500,000",
      "Deductible reduced from $2,500 to $1,000",
      "Added personal property replacement cost coverage",
      "Removed earthquake coverage exclusion"
    ],
    recommendation: "The new policy provides significantly better coverage with lower out-of-pocket costs. The increased coverage limits and reduced deductible make this a favorable change for the policyholder."
  },
  agentSummary: {
    businessImpact: [
      "Premium increase of $450 annually",
      "Higher commission due to increased coverage",
      "Client retention improved with better coverage"
    ],
    actionItems: [
      "Schedule policy review meeting with client",
      "Update client file with new coverage details",
      "Send welcome packet for new carrier"
    ]
  },
  keyIssues: [
    {
      category: "Coverage Gap",
      severity: "High",
      description: "Policy 1 excludes flood damage while Policy 2 includes basic flood coverage",
      impact: "Potential $50,000+ exposure reduction"
    },
    {
      category: "Deductible Change",
      severity: "Medium", 
      description: "Deductible structure changed from percentage-based to fixed amount",
      impact: "More predictable out-of-pocket costs for claims"
    },
    {
      category: "Endorsement Difference",
      severity: "Low",
      description: "Policy 2 includes identity theft coverage not present in Policy 1",
      impact: "Additional $25,000 coverage for identity theft expenses"
    }
  ],
  detailedComparison: [
    {
      category: "Dwelling Coverage",
      policy1: "$300,000",
      policy2: "$500,000",
      difference: "+$200,000",
      impact: "Increased protection"
    },
    {
      category: "Personal Property",
      policy1: "$150,000 (ACV)",
      policy2: "$250,000 (RCV)",
      difference: "+$100,000 + RCV",
      impact: "Better coverage type"
    },
    {
      category: "Liability",
      policy1: "$300,000",
      policy2: "$500,000", 
      difference: "+$200,000",
      impact: "Increased protection"
    },
    {
      category: "Deductible",
      policy1: "$2,500",
      policy2: "$1,000",
      difference: "-$1,500",
      impact: "Lower out-of-pocket"
    },
    {
      category: "Annual Premium",
      policy1: "$1,200",
      policy2: "$1,650",
      difference: "+$450",
      impact: "Higher cost"
    }
  ]
}

export default function ResultsPage() {
  const [isExporting, setIsExporting] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [exportMessage, setExportMessage] = useState('')

  const handleDownloadPDF = async () => {
    setIsExporting(true)
    setExportMessage('Generating PDF report...')
    
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      setExportMessage('PDF report downloaded successfully!')
      
      // In a real implementation, this would trigger a file download
      const link = document.createElement('a')
      link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA4IFRmCjEwMCA3MDAgVGQKKENvbXBhcmVHZW5pZSBSZXBvcnQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAzMjQgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0MTYKJSVFT0Y='
      link.download = 'policy-comparison-report.pdf'
      link.click()
      
    } catch {
      setExportMessage('Error generating PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleSendEmail = async () => {
    if (!email) {
      setExportMessage('Please enter an email address.')
      return
    }

    setIsExporting(true)
    setExportMessage('Sending email...')
    
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000))
      setExportMessage(`Report sent successfully to ${email}!`)
      setEmailDialogOpen(false)
      setEmail('')
    } catch {
      setExportMessage('Error sending email. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'default'
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Policy Comparison Results</h1>
            <p className="text-muted-foreground">
              Detailed analysis of your insurance policy documents
            </p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleDownloadPDF} disabled={isExporting}>
              Download PDF Report
            </Button>
            <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={isExporting}>
                  Send via Email
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Report via Email</DialogTitle>
                  <DialogDescription>
                    Enter the email address where you&apos;d like to send the comparison report.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendEmail} disabled={isExporting}>
                      Send Report
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {exportMessage && (
        <Alert className="mb-6">
          <AlertDescription>{exportMessage}</AlertDescription>
        </Alert>
      )}

      {/* Policy Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Policy Document 1</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span>{mockResults.policyInfo.policy1.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtype:</span>
              <span>{mockResults.policyInfo.policy1.subtype}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Carrier:</span>
              <span>{mockResults.policyInfo.policy1.carrier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Policy #:</span>
              <span className="font-mono text-sm">{mockResults.policyInfo.policy1.policyNumber}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Policy Document 2</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span>{mockResults.policyInfo.policy2.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtype:</span>
              <span>{mockResults.policyInfo.policy2.subtype}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Carrier:</span>
              <span>{mockResults.policyInfo.policy2.carrier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Policy #:</span>
              <span className="font-mono text-sm">{mockResults.policyInfo.policy2.policyNumber}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Results Tabs */}
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="issues">Key Issues</TabsTrigger>
          <TabsTrigger value="comparison">Detailed Comparison</TabsTrigger>
          <TabsTrigger value="agent">Agent Notes</TabsTrigger>
        </TabsList>

        {/* Customer Summary Tab */}
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Customer Summary</CardTitle>
              <CardDescription>
                Key changes and recommendations for the policyholder
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Key Changes</h3>
                <ul className="space-y-2">
                  {mockResults.customerSummary.keyChanges.map((change, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-3">Recommendation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {mockResults.customerSummary.recommendation}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Key Issues Tab */}
        <TabsContent value="issues">
          <div className="space-y-4">
            {mockResults.keyIssues.map((issue, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{issue.category}</CardTitle>
                    <Badge variant={getSeverityColor(issue.severity) as "default" | "destructive" | "secondary"}>
                      {issue.severity} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">{issue.description}</p>
                  <div className="bg-muted p-3 rounded-lg">
                    <span className="font-medium">Impact: </span>
                    <span className="text-muted-foreground">{issue.impact}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Detailed Comparison Tab */}
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Side-by-Side Comparison</CardTitle>
              <CardDescription>
                Detailed breakdown of coverage differences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Coverage Category</TableHead>
                    <TableHead>Policy 1</TableHead>
                    <TableHead>Policy 2</TableHead>
                    <TableHead>Difference</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockResults.detailedComparison.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>{item.policy1}</TableCell>
                      <TableCell>{item.policy2}</TableCell>
                      <TableCell className={
                        item.difference.startsWith('+') ? 'text-green-600' : 
                        item.difference.startsWith('-') && item.category !== 'Deductible' ? 'text-red-600' :
                        item.difference.startsWith('-') && item.category === 'Deductible' ? 'text-green-600' :
                        'text-muted-foreground'
                      }>
                        {item.difference}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.impact}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent Summary Tab */}
        <TabsContent value="agent">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Impact</CardTitle>
                <CardDescription>
                  Financial and business considerations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockResults.agentSummary.businessImpact.map((impact, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{impact}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Action Items</CardTitle>
                <CardDescription>
                  Next steps and follow-up tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockResults.agentSummary.actionItems.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
