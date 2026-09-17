# Handoff: SSS Wheels — ssstyres.com.au

## Overview
Informational + trade-lead website for SSS Wheels & Tyres (Dandenong South, VIC). Two house wheels — **SSS D-Locker** (beadlock-style, 4x4) and **SSS D-Hole** (classic steel). No cart: purchasing happens in the external dealer portal `http://orders.ssswheels.com.au/WebOrder` (trade accounts only). Primary conversions: **Apply to Become a Dealer** and **Dealer Portal / Wholesale Login**.

## About the Design Files
Everything in this bundle is a **design reference built in HTML** (`*.dc.html` = one page/component each). They show intended look, copy, motion and behaviour — they are **not production code**. Recreate them in the target codebase (Next.js/React recommended; any stack works) using its conventions. The `.dc.html` files use a small template runtime (`support.js`) — ignore it; read the markup + the `class Component` logic at the bottom of each file for behaviour.

## Fidelity
**High-fidelity.** Colours, type, spacing, copy and interactions are final. Recreate pixel-accurately. Photos of vehicles / renders are final assets (in `assets/`).

## Tech notes for implementation
- Fonts: Google Fonts **Barlow** (400/500/600/700/800) + **Barlow Condensed** (600/700/800). Load with `display=swap`.
- All layout is flex/grid with `gap`; content container `max-width: min(1600px, 94vw)`, gutters `clamp(20px, 3vw, 56px)`, **every container `width:100%; box-sizing:border-box`** so edges align. Section vertical padding scales: `clamp(67px, 7.4vw, 130px)` (large) / `clamp(39px, 4.3vw, 76px)` (page headers).
- Large-monitor rules: hero `min-height clamp(520px,84vh,1000px)`; "On the road" `clamp(560px,88vh,1040px)`; Types strip `clamp(560px,38vw,720px)`; Popular Wheels slider bleeds to the right viewport edge with left padding `calc((100% - min(1600px,94vw))/2 + gutter)` so its first card aligns with the heading; cards `clamp(240px,15.2vw,300px)` (~6 visible at 1920).
- Fluid: every section reflows to ~360px. Grids use `repeat(auto-fit, minmax(…,1fr))`.
- Scroll effects use `requestAnimationFrame` + `getBoundingClientRect()`; never scroll-jack. Respect `prefers-reduced-motion` (disable parallax/rotation; keep opacity fades).
- Data lives in `wheels-data.js` (categories, models, fitments, vehicles, stats). Treat it as the CMS schema.

---

## Design Tokens

### Colours
| Token | Hex | Use |
|---|---|---|
| `--red` | `#D80009` | Brand red — CTAs, accents, active states. **Never any other red.** |
| `--red-hover` | `#A80007` | Red button hover |
| `--black` | `#0E0E0E` | Primary ink, dark buttons, footer |
| `--black-deep` | `#0A0A0A` / `#0B0B0B` | Hero + "Types" section background |
| `--charcoal` | `#121212` | Stats band |
| `--panel` | `#151515` → active `linear-gradient(160deg,#1E1E1E,#0F0F0F)` | Types panels |
| `--ink` | `#161616` | Body text |
| `--ink-2` | `#3A3A3A` / `#444` | Secondary text |
| `--ink-3` | `#5F5F5F` / `#6B6B6B` / `#7A7A7A` / `#8A8A8A` | Captions, labels |
| `--line` | `#E4E4E4` / `#E6E6E6` / `#E8E8E8` | Hairlines |
| `--surface-2` | `#F2F2F2` / `#F4F4F4` / `#F5F5F5` / `#F7F7F7` | Light bands |
| `--on-dark` | `#D4D4D4` / `#BDBDBD` / `#CFCFCF` | Text on dark |
| white | `#FFFFFF` | |

