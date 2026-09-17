"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PORTAL } from "@/lib/wheels-data";
import styles from "./SiteHeader.module.css";

type Menu = "wheels" | "more" | null;

export default function SiteHeader() {
  const [menu, setMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (m: Exclude<Menu, null>) =>
    setMenu((cur) => (cur === m ? null : m));

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

        <nav className={`${styles.nav} ${mobileOpen ? styles.open : ""}`}>
          <div
            className={styles.navMenu}
            onMouseEnter={() => setMenu("wheels")}
            onMouseLeave={() => setMenu(null)}
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

          <div
            className={styles.navMenu}
            onMouseEnter={() => setMenu("more")}
            onMouseLeave={() => setMenu(null)}
          >
            <button
              type="button"
              className={styles.navButton}
              onClick={() => toggle("more")}
              aria-expanded={menu === "more"}
            >
              More <span className={styles.caret}>▼</span>
            </button>
            {menu === "more" && (
              <div className={`${styles.dropdown} ${styles.right}`}>
                <Link href="/about">About Us</Link>
                <Link href="/legal#terms">Terms &amp; Conditions</Link>
                <Link href="/legal#warranty">Warranty &amp; Returns</Link>
                <Link href="/legal#privacy">Privacy Policy</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
            )}
          </div>
        </nav>

        <div className={styles.ctaWrap}>
          <Link href="/dealer" className={styles.btnOutline}>
            Become a Dealer
          </Link>
          <a
            href={PORTAL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnRed}
          >
            Dealer Portal
          </a>
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
