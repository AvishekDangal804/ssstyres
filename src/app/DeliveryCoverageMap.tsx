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

interface ZonePoint {
  name: string;
  lat: number;
  lng: number;
  soon?: boolean;
}

interface Zone {
  id: string;
  title: string;
  meta: string;
  desc: string;
  facts: { k: string; v: string }[];
  chips: string[];
  points: ZonePoint[];
}

const ZONES: Zone[] = [
  {
    id: "metro",
    title: "Metro Melbourne",
    meta: "Own vans · same-day",
    desc: "Delivered by our own vans straight from Dandenong South. Urgent orders within the hour; standard orders same or next business day.",
    facts: [
      { k: "Urgent", v: "Within the hour" },
      { k: "Standard", v: "Same / next day" },
    ],
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
    points: [
      { name: "CBD", lat: -37.775, lng: 144.975 },
      { name: "Inner East", lat: -37.835, lng: 145.09 },
      { name: "Inner West", lat: -37.875, lng: 144.81 },
      { name: "North", lat: -37.67, lng: 144.95 },
      { name: "South", lat: -37.945, lng: 144.97 },
      { name: "South-East", lat: -37.99, lng: 145.2 },
      { name: "North-East", lat: -37.72, lng: 145.15 },
      { name: "West", lat: -37.73, lng: 144.7 },
      { name: "Mornington Peninsula", lat: -38.3, lng: 145.06 },
    ],
  },
  {
    id: "regional",
    title: "Regional Victoria",
    meta: "Scheduled freight",
    desc: "Scheduled freight runs from our warehouse to regional centres across Victoria. Most orders arrive within a few business days, depending on location.",
    facts: [
      { k: "Method", v: "Scheduled freight" },
      { k: "Transit", v: "1–3 business days" },
    ],
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
    points: [
      { name: "Geelong", lat: -38.1499, lng: 144.3617 },
      { name: "Ballarat", lat: -37.5622, lng: 143.8503 },
      { name: "Bendigo", lat: -36.757, lng: 144.2794 },
      { name: "Shepparton", lat: -36.3833, lng: 145.4 },
      { name: "Gippsland", lat: -38.195, lng: 146.54 },
      { name: "Wodonga", lat: -36.1214, lng: 146.8881 },
      { name: "Warrnambool", lat: -38.3818, lng: 142.488 },
      { name: "Mildura", lat: -34.208, lng: 142.1246 },
    ],
  },
  {
    id: "au",
    title: "Australia-wide",
    meta: "Interstate freight",
    desc: "Interstate orders are consigned through national freight partners to every state and territory. Sydney, Brisbane and Adelaide warehouses are opening soon.",
    facts: [
      { k: "Method", v: "Interstate freight" },
      { k: "Coming soon", v: "SYD · BNE · ADL" },
    ],
    chips: ["NSW", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
    points: [
      { name: "Sydney · soon", lat: -33.8688, lng: 151.2093, soon: true },
      { name: "Canberra", lat: -35.2809, lng: 149.13 },
      { name: "Brisbane · soon", lat: -27.4698, lng: 153.0251, soon: true },
      { name: "Adelaide · soon", lat: -34.9285, lng: 138.6007, soon: true },
      { name: "Perth", lat: -31.9505, lng: 115.8605 },
      { name: "Hobart", lat: -42.8821, lng: 147.3272 },
      { name: "Darwin", lat: -12.4634, lng: 130.8456 },
    ],
  },
];

export default function DeliveryCoverageMap() {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletNS.Map | null>(null);
  const flyToZoneRef = useRef<((i: number, animate: boolean) => void) | null>(null);
  // Mount effect below has an empty dep array and only reads this once, to
  // set the map's initial view -- it deliberately doesn't react to later
  // zone changes (selectZone's flyToZoneRef call handles those instead).
  const [zone, setZone] = useState(0);

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
      // Real OSM tiles are colour; this recolours them to a charcoal/dark
      // theme so the map reads as a focal dark panel against the light
      // section, without needing a paid/keyed dark-tile provider.
      map.getPane("tilePane")?.classList.add(styles.darkTiles);

      L.control.zoom({ position: "topright" }).addTo(map);

      const makeLabel = (text: string, strong: boolean) =>
        L.divIcon({
          className: "",
          iconSize: [0, 0],
          html: `<div class="${styles.pointLabel}"><span class="${styles.pointDot}" style="background:${strong ? RED : "#172536"}"></span><span class="${styles.pointText}">${text}</span></div>`,
        });

      const built = ZONES.map((z) => {
        const g = L.layerGroup();
        if (z.id === "metro") {
          L.circle(WAREHOUSE, {
            radius: 48000,
            color: RED,
            weight: 1.5,
            opacity: 0.8,
            fillColor: RED,
            fillOpacity: 0.07,
            dashArray: "4 6",
          }).addTo(g);
          L.circle(WAREHOUSE, {
            radius: 20000,
            color: RED,
            weight: 1,
            opacity: 0.5,
            fillOpacity: 0.05,
            fillColor: RED,
          }).addTo(g);
        } else {
          z.points.forEach((p) => {
            L.polyline([WAREHOUSE, [p.lat, p.lng]], {
              color: RED,
              weight: 1.5,
              opacity: 0.7,
              dashArray: "2 7",
            }).addTo(g);
          });
        }
        z.points.forEach((p) => {
          L.marker([p.lat, p.lng], {
            icon: makeLabel(p.name, !!p.soon),
            interactive: false,
          }).addTo(g);
        });
        const bounds = L.latLngBounds([
          WAREHOUSE,
          ...z.points.map((p): [number, number] => [p.lat, p.lng]),
        ]);
        return { group: g, bounds };
      });

      L.marker(WAREHOUSE, {
        zIndexOffset: 1000,
        interactive: false,
        icon: L.divIcon({
          className: "",
          iconSize: [0, 0],
          html: `<div class="${styles.originMarker}"><span class="${styles.originPulse}" style="background:${RED}"></span><span class="${styles.originDot}" style="background:${RED}"></span></div>`,
        }),
      }).addTo(map);

      const flyTo = (i: number, animate: boolean) => {
        built.forEach((b, j) => (j === i ? b.group.addTo(map) : b.group.remove()));
        const opts = {
          paddingTopLeft: [60, 70] as [number, number],
          paddingBottomRight: [60, 110] as [number, number],
          maxZoom: 11,
        };
        if (animate) map.flyToBounds(built[i].bounds, { ...opts, duration: 1.2 });
        else map.fitBounds(built[i].bounds, opts);
      };
      flyToZoneRef.current = flyTo;
      flyTo(0, false);

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

  const selectZone = (i: number) => {
    setZone(i);
    flyToZoneRef.current?.(i, true);
  };

  const active = ZONES[zone];

  return (
    <section className={styles.section} aria-labelledby="home-delivery">
      <div className={styles.inner}>
        <div className={styles.headRow}>
          <div className={styles.headText}>
            <div className={styles.kicker}>
              <span className={styles.kickerDot} />
              Delivery coverage
            </div>
            <h2 id="home-delivery" className={styles.heading}>
              Melbourne today.
              <br />
              <span className={styles.headingMuted}>
                Delivered Australia-wide.
              </span>
            </h2>
          </div>
          <p className={styles.intro}>
            Every order leaves our Dandenong South warehouse. Tap a zone to
            move the map and see how your stock reaches you.
          </p>
        </div>

        <div className={styles.body}>
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
                    <span
                      className={`${styles.zoneNum} ${isActive ? styles.zoneNumActive : ""}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.zoneTitle}>{z.title}</span>
                    <span className={styles.zoneMeta}>{z.meta}</span>
                  </button>
                  {isActive && (
                    <div className={styles.zoneDetail}>
                      <p className={styles.zoneDesc}>{z.desc}</p>
                      <div className={styles.zoneFacts}>
                        {z.facts.map((f) => (
                          <div key={f.k} className={styles.zoneFact}>
                            <span className={styles.zoneFactK}>{f.k}</span>
                            <span className={styles.zoneFactV}>{f.v}</span>
                          </div>
                        ))}
                      </div>
                      <div className={styles.zoneChips}>
                        {z.chips.map((c) => (
                          <span key={c} className={styles.zoneChip}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
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

          <div className={styles.mapPanel}>
            <div ref={mapElRef} className={styles.mapEl} />
            <div className={styles.mapTopPill}>
              <span className={styles.mapPillDot} />
              <span className={styles.mapPillTitle}>{active.title}</span>
              <span className={styles.mapPillMeta}>· {active.meta}</span>
            </div>
            <div className={styles.mapBottomBar}>
              <div className={styles.mapBottomInfo}>
                <span className={styles.mapBadge}>SSS</span>
                <div className={styles.mapBottomText}>
                  <span className={styles.mapBottomName}>
                    SSS Wheels &amp; Tyres
                  </span>
                  <span className={styles.mapBottomAddr}>
                    13 Advantage Drive, Dandenong South VIC 3175
                  </span>
                </div>
              </div>
              <a
                href={GOOGLE_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapDirections}
              >
                Get directions <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
