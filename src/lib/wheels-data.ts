export const PORTAL = 'https://orders.ssswheels.com.au/WebOrder';

const R = {
  black: '/assets/wheels/r7.png',
  blackFront: '/assets/wheels/r7.png',
  silver: '/assets/wheels/r4.png',
  silverGold: '/assets/wheels/r5.png',
  twoTone: '/assets/wheels/r6.png',
  hole: '/assets/wheels/r3.png',
  holeAlt: '/assets/wheels/r1.png',
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
  { id: 'steel', name: 'Steel', tag: 'Durable and repairable.', blurb: 'Pressed-steel construction that takes a hit and keeps rolling — repairable, rated for real loads, finished to shrug off kerbs, gravel and salt.', img: R.hole, bullets: ['Repairable construction', 'High load ratings', 'Classic D-hole design'] },
  { id: 'offroad', name: 'Off Road', tag: 'Engineered for off-road use.', blurb: 'The SSS D-Locker in zero and negative offsets for dual cabs, wagons and touring builds — aggressive stance, solid construction.', img: R.black, bullets: ['1250 kg load rating', 'Negative offset fitments', 'Bolted beadlock-style ring'] },
  { id: 'beadlock', name: 'Beadlocks', tag: 'Beadlock-style strength.', blurb: "The D-Locker's bolted beadlock-style ring gives comp-inspired looks — the styling tourers ask for. Check your state's rules on modified wheels before fitting.", img: R.silverGold, bullets: ['Simulated beadlock ring', 'Hub-centric fitment', 'Comp-inspired styling'] },
  { id: 'street', name: 'Street', tag: 'Clean. Every day.', blurb: 'Machined-silver D-Locker fitments for SUVs and daily drivers such as the RAV4, with OEM-friendly offsets.', img: R.silver, bullets: ['OEM-friendly offsets', 'Hub-centric fitment', 'Machined silver finish'] },
  { id: 'commercial', name: 'Commercial', tag: 'Built for fleet use.', blurb: 'The SSS D-Hole for vans, utes and fleets — high load ratings, a finish that hides kerb rash, and volume supply for fleet accounts.', img: R.holeAlt, bullets: ['Fleet volume supply', 'HiAce and LT fitments', 'Gloss black finish'] },
  { id: 'trailer', name: 'Trailer', tag: 'Tow with confidence.', blurb: 'D-Hole fitments for box, boat and camper trailers — the common PCDs, with a corrosion-resistant coating.', img: R.hole, bullets: ['15"–16" fitments', 'Multi-PCD options', 'Corrosion-resistant finish'] },
];

export type ModelId = 'd-locker' | 'd-hole';

export interface Finish {
  name: string;
  hex: string;
  img: string;
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
      { name: 'Machined Silver', hex: '#C6C8CB', img: R.silver, front: R.silver },
      { name: 'Silver / Black Ring', hex: '#6C6F74', img: R.twoTone, front: R.twoTone },
    ],
  },
  {
    id: 'd-hole', name: 'SSS D-Hole', short: 'D-Hole', cat: 'steel', tag: 'Classic steel', sizes: ['15"', '16"'],
    blurb: 'The classic D-hole wheel, done properly. Gloss black, high load ratings and the common PCDs for utes, vans, fleets and trailers.',
    lifestyle: null,
    finishes: [
      { name: 'Gloss Black', hex: '#0E0E0E', img: R.hole, front: R.holeAlt },
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
  img: string;
}

export const WHEELS: Wheel[] = [
  { id: 'dl-17x8-6x139-b', model: 'd-locker', name: 'SSS D-Locker', variant: 'Matte Black', hex: '#1C1C1C', cat: 'offroad', cat2: 'beadlock', size: '17x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.black },
  { id: 'dl-17x8-6x139-s', model: 'd-locker', name: 'SSS D-Locker', variant: 'Machined Silver', hex: '#C6C8CB', cat: 'street', cat2: 'offroad', size: '17x8', pcd: '6x139.7', offset: 'ET20', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.silver },
  { id: 'dl-17x8-6x139-t', model: 'd-locker', name: 'SSS D-Locker', variant: 'Silver / Black Ring', hex: '#6C6F74', cat: 'beadlock', cat2: 'offroad', size: '17x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.twoTone },
  { id: 'dl-16x8-6x139-b', model: 'd-locker', name: 'SSS D-Locker', variant: 'Matte Black', hex: '#1C1C1C', cat: 'offroad', cat2: 'beadlock', size: '16x8', pcd: '6x139.7', offset: 'ET0', build: 'Cast alloy · beadlock style', load: '1250 kg', img: R.blackFront },
  { id: 'dl-17x8-5x114-s', model: 'd-locker', name: 'SSS D-Locker', variant: 'Machined Silver', hex: '#C6C8CB', cat: 'street', cat2: 'offroad', size: '17x8', pcd: '5x114.3', offset: 'ET35', build: 'Cast alloy · beadlock style', load: '900 kg', img: R.silver },
  { id: 'dh-15x7-6x139', model: 'd-hole', name: 'SSS D-Hole', variant: 'Gloss Black', hex: '#0E0E0E', cat: 'steel', cat2: 'commercial', size: '15x7', pcd: '6x139.7', offset: 'ET0', build: 'Pressed steel', load: '1000 kg', img: R.hole },
  { id: 'dh-15x7-5x139', model: 'd-hole', name: 'SSS D-Hole', variant: 'Gloss Black', hex: '#0E0E0E', cat: 'steel', cat2: 'trailer', size: '15x7', pcd: '5x139.7', offset: 'ET0', build: 'Pressed steel', load: '1000 kg', img: R.holeAlt },
  { id: 'dh-16x7-6x139', model: 'd-hole', name: 'SSS D-Hole', variant: 'Gloss Black', hex: '#0E0E0E', cat: 'steel', cat2: 'commercial', size: '16x7', pcd: '6x139.7', offset: 'ET0', build: 'Pressed steel', load: '1250 kg', img: R.hole },
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
  { make: 'Toyota', model: 'RAV4', pcd: '5x114.3', wheel: 'd-locker', wheelShort: 'D-Locker 17x8', wheelName: 'SSS D-Locker 17x8 Machined Silver', img: '/assets/vehicles/rav4.png' },
  { make: 'Suzuki', model: 'Jimny JB74', pcd: '5x139.7', wheel: 'd-hole', wheelShort: 'D-Hole 15x7', wheelName: 'SSS D-Hole 15x7 Gloss Black', img: null },
  { make: 'Toyota', model: 'LandCruiser Prado 150', pcd: '6x139.7', wheel: 'd-hole', wheelShort: 'D-Hole 16x7', wheelName: 'SSS D-Hole 16x7 Gloss Black', img: null },
];

export const byId = (id: string): Wheel => WHEELS.find((w) => w.id === id) ?? WHEELS[0];
export const catName = (id: string): string => CATEGORIES.find((c) => c.id === id)?.name ?? '';
export const modelName = (id: string): string => MODELS.find((m) => m.id === id)?.name ?? '';
