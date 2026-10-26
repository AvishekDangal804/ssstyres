export const PORTAL = 'https://orders.ssswheels.com.au/WebOrder';

const R = {
  black: '/assets/wheels/r7.png',
  blackFront: '/assets/wheels/r7.png',
  silver: '/assets/wheels/r4.png',
  silverGold: '/assets/wheels/r5.png',
  twoTone: '/assets/wheels/r6.png',
  hole: '/assets/wheels/r3.png',
  holeAlt: '/assets/wheels/r1.png',
  // The real SSS D-Hole photo (a classic pressed-steel wheel) -- hole/holeAlt
  // above are D-Locker renders that were standing in for D-Hole everywhere
  // it appeared. D-Hole only has a real photo for its Black finish; White
  // and Silver are real stock but have no photo yet (img: null below).
  holeBlack: '/assets/wheels/d-hole-black.png',
} as const;

export type CategoryId = 'steel' | 'offroad' | 'beadlock' | 'street' | 'commercial' | 'trailer';

export interface Category {
  id: CategoryId;
  name: string;
  tag: string;
  blurb: string;
  img: string;
  bullets: string[];
}

export const CATEGORIES: Category[] = [
  { id: 'steel', name: 'Steel', tag: 'Durable and repairable.', blurb: 'Pressed-steel construction that takes a hit and keeps rolling — repairable, rated for real loads, finished to shrug off kerbs, gravel and salt.', img: R.holeBlack, bullets: ['Repairable construction', 'High load ratings', 'Classic D-hole design', 'Load ratings to 1250 kg'] },
  { id: 'offroad', name: 'Off Road', tag: 'Engineered for off-road use.', blurb: 'The SSS D-Locker in zero and negative offsets for dual cabs, wagons and touring builds — aggressive stance, solid construction.', img: R.twoTone, bullets: ['1250 kg load rating', 'Negative offset fitments', 'Bolted beadlock-style ring', '16x8 and 17x8 sizes'] },
  { id: 'beadlock', name: 'Beadlocks', tag: 'Beadlock-style strength.', blurb: "The D-Locker's bolted beadlock-style ring gives comp-inspired looks — the styling tourers ask for. Check your state's rules on modified wheels before fitting.", img: R.silverGold, bullets: ['Simulated beadlock ring', 'Hub-centric fitment', 'Comp-inspired styling', '3 finishes available'] },
  { id: 'street', name: 'Street', tag: 'Clean. Every day.', blurb: 'Machined-silver D-Locker fitments for SUVs and daily drivers such as the RAV4, with OEM-friendly offsets.', img: R.silver, bullets: ['OEM-friendly offsets', 'Hub-centric fitment', 'Machined silver finish', '2 machined finishes'] },
  { id: 'commercial', name: 'Commercial', tag: 'Built for fleet use.', blurb: 'The SSS D-Hole for vans, utes and fleets — high load ratings, a finish that hides kerb rash, and volume supply for fleet accounts.', img: R.holeBlack, bullets: ['Fleet volume supply', 'HiAce and LT fitments', 'Black, white and silver', '15x7 and 16x7 sizes'] },
  { id: 'trailer', name: 'Trailer', tag: 'Tow with confidence.', blurb: 'D-Hole fitments for box, boat and camper trailers — the common PCDs, with a corrosion-resistant coating.', img: R.holeBlack, bullets: ['15"–16" fitments', 'Multi-PCD options', 'Corrosion-resistant finish', '1000 kg load rating'] },
];

export type ModelId = 'd-locker' | 'd-hole';

export interface Finish {
  name: string;
  hex: string;
  /** null where the finish is real stock but has no photo yet. */
  img: string | null;
  front: string;
}

export interface Model {
  id: ModelId;
  name: string;
  short: string;
  cat: CategoryId;
  tag: string;
  sizes: string[];
  blurb: string;
  /** Real warehouse/stock photo for this model — null where none exists yet. */
  lifestyle: string | null;
  finishes: Finish[];
}

