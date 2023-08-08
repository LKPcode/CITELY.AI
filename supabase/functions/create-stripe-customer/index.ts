import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.5";

// let SUPABASE_URL="https://cejmnhihtbftrrelxhwu.supabase.co"
// let SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlam1uaGlodGJmdHJyZWx4aHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1MjY2MzAsImV4cCI6MjAwNTEwMjYzMH0.ns2RkFSKQNcXdd_CtgYYXMGFBGsG7-TP8u07q2lQRrI"
let STRIPE_KEY="sk_test_51Nb1hVCAM4gFDCpwR6XL5BTdu9zJfixq08zp5ZQiO2G86jVj6MRFTWekivdYZSgIKKdSQVPIHzFpTw2kcqppfANz00daxmbJS6"


const stripe = Stripe(STRIPE_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  const { record } = await req.json();

  const customer = await stripe.customers.create({
    email: record.email,
    metadata: {
      supabase_id: record.user_id,
    },
  });

  const { data, error } = await supabase
    .from("user")
    .update({
      stripe_customer_id: customer.id,
    })
    .match({ user_id: record.user_id });

  console.log({ data, error, customer });
  console.log("customer", customer.id);

  return new Response(JSON.stringify({ customer_stripe_id: customer.id }), {
    headers: { "Content-Type": "application/json" },
  });
});