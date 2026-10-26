"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Guide.module.css";

// Markers are positioned as a percentage of the wheel picture.
const PARTS = [
  {
    title: "Diameter",
    example: '17"',
    x: 50,
    y: 3,
    body: "Wheel height in inches — must match the tyre's inner diameter.",
  },
  {
    title: "Width",
    example: '8"',
    x: 97,
    y: 50,
    body: "Bead seat to bead seat, in inches — sets which tyre widths fit.",
  },
  {
    title: "Bolt pattern (PCD)",
    example: "6x139.7",
    x: 50,
    y: 50,
    body: "Stud count and circle diameter in mm — 6x139.7 suits most utes and 4WDs.",
  },
  {
    title: "Offset (ET)",
    example: "ET0",
    x: 50,
    y: 97,
    body: "Centreline to mounting face, in mm — lower offset pushes the wheel outward.",
  },
  {
    title: "Centre bore",
    example: "106.1mm",
    x: 3,
    y: 50,
    body: "Centre hole diameter — must match the hub or use a spigot ring.",
  },
];

export default function WheelAnatomy() {
  const [part, setPart] = useState(0);
  const active = PARTS[part];

  return (
    <section id="anatomy" className={styles.anatomy}>
      <div className={styles.sectionHead}>
        <div className={styles.eyebrow}>Measurements</div>
        <h2 className={styles.h2}>Essential wheel measurements</h2>
        <p className={styles.lead}>
          Tap a marker to see what each measurement means.
        </p>
      </div>

      <div className={styles.anatomyGrid}>
        <div className={styles.wheelStage}>
          <div className={styles.wheelPic}>
            <Image
              src="/assets/wheels/r4.png"
              alt="Front view of a machined-silver SSS D-Locker wheel"
              fill
              sizes="(max-width: 700px) 90vw, 560px"
              className={styles.contain}
            />
          </div>
          {PARTS.map((p, i) => (
            <button
              key={p.title}
              type="button"
              // Keyboard users use the chips beside the wheel; the markers are
              // for pointer and touch.
              tabIndex={-1}
              aria-label={p.title}
              onClick={() => setPart(i)}
              className={`${styles.marker} ${i === part ? styles.markerOn : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className={styles.anatomySide}>
          <div className={styles.chips} role="group" aria-label="Wheel measurements">
            {PARTS.map((p, i) => (
              <button
                key={p.title}
                type="button"
                aria-pressed={i === part}
                onClick={() => setPart(i)}
                className={`${styles.chip} ${i === part ? styles.chipOn : ""}`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className={styles.detail} aria-live="polite">
            <div className={styles.detailHead}>
              <span className={styles.detailNum}>{part + 1}</span>
              <div>
                <div className={styles.detailExample}>{active.example}</div>
                <h3 className={styles.detailTitle}>{active.title}</h3>
              </div>
            </div>
            <p className={styles.detailBody}>{active.body}</p>
          </div>

          <div className={styles.specExample}>
            <span className={styles.specNums}>
              <span className={styles.specRed}>17x8</span> · 6x139.7 · ET0
            </span>
            <span className={styles.specNote}>
              A typical SSS D-Locker spec — size, bolt pattern, offset.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