### Typography (Barlow unless noted)
| Style | Spec |
|---|---|
| Display XL (statement) | 800, `clamp(46px, 8.6vw, 124px)`, lh .9, ls -.03em, uppercase |
| H1 hero | 800, `clamp(44px, 6.4vw, 88px)`, lh .94, ls -.02em, uppercase |
| H1 page | 800, `clamp(40px, 6vw, 64px)`, lh .95, ls -.02em, uppercase |
| H2 section | 800, `clamp(34px, 4.2vw, 50px)`, lh 1, ls -.015em, uppercase |
| H3 card | 800, 28px (wheel cards) / 24–26px, lh 1, uppercase |
| Stat number | 800, `clamp(44px, 4.6vw, 60px)`, lh 1, ls -.02em |
| Kicker | 700, 12–13px, ls .2–.24em, uppercase |
| Nav | 700, 14px, ls .1em, uppercase |
| Button | 700, 13px, ls .14em, uppercase |
| Body | 400, 15–18px, lh 1.6–1.7 |
| Caption | 600, 12px, ls .1em, uppercase |

### Spacing / radii / shadows
- Section padding: 84–96px top, 96–104px bottom. Header 74px + 34px top bar.
- Card radius **22px** (collections, vehicles), **20px** (types panels), **16px** (dropdowns), pills **999px**.
- Shadows: card hover `0 18px 40px rgba(0,0,0,.10)`; dark card hover `0 30px 60px rgba(0,0,0,.35)`; dropdown `0 24px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.1)`.
- Easing: `cubic-bezier(.2,.8,.2,1)` for all movement; 200ms colour, 350–900ms transforms.

### Buttons
- **Primary (red pill)**: bg `#D80009`, text white, h 50px, pad 0 26px, radius 999, border 1.5px same; hover `#A80007`. Trailing `→` when it navigates.
- **Primary on dark (white pill)**: bg white, ink black; hover bg `#D80009` + white text.
- **Outline**: 1.5px border `#0E0E0E` (or `rgba(255,255,255,.6)` on dark), transparent; hover fills.
- **Small pill (46px)** for section "See more →" links; **42px** for header CTAs.
- Icon-only round buttons (slider arrows): 38px circle, 1.5px `#CFCFCF`; hover black fill.

### Icons
Text glyphs only — `→` (arrows), `▼` (dropdown caret, 11px red), `★★★★★` (rating, red), `+` in 22px 2px-border circle (View wheels), `✓` in 64px red circle (form success). Replace with the codebase's icon set (Lucide: `arrow-right`, `chevron-down`, `star`, `plus`, `check`) at matching sizes.

---

## Global components

### SiteHeader (`SiteHeader.dc.html`) — sticky, "glass"
- Top bar 34px: `rgba(10,10,10,.72)` + `backdrop-filter: blur(24px) saturate(1.8)`, text `#C8C8C8` 13px. Left: "Melbourne — 13 Advantage Drive, Dandenong South · Sydney, Brisbane & Adelaide opening soon". Right: `03 9116 5787` · `info@ssswheels.com.au` (white links).
- Main bar 74px: `rgba(255,255,255,.58)` + same blur, bottom hairline `rgba(0,0,0,.08)`, `box-shadow: inset 0 1px 0 rgba(255,255,255,.6), 0 8px 30px rgba(0,0,0,.06)`.
- Logo `assets/logo.png` h 36px → Home.
- Nav (Barlow 700 14px ls .1em uppercase, gap 22px, hover red): **Wheels ▼** (dropdown: SSS D-Locker, SSS D-Hole, divider "By type", Steel, Off Road, Beadlocks, Street, Commercial, Trailer, divider, "All wheels →"), **Accessories**, **Fitment Guide**, **Media**, **More ▼** (About Us, Terms & Conditions, Warranty & Returns, Privacy Policy, Contact Us).
- Dropdown: open on hover/click; panel `rgba(14,14,14,.78)` blur 24px, radius 16px, border `rgba(255,255,255,.1)`, top-3px accent none; items 15px 600 `#E8E8E8`, hover bg `rgba(216,0,9,.9)`.
- Right: **Become a Dealer** (outline 42px) + **Dealer Portal** (red pill 42px, opens portal in new tab).
- < 1280px: nav wraps to a third row under a hairline; CTAs stay top-right. Add a hamburger for < 720px (not mocked).