export const MODELS: Model[] = [
  {
    id: 'd-locker', name: 'SSS D-Locker', short: 'D-Locker', cat: 'offroad', tag: 'Beadlock-style · 4x4 off-road', sizes: ['16"', '17"'],
    blurb: "A 4x4 off-road wheel with a bolted beadlock-style ring, offered for HiLux, Ranger, HiAce and RAV4 fitments. Hub-centric, with load ratings listed for each fitment.",
    lifestyle: '/assets/lifestyle/silver-boxes.png',
    finishes: [
      { name: 'Matte Black', hex: '#1C1C1C', img: R.black, front: R.blackFront },
      { name: 'Full Machined', hex: '#C6C8CB', img: R.silver, front: R.silver },
      { name: 'Silver / Black Ring', hex: '#6C6F74', img: R.twoTone, front: R.twoTone },
      { name: 'Machined Silver', hex: '#B6BAC0', img: R.hole, front: R.hole },
      { name: 'Black & Machined', hex: '#2E3136', img: R.holeAlt, front: R.holeAlt },
      { name: 'Machined · Gold Bolt', hex: '#C9A23A', img: R.silverGold, front: R.silverGold },
    ],
  },
  {
    id: 'd-hole', name: 'SSS D-Hole', short: 'D-Hole', cat: 'steel', tag: 'Classic steel', sizes: ['15"', '16"'],
    blurb: 'The classic D-hole wheel, done properly. Black, white and silver, with high load ratings and the common PCDs for utes, vans, fleets and trailers.',
    lifestyle: null,
    finishes: [
      // White and Silver are real stock without a photo yet -- img: null
      // renders a placeholder rather than a made-up or borrowed picture.
      { name: 'Black', hex: '#0E0E0E', img: R.holeBlack, front: R.holeBlack },
      { name: 'White', hex: '#F2F1ED', img: null, front: R.holeBlack },
      { name: 'Silver', hex: '#B8BCC2', img: null, front: R.holeBlack },
    ],
  },
];

export interface Wheel {
  id: string;
  model: ModelId;
  name: string;
  variant: string;
  hex: string;
  cat: CategoryId;
  cat2: CategoryId;
  size: string;
  pcd: string;
  offset: string;
  build: string;
  load: string;
  /** null where the finish is real stock but has no photo yet. */
  img: string | null;
}

