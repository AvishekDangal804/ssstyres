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
    y: 7,
    body: 'The height of the wheel across the middle, in inches. A 17" wheel needs a tyre with a 17" inner diameter. Go up in diameter and the tyre gets lower-profile; go down and you gain sidewall to soak up corrugations.',
  },
  {
    title: "Width",
    example: '8"',
    x: 90,
    y: 50,
    body: "How wide the rim is, front to back, in inches. A wider wheel spreads the tyre for more grip and a planted stance — but a rim that's too wide for the tyre pinches its profile.",
  },
  {
    title: "Bolt pattern (PCD)",
    example: "6x139.7",
    x: 50,
    y: 50,
    body: "The number of studs and the diameter of the circle they sit on, in millimetres. 6x139.7 means six studs on a 139.7 mm circle — the standard for most Australian dual cabs and 4x4 wagons. It must match your hubs exactly.",
  },
  {
    title: "Offset (ET)",
    example: "ET0",
    x: 50,
    y: 88,
    body: "How far the mounting face sits from the wheel's centreline, in millimetres. Lower or negative offset pushes the wheel outward for a wider track and aggressive look; too far can rub or exceed your state's legal limit.",
  },
  {
    title: "Centre bore",
    example: "Hub-centric",
    x: 15,
    y: 50,
    body: "The hole in the middle that locates on your hub. A hub-centric wheel has a bore that matches the hub, so it sits dead-centre without the studs carrying the load; where the bore is larger, a hub-centric ring fills the gap.",
  },
];

export default function WheelAnatomy() {
  const [part, setPart] = useState(0);
  const active = PARTS[part];

  return (
    <section id="anatomy" className={styles.anatomy}>
      <div className={styles.sectionHead}>
        <div className={styles.eyebrow}>Part 1 — Anatomy</div>
        <h2 className={styles.h2}>How to read a wheel</h2>
        <p className={styles.lead}>
          Tap a marker to see what each part of the wheel means. Every wheel
          is described by the same handful of measurements.
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