### SiteFooter (`SiteFooter.dc.html`)
1. **"Ready to stock SSS Wheels?" band** — bg `#EFEFEF`, min-height `clamp(480px,64vh,660px)`. Kicker "Trade accounts", H 800 `clamp(40px,5.6vw,78px)`, body, CTAs: red pill "Apply to become a dealer →" + outline "Wholesale login". Right side: `assets/beadlock-exploded.png` positioned `right:-4%; top:-16%; width:60%; height:132%; contain` with **parallax** (`translateY((p-.5)*140px)` where p = section progress through viewport). Left-to-right gradient `#EFEFEF 36% → transparent 60%` keeps text legible.
2. Dark footer `#0E0E0E`: 4-col grid (1.3fr + 3×1fr): white logo + blurb; Wheels links; Company links; Warehouse address/phone/email. Bottom bar: © 2026 SSS Wheels & Tyres Pty Ltd · Privacy · Terms · Warranty & Returns.

---

## Screens

### 1. Home (`Home.dc.html`)
Section order & specs:

**1.1 Hero (sticky reveal)** — `position: sticky; top:0; z-index:0`, min-height `clamp(520px,78vh,780px)`, bg `#0A0A0A`, image `assets/hero.png` cover at `center 55%`. Overlays: `linear-gradient(90deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,.3) 38%, transparent 62%)` + `linear-gradient(180deg, transparent 40%, rgba(0,0,0,.78) 100%)`. Copy block bottom-left (max 640px): kicker with 28×3 red bar "SSS Wheels · Australian trade supply"; H1 "Any road.<br>Any load."; body 18px `#E6E6E6`; CTAs white pill "Explore wheels →" (→ Wheels) + outline "Become a dealer". Entrance: `fadeUp` 0.8s (24px rise). **Scroll effect**: the content wrapper below (z-index 1, `box-shadow: 0 -24px 60px rgba(0,0,0,.35)`) slides over the pinned hero; as it covers (p 0→1): image `translateY(p*110px) scale(1+p*.08)`, copy `opacity 1-p*1.5`, `translateY(-p*60px)`.

**1.2 Statement band** — bg `#F4F4F4`, pad 112/108. Centered Display XL, three lines: "Any road**.**" `#0E0E0E`, "Any load**.**" `#6E6E6E`, "Anywhere**.**" `#B8B8B8` (full stops red). Sub "AUSTRALIAN TRADE WHEELS" 700, ls .2em, `#3A3A3A`. Black pill 58px "⊕ View wheels". Behind: `assets/wheels/r4.png` 760px, centred, `opacity` low, **rotates** `q*70deg` and drifts `translateY((q-.5)*160px)` with scroll.

**1.3 Stats** — bg `#121212`, pad 64/62, 4 cols `minmax(230px,1fr)`. Each: 44×3 red bar, number (white; red `+` suffix on 3,500), label 13px 600 ls .22em `#D4D4D4`. Cells separated by `1px solid #2C2C2C` (not when wrapped). **Count-up** 1.5s ease-out-cubic on mount: `3,500+`, `2,500`, `10 yrs`, `5.0` + red ★★★★★. Data: `STATS` in `wheels-data.js`.

**1.4 Popular wheels** — Full-bleed section; heading row inside the content container (H2 + outline "See more →" → Types). Horizontal snap slider (hide scrollbar) bleeds to the right edge: cards `flex: 0 0 min(clamp(240px,15.2vw,300px), 100vw - 2×gutter)`, gap `clamp(18px,1.6vw,30px)`, `scroll-padding-inline` = left padding. Card: square image (`background-size: contain`; hover `scale(1.06)` 350ms), badge pill top-right (red fill "Best seller"; white/red-border others), name 28px 800, fitment line "17x8 · 6x139.7 · ET0" 16px `#3A3A3A`, 22px finish swatch (radius 7, 2px white border, 1.5px black ring) + finish name caption. Below: ← ● → controls — 38px circles + 4px progress track `#ECECEC` with grey thumb whose width = visible/total and left = scroll%. Arrows scroll by 384px smooth. Data: `WHEELS`.

**1.5 Wheel collections** — H2 + outline "All collections →" (→ Collections). 3 cards `minmax(280px,1fr)`, aspect 4/5, radius 22, dark gradient bg, 1px border `rgba(255,255,255,.07)`. Content: kicker red (Compact & trailer / Fleet & touring / 4x4 off-road), size numeral 44px white top-left; ghost numeral 200–320px `rgba(255,255,255,.05)` centred; red radial glow ring (78% width); wheel render 70% width at 56% height with `drop-shadow(0 30px 40px rgba(0,0,0,.6))`; bottom row: fits ("Ranger · HiLux · RAV4") + "N FITMENTS" and 44px round arrow. **Hover**: card `translateY(-8px)`, shadow, border `.16`; ghost numeral `scale(1.08)` + `.08` alpha; glow `.55` alpha `scale(1.06)`; wheel `rotate(18deg) scale(1.08)` 900ms; arrow fills red + `translateX(4px)`. Link → `Wheels?size=15|16|17`.

