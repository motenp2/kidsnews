# The Kid Reporter — Cloudflare Pages Starter

A complete kids-run digital newspaper template built for Cloudflare Pages.

## Pages Included
| File | Description |
|------|-------------|
| `index.html` | Homepage with feature hero + 6-article grid |
| `article.html` | Article detail with sidebar |
| `subscribe.html` | $1/month Stripe subscription page |
| `donate.html` | One-time donation form |
| `about.html` | Team page |
| `subscribe-success.html` | Post-checkout confirmation |

## Deploy to Cloudflare Pages

1. Push this repo to GitHub or GitLab
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) → Create Application
3. Connect your repo. Build settings:
   - **Framework**: None (static)
   - **Build command**: (leave blank)
   - **Output directory**: `/` (root)
4. Deploy — your site will be live at `your-project.pages.dev`

## Stripe Integration

### Subscription ($1/month)
1. Create a product in your [Stripe Dashboard](https://dashboard.stripe.com/products) with a $1.00/month recurring price
2. Copy the `price_...` ID into `functions/api/create-checkout-session.js`
3. In Cloudflare Pages → Settings → Environment Variables, add:
   - `STRIPE_SECRET_KEY` = `sk_live_...` (or `sk_test_...` for testing)
4. In `subscribe.html`, replace the demo submit handler with a `fetch('/api/create-checkout-session', ...)` call and redirect to the returned URL

### One-Time Donations
1. In `donate.html`, load Stripe.js and initialize the Payment Element
2. Call `POST /api/create-payment-intent` with the selected amount
3. Confirm payment using the returned `clientSecret`

**Stripe docs:**
- [Subscription Checkout](https://stripe.com/docs/billing/subscriptions/build-subscriptions)
- [Payment Intents](https://stripe.com/docs/payments/payment-intents)
- [Payment Element](https://stripe.com/docs/payments/payment-element)

## Customization Checklist
- [ ] Replace "The Kid Reporter" with your newspaper's name throughout
- [ ] Update contact email (`editor@kidreporter.example.com`)
- [ ] Add real reporter names and bios to `about.html`
- [ ] Connect a CMS (Contentful, Sanity, or Cloudflare D1) for article management
- [ ] Set up a mailing list (Mailchimp / ConvertKit) for the weekly newsletter
- [ ] Add Google Analytics or Cloudflare Web Analytics for traffic
- [ ] Replace demo articles with real kid-written content

## Tech Stack
- **Hosting**: Cloudflare Pages (free tier)
- **Payments**: Stripe (via Cloudflare Pages Functions)
- **Fonts**: Google Fonts (Playfair Display + Plus Jakarta Sans)
- **No frameworks** — pure HTML, CSS, and vanilla JS
