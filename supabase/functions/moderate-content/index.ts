import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { text, lang } = await req.json()

  // استدعاء OpenAI Moderation API
  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Deno.env.get('OPENAI_API_KEY')}`
    },
    body: JSON.stringify({ input: text })
  })

  const data = await response.json()
  const result = data.results[0]

  // إذا كان المحتوى مخالفاً لأي فئة (عنف، كراهية، جنسي، إلخ)
  if (result.flagged) {
    const errorMsg: Record<string, string> = {
      ar: "عذراً، إعلانك يخالف معايير المجتمع (محتوى غير لائق).",
      ti: "ይቕሬታ፡ መላለዪኻ ምስ ሕጊ ማሕበረሰብና ኣይሰማማዕን እዩ።",
      en: "Sorry, your ad violates our community standards."
    }
    
    return new Response(JSON.stringify({ 
      allowed: false, 
      reason: errorMsg[lang] || errorMsg.en 
    }), { headers: { "Content-Type": "application/json" } })
  }

  return new Response(JSON.stringify({ allowed: true }), { 
    headers: { "Content-Type": "application/json" } 
  })
})