**1.6 Types of wheels (expanding panels)** — bg `#0B0B0B`, pad 88/96, red radial glow top-left + white glow bottom-right (decorative). Header: kicker "Know your wheels", H2, outline-white "Wheel guide →". Strip `display:flex; gap:12px; height:580px`; 6 panels, radius 20. Active panel `flex: 4.2`, others `flex: 1`; `transition: flex .7s`. Inactive: vertical label (writing-mode vertical-rl, rotated) "01 STEEL", faint tilted wheel (140px, `.28` alpha, `rotate(-24deg)`). Active: red glow bottom-right, wheel render `min(58%,520px)` bottom-right with heavy drop shadow, body (max 560px): kicker "01 — Work-ready. Trail-proof.", name `clamp(36px,4.4vw,60px)`, blurb 15px `#D4D4D4`, spec chips (1px `rgba(255,255,255,.28)` pill 12px), white pill "View Steel wheels →". Switch on `mouseenter`/click. < 1040px: vertical accordion (active 560px / inactive 76px). Data: `CATEGORIES`.

**1.7 On the road (featured build)** — full-bleed photo section, min-height `clamp(560px,86vh,860px)`, image cover at `center 60%`, subtle parallax `translateY((q-.5)*-40px)`. Gradient `transparent 55% → rgba(10,10,10,.55)` bottom + left-anchored radial scrim behind caption (`radial-gradient(ellipse at 18% 100%, rgba(10,10,10,.78), .45 45%, 0 75%)`, 760px × 62%). Bottom row: kicker "On the road", H `clamp(34px,5vw,64px)` "TOYOTA HILUX" (text-shadow), sub "Fitted with the SSS D-Locker 17x8 Matte Black" white; right: vehicle tabs (46px pills: active red, others `rgba(255,255,255,.08)` + `.35` border) HILUX / RANGER / HIACE / RAV4 + white pill "View wheel →". Image cross-fades 400ms on tab change. Data: `VEHICLES` with `img`.

**1.8 Popular vehicles** — H2 + outline "See more →" (→ Fitment). Grid `minmax(min(100%,440px),1fr)` gap 20; cards 16/10, radius 22, `#161616`, image cover, hover `scale(1.05)` 600ms; bottom 50% gradient to `rgba(0,0,0,.62)`; bottom-left: red make kicker + model `clamp(30px,3.2vw,44px)` 800 white; bottom-right white pill "D-Locker 17x8 →" with shadow. Link → `Wheels?model=…`.

**1.9 Footer** (see global).

