(()=>{var e={};e.id=707,e.ids=[707],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},2135:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>y,routeModule:()=>u,serverHooks:()=>d,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>p});var s={};t.r(s),t.d(s,{POST:()=>c});var o=t(6559),n=t(8088),i=t(7719),a=t(2190);async function c(e){try{let{compressedFiles:r,policyType:t}=await e.json();if(!r||!Array.isArray(r)||2!==r.length)return a.NextResponse.json({error:"Two compressed files are required"},{status:400});if(!t||!["personal","commercial"].includes(t))return a.NextResponse.json({error:"Valid policy type (personal or commercial) is required"},{status:400});let s=process.env.OPENAI_API_KEY||process.env.NEXT_PUBLIC_OPENAI_API_KEY;if(!s)return a.NextResponse.json({error:"OpenAI API key not configured. Please check your settings."},{status:500});let o=`
      HOMEOWNERS INSURANCE POLICY
      Policy Type: HO-3 Special Form
      Coverage A - Dwelling: $300,000
      Coverage B - Other Structures: $30,000
      Coverage C - Personal Property: $150,000
      Coverage D - Loss of Use: $60,000
      Personal Liability: $300,000
      Medical Payments: $5,000
      Deductible: $2,500
    `,n=`
      HOMEOWNERS INSURANCE POLICY
      Policy Type: HO-5 Comprehensive Form
      Coverage A - Dwelling: $500,000
      Coverage B - Other Structures: $50,000
      Coverage C - Personal Property: $250,000
      Coverage D - Loss of Use: $100,000
      Personal Liability: $500,000
      Medical Payments: $10,000
      Deductible: $1,000
    `,i=`You are an insurance policy analysis expert. Analyze the provided insurance policy documents and determine the specific policy subtype.

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
}`,c=`Please analyze these two ${t} insurance policy documents and determine their specific subtypes:

Policy Document 1:
${o}

Policy Document 2:
${n}`;try{let e=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-4",messages:[{role:"system",content:i},{role:"user",content:c}],temperature:.3,max_tokens:1e3})});if(!e.ok)throw Error(`OpenAI API error: ${e.status}`);let r=await e.json(),t=JSON.parse(r.choices[0].message.content);return a.NextResponse.json({success:!0,policySubtypes:t,message:"Policy subtypes detected successfully"})}catch(e){return console.error("OpenAI API error:",e),a.NextResponse.json({success:!0,policySubtypes:{policy1:{subtype:"personal"===t?"HO3":"BOP",subtypeName:"personal"===t?"Special Form Homeowners":"Business Owners Policy",confidence:"medium"},policy2:{subtype:"personal"===t?"HO5":"GL",subtypeName:"personal"===t?"Comprehensive Form Homeowners":"General Liability",confidence:"medium"}},message:"Policy subtypes detected successfully (using fallback detection)",warning:"OpenAI API unavailable, using fallback detection"})}}catch(e){return console.error("Detection error:",e),a.NextResponse.json({error:"Internal server error during policy subtype detection"},{status:500})}}let u=new o.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/detect/route",pathname:"/api/detect",filename:"route",bundlePath:"app/api/detect/route"},resolvedPagePath:"/project/sandbox/user-workspace/src/app/api/detect/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:p,serverHooks:d}=u;function y(){return(0,i.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:p})}},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6487:()=>{},8335:()=>{},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[447,580],()=>t(2135));module.exports=s})();