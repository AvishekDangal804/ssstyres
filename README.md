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
- `design-import/design_handoff_sss_wheels/` — the original high-fidelity design handoff (`.dc.html` reference files + `README.md` with the full design-token/motion spec). Not production code — read it when building a page that isn't done yet.

## Pages built so far

Home, Wheels catalogue, Dealer application, Fitment guide, Legal (Terms/Warranty/Privacy).

## Pages not yet built

Collections, Types, Contact, About, Accessories, Media — all specced in `design-import/design_handoff_sss_wheels/README.md`, not yet ported.

## Known open item

The Dealer application form validates server-side but only logs submissions — no email/CRM delivery is wired up yet. Needs a provider decision (e.g. Resend) and credentials before go-live. Same gap applies once the Contact form is built.
