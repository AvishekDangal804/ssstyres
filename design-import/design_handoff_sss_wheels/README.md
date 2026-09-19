# Handoff: SSS Wheels — ssstyres.com.au

## Overview
Informational + trade-lead website for **SSS Wheels & Tyres** (Dandenong South, VIC). SSS is the house brand — two wheels: **SSS D-Locker** (beadlock-style, 4x4) and **SSS D-Hole** (classic steel). No cart: purchasing happens in the external dealer portal `http://orders.ssswheels.com.au/WebOrder` (approved trade accounts only). Primary conversions: **Apply to Become a Dealer** and **Dealer Portal / Wholesale Login**. 5.0 Google rating, 10 years of trade supply.

## About these files
Each `*.dc.html` is one page/component, built in HTML as a **high-fidelity design reference** — final look, copy, motion and behaviour, NOT production code. Recreate in the target stack (Next.js/React recommended) using its conventions. The files use a small template runtime (`support.js`) — ignore it; read the markup + the `class Component` logic block at the bottom of each file for state/behaviour. Data lives in `wheels-data.js` (categories, models, wheels, vehicles, stats) — treat it as the CMS schema.

## Fidelity
High. Colours, type, spacing, copy and interactions are final; recreate accurately. Photographs in `assets/` are final; grey `<image-slot>` tiles mark photography still to be supplied.

## Tech notes
- Fonts: Google **Barlow** (400/500/600/700/800) + **Barlow Condensed** (600/700/800), `display=swap`.
- Container: `max-width: min(1600px, 94vw)`, gutters `clamp(20px,3vw,56px)`, **every container `width:100%; box-sizing:border-box`** so all section edges align. Section vertical padding scales `clamp(67px,7.4vw,130px)`.
- Fully fluid — every section reflows to ~360px via `repeat(auto-fit/auto-fill, minmax(min(100%,N), 1fr))` grids. Large monitors: hero and feature sections grow to ~1000px tall; card sizes scale with `vw`.
- Scroll effects use `requestAnimationFrame` + `getBoundingClientRect()` (never scroll-jack). Respect `prefers-reduced-motion`: disable parallax/rotation, keep opacity fades.
- Portal / external links: `target="_blank" rel="noopener"`.

---

## Design tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| Brand red | `#D80009` | CTAs, accents, active states, full-stops. **Never any other red.** |
| Red hover | `#A80007` | Red button hover |
| Ink / black | `#0E0E0E` | Primary text, dark buttons, footer |
| Black deep | `#0A0A0A` / `#0B0B0B` | Hero + dark section grounds |
| Charcoal | `#121212` | Stats band |
| Ink 2 | `#3A3A3A` / `#444` | Secondary text |
| Ink 3 | `#5F5F5F`–`#8A8A8A` | Captions, labels |
| Hairline | `#E4E4E4` / `#E6E6E6` / `#ECECEC` | Borders |
| Surface | `#F2F2F2` / `#F4F4F4` / `#F5F5F5` | Light bands |
| On-dark | `#BDBDBD` / `#D4D4D4` / `#E6E6E6` | Text on dark |
| White | `#FFFFFF` | |

### Type
| Style | Spec (Barlow) |
|---|---|
| Display (statement / hero H1) | 800, `clamp(44px,8.6vw,124px)`, lh .9, ls −.03em, uppercase |
| Page H1 | 800, `clamp(44px,6.4vw,92px)`, lh .92, ls −.02em, uppercase |
| Section H2 | 800, `clamp(34px,4.2vw,50px)`, lh 1, ls −.015em, uppercase |
| Card title | 800, 20–28px, lh 1, uppercase |
| Stat number | 800, `clamp(28px,3vw,52px)`, ls −.02em |
| Kicker | 700, 11–13px, ls .18–.24em, uppercase |
| Nav / button | 700, 13–14px, ls .1–.14em, uppercase |
| Body | 400, 14–18px, lh 1.6–1.7 |

