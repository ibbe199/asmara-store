import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { orderID, adID } = await req.json()

  // 1. استدعاء توكن PayPal (Access Token)
  // يجب تخزين PAYPAL_CLIENT_ID و PAYPAL_SECRET في Supabase Secrets
  const auth = btoa(`${Deno.env.get('PAYPAL_CLIENT_ID')}:${Deno.env.get('PAYPAL_SECRET')}`)
  const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: { Authorization: `Basic ${auth}` }
  })
  const { access_token } = await response.json()

  // 2. التحقق من حالة الطلب في PayPal
  const orderRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
  const orderData = await orderRes.json()

  if (orderData.status === 'COMPLETED') {
    // 3. تحديث الإعلان في قاعدة البيانات
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    await supabase
      .from('ads')
      .update({ is_featured: true })
      .eq('id', adID)

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } })
  }

  return new Response(JSON.stringify({ success: false }), { status: 400 })
})
