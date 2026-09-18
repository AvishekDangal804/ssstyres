"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PORTAL } from "@/lib/wheels-data";
import styles from "./SiteHeader.module.css";

type Menu = "wheels" | null;

// Touchscreens (and touch-emulated browsers) synthesize mouseenter/mouseleave
// around a tap, which fights with hover-to-open and closes the dropdown
// before its links can be tapped. Only wire up hover on devices that report
// real hover support — click-to-toggle still works everywhere.
const supportsHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function SiteHeader() {
  const [menu, setMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (m: Exclude<Menu, null>) =>
    setMenu((cur) => (cur === m ? null : m));

  const hoverOpen = (m: Exclude<Menu, null>) => () => {
    if (supportsHover()) setMenu(m);
  };
  const hoverClose = () => {
    if (supportsHover()) setMenu(null);
  };

  return (
    <header className={styles.wrap}>
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span>
            Melbourne — 13 Advantage Drive, Dandenong South · Sydney,
            Brisbane &amp; Adelaide opening soon
          </span>
          <div className={styles.topbarLinks}>
            <a href="tel:0391165787">03 9116 5787</a>
            <a href="mailto:info@ssswheels.com.au">info@ssswheels.com.au</a>
          </div>
        </div>
      </div>
      <div className={styles.mainbar}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/logo.png"
            alt="SSS Wheels & Tyres"
            width={234}
            height={36}
            style={{ height: 36, width: "auto" }}
            priority
          />
        </Link>

        <nav
          className={`${styles.nav} ${mobileOpen ? styles.open : ""}`}
          onClick={(e) => {
            // Close the mobile menu on an actual navigation, but not when
            // tapping the Wheels toggle button (which isn't a link).
            if ((e.target as HTMLElement).closest("a")) {
              setMobileOpen(false);
              setMenu(null);
            }
          }}
        >
          <div
            className={styles.navMenu}
            onMouseEnter={hoverOpen("wheels")}
            onMouseLeave={hoverClose}
          >
            <button
              type="button"
              className={styles.navButton}
              onClick={() => toggle("wheels")}
              aria-expanded={menu === "wheels"}
            >
              Wheels <span className={styles.caret}>▼</span>
            </button>
            {menu === "wheels" && (
              <div className={styles.dropdown}>
                <Link href="/wheels?model=d-locker" className={styles.strong}>
                  SSS D-Locker
                </Link>
                <Link href="/wheels?model=d-hole" className={styles.strong}>
                  SSS D-Hole
                </Link>
                <div className={styles.dropdownLabel}>By type</div>
                <Link href="/wheels?cat=steel">Steel</Link>
                <Link href="/wheels?cat=offroad">Off Road</Link>
                <Link href="/wheels?cat=beadlock">Beadlocks</Link>
                <Link href="/wheels?cat=street">Street</Link>
                <Link href="/wheels?cat=commercial">Commercial</Link>
                <Link href="/wheels?cat=trailer">Trailer</Link>
                <div className={styles.dropdownDivider} />
                <Link href="/wheels" className={styles.strong}>
                  All wheels →
                </Link>
              </div>
            )}
          </div>

          <Link href="/accessories" className={styles.navItem}>
            Accessories
          </Link>
          <Link href="/fitment" className={styles.navItem}>
            Fitment Guide
          </Link>
          <Link href="/media" className={styles.navItem}>
            Media
          </Link>
          <Link href="/about" className={styles.navItem}>
            About Us
          </Link>
          <Link href="/contact" className={styles.navItem}>
            Contact Us
          </Link>
          <a
            href={PORTAL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navItem}
          >
            Wholesale Login
          </a>
        </nav>

        <div className={styles.ctaWrap}>
          <Link href="/dealer" className={styles.btnRed}>
            Become a Dealer
          </Link>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
