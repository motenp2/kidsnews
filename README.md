# Pocket Kids News — Safe, Kid-Friendly Daily News for Kids Ages 8–12

**Pocket Kids News** is a free, safe, kid-friendly **daily news for kids** website built for **elementary students ages 8–12**, their parents, teachers, and homeschool families. We turn the day's real **current events for kids** into **simple news articles for children** — calm, age-appropriate, ad-light, and easy to read.

Live site: https://pocketkidsnews.saraiandalani.workers.dev/

---

## What is Pocket Kids News?

Pocket Kids News is a **kids news website** that publishes **educational news for kids** every day. We cover **kid-friendly world events**, **science news for kids**, sports, animals, and **fun facts for kids** — all written at a grade 3–6 reading level so children can understand the world without scary headlines or clickbait.

If you've been searching for any of these, you're in the right place:

- news for kids ages 8-12
- current events for elementary students
- safe news for kids
- daily news for kids
- kid-friendly world events
- simple news for children
- educational news for kids
- science news for kids
- news articles for elementary school
- weekly news for kids / breaking news for kids (explained simply)

---

## Who It's For

- **Parents** asking "How do I explain the news to my child?" or "What news is safe for kids to watch?"
- **Teachers** looking for free current events articles for elementary students (3rd, 4th, 5th, 6th grade)
- **Homeschoolers** who need a reliable news for homeschoolers resource
- **Kids ages 8–12** who want to know what's happening in the world today, explained in plain language

---

## Features

- Daily news articles for kids — short, factual, age-appropriate
- Science news for kids and tech stories every week
- Kid-friendly world events and US current events
- Fun facts for kids, quizzes, crossword, and horoscope sections
- Live real-time date + rotating kids news ticker
- Optional $1/month subscription + one-time donations (Stripe)
- Mobile-first, fast (Cloudflare Pages / Workers)
- No scary headlines, no creepy ads, no tracking pixels aimed at kids

---

## Pages Included

| File | Purpose |
|------|---------|
| `index.html` | Homepage — feature hero + 6-article grid of daily news for kids |
| `article.html` | Article detail page (simple news for children) |
| `about.html` | About Pocket Kids News + the team |
| `subscribe.html` | $1/month Stripe subscription |
| `subscribe-success.html` | Post-checkout confirmation |
| `donate.html` | One-time donation form |
| `crossword.html` | Kids crossword puzzle |
| `horoscope.html` | Fun kids horoscope |
| `thanks.html` | Thank-you page |
| `articles/` | All daily news articles for elementary students |

---

## Tech Stack

- HTML / CSS / vanilla JavaScript — static, fast, lightweight
- Cloudflare Pages + Workers hosting (`functions/api`)
- Stripe for subscriptions and donations
- `_headers` and `_redirects` for security + clean URLs

---

## Deploy to Cloudflare Pages

1. Fork or clone this repo.
2. Go to Cloudflare Pages (https://pages.cloudflare.com/) and Create Application.
3. Connect the repo with build settings:
   - Framework: None (static)
   - Build command: (leave blank)
   - Output directory: `/` (root)
4. Add Stripe env vars (see `STRIPE_SETUP.md`).
5. Deploy. Your kids news website is live.

---

## SEO / Keyword Focus

This project targets high-intent, low-difficulty kid-news keywords:

**Primary:** news for kids, daily news for kids, current events for kids, safe news for kids, news for kids ages 8-12

**Secondary:** kid-friendly world events, simple news for children, educational news for kids, science news for kids, news articles for elementary school, current events for elementary students, fun facts for kids

**Long-tail (parent + teacher voice search):**
- How do kids learn about world events?
- Easy explanations of news for 10-year-olds
- How do I explain the news to my child?
- Free current events articles for 4th grade / 5th grade
- Best news website for elementary students
- Kid-friendly alternative to BBC Newsround / Time for Kids / DOGOnews
- News for homeschoolers
- Lexile-leveled news articles free

---

## Roadmap

- RSS feed for daily kids news
- Lexile / grade-level toggle per article
- Read-aloud audio for every article
- Printable PDF worksheets for teachers
- Spanish-language edition (noticias para niños)
- Weekly newsletter for parents and teachers

---

## License

Content © Pocket Kids News. Code released under MIT.

*Pocket Kids News — daily news for kids, made safe and simple.*
