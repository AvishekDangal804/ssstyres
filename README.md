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
- `src/components/ImagePlaceholder.tsx` — grey placeholder tile for photography the business hasn't supplied yet (warehouse shots, accessory product photos). Swap for a real `<Image>` once the photo exists.
- `design-import/design_handoff_sss_wheels/` — the original high-fidelity design handoff (`.dc.html` reference files + `README.md` with the full design-token/motion spec). Not production code — read it if you need the original spec for a page.

## Pages

All pages from the design handoff are built: Home, Wheels catalogue, Collections, Types, Fitment guide, Dealer application, Contact, About, Accessories, Media, Legal (Terms/Warranty/Privacy).

Note: the Collections page's original design script referenced data fields (`BOX_SHOTS`, `REPLICA`) and assets (`assets/wheels/replica/*`) that don't exist anywhere in the handoff bundle — likely left over from an earlier data schema. It was rebuilt using the real per-model `lifestyle` and `finishes` fields already in `wheels-data.ts` instead.

## Known open item

Both the Dealer application and Contact forms validate server-side (including a real ABN checksum on the Dealer form) but only `console.log` submissions — no email/CRM delivery is wired up yet. Needs a provider decision (e.g. Resend) and credentials before go-live.
