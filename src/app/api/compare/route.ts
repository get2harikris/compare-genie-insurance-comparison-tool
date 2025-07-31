import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { compressedFiles, policySubtypes, policyType } = await request.json()
    
    if (!compressedFiles || !policySubtypes || !policyType) {
      return NextResponse.json(
        { error: 'Missing required parameters for comparison' },
        { status: 400 }
      )
    }

    // Get OpenAI API key
    const openaiApiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY

    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please check your settings.' },
        { status: 500 }
      )
    }

    // Mock PDF content for comparison
    const mockPdfContent1 = `
      HOMEOWNERS INSURANCE POLICY - ${policySubtypes.policy1.subtypeName}
      Policy Number: HO-123456789
      Carrier: ABC Insurance Company
      
      COVERAGE LIMITS:
      Coverage A - Dwelling: $300,000
      Coverage B - Other Structures: $30,000 (10% of Coverage A)
      Coverage C - Personal Property: $150,000 (50% of Coverage A, Actual Cash Value)
      Coverage D - Loss of Use: $60,000 (20% of Coverage A)
      
      LIABILITY COVERAGE:
      Personal Liability: $300,000 per occurrence
      Medical Payments to Others: $5,000 per person
      
      DEDUCTIBLES:
      All Perils Deductible: $2,500
      
      ENDORSEMENTS:
      - Standard policy form
      - No additional endorsements
      
      EXCLUSIONS:
      - Flood damage
      - Earthquake damage
      - War and nuclear hazard
      
      ANNUAL PREMIUM: $1,200
    `

    const mockPdfContent2 = `
      HOMEOWNERS INSURANCE POLICY - ${policySubtypes.policy2.subtypeName}
      Policy Number: HO-987654321
      Carrier: XYZ Insurance Company
      
      COVERAGE LIMITS:
      Coverage A - Dwelling: $500,000
      Coverage B - Other Structures: $50,000 (10% of Coverage A)
      Coverage C - Personal Property: $250,000 (50% of Coverage A, Replacement Cost Value)
      Coverage D - Loss of Use: $100,000 (20% of Coverage A)
      
      LIABILITY COVERAGE:
      Personal Liability: $500,000 per occurrence
      Medical Payments to Others: $10,000 per person
      
      DEDUCTIBLES:
      All Perils Deductible: $1,000
      
      ENDORSEMENTS:
      - Personal Property Replacement Cost
      - Identity Theft Coverage ($25,000)
      - Water Backup Coverage ($10,000)
      
      EXCLUSIONS:
      - Earthquake damage (separate coverage available)
      - War and nuclear hazard
      - Basic flood coverage included up to $50,000
      
      ANNUAL PREMIUM: $1,650
    `

    // Create comprehensive comparison prompt
    const systemPrompt = `You are an expert insurance policy analyst. Compare two insurance policy documents and provide a detailed analysis in the following JSON format:

{
  "customerSummary": {
    "keyChanges": ["list of key changes from policy 1 to policy 2"],
    "recommendation": "overall recommendation for the customer"
  },
  "agentSummary": {
    "businessImpact": ["list of business impact items"],
    "actionItems": ["list of action items for the agent"]
  },
  "keyIssues": [
    {
      "category": "issue category",
      "severity": "High/Medium/Low",
      "description": "detailed description",
      "impact": "impact description"
    }
  ],
  "detailedComparison": [
    {
      "category": "coverage category",
      "policy1": "policy 1 value",
      "policy2": "policy 2 value", 
      "difference": "difference with +/- indicator",
      "impact": "impact description"
    }
  ]
}

Focus on the following comparison parameters based on policy type:
${policyType === 'personal' ? 
  'Personal Insurance: deductibles, coverage limits, endorsements, exclusions, premiums' :
  'Commercial Insurance: liability limits, property coverage, business interruption, endorsements, deductibles'
}

Provide actionable insights and highlight significant differences that could impact the policyholder.`

    const userPrompt = `Please compare these two ${policyType} insurance policies (${policySubtypes.policy1.subtype} vs ${policySubtypes.policy2.subtype}):

POLICY 1:
${mockPdfContent1}

POLICY 2:
${mockPdfContent2}

Provide a comprehensive comparison focusing on coverage differences, cost changes, and recommendations.`

    try {
      // Call OpenAI API for comparison
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const aiResponse = await response.json()
      const comparisonResult = JSON.parse(aiResponse.choices[0].message.content)

      return NextResponse.json({
        success: true,
        comparison: comparisonResult,
        policyInfo: {
          policy1: {
            type: policyType,
            subtype: policySubtypes.policy1.subtypeName,
            carrier: "ABC Insurance Company",
            policyNumber: "HO-123456789"
          },
          policy2: {
            type: policyType,
            subtype: policySubtypes.policy2.subtypeName,
            carrier: "XYZ Insurance Company", 
            policyNumber: "HO-987654321"
          }
        },
        message: 'Policy comparison completed successfully'
      })

    } catch (aiError) {
      console.error('OpenAI API error:', aiError)
      
      // Fallback to mock comparison if OpenAI fails
      const mockComparison = {
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

      return NextResponse.json({
        success: true,
        comparison: mockComparison,
        policyInfo: {
          policy1: {
            type: policyType,
            subtype: policySubtypes.policy1.subtypeName,
            carrier: "ABC Insurance Company",
            policyNumber: "HO-123456789"
          },
          policy2: {
            type: policyType,
            subtype: policySubtypes.policy2.subtypeName,
            carrier: "XYZ Insurance Company",
            policyNumber: "HO-987654321"
          }
        },
        message: 'Policy comparison completed successfully (using fallback analysis)',
        warning: 'OpenAI API unavailable, using fallback analysis'
      })
    }

  } catch (error) {
    console.error('Comparison error:', error)
    return NextResponse.json(
      { error: 'Internal server error during policy comparison' },
      { status: 500 }
    )
  }
}
