# Breath Chakra Reset — Landing Page

Dark, conversion-focused React + Vite + Tailwind + Framer Motion landing page for
Dr. Valarmathi Srinivasan's Breath Chakra Reset masterclass.

## Run locally

```bash
cd gutchakra-lp
npm install
cp .env.example .env       # optional — fill webhook URLs
npm run dev                # http://localhost:5173
npm run build && npm run preview
```

## Bundle (gzipped)

| Asset | Gzip |
|---|---|
| index.html | 1.5 KB |
| Critical CSS | 6.6 KB |
| Hero + critical JS | 9.1 KB |
| React | 43 KB |
| Framer Motion | 41 KB |
| BookModal (lazy, only on open) | 2.9 KB |
| Each below-hero section | < 1 KB |
| **Initial paint** | **~100 KB** |

## What's new in v2

### 1. Price-reveal confetti mechanic
- On first visit, page renders with `WORKSHOP.priceAnchor` (₹999).
- ~900 ms after mount, confetti explodes and the price snaps to `WORKSHOP.priceFinal` (₹99) everywhere on the page (hero + final CTA + bottom bar + header all sync via a window event).
- Tracked in `sessionStorage` so it only fires **once per tab** — refresh shows ₹99 immediately, no replay.
- `prefers-reduced-motion` users skip the confetti.

### 2. Booking modal with order bump
- "Book my seat" buttons open a slide-up modal (bottom-sheet on mobile, centred on desktop).
- Collects: Name, Email, WhatsApp, Profession.
- Pre-checked order bump: **Lifetime Access to Recording (+₹199)** → toggling updates the running total live.
- Submit fires a `lead` event to your CRM webhook(s) and **redirects to your Razorpay page** with everything pre-filled.

### 3. Razorpay handoff with URL prefill
Form values are passed via URL search params using both naming conventions:
- Razorpay Payment Pages custom-field slugs: `?name=&email=&whatsapp_number=&profession=&lifetime_access_to_the_recording_and_detailed_notes=Yes&amount=`
- Razorpay Checkout convention: `?prefill[name]=&prefill[email]=&prefill[contact]=`

**Adjust if your fields don't match.** Open `src/data/content.js` → `RAZORPAY.paramMap` and edit the slug values to match the field labels on your Razorpay page (Razorpay slugifies field labels lowercase, underscores). Confirm by inspecting your live page's URL when prefilled by hand.

### 4. Top "NO UPSELLS. EVER." banner
Edit copy at `content.js → TOP_BANNER`. Static on desktop, marquee on mobile.

### 5. Sticky bottom discount-unlocked bar
Slides in after the user scrolls past the hero **and** the price has been revealed. Shows strike-through anchor → revealed price → countdown → CTA.

### 6. Real emotion photography
6 photos in `public/images/pain/` (sourced from Unsplash, ~660KB total, lazy-loaded with explicit width/height to prevent CLS). Hero LCP image is preloaded via `<link rel="preload">`.

To swap with your own shoots, drop replacement JPGs/WebPs with the same filenames in `public/images/pain/`.

## Environment variables (`.env`)

| Var | Purpose |
|---|---|
| `VITE_WEBHOOK_URL` | Primary lead webhook (n8n / Zapier / Make). Receives JSON of form payload. |
| `VITE_FALLBACK_SHEET_URL` | Apps Script Web App URL as fallback. |

The redirect to Razorpay always happens. Webhooks are fired **before** redirect (using `keepalive: true`) so leads still land even if the user closes the tab on the Razorpay page.

## Where things live

```
src/
├── App.jsx                      # Wires header, hero, sections, modal, bottom bar
├── data/content.js              # ALL copy + pricing + Razorpay param map
├── lib/analytics.js             # GTM + Meta Pixel wrapper
├── styles/index.css             # Tailwind layers + utility classes
├── components/
│   ├── BookModal.jsx            # Booking modal + order bump + Razorpay redirect
│   ├── BottomBar.jsx            # Sticky "Special discount unlocked" bar
│   ├── Confetti.jsx             # 2KB DOM-canvas confetti
│   ├── Countdown.jsx            # Live countdown
│   ├── CountUp.jsx              # Number tick-up on scroll
│   ├── Header.jsx               # Sticky top nav + mini CTA
│   ├── PriceReveal.jsx          # The anchor → final reveal animation + global sync
│   ├── Reveal.jsx               # Fade-up on viewport entry
│   └── TopBanner.jsx            # NO UPSELLS banner
└── sections/
    ├── Hero.jsx                 # Photo collage + price reveal + CTA
    ├── PainMirror.jsx           # 6 photo-led pain cards
    ├── StatsBand.jsx            # 92% · 8/10 · 10,000+
    ├── BeforeAfter.jsx          # 5-row contrast table
    ├── Mechanism.jsx            # 3 components — Diagnose / Release / Anchor
    ├── Coach.jsx                # Dr. Valarmathi
    ├── Testimonials.jsx         # 7 real testimonials
    ├── FAQ.jsx                  # 5 honest answers
    ├── FinalCTA.jsx             # Countdown + scarcity + close
    └── Footer.jsx
```

## Pre-launch checklist (the 3 things you MUST change)

1. **Workshop details** → `src/data/content.js` → `WORKSHOP`
   - `date`, `time`, `startsAtISO`
   - `priceAnchor` (shown first), `priceFinal` (after confetti), `priceOriginal` (strikethrough), `recordingPrice`
   - `seatsTotal`, `seatsLeft`
2. **Tracking IDs** → `index.html` — replace `GTM-XXXXXXX` (2 places) and `PIXEL_ID` (1 place).
3. **Razorpay handoff** → `src/data/content.js` → `RAZORPAY`
   - Confirm `pageUrl` is correct (currently `https://pages.razorpay.com/gcr-fb11`).
   - Verify each `paramMap` slug matches the field IDs on your Razorpay page. The fastest way: open your live Razorpay page, prefill one field manually, copy the resulting URL — the param name it generates is your true slug. Drop it into `paramMap`.

## Deployment notes

For Netlify/Vercel, add a SPA rewrite so any unknown path serves `index.html`:

**Netlify (`public/_redirects`)**
```
/*  /index.html  200
```

## Suggested copy clarifications (ask your copy team)

1. **Hero sub bridges ads → LP**: "...treats your gut, sleep and stress as one signal. Not four separate problems." — keeps ad-script gut/nervous-system focus while honouring the LP's 4-symptom framing.
2. **Order bump copy** (`ORDER_BUMP` in content.js) is filler-quality. Worth a rewrite: 1 line on what they'll be able to do with the recording (e.g., "Practice the Safety Switch alongside Dr. Valarmathi for 30 days").
3. **Coach bio** was missing in source copy — wrote a tight 3-line version from the ad-script self-intro. Get Dr. Valarmathi's preferred bio.
4. **Testimonial cities** are blank for 5 of 7 testimonials. Filling them in (even just city, no full address) lifts conversion measurably.
