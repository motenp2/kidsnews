/**
 * Cloudflare Pages Function — Stripe One-Time Donation
 * ====================================================
 * Route: POST /api/create-payment-intent
 *
 * SETUP: Set STRIPE_SECRET_KEY in Cloudflare Pages Environment Variables.
 *
 * USAGE from donate.html:
 *
 *   const res = await fetch('/api/create-payment-intent', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ amount: 25, currency: 'usd', email: emailValue })
 *   });
 *   const { clientSecret } = await res.json();
 *   // Then confirm with Stripe Payment Element
 */

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
  try { body = await request.json(); } catch (_) {}

  const amountCents = Math.round((parseFloat(body.amount) || 25) * 100);

  const stripeResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'amount':                    String(amountCents),
      'currency':                  body.currency || 'usd',
      'payment_method_types[0]':   'card',
      'receipt_email':             body.email || '',
      'metadata[donor_name]':      body.name || 'Anonymous',
      'metadata[message]':         body.message || '',
      'description':               'Donation — The Kid Reporter',
    })
  });

  const intent = await stripeResponse.json();

  if (!stripeResponse.ok) {
    return new Response(JSON.stringify({ error: intent.error?.message || 'Stripe error.' }), {
      status: stripeResponse.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ clientSecret: intent.client_secret }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

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
