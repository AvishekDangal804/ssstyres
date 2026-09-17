import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { PORTAL } from "@/lib/wheels-data";
import styles from "./Accessories.module.css";

export const metadata: Metadata = {
  title: "Accessories | SSS Wheels & Tyres",
  description:
    "Wheel nuts, lock nut sets, centre caps, hub-centric rings, valves & TPMS, and beadlock hardware — stocked alongside the wheels.",
};

const ITEMS = [
  {
    id: "nuts",
    name: "Wheel nuts & studs",
    desc: "Tapered, shank and mag-seat nuts in chrome and black, matched to every SSS fitment.",
  },
  {
    id: "locks",
    name: "Lock nut sets",
    desc: "Keyed lock nuts to keep the set on the car — one key per vehicle, spares available.",
  },
  {
    id: "caps",
    name: "Centre caps",
    desc: "Replacement SSS centre caps in gloss and matte black, all bore sizes.",
  },
  {
    id: "rings",
    name: "Hub-centric rings",
    desc: "Precision rings for a vibration-free fit on every PCD and bore combination.",
  },
  {
    id: "valves",
    name: "Valves & TPMS",
    desc: "Rubber and alloy valve stems plus TPMS-compatible hardware for late-model vehicles.",
  },
  {
    id: "hardware",
    name: "Beadlock hardware",
    desc: "Replacement rings, bolts and torque specs for SSS beadlock wheels.",
  },
];

export default function AccessoriesPage() {
  return (
    <>
      <PageHeader
        kicker="Accessories"
        title="Everything that bolts on with the wheel"
        body="Nuts, locks, caps and hardware — stocked alongside the wheels so your order arrives fit-ready."
      />
      <section className={styles.section}>
        <div className={styles.grid}>
          {ITEMS.map((a) => (
            <div key={a.id} className={styles.card}>
              <div className={styles.photoWrap}>
                <ImagePlaceholder label={`${a.name} photo`} />
              </div>
              <div className={styles.body}>
                <div className={styles.name}>{a.name}</div>
                <p className={styles.desc}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.ctaStrip}>
          <div className={styles.ctaStripText}>
            Accessories are ordered alongside wheels through the dealer
            portal, or by phone for one-off requirements.
          </div>
          <a
            href={PORTAL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaStripBtn}
          >
            Order via portal
          </a>
        </div>
      </section>
    </>
  );
}
