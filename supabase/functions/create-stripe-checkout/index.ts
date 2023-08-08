import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.5";

let STRIPE_KEY = "sk_test_51Nb1hVCAM4gFDCpwR6XL5BTdu9zJfixq08zp5ZQiO2G86jVj6MRFTWekivdYZSgIKKdSQVPIHzFpTw2kcqppfANz00daxmbJS6"

const stripe = Stripe(STRIPE_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

//  cors
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Expose-Headers": "Content-Length, X-JSON",
  "Access-Control-Allow-Headers": "apikey, X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
}

serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response(null, { headers })
  }


  const { planId } = await req.json();

  console.log("planId", planId)

  const token = req.headers.get("Authorization")!.replace("Bearer ", "");
  const { user } = await supabase.auth.api.getUser(token);

  if (!user) {
    throw new Error("User not found");
  }

  const {
    data: { stripe_customer_id },
  } = await supabase
    .from("user")
    .select("stripe_customer_id")
    .match({ user_id: user.id })
    .single();

  console.log( "Customer ID" , stripe_customer_id)

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer_id,
    mode: 'subscription',
    line_items: [
      {
        price: planId,
        quantity: 1,
      },
    ],
    payment_method_types: ['card'],
    success_url: 'http://127.0.0.1:5173/home?status=success',
    cancel_url: 'http://127.0.0.1:5173/cancel',
  });

  return new Response(JSON.stringify({ session: session }), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "apikey, X-Client-Info, Authorization",
    },
  });
});