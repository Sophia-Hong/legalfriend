import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contractId, analysisId } = await req.json();
    
    if (!contractId && !analysisId) {
      throw new Error('Either contractId or analysisId must be provided');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let analysis;
    
    if (analysisId) {
      // Get analysis by ID
      const { data, error } = await supabase
        .from('analyses')
        .select(`
          *,
          contract:contracts(*),
          keyterms:keyterms(*)
        `)
        .eq('id', analysisId)
        .single();

      if (error) {
        throw new Error(`Analysis not found: ${error.message}`);
      }
      
      analysis = data;
    } else {
      // Get analysis by contract ID
      const { data, error } = await supabase
        .from('analyses')
        .select(`
          *,
          contract:contracts(*),
          keyterms:keyterms(*)
        `)
        .eq('contract_id', contractId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        throw new Error(`Analysis not found: ${error.message}`);
      }
      
      analysis = data;
    }

    // Check if payment is required
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('contract_id', analysis.contract.id)
      .eq('status', 'completed')
      .maybeSingle();

    const isPaid = !!payment;

    // If not paid, return limited analysis
    if (!isPaid) {
      // Return only partial data (first 2 key terms)
      return new Response(
        JSON.stringify({
          id: analysis.id,
          status: analysis.status,
          summary: analysis.summary ? analysis.summary.substring(0, 150) + '...' : null,
          keyterms: analysis.keyterms.slice(0, 2),
          isPaid: false,
          message: 'Payment required to view full analysis'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return full analysis data
    return new Response(
      JSON.stringify({
        ...analysis,
        isPaid: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error retrieving analysis:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 400 
      }
    );
  }
});