### Shape / motion
- Radii: cards 20–22px, panels/dropdowns 14–16px, pills 999px.
- Easing: **`cubic-bezier(.2,.8,.2,1)`** for all movement; 200ms colour, 350–900ms transforms.
- Shadows: card hover `0 20px 42px rgba(0,0,0,.10)`; dark card hover `0 24px 46px rgba(0,0,0,.12–.35)`; dropdown `0 24px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.1)`.

### Buttons
- **Primary red pill**: `#D80009`, white text, h 50–58px, radius 999; hover `#A80007`. Trailing `→` when navigating.
- **White pill on dark**: white bg / ink text; hover → red bg + white text.
- **Outline**: 1.5px border (`#0E0E0E` on light, `rgba(255,255,255,.6)` on dark); hover fills.
- **Round icon buttons** (slider arrows): 38px circle, 1.5px `#CFCFCF`; hover black fill.

### Icons
Text glyphs only: `→ ↓ ▼ ★ + ✓ ◆`. Map to Lucide: arrow-right, arrow-down, chevron-down, star (filled #D80009), plus, check, diamond.

---

## Global components

### SiteHeader (`SiteHeader.dc.html`) — sticky, glass
- **Top bar** 34px: `rgba(10,10,10,.72)` + `backdrop-filter: blur(24px) saturate(1.8)`, `#C8C8C8` 13px. Left: "Melbourne — 13 Advantage Drive, Dandenong South · Sydney, Brisbane & Adelaide opening soon". Right: `03 9116 5787` · `info@ssswheels.com.au`.
- **Main bar** 74px: `rgba(255,255,255,.58)` + blur, bottom hairline `rgba(0,0,0,.08)`, `box-shadow: inset 0 1px 0 rgba(255,255,255,.6), 0 8px 30px rgba(0,0,0,.06)`. Logo `assets/logo.png` h36 → Home.
- **Nav** (Barlow 700 14px ls .1em uppercase, gap 22px, hover red): **Home**, **Wheels ▼** (dropdown, glass `rgba(14,14,14,.78)` blur, radius 16: SSS D-Locker, SSS D-Hole, divider, Steel / Off Road / Beadlocks / Street / Commercial / Trailer, divider, All wheels →), **Accessories**, **Guide**, **Media**, **More ▼** (About Us, Terms & Conditions, Warranty & Returns, Privacy Policy, Contact Us).
- **Right**: outline **Become a Dealer** (42px) + red-pill **Dealer Portal** (42px, → portal new tab).
- Dropdowns open on hover + click-toggle; close on mouseleave. State `menu: null|'wheels'|'more'`. < 1280px: nav wraps to its own row under a hairline; CTAs stay top-right. Add a hamburger < 720px (not mocked).

### SiteFooter (`SiteFooter.dc.html`)
1. **"Ready to stock SSS Wheels?" band** — bg `#EFEFEF`, min-height `clamp(480px,64vh,780px)`. Kicker, H `clamp(40px,5.6vw,78px)`, red pill "Apply to become a dealer →" + outline "Wholesale login". Right: `assets/beadlock-exploded.png` `right:-4%;top:-16%;width:60%;height:132%;contain` with **parallax** `translateY((p-.5)*140px)`; left-to-right gradient keeps text legible.
2. **Dark footer** `#0E0E0E`: 4-col grid (1.3fr + 3×1fr) — white logo + blurb; Wheels links; Company links (About, Accessories, Guide, Media, Contact); Warehouse address/phone/email. Bottom bar: © 2026 SSS Wheels & Tyres Pty Ltd · Privacy · Terms · Warranty & Returns.

---

## Screens

### 1. Home (`Home.dc.html`)
State: `prog` (stat count-up), `activeCat` (types), `hoverCat` (collections), `feat` (vehicle tab), `stmtBg` (slideshow index), slider `s1:{sp,sw}`, `narrow` (<1040). All scroll effects run from one `parallax()` on rAF.

1. **Hero (sticky reveal)** — `position:sticky;top:0;z-index:0`, min-height `clamp(520px,84vh,1000px)`, `assets/hero.png` cover at `center 55%`. Overlays: `linear-gradient(90deg, rgba(0,0,0,.7), rgba(0,0,0,.3) 38%, transparent 62%)` + bottom fade. Copy bottom-left (max 640): kicker w/ 28×3 red bar, H1 "Any road.<br>Any load.", body, white pill "Explore wheels →" + outline "Become a dealer". Entrance `fadeUp .8s`. On scroll the content block below (z-index 1, `box-shadow:0 -24px 60px`) slides over the pinned hero: image `translateY(p*110) scale(1+p*.08)`, copy fade + `translateY(-p*60)`.
2. **Statement slideshow** — full-bleed, min-height `clamp(560px,86vh,880px)`. Five `assets/statement/s1–s5.png` cross-fade (opacity 1.2s, one active every **4.2s**, state `stmtBg`), each with a slow Ken-Burns zoom (`@keyframes stmtKen` scale 1.04→1.14, 7s, paused unless active). Dark overlay `rgba(8,8,8,.5–.72)`. Centered Display headline "Any road. / Any load. / Anywhere." (white → 72% → 42%, red full-stops), sub "Australian trade wheels", white pill "⊕ View wheels", progress dots (active = 26px red). Copy has scroll parallax `translateY((t-.5)*-50)`.
3. **Stats** — bg `#121212`, 4 cols `minmax(230px,1fr)` with `1px #2C2C2C` dividers. 44×3 red bar + number + label. **Count-up** 1.5s ease-out-cubic on mount: `3,500+`, `2,500`, `10 yrs`, `5.0` + red ★★★★★. Data `STATS`.
4. **Popular wheels** — full-bleed; heading row + outline "See more →" (→ Types) inside the container. Horizontal snap slider **bleeds to the right viewport edge**: left padding `calc((100% - min(1600px,94vw))/2 + gutter)` so the first card aligns with the heading; cards `flex:0 0 min(clamp(240px,15.2vw,300px), 100vw−2×gutter)`. Card: square `contain` image (hover `scale(1.06)`), badge pill, name 24px, fitment line "17x8 · 6x139.7 · ET0", finish swatches (22px, swap the image on click/hover), finish caption. Controls: 38px arrows `scrollBy(±300)` + 4px progress track with grey thumb (width = visible/total, left = scroll%). Data `WHEELS`.
5. **Wheel collections** — H2 + outline "All collections →" (→ Collections). 3 size cards `minmax(300px,1fr)` aspect 4/5, radius 20, dark gradient. Ghost size numeral, red radial glow, wheel render; hover: card `translateY(-6)`, glow/scale up, wheel `rotate(20°) scale(1.12)`. → `Wheels?size=15|16|17`.
6. **Types of wheels** — bg `#0B0B0B`, expanding flex panels (active `flex:4.2`, others `flex:1`, `transition:flex .7s`), decorative red/white glows. Inactive: vertical label + faint tilted wheel. Active: wheel render + kicker/name/blurb/spec chips + white pill. Hover/click to switch (`activeCat`). < 1040px vertical accordion. Data `CATEGORIES`.
7. **On the road (featured build)** — full-bleed photo, min-height `clamp(560px,88vh,1040px)`, cover `center 60%`, subtle parallax. Left-anchored radial scrim + bottom fade behind caption. Kicker "On the road", H `clamp(34px,5vw,64px)` model name, white sub, vehicle tabs (46px pills; active red) HILUX/RANGER/HIACE/RAV4 + white pill "View wheel →". Image cross-fades 400ms on tab change. Data `VEHICLES` (`img`).
8. **Popular vehicles** — H2 + outline "See more →" (→ Guide). Grid `minmax(min(100%,440px),1fr)` gap `clamp(20px,1.6vw,32px)`; cards 16/10, radius 22, cover image (hover `scale(1.05)`), bottom gradient, red make kicker + model `clamp(30px,3.2vw,44px)`, white wheel pill. → `Wheels?model=…`.

### 2. Wheels catalogue (`Wheels.dc.html`) — `?cat=` `?model=` `?size=`
Dark header (red skew slash) with title reflecting the filter. Filter pills (outline black; active red): All · 15" · 16" · 17" · SSS D-Locker · SSS D-Hole · Steel · Off Road · Beadlocks · Street · Commercial · Trailer. Grid `auto-fill minmax(clamp(280px,18vw,340px),1fr)`; card (hover red border + shadow): square contain image, badge, series caption, name 27px w/ red finish, fitment + build·load lines, black pill "Order via dealer portal" (→ portal). "Not a dealer yet?" strip → Become a dealer. State `cat` from query string.

### 3. Collections (`Collections.dc.html`)
Dark header; 2 model blocks (`minmax(340px,1fr)`): 16/10 render tile + name pill, then H2 name, red tag, blurb, Sizes / Finish (swatch) / Fitments, black pill "View fitments →". (Model-based; Home collections are size-based.)

### 4. Types of wheels (`Types.dc.html`)
Dark header. Six alternating rows (image L/R, `minmax(300px,1fr)`, hairline dividers): red number chip, series caption, H2, red tag, blurb, 3 slashed bullets, black pill "Browse … range".

### 5. Guide (`Fitment.dc.html`) — nav label "Guide"
Dark hero with wheel render (`@keyframes spinIn` rotate −30→0, 1.1s) + quick stats. Three parts:
- **① How to read a wheel** — interactive: wheel render (`assets/wheels/r4.png`) with 5 numbered markers (Diameter, Width, Bolt pattern/PCD, Offset, Centre bore) positioned by %; active marker pulses (`@keyframes pulse`); tap marker or chip → dark panel shows number/example/description. State `part`.
- **② Popular wheel sizes** — 15/16/17/18" cards (17" flagged best-seller, dark); each with big numeral, red tag, blurb, tyre range + suits; on hover card lifts and the faint wheel art rotates. State `hoverSize`.
- **③ Find your own fitment** — 3 accurate steps (tyre placard, count studs & measure PCD, read the wheel stamp) + "golden rule". Then **Fitting & aftercare** (torque star-pattern, re-torque @100 km, beadlock ring checks, finish care). Dark CTA card → Contact / call. *(No vehicle-specific finder — removed for accuracy.)*

