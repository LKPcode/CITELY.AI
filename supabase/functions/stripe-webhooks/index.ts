import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@9.6.0?target=deno&no-check";
import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.5";

let STRIPE_KEY = "sk_test_51Nb1hVCAM4gFDCpwR6XL5BTdu9zJfixq08zp5ZQiO2G86jVj6MRFTWekivdYZSgIKKdSQVPIHzFpTw2kcqppfANz00daxmbJS6";
let STRIPE_SIGNING_SECRET = "whsec_oy33kDCFLeh8OG9s5TUDoHRKF6LXaq1z";

let stripe_headers = {
    headers: {
      Authorization: `Bearer ${STRIPE_KEY}`,
    }
  }

const stripe = Stripe(STRIPE_KEY, {
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider();

console.log(`Function "stripe-webhooks" up and running!`);

serve(async (request) => {
  try{
  const signature = request.headers.get("Stripe-Signature");

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = await request.text();
  // let receivedEvent;
  // try {
  //   receivedEvent = await stripe.webhooks.constructEventAsync(
  //     body,
  //     signature,
  //     STRIPE_SIGNING_SECRET,
  //     undefined,
  //     cryptoProvider
  //   );
  // } catch (err) {
  //   return new Response(err.message, { status: 400 });
  // }

  let receivedEvent = JSON.parse(body);
  console.log(`🔔 Event received: ${receivedEvent.id}`);

  // // Secondly, we use this event to query the Stripe API in order to avoid
  // // handling any forged event. If available, we use the idempotency key.
  // const requestOptions =
  //   receivedEvent.request && receivedEvent.request.idempotency_key
  //     ? {
  //         idempotencyKey: receivedEvent.request.idempotency_key,
  //       }
  //     : {};

  // let receivedEvent;
  // try {
  //   receivedEvent = await stripe.events.retrieve(
  //     receivedEvent.id,
  //     requestOptions
  //   );
  // } catch (err) {
  //   return new Response(err.message, { status: 400 });
  // }

  const subscription = receivedEvent.data.object;


  console.log(`🍺 Event type: ${receivedEvent.type}`);

  switch (receivedEvent.type) {
    case "customer.subscription.deleted":
      await supabase
        .from("user")
        .update({
          subscription_plan: "FREE",
        })
        .match({ stripe_customer_id: subscription.customer });
      // Then define and call a function to handle the receivedEvent customer.subscription.deleted
      break;
    case "customer.subscription.updated" || "customer.subscription.created":
      console.log("customer.subscription.updated", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

      const productId = subscription.plan.product; // Replace with the actual product ID

      // Fetch the product
      let product = await fetch(`https://api.stripe.com/v1/products/${productId}`, stripe_headers)
      let productJson = await product.json();
      console.log("productJson", productJson);
      product = productJson;  

      console.log("product", product);
      let user_updated = await supabase
        .from("user")
        .update({
          subscription_plan: product.name || "FREE",
        })
        .match({ stripe_customer_id: subscription.customer }).single();

      console.log("updated user", user_updated);
      // Then define and call a function to handle the receivedEvent customer.subscription.updated
      break;
    // ... handle other receivedEvent types
    default:
      console.log(`Unhandled receivedEvent type ${receivedEvent.type}`);
  }


  return new Response(JSON.stringify({ id: receivedEvent.id, status: "ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

}catch(err){
  console.log("LKP",err);
  return new Response(err.message, { status: 400 });
}

});