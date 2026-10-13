"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Media.module.css";

type Kind = "Vehicle" | "Wheel" | "Warehouse";

interface Tile {
  kind: Kind;
  label: string;
  sub: string;
  img: string;
  fit: "cover" | "contain";
  href: string;
}

const ALL_TILES: Tile[] = [
  { kind: "Vehicle", label: "Toyota HiLux", sub: "SSS D-Locker 17x8 · Matte Black", img: "/assets/vehicles/hilux.png", fit: "cover", href: "/wheels?model=d-locker" },
  { kind: "Wheel", label: "D-Locker", sub: "Matte Black · beadlock style", img: "/assets/wheels/r7.png", fit: "contain", href: "/wheels?model=d-locker" },
  { kind: "Vehicle", label: "Ford Ranger", sub: "SSS D-Locker 17x8 · Matte Black", img: "/assets/vehicles/ranger.png", fit: "cover", href: "/wheels?model=d-locker" },
  { kind: "Vehicle", label: "Toyota HiAce", sub: "SSS D-Locker 16x8 · Matte Black", img: "/assets/vehicles/hiace.png", fit: "cover", href: "/wheels?model=d-locker" },
  { kind: "Wheel", label: "D-Hole", sub: "Black · pressed steel", img: "/assets/wheels/d-hole-black.png", fit: "contain", href: "/wheels?model=d-hole" },
  { kind: "Vehicle", label: "Toyota RAV4", sub: "SSS D-Locker 17x8 · Full Machined", img: "/assets/vehicles/rav4.png", fit: "cover", href: "/wheels?model=d-locker" },
  { kind: "Warehouse", label: "Machined silver stock", sub: "SSS Wheels boxed stock", img: "/assets/lifestyle/silver-boxes.png", fit: "cover", href: "/about" },
  { kind: "Wheel", label: "D-Locker", sub: "Full Machined", img: "/assets/wheels/r4.png", fit: "contain", href: "/wheels?model=d-locker" },
  { kind: "Wheel", label: "D-Locker", sub: "Beadlock-style ring, exploded", img: "/assets/beadlock-exploded.png", fit: "contain", href: "/wheels?model=d-locker" },
];

const KINDS: (Kind | "all")[] = ["all", "Vehicle", "Wheel", "Warehouse"];

export default function MediaGallery() {
  const [filter, setFilter] = useState<Kind | "all">("all");

  const list = useMemo(
    () => (filter === "all" ? ALL_TILES : ALL_TILES.filter((t) => t.kind === filter)),
    [filter]
  );

  return (
    <>
      <div className={styles.filterRow}>
        <div className={styles.filters} role="group" aria-label="Filter gallery">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              aria-pressed={filter === k}
              className={`${styles.filterBtn} ${filter === k ? styles.active : ""}`}
            >
              {k === "all" ? "All" : `${k}s`}
            </button>
          ))}
        </div>
        <div className={styles.count} aria-live="polite">
          {list.length} {list.length === 1 ? "post" : "posts"}
        </div>
      </div>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {list.map((t) => (
            <Link
              key={`${t.kind}-${t.label}-${t.sub}`}
              href={t.href}
              className={`${styles.tile} ${styles[t.fit]}`}
            >
              <div className={`${styles.tileImg} ${styles[t.fit]}`}>
                <Image
                  src={t.img}
                  alt={`${t.label} — ${t.sub}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className={styles[`${t.fit}Photo`]}
                />
              </div>
              <div className={styles.tileScrim} />
              <div className={styles.tileFooter}>
                <div className={styles.tileText}>
                  <span className={styles.tileKind}>{t.kind}</span>
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
