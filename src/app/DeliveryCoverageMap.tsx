"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type * as LeafletNS from "leaflet";
import "leaflet/dist/leaflet.css";
import { GOOGLE_DIRECTIONS_URL } from "@/lib/site";
import styles from "./DeliveryCoverageMap.module.css";

// Matches the site's --red token. Leaflet needs a literal colour string, not
// a CSS var, since it paints onto a canvas/SVG layer outside React's tree.
const RED = "#e3261b";
const WAREHOUSE: [number, number] = [-38.0335, 145.204];
// Central Victoria point the "regional" zone's wide circle is drawn around
// (not the warehouse itself) -- keeps the circle centred on the state rather
// than lopsided toward Melbourne's south-east.
const VIC_CENTRE: [number, number] = [-37.0, 144.6];
const CAPITALS: { name: string; lat: number; lng: number }[] = [
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Canberra", lat: -35.2809, lng: 149.13 },
  { name: "Brisbane", lat: -27.4698, lng: 153.0251 },
  { name: "Adelaide", lat: -34.9285, lng: 138.6007 },
  { name: "Perth", lat: -31.9505, lng: 115.8605 },
  { name: "Hobart", lat: -42.8821, lng: 147.3272 },
  { name: "Darwin", lat: -12.4634, lng: 130.8456 },
];
const CYCLE_MS = 6000;

interface Zone {
  id: string;
  title: string;
  meta: string;
  desc: string;
  chips: string[];
}

