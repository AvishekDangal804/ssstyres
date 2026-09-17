"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { VEHICLES, WHEELS } from "@/lib/wheels-data";
import styles from "./Fitment.module.css";

const SPECS = [
  {
    num: "01",
    example: "17x8",
    title: "Size",
    body: 'Diameter × width, in inches. A 17x8 wheel is 17" across and 8" wide. Bigger diameter means lower-profile tyres; wider means more tyre contact.',
    tip: "Check guard clearance before sizing up on a lifted 4x4.",
  },
  {
    num: "02",
    example: "6x139.7",
    title: "PCD",
    body: "Pitch circle diameter: the number of studs and the circle they sit on, in millimetres. 6x139.7 is the standard for most Australian dual cabs.",
    tip: 'Also written 6x5.5" — same pattern, imperial.',
  },
  {
    num: "03",
    example: "ET0",
    title: "Offset",
    body: "How far the mounting face sits from the wheel's centreline. Lower or negative offset pushes the wheel outward for a wider stance.",
    tip: "Most states allow ±25 mm from OEM without engineering — confirm for yours.",
  },
];

function findWheelFor(modelId: string, pcd: string) {
  return (
    WHEELS.find((w) => w.model === modelId && w.pcd === pcd) ??
    WHEELS.find((w) => w.model === modelId) ??
    WHEELS[0]
  );
}

