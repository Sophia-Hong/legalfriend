import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";

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
    const { contractId, userId, returnUrl } = await req.json();
    
    if (!contractId) {
      throw new Error('contractId is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get contract details
    const { data: contract, error: contractError } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', contractId)
      .single();

    if (contractError || !contract) {
      throw new Error(`Contract not found: ${contractError?.message}`);
    }

    // Initialize Stripe
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Set the payment amount (in cents)
    const paymentAmount = 1999; // $19.99
    
    // Create a payment record in the database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        contract_id: contractId,
        amount: paymentAmount,
        currency: 'usd',
        status: 'pending'
      })
      .select()
      .single();

    if (paymentError) {
      throw new Error(`Error creating payment record: ${paymentError.message}`);
    }

    // Create a Stripe Checkout Session
    const frontendUrl = Deno.env.get('FRONTEND_URL') || 'http://localhost:5173';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Lease Analysis',
              description: `Complete analysis of ${contract.file_name}`,
            },
            unit_amount: paymentAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${returnUrl || frontendUrl}/lease-review-summary?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${returnUrl || frontendUrl}/lease-review-summary?canceled=true`,
      metadata: {
        payment_id: payment.id,
        contract_id: contractId,
        user_id: userId
      }
    });

    // Update payment record with Stripe session ID
    await supabase
      .from('payments')
      .update({
        stripe_payment_id: session.id
      })
      .eq('id', payment.id);

    return new Response(
      JSON.stringify({ 
        paymentId: payment.id,
        checkoutUrl: session.url 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating payment:', error);
    
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
