# Stripe Setup — The Kid Reporter

## Keys

| Key | Where it goes |
|-----|---------------|
| Publishable Key (`pk_live_...`) | Already in `subscribe.html` ✅ |
| Secret Key (`sk_live_...`) | Cloudflare Pages environment variable only — never in code |

## Cloudflare Environment Variable (one-time setup)

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com)
2. Select **kidsnews** project → **Settings** → **Environment Variables**
3. Add variable:
   - Name: `STRIPE_SECRET_KEY`
   - Value: your `sk_live_...` key (check your Stripe dashboard or Patrick's notes)
   - Environment: **Production**
4. Save and redeploy

## Stripe Price ID (subscriptions)

The $1/month subscription needs a Price ID from Stripe:

1. Go to [Stripe Products](https://dashboard.stripe.com/products)
2. Create a product → **$1.00 / month** recurring
3. Copy the Price ID (starts with `price_...`)
4. Paste it in `functions/api/create-checkout-session.js` line 28:
   ```js
   const STRIPE_PRICE_ID = 'price_YOUR_ID_HERE';
   ```

## What is already wired

- `subscribe.html` — Stripe Pricing Table with publishable key ✅
- `donate.html` — Stripe Payment Link button ✅
- `/api/create-checkout-session` — subscription checkout function ✅
- `/api/create-payment-intent` — one-time donation function ✅