### 2. Wheels catalogue (`Wheels.dc.html`) — `?cat=`, `?model=`, `?size=`
Dark page header (bg `#0A0A0A`, red skewed slash decoration right, kicker + H1 = "All Wheels" / "17" Wheels" / "SSS D-Locker" / "Steel Wheels"). Filter pills (outline 2px black; active red fill): All · 15" · 16" · 17" · SSS D-Locker · SSS D-Hole · Steel · Off Road · Beadlocks · Street · Commercial · Trailer. Grid `auto-fill minmax(280px,1fr)`, card border `#E4E4E4` (hover red border + shadow), square contain image, badge, series caption, name 27px with red finish, fitment line, build · load line, black button 42px pill "Order via dealer portal" (→ portal, hover red). Footer strip `#F5F5F5`: "Not a dealer yet?… call 03 9116 5787" + red pill "Become a dealer".

### 3. Collections (`Collections.dc.html`)
Dark header; 2 model blocks (`minmax(340px,1fr)`): 16/10 tile with render, tag label, name pill; then H2 name 32px, red tag, blurb, Sizes / Finish (swatch) / Fitments count, black pill "View fitments →". (Home collections cards are size-based; this page is model-based.)

### 4. Types of wheels (`Types.dc.html`)
Dark header "Types of wheels, explained". Six alternating rows (image left/right, `minmax(300px,1fr)`, gap 40, 52px vertical, hairline dividers): numbered red chip "01", series caption, H2 "Steel wheels", red tag, blurb, 3 bullets with red slashed markers, black pill "Browse Steel range".

### 5. Fitment guide (`Fitment.dc.html`)
Dark hero with large wheel render (r7) fading in with `spinIn` (rotate -30°→0, 1.1s), left gradient scrim, H1 + white pill "Find my fitment ↓" + outline "Ask the team". **Finder** (`#finder`, bg `#F4F4F4`): 2-col `minmax(min(100%,380px),1fr)`. Left white card (radius 22): Make/Model selects (50px, 1.5px `#DADADA`, radius 12), quick-pick pills (38px; active red). Right dark result card (gradient `#1C1C1C→#0A0A0A`, radius 22): vehicle name, 3 spec tiles (PCD/Size/Offset, `rgba(255,255,255,.08)` bg, radius 14), recommended wheel line, white pill "View this wheel →" + outline "Order via portal", wheel render bottom-right (58% width, drop shadow). "How to read a wheel spec": 3 cards (radius 20, 1.5px border; hover lift -6px + black border), each with number, big example (17x8 / 6x139.7 / ET0), title, body, red "Tip —". "Common vehicle fitments": PCD filter pills + grid of vehicle rows (`minmax(min(100%,300px),1fr)`, radius 18, 64px wheel thumb, make kicker, model 22px, wheel name, PCD right) — clicking loads the vehicle into the finder and smooth-scrolls to it; selected row has red border + red-tinted shadow. Dark CTA card (radius 22) "Not sure? We'll check it for you." + red pill.

### 6. Become a dealer (`Dealer.dc.html`)
2-col (`minmax(320px,1fr)`, gap 52). Left: "How it works" 3 numbered red chips (Apply / Get approved / Order online, any time) + black "Already a dealer?" card with red "Wholesale login →". Right: form card (border, 4px red top, pad 32): Business name*, ABN*, Business type (select: Tyre reseller / Mechanical workshop / Panel shop / Fleet-rideshare / 4x4 fitter / Other), Contact name*, Phone*, Email*, notes textarea, red 52px "Submit application", legal line. Inputs 46px, 1px `#CFCFCF`, 16px. Success state: 64px red ✓ circle, "Application received", "within one business day", phone.

### 7. Contact (`Contact.dc.html`)
Left stack of info cards (left 4px red border): Phone 03 9116 5787 (Mon–Fri 8–5 · Sat 8:30–12:30), Email, Warehouse address, dark Dealers card with two pills. Right: enquiry form (Name*, Phone, Email*, topic select, Message*, red "Send enquiry") + success state.

### 8. About (`About.dc.html`)
Dark header "Ten years of keeping the trade rolling". Image slot (4/3) + copy with 3 mini stats. 3 tiles: Who we supply (black), Where we are (black), Work with us (red, with black pill).

### 9. Accessories (`Accessories.dc.html`)
6 cards `minmax(260px,1fr)` (4/3 image slot, name 24px, blurb): Wheel nuts & studs, Lock nut sets, Centre caps, Hub-centric rings, Valves & TPMS, Beadlock hardware. CTA strip → portal.

### 10. Media (`Media.dc.html`)
Photo hero (Ranger, cover at center 60%, min-height `clamp(420px,60vh,720px)`, top/bottom gradient) with H1 "SSS in the wild" + white pill "Submit your build →". Filter row: All / Builds / Wheels / Warehouse pills (40px) + "N posts" counter. Masonry grid: `auto-fill minmax(clamp(220px,15vw,300px),1fr)`, `grid-auto-rows: clamp(200px,14vw,280px)`, `grid-auto-flow: dense`; some tiles span 2 cols (HiLux, RAV4) or 2 rows (warehouse) when unfiltered. Tile (radius 18): image cover (wheel renders contain 74% on `#F2F2F2`), bottom gradient, red kind kicker, label `clamp(18px,1.4vw,24px)` 800, sub 13px, 40px glass arrow circle (`rgba(255,255,255,.14)` + blur 8). Hover: image `scale(1.06)` 600ms. "Get featured" dark band: copy + red pill "Submit a build →" + outline "Browse wheels"; right 3×1 white tiles with wheel renders.

### 12. Legal (`Legal.dc.html`) — `#terms` / `#warranty` / `#privacy`
Tab pills (Terms & Conditions · Warranty & Refunds · Privacy Policy) sync with URL hash. Numbered sections (red "01" 20px, H2 28px uppercase, body 16px/1.7). Full copy is in the file — use verbatim.

---

## Interactions summary
| Element | Behaviour |
|---|---|
| Header dropdowns | open on hover + click toggle; close on mouseleave |
| Hero | pinned; content slides over; image drift/zoom + copy fade tied to scroll |
| Statement wheel | rotates 0→70° and drifts with scroll progress |
| Fitment finder | make→model sync; quick-pick pills; vehicle row click sets vehicle + smooth-scrolls to #finder; result card image swaps |
| Fitment hero wheel | `spinIn` 1.1s on load |
| Media filters | filter grid by kind; span-2/row-2 tiles only when "All" |
| Stats | count-up 1.5s ease-out-cubic on mount |
| Wheel slider | native scroll-snap; arrows `scrollBy(±384)`; progress thumb tracks scroll |
| Collections cards | hover lift + wheel rotate/scale + glow |
| Types panels | flex-grow expand on hover/click, 700ms |
| On the road | tabs swap image (400ms) + caption; subtle parallax |
| Vehicle cards | image zoom 600ms |
| Footer band | exploded-wheel parallax ±70px |
| Forms | client validation (required, email, tel); on submit show success state (wire to backend/email) |
| Portal links | `target="_blank" rel="noopener"` |

## State
- Header: `menu: null | 'wheels' | 'more'`, `narrow` (< 1280).
- Home: `prog` (count-up), `activeCat` (types), `hoverCat` (collections hover), `feat` (vehicle tab), slider `{sp, sw}`, `narrow` (< 1040).
- Wheels: `cat` = `'all' | 'size:17' | 'model:d-locker' | '<categoryId>'`, read from query string.
- Legal: `tab` from hash.
- Forms: `sent` boolean.

## Assets (all in `assets/`)
- `logo.png` (black/red horizontal), `logo-white.png`, `logo-mark.png` (SSS mark).
- `hero.png` — hero photo (three wheels, SSS wall, red neon).
- `beadlock-exploded.png` — footer band render.
- `wheels/r1.png … r7.png` — D-Locker/D-Hole renders: **r7 = Matte Black** (angled), **r4 = Machined Silver** (front), **r5 = Machined Silver, gold bolts** (front), **r6 = Silver face / Black ring** (two-tone, front), **r3 & r1 = D-Hole** (gloss black, front/angled).
- `wheels/d-locker-*.png`, `d-hole-a.png` — earlier renders (fallback).
- `vehicles/hilux.png`, `ranger.png`, `hiace.png`, `rav4.png`.
- `lifestyle/black-boxes.png`, `silver-boxes.png` — warehouse product shots.
- Placeholders (`<image-slot>` grey tiles) = photography still to be supplied: About warehouse photo, accessories, media tiles 8–9, brochure cover, Jimny/Prado vehicles.

## Files
`Home.dc.html`, `SiteHeader.dc.html`, `SiteFooter.dc.html`, `Wheels.dc.html`, `Collections.dc.html`, `Types.dc.html`, `Fitment.dc.html`, `Dealer.dc.html`, `Contact.dc.html`, `About.dc.html`, `Accessories.dc.html`, `Media.dc.html`, `Legal.dc.html`, `wheels-data.js`, `assets/**`. (`Home v1.dc.html` = superseded earlier direction; ignore.)

## Keyframes used (copy verbatim)
```css
@keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }
@keyframes spinIn { from { opacity:0; transform:rotate(-30deg) scale(.9) } to { opacity:1; transform:rotate(0) scale(1) } }
```
All other motion is CSS `transition` on hover/state (durations/easings listed per section) or scroll-driven transforms set in `requestAnimationFrame` from section progress `p = clamp((vh - rect.top) / (vh + rect.height), 0, 1)`.

## Icons
No icon font/SVG set is used; glyphs are text (→ ↓ ▼ ★ + ✓). Map to Lucide: arrow-right, arrow-down, chevron-down, star (filled, #D80009), plus, check.
