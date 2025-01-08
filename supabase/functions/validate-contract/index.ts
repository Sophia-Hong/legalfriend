import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { contractId } = await req.json()
    console.log('Validating contract:', contractId)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Update contract status to processing
    const { error: updateError } = await supabase
      .from('contracts')
      .update({ status: 'processing' })
      .eq('id', contractId)

    if (updateError) {
      throw updateError
    }

    // Create initial analysis record
    const { error: analysisError } = await supabase
      .from('contract_analyses')
      .insert({
        contract_id: contractId,
        status: 'processing'
      })

    if (analysisError) {
      throw analysisError
    }

    // TODO: Trigger n8n workflow here with your n8n webhook URL
    // const n8nResponse = await fetch('YOUR_N8N_WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ contractId })
    // })

    return new Response(
      JSON.stringify({ message: 'Contract validation initiated' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing contract:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})