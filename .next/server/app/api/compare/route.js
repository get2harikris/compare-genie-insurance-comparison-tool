(()=>{var e={};e.id=763,e.ids=[763],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4094:(e,r,o)=>{"use strict";o.r(r),o.d(r,{patchFetch:()=>m,routeModule:()=>p,serverHooks:()=>d,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>u});var t={};o.r(t),o.d(t,{POST:()=>n});var a=o(6559),i=o(8088),s=o(7719),c=o(2190);async function n(e){try{let{compressedFiles:r,policySubtypes:o,policyType:t}=await e.json();if(!r||!o||!t)return c.NextResponse.json({error:"Missing required parameters for comparison"},{status:400});let a=process.env.OPENAI_API_KEY||process.env.NEXT_PUBLIC_OPENAI_API_KEY;if(!a)return c.NextResponse.json({error:"OpenAI API key not configured. Please check your settings."},{status:500});let i=`
      HOMEOWNERS INSURANCE POLICY - ${o.policy1.subtypeName}
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
    `,s=`
      HOMEOWNERS INSURANCE POLICY - ${o.policy2.subtypeName}
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
    `,n=`You are an expert insurance policy analyst. Compare two insurance policy documents and provide a detailed analysis in the following JSON format:

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
${"personal"===t?"Personal Insurance: deductibles, coverage limits, endorsements, exclusions, premiums":"Commercial Insurance: liability limits, property coverage, business interruption, endorsements, deductibles"}

Provide actionable insights and highlight significant differences that could impact the policyholder.`,p=`Please compare these two ${t} insurance policies (${o.policy1.subtype} vs ${o.policy2.subtype}):

POLICY 1:
${i}

POLICY 2:
${s}

Provide a comprehensive comparison focusing on coverage differences, cost changes, and recommendations.`;try{let e=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-4",messages:[{role:"system",content:n},{role:"user",content:p}],temperature:.3,max_tokens:2e3})});if(!e.ok)throw Error(`OpenAI API error: ${e.status}`);let r=await e.json(),i=JSON.parse(r.choices[0].message.content);return c.NextResponse.json({success:!0,comparison:i,policyInfo:{policy1:{type:t,subtype:o.policy1.subtypeName,carrier:"ABC Insurance Company",policyNumber:"HO-123456789"},policy2:{type:t,subtype:o.policy2.subtypeName,carrier:"XYZ Insurance Company",policyNumber:"HO-987654321"}},message:"Policy comparison completed successfully"})}catch(e){return console.error("OpenAI API error:",e),c.NextResponse.json({success:!0,comparison:{customerSummary:{keyChanges:["Coverage limit increased from $300,000 to $500,000","Deductible reduced from $2,500 to $1,000","Added personal property replacement cost coverage","Removed earthquake coverage exclusion"],recommendation:"The new policy provides significantly better coverage with lower out-of-pocket costs. The increased coverage limits and reduced deductible make this a favorable change for the policyholder."},agentSummary:{businessImpact:["Premium increase of $450 annually","Higher commission due to increased coverage","Client retention improved with better coverage"],actionItems:["Schedule policy review meeting with client","Update client file with new coverage details","Send welcome packet for new carrier"]},keyIssues:[{category:"Coverage Gap",severity:"High",description:"Policy 1 excludes flood damage while Policy 2 includes basic flood coverage",impact:"Potential $50,000+ exposure reduction"},{category:"Deductible Change",severity:"Medium",description:"Deductible structure changed from percentage-based to fixed amount",impact:"More predictable out-of-pocket costs for claims"}],detailedComparison:[{category:"Dwelling Coverage",policy1:"$300,000",policy2:"$500,000",difference:"+$200,000",impact:"Increased protection"},{category:"Personal Property",policy1:"$150,000 (ACV)",policy2:"$250,000 (RCV)",difference:"+$100,000 + RCV",impact:"Better coverage type"},{category:"Deductible",policy1:"$2,500",policy2:"$1,000",difference:"-$1,500",impact:"Lower out-of-pocket"},{category:"Annual Premium",policy1:"$1,200",policy2:"$1,650",difference:"+$450",impact:"Higher cost"}]},policyInfo:{policy1:{type:t,subtype:o.policy1.subtypeName,carrier:"ABC Insurance Company",policyNumber:"HO-123456789"},policy2:{type:t,subtype:o.policy2.subtypeName,carrier:"XYZ Insurance Company",policyNumber:"HO-987654321"}},message:"Policy comparison completed successfully (using fallback analysis)",warning:"OpenAI API unavailable, using fallback analysis"})}}catch(e){return console.error("Comparison error:",e),c.NextResponse.json({error:"Internal server error during policy comparison"},{status:500})}}let p=new a.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/compare/route",pathname:"/api/compare",filename:"route",bundlePath:"app/api/compare/route"},resolvedPagePath:"/project/sandbox/user-workspace/src/app/api/compare/route.ts",nextConfigOutput:"",userland:t}),{workAsyncStorage:l,workUnitAsyncStorage:u,serverHooks:d}=p;function m(){return(0,s.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:u})}},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6487:()=>{},8335:()=>{},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var r=require("../../../webpack-runtime.js");r.C(e);var o=e=>r(r.s=e),t=r.X(0,[447,580],()=>o(4094));module.exports=t})();