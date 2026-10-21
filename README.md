# SSS Wheels & Tyres — ssstyres.com.au

Informational + trade-lead website for SSS Wheels & Tyres Pty Ltd (Dandenong South, VIC). Built with Next.js (App Router) + TypeScript, styled with CSS Modules against a shared design-token file. There is no cart/checkout on this site — trade orders happen through the external dealer portal at `orders.ssswheels.com.au/WebOrder`; this site's job is product browsing, fitment lookup, and dealer-account lead generation.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Project structure

- `src/app/` — one route folder per page (App Router). Each page pairs a server `page.tsx` (metadata) with a client component holding the interactive logic, plus a CSS Module for styling.
- `src/components/` — shared layout pieces: `SiteHeader`, `SiteFooter`, `PageHeader` (the dark/red-slash header used by most inner pages).
- `src/lib/wheels-data.ts` — the product/vehicle/category data (SSS D-Locker, SSS D-Hole, fitments, stats). Treat this as the CMS schema.
- `src/lib/useScrollProgress.ts` — shared hook for scroll-driven parallax effects.
- `src/components/ImagePlaceholder.tsx` — grey placeholder tile for photography the business hasn't supplied yet (currently: the D-Hole warehouse photo on Collections). Swap for a real `<Image>` once the photo exists.
- `design-import/design_handoff_sss_wheels/` — the original high-fidelity design handoff (`.dc.html` reference files + `README.md` with the full design-token/motion spec). Not production code — read it if you need the original spec for a page.

## Pages

All pages from the design handoff are built: Home, Wheels catalogue, Collections, Types, Guide (route `/fitment`), Dealer application, Contact, About, Accessories, Media, Legal (Terms/Warranty/Privacy).

The Guide replaced the earlier vehicle-specific fitment finder: the latest handoff ("SSS Tyres New Update") removed it "for accuracy", because the vehicle → wheel mappings are unverified. It now teaches how to read a wheel spec, popular sizes, how to find your own fitment, and fitting/aftercare.

Note: the Collections page's original design script referenced data fields (`BOX_SHOTS`, `REPLICA`) and assets (`assets/wheels/replica/*`) that don't exist anywhere in the handoff bundle — likely left over from an earlier data schema. It was rebuilt using the real per-model `lifestyle` and `finishes` fields already in `wheels-data.ts` instead.

## Header and home page

The header (grey contact bar; Home / Wheels / Accessories / Guide / Media / More; outlined "Become a Dealer" and red "Dealer Portal" buttons) and the image-led home page (fact strip, statement slideshow, wheel range slider, size collections, wheel types, featured vehicle, vehicle grid) follow the version the manager approved, updated to the latest handoff. Deliberate differences from the original:

- Claims that couldn't be verified were left out — "for 10 years", the customer / returning-customer / Google-rating numbers, and "Best seller" badges. The fact strip states only what the site already says elsewhere (trade only, own range, own warehouse, dealer portal). Add numbers back only once the business can back them up.
- The statement section reads "Wholesale. Wheels & tyres. For the trade." instead of "Any road. Any load. Anywhere." — "any load" reads as a load-capacity claim. (The new slideshow scenes — road, desert, mud, snow, mountain — were made for the original slogan; swapping it back is three lines in `HomeShowcase.tsx`.)
- The statement slideshow cross-fades five SSS wheel scenes (`public/assets/statement/s1–s5.jpg`, re-encoded from the handoff PNGs). It only advances while on screen, has a pause button and clickable dots, and never auto-advances for visitors who prefer reduced motion.

On phones the header is a single row (logo + menu button); "Become a Dealer" and "Dealer Portal" sit at the foot of the menu.

## Form delivery (Dealer + Contact)

Both forms validate client-side (ABN checksum, email/phone format, length limits, honeypot) and then submit straight to Web3Forms from the browser — there's no server step. Set this in Vercel (see `.env.example`):

- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

It's `NEXT_PUBLIC_` on purpose: Web3Forms' free tier only supports client-side submission (server-to-server needs a paid plan + IP whitelisting, which doesn't fit Vercel's serverless IPs), so the key ships in the browser bundle. Restrict it to this site's domain from the Web3Forms dashboard so it can't be reused elsewhere. If it's missing, the forms show a "please call or email us" message rather than pretending the submission worked.

Each submission becomes one email to whatever inbox the Web3Forms access key is configured to deliver to, with the submitter's address as Reply-To (so "Reply" answers them).

### Setup

