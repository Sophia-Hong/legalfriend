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
    // Get the stripe signature from the request headers
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('No Stripe signature found in request');
    }

    // Get the raw request body
    const body = await req.text();

    // Initialize Stripe
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!stripeSecretKey || !stripeWebhookSecret) {
      throw new Error('Stripe environment variables are not set');
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(
        JSON.stringify({ error: 'Webhook signature verification failed' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Update payment status in the database
        const { error: paymentError } = await supabase
          .from('payments')
          .update({
            status: 'completed',
            stripe_customer_id: session.customer,
            updated_at: new Date().toISOString()
          })
          .eq('stripe_payment_id', session.id);

        if (paymentError) {
          console.error('Error updating payment status:', paymentError);
          throw new Error(`Error updating payment: ${paymentError.message}`);
        }

        // Update contract with payment ID
        if (session.metadata?.contract_id) {
          const { error: contractError } = await supabase
            .from('contracts')
            .update({
              payment_id: session.metadata.payment_id,
              updated_at: new Date().toISOString()
            })
            .eq('id', session.metadata.contract_id);

          if (contractError) {
            console.error('Error updating contract:', contractError);
          }
        }

        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        
        // Update payment status in the database
        if (paymentIntent.metadata?.payment_id) {
          const { error: paymentError } = await supabase
            .from('payments')
            .update({
              status: 'failed',
              updated_at: new Date().toISOString()
            })
            .eq('id', paymentIntent.metadata.payment_id);

          if (paymentError) {
            console.error('Error updating payment status:', paymentError);
          }
        }
        
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 'Content-Type': 'application/json' }, 
        status: 400 
      }
    );
  }
});
