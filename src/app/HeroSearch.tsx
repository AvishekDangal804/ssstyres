"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FITMENTS, FITMENT_SIZES, pcdsForSize } from "@/lib/wheels-data";
import styles from "./HeroSearch.module.css";

export default function HeroSearch() {
  const router = useRouter();
  const [size, setSize] = useState("");
  const [pcd, setPcd] = useState("");

  const pcdOptions = useMemo(() => (size ? pcdsForSize(size) : []), [size]);

  function goToFitment(s: string, p: string) {
    router.push(`/wheels?size=${encodeURIComponent(s)}&pcd=${encodeURIComponent(p)}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!size || !pcd) return;
    goToFitment(size, pcd);
  }

  return (
    <section className={styles.wrap} aria-label="Find your wheel fitment">
      <div className={styles.card}>
        <h2 className={styles.cardHeading}>Find your wheel size</h2>

        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Size</span>
            <select
              className={styles.select}
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                setPcd("");
              }}
            >
              <option value="">Select size</option>
              {FITMENT_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>PCD</span>
            <select
              className={styles.select}
              value={pcd}
              onChange={(e) => setPcd(e.target.value)}
              disabled={!size}
            >
              <option value="">{size ? "Select PCD" : "Select size first"}</option>
              {pcdOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className={styles.searchBtn} disabled={!size || !pcd}>
            Search wheels
          </button>
        </form>

        <div className={styles.popularRow}>
          <span className={styles.popularLabel}>Popular</span>
          {FITMENTS.map((f) => (
            <button
              key={`${f.size}-${f.pcd}`}
              type="button"
              className={styles.chip}
              onClick={() => goToFitment(f.size, f.pcd)}
            >
              {f.size} · {f.pcd}
            </button>
          ))}
          <Link href="/fitment" className={styles.helpLink}>
            Need help finding your size?
          </Link>
        </div>
      </div>
    </section>
  );
}
