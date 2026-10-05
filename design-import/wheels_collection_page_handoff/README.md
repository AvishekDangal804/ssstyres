# Nova Tyres — Off-Road Wheels: dev handoff

Two deliverables plus every asset they use.

| File | What it is |
|---|---|
| `HeroSection.html` | The hero section on its own — plain HTML/CSS/JS, parallax included. Open it directly; scroll to see the effect. |
| `WheelsCollection.dc.html` | The product-collection page (hero + filter bar + 10-wheel grid). **No navbar, no footer, no fitment band** — page content only. |
| `support.js`, `image-slot.js` | Runtime for the `.dc.html` design file — **design-tool only, do not ship.** |
| `uploads/` | All images: HiLux hero + the five wheel photos. |

Keep the folder structure intact — paths are relative.

---

## How to read the `.dc.html` files
Inline-styled markup with `{{ value }}` template holes, plus a `Component` class at the bottom
holding all state and behaviour. Recreate the same structure and logic in your stack (React, Vue,
etc.); don't ship the runtime. `HeroSection.html` needs no runtime at all.

---

## Design tokens
- **Green** `#076330` (primary) · `#04331B` (dark/hero) · `#054A24` (hover) · `#EAF3ED` (tint)
- **Neutrals** `#1B1C1E` ink · `#5B5A55` label · `#6B6A64` body · `#8D8B85` meta · `#E4E4E1` rule · `#F7F7F5` panel · white
- Palette is deliberately **green + white only** — no orange on this page.
- **Font** DM Sans (Google Fonts), 600–800 for headings/labels.
- Layout max-width **1600px**, gutters `clamp(16px,3vw,64px)`.

---

## 1. Hero section
- Full-bleed `uploads/hilux.webp`, `object-fit:cover`, inside a wrapper inset by `-12%` top/bottom so the parallax never exposes an edge.
- Gradient overlay `linear-gradient(180deg, rgba(0,20,9,.55), rgba(0,20,9,.15) 38%, rgba(0,26,12,.86))` for text contrast.
- Content: breadcrumb (`Home › Wheels › Off Road`), 44×4px white rule + eyebrow, uppercase H1 `clamp(32px,5vw,62px)`, intro paragraph. Min height `clamp(380px,46vw,560px)`, content bottom-aligned.
- **Parallax**: on scroll/resize (passive, rAF-throttled) the image wrapper gets
  `translate3d(0, -hostTop * 0.22, 0)`. Skipped off-screen and under `prefers-reduced-motion`.

## 2. Collection page

### Filter bar
Chips: **All finishes · Satin Black · Machined · Black & Machined**, plus a live count and a sort
`<select>` (Popularity / Newest / Diameter asc / Diameter desc / Name A–Z — sort is visual only).
Picking a finish **does not hide cards** — it restyles every card into that finish, so all views
share one layout. Active chip = green fill, white text.

### Wheel cards (borderless, ROH-style)
No border, background or shadow on the card itself. Structure:
image on white (`aspect-ratio:4/3`, `object-fit:contain`) → uppercase model name (16px/800) →
size row `17" | 18" | 20"` with grey pipes → four 17px square colour chips → finish sub-label.
Optional outline badge ("New Wheel" / "New Finish") top-right of the image.
Grid: `repeat(auto-fit, minmax(min(100%,250px), 1fr))`, gap `clamp(22px,2.6vw,38px) clamp(18px,2.2vw,30px)`.

### Colourways
Five images, four selectable chips per card:

| key | image | label | construction |
|---|---|---|---|
| `black` | `wheel 7.png` | Satin Black | Simulated beadlock |
| `two` | `wheel 1.png` | Black & Machined | Split mesh |
| `mach` | `wheel 3.png` | Machined Silver | Mesh spoke |
| `full` | `wheel 4.png` | Full Machined | Mesh spoke |
| `gold` | `wheel 5 .png` | Machined · Gold Bolt | Simulated beadlock |

Clicking a chip swaps the image, finish label, construction eyebrow and `alt` text, and moves the
green `0 0 0 2px` active ring. Changing the top filter clears per-card overrides.

Models in grid order: Ridgeline, Ironbark, Outcrop, Quarry, Trailhead, Basecamp, Summit, Overland,
Bedrock, Granite.

> Implementation note: each `<img>` carries a real static `src` plus a `data-src` hole; the logic
> mirrors `data-src` → `src` after render. This keeps the first paint image-complete and avoids a
> 404 on the unresolved hole while the template streams. In a normal framework just bind `src`.

### Animations
1. **Scroll reveal** — every `[data-reveal]` (the 10 wheel cards) starts at
   `opacity:0; translateY(22px)` (applied by JS, so nothing is hidden if JS fails) and transitions
   to visible over `.62s cubic-bezier(.2,.7,.3,1)`, staggered `70ms` in rows of four.
   Driven by a passive scroll/resize sweep (reveal when `rect.top < innerHeight*1.05`), backed by a
   200ms × 40 interval sweep and an IntersectionObserver enhancement. A 1.2s safety net reveals only
   nodes **currently in the viewport** — it must not blanket-reveal, or the effect never plays.
2. **Image zoom** — wheel image scales to `1.07` on hover over `.5s cubic-bezier(.2,.7,.3,1)`,
   clipped by the link's `overflow:hidden`.
3. **Swatch hover** — colour chip scales to `1.16` over `.18s`.
4. **Hero parallax** — as above.
All listeners and timers are removed in `componentWillUnmount`.

---

## Content to replace
Model names, size ranges, PCDs and load ratings are placeholders — swap in the real SSS catalogue
data. Images are final.