### 6. Dealer (`Dealer.dc.html`)
2-col. Left: "How it works" 3 red-number steps + dark "Already a dealer?" card w/ red "Wholesale login →". Right: trade-account form (Business name*, ABN*, Business type, Contact*, Phone*, Email*, notes, red "Submit application", legal line) → success state (64px red ✓). State `sent`.

### 7. Contact (`Contact.dc.html`)
Left info cards (4px red left border): Phone (Mon–Fri 8–5 · Sat 8:30–12:30), Email, Warehouse address, dark Dealers card w/ two pills. Right: enquiry form (Name*, Phone, Email*, topic select, Message*, red "Send enquiry") → success. State `sent`.

### 8. About (`About.dc.html`)
Dark header "Ten years of keeping the trade rolling". Image slot (4/3) + copy w/ 3 mini stats. 3 tiles: Who we supply (black), Where we are (black), Work with us (red, black pill).

### 9. Accessories (`Accessories.dc.html`)
Dark hero + **auto-scrolling marquee** of accessory names (`@keyframes accMarquee`, 26s). **Uniform equal-size card grid** `auto-fill minmax(min(100%,268px),1fr)`: 8 cards, each = image panel (`clamp(168px,15vw,208px)`, product photo `contain`, inset 14px) + body (red kicker, title, one-line sub, red "Order via portal →"). Photos: nuts, studs, caps (`cap.jpg`), hub-centric rings, valves/TPMS, lock nuts, beadlock (`beadlock.webp`); "Guaranteed to fit" uses the SSS mark on a dark panel → Guide. Entrance: staggered `fadeUp` (delay `i*0.06s`). **Hover** (state `hover`): card lift + black border, red top bar wipes `0→100%`, red radial glow blooms behind product, image `scale(1.1) rotate(-5°)`, arrow `translateX(5px)`. Dark CTA band → portal / enquire.