export const WHEELS: Wheel[] = [
  { id: 'dl-17x8-6x139-b', model: 'd-locker', name: 'SSS D-Locker', variant: 'Matte Black', hex: '#1C1C1C', cat: 'offroad', cat2: 'beadlock', size: '17x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.black },
  { id: 'dl-17x8-6x139-s', model: 'd-locker', name: 'SSS D-Locker', variant: 'Full Machined', hex: '#C6C8CB', cat: 'street', cat2: 'offroad', size: '17x8', pcd: '6x139.7', offset: 'ET20', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.silver },
  { id: 'dl-17x8-6x139-t', model: 'd-locker', name: 'SSS D-Locker', variant: 'Silver / Black Ring', hex: '#6C6F74', cat: 'beadlock', cat2: 'offroad', size: '17x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.twoTone },
  { id: 'dl-16x8-6x139-b', model: 'd-locker', name: 'SSS D-Locker', variant: 'Matte Black', hex: '#1C1C1C', cat: 'offroad', cat2: 'beadlock', size: '16x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.blackFront },
  { id: 'dl-16x8-6x139-s', model: 'd-locker', name: 'SSS D-Locker', variant: 'Full Machined', hex: '#C6C8CB', cat: 'street', cat2: 'offroad', size: '16x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.silver },
  { id: 'dl-16x8-6x139-t', model: 'd-locker', name: 'SSS D-Locker', variant: 'Silver / Black Ring', hex: '#6C6F74', cat: 'beadlock', cat2: 'offroad', size: '16x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.twoTone },
  { id: 'dl-16x8-6x139-ms', model: 'd-locker', name: 'SSS D-Locker', variant: 'Machined Silver', hex: '#B6BAC0', cat: 'street', cat2: 'offroad', size: '16x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.hole },
  { id: 'dl-16x8-6x139-bm', model: 'd-locker', name: 'SSS D-Locker', variant: 'Black & Machined', hex: '#2E3136', cat: 'beadlock', cat2: 'offroad', size: '16x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.holeAlt },
  { id: 'dl-16x8-6x139-gold', model: 'd-locker', name: 'SSS D-Locker', variant: 'Machined · Gold Bolt', hex: '#C9A23A', cat: 'beadlock', cat2: 'offroad', size: '16x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.silverGold },
  { id: 'dl-17x8-5x114-s', model: 'd-locker', name: 'SSS D-Locker', variant: 'Full Machined', hex: '#C6C8CB', cat: 'street', cat2: 'offroad', size: '17x8', pcd: '5x114.3', offset: 'ET35', build: 'Cast alloy · beadlock style', load: '900 kg', img: R.silver },
  { id: 'dl-17x8-5x114-b', model: 'd-locker', name: 'SSS D-Locker', variant: 'Matte Black', hex: '#1C1C1C', cat: 'offroad', cat2: 'beadlock', size: '17x8', pcd: '5x114.3', offset: 'ET35', build: 'Cast alloy · beadlock style', load: '900 kg', img: R.black },
  { id: 'dl-17x8-5x114-t', model: 'd-locker', name: 'SSS D-Locker', variant: 'Silver / Black Ring', hex: '#6C6F74', cat: 'beadlock', cat2: 'offroad', size: '17x8', pcd: '5x114.3', offset: 'ET35', build: 'Cast alloy · beadlock style', load: '900 kg', img: R.twoTone },
  { id: 'dl-17x8-5x114-ms', model: 'd-locker', name: 'SSS D-Locker', variant: 'Machined Silver', hex: '#B6BAC0', cat: 'street', cat2: 'offroad', size: '17x8', pcd: '5x114.3', offset: 'ET35', build: 'Cast alloy · beadlock style', load: '900 kg', img: R.hole },
  { id: 'dl-17x8-5x114-bm', model: 'd-locker', name: 'SSS D-Locker', variant: 'Black & Machined', hex: '#2E3136', cat: 'beadlock', cat2: 'offroad', size: '17x8', pcd: '5x114.3', offset: 'ET35', build: 'Cast alloy · beadlock style', load: '900 kg', img: R.holeAlt },
  { id: 'dl-17x8-5x114-gold', model: 'd-locker', name: 'SSS D-Locker', variant: 'Machined · Gold Bolt', hex: '#C9A23A', cat: 'beadlock', cat2: 'offroad', size: '17x8', pcd: '5x114.3', offset: 'ET35', build: 'Cast alloy · beadlock style', load: '900 kg', img: R.silverGold },
  { id: 'dl-17x8-6x139-ms', model: 'd-locker', name: 'SSS D-Locker', variant: 'Machined Silver', hex: '#B6BAC0', cat: 'street', cat2: 'offroad', size: '17x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.hole },
  { id: 'dl-17x8-6x139-bm', model: 'd-locker', name: 'SSS D-Locker', variant: 'Black & Machined', hex: '#2E3136', cat: 'beadlock', cat2: 'offroad', size: '17x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.holeAlt },
  { id: 'dl-17x8-6x139-gold', model: 'd-locker', name: 'SSS D-Locker', variant: 'Machined · Gold Bolt', hex: '#C9A23A', cat: 'beadlock', cat2: 'offroad', size: '17x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.silverGold },
  // White and Silver are real stock without a photo yet -- img: null renders
  // a placeholder rather than a made-up or borrowed picture.
  { id: 'dh-15x7-6x139-b', model: 'd-hole', name: 'SSS D-Hole', variant: 'Black', hex: '#0E0E0E', cat: 'steel', cat2: 'commercial', size: '15x7', pcd: '6x139.7', offset: 'ET0', build: 'Pressed steel', load: '1000 kg', img: R.holeBlack },
  { id: 'dh-15x7-6x139-w', model: 'd-hole', name: 'SSS D-Hole', variant: 'White', hex: '#F2F1ED', cat: 'steel', cat2: 'commercial', size: '15x7', pcd: '6x139.7', offset: 'ET0', build: 'Pressed steel', load: '1000 kg', img: null },
  { id: 'dh-15x7-6x139-s', model: 'd-hole', name: 'SSS D-Hole', variant: 'Silver', hex: '#B8BCC2', cat: 'steel', cat2: 'commercial', size: '15x7', pcd: '6x139.7', offset: 'ET0', build: 'Pressed steel', load: '1000 kg', img: null },
  { id: 'dh-15x7-5x139-b', model: 'd-hole', name: 'SSS D-Hole', variant: 'Black', hex: '#0E0E0E', cat: 'steel', cat2: 'trailer', size: '15x7', pcd: '5x139.7', offset: 'ET0', build: 'Pressed steel', load: '1000 kg', img: R.holeBlack },
  { id: 'dh-15x7-5x139-w', model: 'd-hole', name: 'SSS D-Hole', variant: 'White', hex: '#F2F1ED', cat: 'steel', cat2: 'trailer', size: '15x7', pcd: '5x139.7', offset: 'ET0', build: 'Pressed steel', load: '1000 kg', img: null },
  { id: 'dh-15x7-5x139-s', model: 'd-hole', name: 'SSS D-Hole', variant: 'Silver', hex: '#B8BCC2', cat: 'steel', cat2: 'trailer', size: '15x7', pcd: '5x139.7', offset: 'ET0', build: 'Pressed steel', load: '1000 kg', img: null },
  { id: 'dh-16x7-6x139-b', model: 'd-hole', name: 'SSS D-Hole', variant: 'Black', hex: '#0E0E0E', cat: 'steel', cat2: 'commercial', size: '16x7', pcd: '6x139.7', offset: 'ET0', build: 'Pressed steel', load: '1250 kg', img: R.holeBlack },
  { id: 'dh-16x7-6x139-w', model: 'd-hole', name: 'SSS D-Hole', variant: 'White', hex: '#F2F1ED', cat: 'steel', cat2: 'commercial', size: '16x7', pcd: '6x139.7', offset: 'ET0', build: 'Pressed steel', load: '1250 kg', img: null },
  { id: 'dh-16x7-6x139-s', model: 'd-hole', name: 'SSS D-Hole', variant: 'Silver', hex: '#B8BCC2', cat: 'steel', cat2: 'commercial', size: '16x7', pcd: '6x139.7', offset: 'ET0', build: 'Pressed steel', load: '1250 kg', img: null },
  // TEMPORARY fill, added to preview a full 8-card grid (2x4 rows) per
  // manager request -- reuses existing photos (no new photography) and
  // plausible-but-unconfirmed specs. Replace with verified fitment data
  // (or remove) before this is treated as real stock.
  { id: 'dl-17x9-6x139-b', model: 'd-locker', name: 'SSS D-Locker', variant: 'Matte Black', hex: '#1C1C1C', cat: 'offroad', cat2: 'beadlock', size: '17x9', pcd: '6x139.7', offset: 'ET-15', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.black },
  { id: 'dh-17x7-6x139-b', model: 'd-hole', name: 'SSS D-Hole', variant: 'Black', hex: '#0E0E0E', cat: 'steel', cat2: 'commercial', size: '17x7', pcd: '6x139.7', offset: 'ET0', build: 'Pressed steel', load: '1250 kg', img: R.holeBlack },
];

export interface Vehicle {
  make: string;
  model: string;
  pcd: string;
  wheel: ModelId;
  wheelShort: string;
  wheelName: string;
  img: string | null;
}

export const VEHICLES: Vehicle[] = [
  { make: 'Toyota', model: 'HiLux', pcd: '6x139.7', wheel: 'd-locker', wheelShort: 'D-Locker 17x8', wheelName: 'SSS D-Locker 17x8 Matte Black', img: '/assets/vehicles/hilux.png' },
  { make: 'Ford', model: 'Ranger', pcd: '6x139.7', wheel: 'd-locker', wheelShort: 'D-Locker 17x8', wheelName: 'SSS D-Locker 17x8 Matte Black', img: '/assets/vehicles/ranger.png' },
  { make: 'Toyota', model: 'HiAce', pcd: '6x139.7', wheel: 'd-locker', wheelShort: 'D-Locker 16x8', wheelName: 'SSS D-Locker 16x8 Matte Black', img: '/assets/vehicles/hiace.png' },
  { make: 'Toyota', model: 'RAV4', pcd: '5x114.3', wheel: 'd-locker', wheelShort: 'D-Locker 17x8', wheelName: 'SSS D-Locker 17x8 Full Machined', img: '/assets/vehicles/rav4.png' },
  { make: 'Suzuki', model: 'Jimny JB74', pcd: '5x139.7', wheel: 'd-hole', wheelShort: 'D-Hole 15x7', wheelName: 'SSS D-Hole 15x7 Black', img: null },
  { make: 'Toyota', model: 'LandCruiser Prado 150', pcd: '6x139.7', wheel: 'd-hole', wheelShort: 'D-Hole 16x7', wheelName: 'SSS D-Hole 16x7 Black', img: null },
];

export interface WheelGroup {
  key: string;
  variants: Wheel[];
}

function groupBy(list: Wheel[], keyOf: (w: Wheel) => string): WheelGroup[] {
  const groups = new Map<string, WheelGroup>();
  for (const w of list) {
    const key = keyOf(w);
    const existing = groups.get(key);
    if (existing) existing.variants.push(w);
    else groups.set(key, { key, variants: [w] });
  }
  return [...groups.values()];
}

// Grouped by model only, so every finish/size/PCD of a wheel is one card with
// colour swatches rather than a card per size/finish combination. A swatch
// can therefore change the size/PCD shown, not just the colour — the active
// variant's own spec line is what's authoritative, not the group. Used by the
// Home "Wheel range" slider, which wants a few rich cards rather than one per
// finish.
export function groupWheels(list: Wheel[]): WheelGroup[] {
  return groupBy(list, (w) => w.model);
}

// Grouped by model + finish, so each real finish gets its own card instead of
// collapsing every colour into one card per model. Every variant in a group
// therefore already shares a hex — a swatch here can only change size/PCD,
// never colour.
export function groupWheelsByFinish(list: Wheel[]): WheelGroup[] {
  return groupBy(list, (w) => `${w.model}::${w.variant}`);
}

// Grouped by model + size + PCD, so each real physical fitment is one card
// and a swatch changes colour (never size/PCD, since that's what defines the
// group). Most fitments only come in one real colour and show no swatches at
// all -- only the ones manager actually stocks in several finishes do. Used
// by the /wheels catalogue grid: shows every fitment as its own card (not
// just 2 per model) while still letting the ones with real colour options
// show them, matching the "pick a wheel, then pick its finish" pattern
// manager asked for.
export function groupWheelsBySize(list: Wheel[]): WheelGroup[] {
  return groupBy(list, (w) => `${w.model}::${w.size}::${w.pcd}`);
}

// Leads with a non-black finish where the wheel actually comes in one.
export function defaultVariantIndex(variants: Wheel[]): number {
  // Prefers a non-black variant that actually has a photo (the usual case).
  // Falls back to whichever variant has a photo at all -- otherwise a group
  // where only the black variant has one (e.g. D-Hole's White/Silver are
  // real stock with no photo yet) would default to a placeholder instead of
  // the one real picture it has.
  const nonBlackWithPhoto = variants.findIndex((v) => !/black/i.test(v.variant) && v.img);
  if (nonBlackWithPhoto >= 0) return nonBlackWithPhoto;
  const anyWithPhoto = variants.findIndex((v) => v.img);
  if (anyWithPhoto >= 0) return anyWithPhoto;
  const nonBlack = variants.findIndex((v) => !/black/i.test(v.variant));
  return nonBlack >= 0 ? nonBlack : 0;
}

export const byId = (id: string): Wheel => WHEELS.find((w) => w.id === id) ?? WHEELS[0];
export const catName = (id: string): string => CATEGORIES.find((c) => c.id === id)?.name ?? '';
export const modelName = (id: string): string => MODELS.find((m) => m.id === id)?.name ?? '';

export interface Fitment {
  size: string;
  pcd: string;
}

// Every real (size, PCD) combination actually in stock, derived from WHEELS
// rather than hand-listed, so the home-page size search can never drift out
// of sync with what /wheels actually carries. Order follows WHEELS itself
// (D-Locker fitments first, then D-Hole).
export const FITMENTS: Fitment[] = (() => {
  const seen = new Set<string>();
  const out: Fitment[] = [];
  for (const w of WHEELS) {
    const key = `${w.size}::${w.pcd}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ size: w.size, pcd: w.pcd });
  }
  return out;
})();

export const FITMENT_SIZES: string[] = [...new Set(FITMENTS.map((f) => f.size))];

export function pcdsForSize(size: string): string[] {
  return FITMENTS.filter((f) => f.size === size).map((f) => f.pcd);
}
