/**
 * Cloudflare Pages Function — Stripe Subscription Checkout
 * =========================================================
 * Route: POST /api/create-checkout-session
 *
 * SETUP STEPS:
 * 1. In your Cloudflare Pages project → Settings → Environment Variables
 *    add: STRIPE_SECRET_KEY = sk_live_xxxxxxxxxxxxxxxx
 *
 * 2. In Stripe Dashboard → Products, create a product with a
 *    recurring price of $1.00 USD/month. Copy the Price ID
 *    (starts with price_...) and paste it below.
 *
 * 3. Deploy this repo to Cloudflare Pages. Functions are auto-detected
 *    from the /functions directory.
 *
 * 4. In subscribe.html, replace the demo form submit handler with:
 *
 *    const res = await fetch('/api/create-checkout-session', {
 *      method: 'POST',
 *      headers: { 'Content-Type': 'application/json' },
 *      body: JSON.stringify({ email: emailValue })
 *    });
 *    const { url } = await res.json();
 *    window.location.href = url;  // Redirect to Stripe Checkout
 */

const STRIPE_PRICE_ID = 'price_REPLACE_WITH_YOUR_PRICE_ID'; // $1/month recurring

export async function onRequestPost(context) {
  const { env, request } = context;
  const stripeKey = env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return new Response(JSON.stringify({ error: 'Stripe key not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body = {};
  try {
    body = await request.json();
  } catch (_) {}

  const origin = new URL(request.url).origin;

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'mode':                               'subscription',
      'line_items[0][price]':               STRIPE_PRICE_ID,
      'line_items[0][quantity]':            '1',
      'customer_email':                     body.email || '',
      'success_url':                        `${origin}/subscribe-success.html?session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url':                         `${origin}/subscribe.html`,
      'payment_method_types[0]':            'card',
      'subscription_data[trial_period_days]': '0',
      'billing_address_collection':         'auto',
      'allow_promotion_codes':              'true',
    })
  });

  const session = await stripeResponse.json();

  if (!stripeResponse.ok) {
    return new Response(JSON.stringify({ error: session.error?.message || 'Stripe error.' }), {
      status: stripeResponse.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
    }
  });
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