### 10. Media (`Media.dc.html`)
Photo hero (Ranger) + white pill "Submit your build →". Filter pills All / Builds / Wheels / Warehouse + "N posts". **Masonry grid**: `auto-fill minmax(clamp(220px,15vw,300px),1fr)`, `grid-auto-rows clamp(200px,14vw,280px)`, `grid-auto-flow dense`; some tiles span 2 cols/rows when unfiltered. Tile: image cover (wheel renders contain on `#F2F2F2`), bottom gradient, red kind kicker, label, 40px glass arrow; hover image `scale(1.06)`. "Get featured" dark band. State `filter`.

### 11. Legal (`Legal.dc.html`) — `#terms` / `#warranty` / `#privacy`
Tab pills sync with URL hash (state `tab`). Numbered sections (red number, H2 uppercase, body 16/1.7). Full copy is in the file — use verbatim; footer note flags it as a draft pending legal review.

---

## Animation & interaction summary
| Element | Behaviour |
|---|---|
| Header dropdowns | hover-open + click-toggle, close on mouseleave |
| Hero | pinned; content slides over; image drift+zoom & copy fade on scroll |
| Statement slideshow | 5 images cross-fade every 4.2s + Ken-Burns zoom; copy parallax; progress dots |
| Stats | count-up 1.5s ease-out-cubic on mount |
| Popular-wheels slider | native scroll-snap, edge-bleed right; arrows `scrollBy(±300)`; progress thumb tracks scroll; finish swatches swap image |
| Collections cards | hover lift + wheel rotate/scale + red glow |
| Types panels | flex-grow expand on hover/click, 700ms |
| On the road | vehicle tabs swap image 400ms + caption; subtle parallax |
| Vehicle cards | image zoom 600ms |
| Guide markers | click/tap marker or chip → detail panel; active marker pulses; hero wheel `spinIn` |
| Guide size cards | hover lift + wheel art rotate |
| Accessories | marquee loop; staggered fadeUp entrance; hover = lift + red bar wipe + glow + image zoom/rotate + arrow slide |
| Media | filter grid; span-2 tiles only when "All"; image zoom on hover |
| Footer band | exploded-wheel parallax ±140px |
| Forms | required/email/tel validation; on submit → success state (wire to backend/email) |