1. Create a Web3Forms account (https://web3forms.com) with the inbox that should receive leads (e.g. `info@ssswheels.com.au`) and copy the access key it gives you.
2. In the Web3Forms dashboard, restrict that key to this site's production domain.
3. In Vercel (Project → Settings → Environment Variables, Production) add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
4. **Redeploy** (Deployments → ⋯ → Redeploy). Variables only apply to deployments made after they were saved — and since this one is baked into the client bundle at build time, a redeploy is required even more strictly than for a server-only variable.
5. Submit the Contact form and the Dealer form once on the live site and check the inbox arrives and Reply goes to the submitter.

To try it locally, put the same line in `.env.local` and run `npm run dev`.

### When a submission fails

Open the browser console on the live site — failed submissions log to `[web3forms]` with the response Web3Forms returned (status + body), which is the fastest way to see what's wrong (bad/missing access key, rate limit, etc.). Nothing here goes through server logs since the request never touches the server.

Form flooding can use up the Web3Forms plan's monthly submission quota. The forms have a honeypot (`botcheck`, Web3Forms' own convention) and client-side validation; if spam shows up, Web3Forms has its own spam filtering options on paid plans, or add a rate-limit rule in the Vercel Firewall for the `/dealer` and `/contact` routes before reaching for a CAPTCHA.

### What has been tested

Build and typecheck pass. The actual Web3Forms round trip (browser → API → inbox) has **not** yet been run against a live access key — do the real test submission in step 5 once a key is set.

## Images

Source assets in `public/assets` are large PNGs; everything is rendered through `next/image` (WebP, responsive `srcset`). AVIF is deliberately disabled in `next.config.ts`: encoding `beadlock-exploded.png` as AVIF hung for 60s+ in testing (WebP: ~0.4s). Re-test before enabling it.

## Content that needs manager confirmation

- Product data in `src/lib/wheels-data.ts` (load ratings, PCD/offsets, which wheel is recommended for which vehicle) came from the original design handoff and has not been verified against manufacturer/fitment data.
- Warranty (12 months structural / 6 months finish), returns and refund terms in the Legal page were pre-drafted copy and are unverified.
- The warehouse photo (`lifestyle/silver-boxes.png`) shows SSS-branded stock in a warehouse; where it was taken is unconfirmed, so the site does not caption it as a specific location.
- The vehicle images in `public/assets/vehicles` may be renders; the Media page describes them as "vehicle fitment imagery", not customer builds.
- Company narrative carried over verbatim from the design handoff and not verifiable from this codebase: "started as a … operation supplying tyres to local workshops" (About), "answer the phone with someone who actually knows fitment" (About), and "Sydney, Brisbane & Adelaide opening soon" (top bar, Home, Contact, Footer, About). Confirm each is accurate, or remove/reword it, before launch — the branch line in particular is a forward-looking claim.
- The black D-Locker render (`public/assets/wheels/r7.png`, used wherever the Matte Black D-Locker appears) shows a small embossed "MH" mark on the beadlock ring. Confirm the mark is SSS's own / a factory mark and that these renders are SSS's to use.
- Accessories photos (`public/assets/accessories/*`, from the latest handoff) are generic white-background product shots. Confirm they are SSS's own, or that you hold the rights to use them. Also from that page's copy: "Vibration-free", "rattle-free" and "to suit every SSS fitment" are kept as designed but unverified; the design's "Guaranteed to fit" tile was reworded to "Check the fit" (a guarantee needs to match the warranty terms); "Trail-ready" became "Replacement parts".
- The Guide's technical content came from the design handoff and needs sign-off: the typical tyre-diameter ranges and "Suits" vehicle lists on the size cards; torque, re-torque-after-100 km, beadlock-hardware and finish-care advice (worded to match the Legal warranty terms); and how to measure a bolt pattern. The handoff also lists an 18" size ("15–18\"" size range, a RAV4 18" card), a "60 sec to check fitment" stat and "our best-selling D-Locker fitment" — the product data has no 18" wheel and none of those can be verified, so the Guide shows 15"–17" only and omits the other two.
- Handoff assets that were **not** imported because nothing uses them: `wheels/grappler-*.jpg` (the name suggests another product line — confirm what they are before anyone uses them), `wheels/d-locker-1…5.jpg`, `statement-ground.png`, `statement-mountains.png`, and the `replica/` folder (duplicates of the existing wheel renders).
- The new `/trade` page ("Built for the Trade") expands the four Home cards using only copy already on the site (Dealer page steps, Contact details, the Terms on accounts, pricing and payment). Nothing new was invented — no lead times, prices, minimums, credit terms or delivery promises — but the business should read it once and confirm it is how trade accounts actually work, especially "your account manager" and the payment-terms line.
- Two images supplied by the manager (`public/assets/lifestyle/wheel-styles.jpg`, `care-products.jpg`) are computer-generated illustrations with no SSS branding. The wheel lineup (Types page banner) shows a white six-spoke and a bronze wheel that are not in the product data; the car-care shot (Guide, Part 4 "Fitting & aftercare") is unbranded and its labels make claims ("removes brake dust", "pH neutral"). Both are captioned "Illustrative image" and used only as illustrations, not as products for sale — confirm that is what the business wants before launch. (The manager sent the car-care image twice; it is the same file.)
- No tyre content, tyre brands or third-party wheel brands exist in this project; the Brands / Services / Knowledge pages are deliberately not built.