export default function FitmentGuide() {
  const [make, setMake] = useState("Toyota");
  const [model, setModel] = useState("HiLux");
  const [pcd, setPcd] = useState("all");
  const [hoverSpec, setHoverSpec] = useState<number | null>(null);
  const finderRef = useRef<HTMLElement | null>(null);

  const makes = useMemo(() => [...new Set(VEHICLES.map((v) => v.make))], []);
  const models = useMemo(
    () => VEHICLES.filter((v) => v.make === make).map((v) => v.model),
    [make]
  );
  const cur = useMemo(
    () => VEHICLES.find((v) => v.make === make && v.model === model) ?? VEHICLES[0],
    [make, model]
  );
  const wheel = useMemo(() => findWheelFor(cur.wheel, cur.pcd), [cur]);

  const selectVehicle = (v: (typeof VEHICLES)[number]) => {
    setMake(v.make);
    setModel(v.model);
  };

  const jumpToFinder = () => {
    const el = finderRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const pcds = useMemo(() => ["all", ...new Set(VEHICLES.map((v) => v.pcd))], []);
  const rows = useMemo(
    () => (pcd === "all" ? VEHICLES : VEHICLES.filter((v) => v.pcd === pcd)),
    [pcd]
  );

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroWheel} />
        <div className={styles.heroScrim} />
        <div className={styles.heroInner}>
          <div className={styles.kickerRow}>
            <span className={styles.bar} />
            Fitment guide
          </div>
          <h1 className={styles.heroH1}>Get the fitment right, first time.</h1>
          <p className={styles.heroBody}>
            Three numbers decide whether a wheel fits: size, bolt pattern and
            offset. Pick your vehicle below and we&apos;ll show you exactly
            what to order.
          </p>
          <div className={styles.heroCtas}>
            <a href="#finder" className={styles.btnWhite}>
              Find my fitment <span>↓</span>
            </a>
            <Link href="/contact" className={styles.btnGhostLight}>
              Ask the team
            </Link>
          </div>
        </div>
      </section>

      <section id="finder" ref={finderRef} className={styles.finderSection}>
        <div className={styles.finderInner}>
          <div className={styles.finderGrid}>
            <div className={styles.finderCard}>
              <div>
                <div className={styles.stepKicker}>Step 1</div>
                <h2 className={styles.stepTitle}>Pick your vehicle</h2>
              </div>
              <div className={styles.selects}>
                <label className={styles.selectField}>
                  Make
                  <select
                    value={make}
                    onChange={(e) => {
                      const mk = e.target.value;
                      const first = VEHICLES.find((v) => v.make === mk);
                      setMake(mk);
                      setModel(first ? first.model : "");
                    }}
                  >
                    {makes.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.selectField}>
                  Model
                  <select value={model} onChange={(e) => setModel(e.target.value)}>
                    {models.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={styles.quickPicks}>
                {VEHICLES.slice(0, 4).map((v) => (
                  <button
                    key={`${v.make}-${v.model}`}
                    type="button"
                    onClick={() => selectVehicle(v)}
                    className={`${styles.pill} ${v.make === make && v.model === model ? styles.active : ""}`}
                  >
                    {v.make} {v.model}
                  </button>
                ))}
              </div>
              <div className={styles.finderNote}>
                Not listed? Send us your rego or vehicle details and
                we&apos;ll confirm the exact fitment, load rating and legal
                offset range for your state.
              </div>
            </div>

            <div className={styles.resultCard}>
              <div
                className={styles.resultImg}
                style={{ backgroundImage: `url('${wheel.img}')` }}
              />
              <div className={styles.resultBody}>
                <div>
                  <div className={styles.stepKicker}>Step 2 — Your fitment</div>
                  <div className={styles.resultVehicle}>
                    {make} {model}
                  </div>
                </div>
                <div className={styles.specTiles}>
                  <div className={styles.specTile}>
                    <div className={styles.specTileLabel}>PCD</div>
                    <div className={styles.specTileValue}>{cur.pcd}</div>
                  </div>
                  <div className={styles.specTile}>
                    <div className={styles.specTileLabel}>Size</div>
                    <div className={styles.specTileValue}>{wheel.size}</div>
                  </div>
                  <div className={styles.specTile}>
                    <div className={styles.specTileLabel}>Offset</div>
                    <div className={styles.specTileValue}>{wheel.offset}</div>
                  </div>
                </div>
                <div className={styles.resultNote}>
                  Recommended: <strong>{cur.wheelName}</strong>. {wheel.build},{" "}
                  {wheel.load} load rating, hub-centric fitment.
                </div>
                <div className={styles.resultCtas}>
                  <Link href={`/wheels?model=${cur.wheel}`} className={styles.btnWhiteSm}>
                    View this wheel <span>→</span>
                  </Link>
                  <a
                    href="http://orders.ssswheels.com.au/WebOrder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnGhostLightSm}
                  >
                    Order via portal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.specsSection}>
        <div className={styles.specsHead}>
          <div>
            <div className={styles.eyebrow}>The three numbers</div>
            <h2 className={styles.h2}>How to read a wheel spec</h2>
          </div>
          <div className={styles.specExample}>
            <span className={styles.size}>17x8</span> · 6x139.7 ·{" "}
            <span className={styles.offset}>ET0</span>
          </div>
        </div>
        <div className={styles.specGrid}>
          {SPECS.map((sp, i) => (
            <div
              key={sp.num}
              onMouseEnter={() => setHoverSpec(i)}
              onMouseLeave={() => setHoverSpec(null)}
              className={`${styles.specCard} ${hoverSpec === i ? styles.hover : ""}`}
            >
              <div className={styles.specCardTop}>
                <div className={styles.specCardNum}>{sp.num}</div>
                <div className={styles.specCardExample}>{sp.example}</div>
              </div>
              <div className={styles.specCardTitle}>{sp.title}</div>
              <p className={styles.specCardBody}>{sp.body}</p>
              <div className={styles.specCardTip}>
                <span>Tip —</span> {sp.tip}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.rowsSection}>
        <div className={styles.rowsHead}>
          <div>
            <div className={styles.eyebrow}>Quick reference</div>
            <h2 className={styles.h2}>Common vehicle fitments</h2>
          </div>
          <div className={styles.pcdFilters}>
            {pcds.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPcd(p)}
                className={`${styles.pill} ${pcd === p ? styles.active : ""}`}
              >
                {p === "all" ? "All PCDs" : p}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.rowsGrid}>
          {rows.map((v) => {
            const on = v.make === make && v.model === model;
            const w = findWheelFor(v.wheel, v.pcd);
            return (
              <button
                key={`${v.make}-${v.model}`}
                type="button"
                onClick={() => {
                  selectVehicle(v);
                  jumpToFinder();
                }}
                className={`${styles.row} ${on ? styles.active : ""}`}
              >
                <div
                  className={styles.rowThumb}
                  style={{ backgroundImage: `url('${w.img}')` }}
                />
                <div className={styles.rowText}>
                  <span className={styles.rowMake}>{v.make}</span>
                  <span className={styles.rowModel}>{v.model}</span>
                  <span className={styles.rowWheelName}>{v.wheelName}</span>
                </div>
                <div className={styles.rowPcd}>
                  <span className={styles.rowPcdLabel}>PCD</span>
                  <span className={styles.rowPcdValue}>{v.pcd}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className={styles.askCard}>
          <div className={styles.askText}>
            <div className={styles.askTitle}>Not sure? We&apos;ll check it for you.</div>
            <div className={styles.askBody}>
              Send us your rego or vehicle details and we&apos;ll confirm the
              exact fitment — including load rating and the legal offset
              range for your state.
            </div>
          </div>
          <Link href="/contact" className={styles.askBtn}>
            Ask our fitment team <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