### Keyframes (verbatim)
```css
@keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
@keyframes spinIn   { from{opacity:0;transform:rotate(-30deg) scale(.9)} to{opacity:1;transform:rotate(0) scale(1)} }
@keyframes stmtKen  { from{transform:scale(1.04)} to{transform:scale(1.14)} }
@keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(216,0,9,.5)} 50%{box-shadow:0 0 0 10px rgba(216,0,9,0)} }
@keyframes accMarquee { to{transform:translateX(-50%)} }
```
All other motion is CSS `transition` on hover/state, or scroll-driven transforms set in rAF from section progress `t = clamp((vh − rect.top) / (vh + rect.height), 0, 1)`.

---

## Assets (`assets/`)
- **Logos**: `logo.png` (black/red horizontal), `logo-white.png`, `logo-mark.png` (SSS mark).
- **Photography**: `hero.png` (hero wall), `beadlock-exploded.png` (footer band), `statement/s1–s5.png` (statement slideshow — road, desert, mud, snow, mountain), `vehicles/hilux|ranger|hiace|rav4.png`, `lifestyle/black-boxes.png` & `silver-boxes.png` (warehouse).
- **Wheel renders** `wheels/`: **r7 = Matte Black** (angled), **r4 = Machined Silver**, **r5 = Silver / gold bolts**, **r6 = Silver face / black ring**, **r3 & r1 = D-Hole** (gloss black). (`d-hole-a.png`, `d-locker-a/b/c.png`, `replica/` = earlier renders, unused fallbacks.)
- **Accessories** `accessories/`: `nuts.jpg`, `stud.jpg`, `cap.jpg`, `ring.jpg`, `valve.jpg`, `locks.jpg`, `beadlock.webp`.
- **`<image-slot>` placeholders** (photography to supply): About warehouse photo, some Media tiles, Home vehicle tiles without a photo.
- `statement-ground.png` / `statement-mountains.png` — superseded scene art, safe to drop.

## Files
`Home` · `SiteHeader` · `SiteFooter` · `Wheels` · `Collections` · `Types` · `Fitment` (Guide) · `Dealer` · `Contact` · `About` · `Accessories` · `Media` · `Legal` (`.dc.html`), `wheels-data.js`, `support.js` (runtime — don't port), `image-slot.js`, `assets/**`.