const ZONES: Zone[] = [
  {
    id: "metro",
    title: "Metro Melbourne",
    meta: "Own vans · same-day",
    desc: "Delivered by our own vans straight from Dandenong South. Urgent orders within the hour; standard orders same or next business day.",
    chips: [
      "CBD",
      "Inner East",
      "Inner West",
      "North",
      "South",
      "South-East",
      "North-East",
      "West",
      "Mornington Peninsula",
    ],
  },
  {
    id: "regional",
    title: "Regional Victoria",
    meta: "Scheduled freight",
    desc: "Scheduled freight runs from Dandenong South to regional centres across Victoria. Most orders arrive within 1–3 business days, depending on location.",
    chips: [
      "Geelong",
      "Ballarat",
      "Bendigo",
      "Shepparton",
      "Gippsland",
      "Wodonga",
      "Warrnambool",
      "Mildura",
    ],
  },
  {
    id: "au",
    title: "Australia-wide",
    meta: "Interstate freight",
    desc: "Interstate orders are consigned through national freight partners to every state and territory. Sydney, Brisbane and Adelaide warehouses are opening soon.",
    chips: ["NSW", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  },
];

export default function DeliveryCoverageMap() {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletNS.Map | null>(null);
  const showZoneRef = useRef<((i: number, animate: boolean) => void) | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [zone, setZone] = useState(0);
  const [cycling, setCycling] = useState(true);
  const [cycleKey, setCycleKey] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    import("leaflet").then((L) => {
      if (cancelled || !mapElRef.current || mapRef.current) return;

      const map = L.map(mapElRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        subdomains: "abc",
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const pinIcon = () =>
        L.divIcon({
          className: "",
          iconSize: [0, 0],
          html: `<div class="${styles.pin}"><span class="${styles.pinPulse}" style="background:${RED}"></span><span class="${styles.pinDrop}" style="background:${RED}"><span class="${styles.pinDropHole}"></span></span></div>`,
        });

      const ring = { color: RED, weight: 2, opacity: 0.85, fillColor: RED, fillOpacity: 0.1 };

      const metro = L.layerGroup([
        L.circle(WAREHOUSE, { ...ring, radius: 42000 }),
        L.circle(WAREHOUSE, { ...ring, radius: 7000, fillOpacity: 0.18 }),
      ]);
      const metroBounds = L.latLng(WAREHOUSE).toBounds(84000);

      const regional = L.layerGroup([
        L.circle(VIC_CENTRE, { ...ring, radius: 340000, fillOpacity: 0.08 }),
        L.circle(WAREHOUSE, { ...ring, radius: 42000, fillOpacity: 0.16 }),
      ]);
      const regionalBounds = L.latLng(VIC_CENTRE).toBounds(680000);

      const au = L.layerGroup(
        CAPITALS.flatMap((c) => [
          L.polyline([WAREHOUSE, [c.lat, c.lng]], {
            color: RED,
            weight: 2,
            opacity: 0.75,
            dashArray: "6 6",
          }),
          L.circleMarker([c.lat, c.lng], {
            radius: 6,
            color: "#fff",
            weight: 2,
            fillColor: RED,
            fillOpacity: 1,
          }),
        ])
      );
      const auBounds = L.latLngBounds([
        [-10.5, 113],
        [-43.8, 154],
      ]);

      const built = [
        { group: metro, bounds: metroBounds },
        { group: regional, bounds: regionalBounds },
        { group: au, bounds: auBounds },
      ];

      const pin = L.marker(WAREHOUSE, {
        zIndexOffset: 1000,
        interactive: false,
        icon: pinIcon(),
      }).addTo(map);

      const showZone = (i: number, animate: boolean) => {
        built.forEach((b, j) => (j === i ? b.group.addTo(map) : b.group.remove()));
        const opts = {
          paddingTopLeft: [20, 70] as [number, number],
          paddingBottomRight: [20, 60] as [number, number],
        };
        if (animate) {
          map.flyToBounds(built[i].bounds, { ...opts, duration: 1.2 });
          map.once("moveend", () => pin.setIcon(pinIcon()));
        } else {
          map.fitBounds(built[i].bounds, opts);
        }
      };
      showZoneRef.current = showZone;

      const refit = () => {
        const el = mapElRef.current;
        if (!el || el.clientWidth < 10 || el.clientHeight < 10) return;
        map.invalidateSize();
        showZone(0, false);
      };
      refit();

      resizeObserver = new ResizeObserver(() => map.invalidateSize());
      resizeObserver.observe(mapElRef.current);
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Auto-cycle through zones, pausing permanently once the trade stops to
  // pick one themselves, and never running at all for reduced-motion users.
  useEffect(() => {
    if (!cycling) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setZone((z) => {
        const next = (z + 1) % ZONES.length;
        showZoneRef.current?.(next, true);
        return next;
      });
      setCycleKey((k) => k + 1);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [cycling, cycleKey]);

  const selectZone = (i: number) => {
    setCycling(false);
    setZone(i);
    showZoneRef.current?.(i, true);
  };

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="home-delivery">
      <div className={`${styles.inner} ${revealed ? styles.revealed : ""}`}>
        <div className={styles.headText}>
          <div className={styles.kicker}>
            <span className={styles.kickerDot} />
            Delivery coverage
          </div>
          <h2 id="home-delivery" className={styles.heading}>
            Melbourne today. Delivered Australia-wide.
          </h2>
          <p className={styles.intro}>
            Every order leaves our Dandenong South warehouse. Tap a zone to
            move the map and see how your stock reaches you.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.mapPanel}>
            <div ref={mapElRef} className={styles.mapEl} />
            <div className={styles.mapTabs}>
              {ZONES.map((z, i) => (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => selectZone(i)}
                  className={`${styles.mapTab} ${i === zone ? styles.mapTabActive : ""}`}
                >
                  {z.title}
                </button>
              ))}
            </div>
            <a
              href={GOOGLE_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapBottomBar}
            >
              <span className={styles.mapBadgeDot} />
              <span className={styles.mapBottomText}>
                <strong>SSS Wheels &amp; Tyres</strong>
                <span className={styles.mapBottomAddr}>
                  {" "}
                  · 13 Advantage Drive, Dandenong South VIC 3175
                </span>
              </span>
            </a>
          </div>

          <div className={styles.zoneList}>
            {ZONES.map((z, i) => {
              const isActive = i === zone;
              return (
                <div
                  key={z.id}
                  className={`${styles.zoneCard} ${isActive ? styles.zoneCardActive : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => selectZone(i)}
                    className={styles.zoneButton}
                    aria-expanded={isActive}
                  >
                    <span className={styles.zoneButtonLeft}>
                      <span
                        className={`${styles.zoneDot} ${isActive ? styles.zoneDotActive : ""}`}
                      />
                      <span className={styles.zoneTitle}>{z.title}</span>
                    </span>
                    <span className={styles.zoneMeta}>{z.meta}</span>
                  </button>
                  <div
                    className={styles.zoneDetailWrap}
                    style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                  >
                    <div className={styles.zoneDetailInner}>
                      <div className={styles.zoneDetail}>
                        <p className={styles.zoneDesc}>{z.desc}</p>
                        <div className={styles.zoneChips}>
                          {z.chips.map((c) => (
                            <span key={c} className={styles.zoneChip}>
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {isActive && cycling && (
                    <span
                      key={cycleKey}
                      className={styles.zoneProgress}
                      style={{ animationDuration: `${CYCLE_MS}ms` }}
                    />
                  )}
                </div>
              );
            })}
            <p className={styles.helpLine}>
              Not sure if we deliver to you?{" "}
              <a href="tel:0391165787">Call 03 9116 5787</a> or{" "}
              <Link href="/contact">send us a message</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
