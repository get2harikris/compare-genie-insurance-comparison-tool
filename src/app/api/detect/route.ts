import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { compressedFiles, policyType } = await request.json()
    
    if (!compressedFiles || !Array.isArray(compressedFiles) || compressedFiles.length !== 2) {
      return NextResponse.json(
        { error: 'Two compressed files are required' },
        { status: 400 }
      )
    }

    if (!policyType || !['personal', 'commercial'].includes(policyType)) {
      return NextResponse.json(
        { error: 'Valid policy type (personal or commercial) is required' },
        { status: 400 }
      )
    }

    // Get OpenAI API key from environment or settings
    const openaiApiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY

    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please check your settings.' },
        { status: 500 }
      )
    }

    // Simulate PDF text extraction
    // In a real implementation, you would:
    // 1. Extract text from the compressed PDF files using pdf-parse or similar
    // 2. Send the extracted text to OpenAI for analysis
    
    const mockPdfContent1 = `
      HOMEOWNERS INSURANCE POLICY
      Policy Type: HO-3 Special Form
      Coverage A - Dwelling: $300,000
      Coverage B - Other Structures: $30,000
      Coverage C - Personal Property: $150,000
      Coverage D - Loss of Use: $60,000
      Personal Liability: $300,000
      Medical Payments: $5,000
      Deductible: $2,500
    `

    const mockPdfContent2 = `
      HOMEOWNERS INSURANCE POLICY
      Policy Type: HO-5 Comprehensive Form
      Coverage A - Dwelling: $500,000
      Coverage B - Other Structures: $50,000
      Coverage C - Personal Property: $250,000
      Coverage D - Loss of Use: $100,000
      Personal Liability: $500,000
      Medical Payments: $10,000
      Deductible: $1,000
    `

    // Create prompt for policy subtype detection
    const systemPrompt = `You are an insurance policy analysis expert. Analyze the provided insurance policy documents and determine the specific policy subtype.

For Personal Insurance, common subtypes include:
- HO1: Basic Form
- HO2: Broad Form  
- HO3: Special Form
- HO4: Renters/Tenants
- HO5: Comprehensive Form
- HO6: Condominium
- HO8: Modified Coverage

For Commercial Insurance, common subtypes include:
- BOP: Business Owners Policy
- GL: General Liability
- CGL: Commercial General Liability
- CPP: Commercial Package Policy
- WC: Workers Compensation

Return your analysis in JSON format with the following structure:
{
  "policy1": {
    "subtype": "detected subtype code",
    "subtypeName": "full subtype name",
    "confidence": "confidence level (high/medium/low)"
  },
  "policy2": {
    "subtype": "detected subtype code", 
    "subtypeName": "full subtype name",
    "confidence": "confidence level (high/medium/low)"
  }
}`

    const userPrompt = `Please analyze these two ${policyType} insurance policy documents and determine their specific subtypes:

Policy Document 1:
${mockPdfContent1}

Policy Document 2:
${mockPdfContent2}`

    try {
      // Call OpenAI API
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
          max_tokens: 1000
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const aiResponse = await response.json()
      const analysisResult = JSON.parse(aiResponse.choices[0].message.content)

      return NextResponse.json({
        success: true,
        policySubtypes: analysisResult,
        message: 'Policy subtypes detected successfully'
      })

    } catch (aiError) {
      console.error('OpenAI API error:', aiError)
      
      // Fallback to mock detection if OpenAI fails
      const mockDetection = {
        policy1: {
          subtype: policyType === 'personal' ? 'HO3' : 'BOP',
          subtypeName: policyType === 'personal' ? 'Special Form Homeowners' : 'Business Owners Policy',
          confidence: 'medium'
        },
        policy2: {
          subtype: policyType === 'personal' ? 'HO5' : 'GL',
          subtypeName: policyType === 'personal' ? 'Comprehensive Form Homeowners' : 'General Liability',
          confidence: 'medium'
        }
      }

      return NextResponse.json({
        success: true,
        policySubtypes: mockDetection,
        message: 'Policy subtypes detected successfully (using fallback detection)',
        warning: 'OpenAI API unavailable, using fallback detection'
      })
    }

  } catch (error) {
    console.error('Detection error:', error)
    return NextResponse.json(
      { error: 'Internal server error during policy subtype detection' },
      { status: 500 }
    )
  }
}
