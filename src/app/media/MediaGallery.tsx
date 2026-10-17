"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import styles from "./Media.module.css";

type Category =
  | "Warehouse & Stock"
  | "Delivery & Logistics"
  | "Workshop & Trade"
  | "Tyres & Wheels";

interface Tile {
  category: Category;
  label: string;
  sub: string;
  /** Omit for a tile with no real photo yet -- renders a labelled placeholder
      instead of pretending a stand-in image is the real thing. */
  img?: string;
  fit: "cover" | "contain";
  href: string;
}

const ALL_TILES: Tile[] = [
  // Warehouse & Stock
  {
    category: "Warehouse & Stock",
    label: "Boxed stock",
    sub: "SSS wheels ready to ship, Dandenong South",
    img: "/assets/lifestyle/silver-boxes.png",
    fit: "cover",
    href: "/about",
  },
  {
    category: "Warehouse & Stock",
    label: "Our warehouse",
    sub: "13 Advantage Drive, Dandenong South",
    img: "/assets/about/warehouse.jpg",
    fit: "cover",
    href: "/about",
  },

  // Delivery & Logistics
  {
    category: "Delivery & Logistics",
    label: "Delivery fleet",
    sub: "Photo coming soon",
    fit: "contain",
    href: "/#home-delivery",
  },

  // Workshop & Trade
  {
    category: "Workshop & Trade",
    label: "In the workshop",
    sub: "Fitting a wheel at our Dandenong South workshop",
    img: "/assets/lifestyle/workshop.jpg",
    fit: "cover",
    href: "/trade",
  },

  // Tyres & Wheels
  { category: "Tyres & Wheels", label: "Toyota HiLux", sub: "SSS D-Locker 17x8 · Matte Black", img: "/assets/vehicles/hilux.png", fit: "cover", href: "/wheels?model=d-locker" },
  { category: "Tyres & Wheels", label: "D-Locker", sub: "Matte Black · beadlock style", img: "/assets/wheels/r7.png", fit: "contain", href: "/wheels?model=d-locker" },
  { category: "Tyres & Wheels", label: "Ford Ranger", sub: "SSS D-Locker 17x8 · Matte Black", img: "/assets/vehicles/ranger.png", fit: "cover", href: "/wheels?model=d-locker" },
  { category: "Tyres & Wheels", label: "Toyota HiAce", sub: "SSS D-Locker 16x8 · Matte Black", img: "/assets/vehicles/hiace.png", fit: "cover", href: "/wheels?model=d-locker" },
  { category: "Tyres & Wheels", label: "D-Hole", sub: "Black · pressed steel", img: "/assets/wheels/d-hole-black.png", fit: "contain", href: "/wheels?model=d-hole" },
  { category: "Tyres & Wheels", label: "Toyota RAV4", sub: "SSS D-Locker 17x8 · Full Machined", img: "/assets/vehicles/rav4.png", fit: "cover", href: "/wheels?model=d-locker" },
  { category: "Tyres & Wheels", label: "D-Locker", sub: "Full Machined", img: "/assets/wheels/r4.png", fit: "contain", href: "/wheels?model=d-locker" },
  { category: "Tyres & Wheels", label: "D-Locker", sub: "Satin Black, beadlock-style ring", img: "/assets/lifestyle/black-boxes.png", fit: "contain", href: "/wheels?model=d-locker" },
  { category: "Tyres & Wheels", label: "D-Locker", sub: "Beadlock-style ring, exploded", img: "/assets/beadlock-exploded.png", fit: "contain", href: "/wheels?model=d-locker" },
];

const CATEGORIES: (Category | "all")[] = [
  "all",
  "Warehouse & Stock",
  "Delivery & Logistics",
  "Workshop & Trade",
  "Tyres & Wheels",
];

export default function MediaGallery() {
  const [filter, setFilter] = useState<Category | "all">("all");

  const list = useMemo(
    () => (filter === "all" ? ALL_TILES : ALL_TILES.filter((t) => t.category === filter)),
    [filter]
  );

  return (
    <>
      <div className={styles.filterRow}>
        <div className={styles.filters} role="group" aria-label="Filter gallery">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`${styles.filterBtn} ${filter === c ? styles.active : ""}`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
        <div className={styles.count} aria-live="polite">
          {list.length} {list.length === 1 ? "item" : "items"}
        </div>
      </div>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {list.map((t) => (
            <Link
              key={`${t.category}-${t.label}-${t.sub}`}
              href={t.href}
              className={`${styles.tile} ${styles[t.fit]}`}
            >
              <div className={`${styles.tileImg} ${styles[t.fit]}`}>
                {t.img ? (
                  <Image
                    src={t.img}
                    alt={`${t.label} — ${t.sub}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className={styles[`${t.fit}Photo`]}
                  />
                ) : (
                  <ImagePlaceholder
                    label={`${t.label} — photo coming soon`}
                    showLabel={false}
                  />
                )}
              </div>
              <div className={styles.tileScrim} />
              <div className={styles.tileFooter}>
                <div className={styles.tileText}>
                  <span className={styles.tileKind}>{t.category}</span>
                  <span className={styles.tileLabel}>{t.label}</span>
                  <span className={styles.tileSub}>{t.sub}</span>
                </div>
                <span className={styles.tileArrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
