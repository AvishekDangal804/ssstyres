"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PORTAL } from "@/lib/wheels-data";
import styles from "./SiteHeader.module.css";

type Menu = "wheels" | "more" | null;

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
  const menuBtns = useRef<Record<string, HTMLButtonElement | null>>({});

  const toggle = (m: Exclude<Menu, null>) =>
    setMenu((cur) => (cur === m ? null : m));

  const hoverOpen = (m: Exclude<Menu, null>) => () => {
    if (supportsHover()) setMenu(m);
  };
  const hoverClose = () => {
    if (supportsHover()) setMenu(null);
  };

  // Escape closes the open dropdown and returns focus to its button.
  const escapeClose =
    (m: Exclude<Menu, null>) => (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && menu === m) {
        setMenu(null);
        menuBtns.current[m]?.focus();
      }
    };

  return (
    <header className={styles.wrap}>
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span className={styles.topbarAddress}>
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
            preload
          />
        </Link>

        <nav
          id="site-nav"
          aria-label="Main"
          className={`${styles.nav} ${mobileOpen ? styles.open : ""}`}
          onClick={(e) => {
            // Close the mobile menu on an actual navigation, but not when
            // tapping the Wheels/More toggle buttons (which aren't links).
            if ((e.target as HTMLElement).closest("a")) {
              setMobileOpen(false);
              setMenu(null);
            }
          }}
        >
          <Link href="/" className={styles.navItem}>
            Home
          </Link>

          <div
            className={styles.navMenu}
            onMouseEnter={hoverOpen("wheels")}
            onMouseLeave={hoverClose}
            onKeyDown={escapeClose("wheels")}
          >
            <button
              ref={(el) => {
                menuBtns.current.wheels = el;
              }}
              type="button"
              className={styles.navButton}
              onClick={() => toggle("wheels")}
              aria-expanded={menu === "wheels"}
              aria-controls="menu-wheels"
            >
              Wheels <span className={styles.caret}>▼</span>
            </button>
            {menu === "wheels" && (
              <div className={styles.dropdown} id="menu-wheels">
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
            Guide
          </Link>
          <Link href="/media" className={styles.navItem}>
            Media
          </Link>

          <div
            className={styles.navMenu}
            onMouseEnter={hoverOpen("more")}
            onMouseLeave={hoverClose}
            onKeyDown={escapeClose("more")}
          >
            <button
              ref={(el) => {
                menuBtns.current.more = el;
              }}
              type="button"
              className={styles.navButton}
              onClick={() => toggle("more")}
              aria-expanded={menu === "more"}
              aria-controls="menu-more"
            >
              More <span className={styles.caret}>▼</span>
            </button>
            {menu === "more" && (
              <div
                className={`${styles.dropdown} ${styles.right}`}
                id="menu-more"
              >
                <Link href="/about">About Us</Link>
                <Link href="/legal#terms">Terms &amp; Conditions</Link>
                <Link href="/legal#warranty">Warranty &amp; Returns</Link>
                <Link href="/legal#privacy">Privacy Policy</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
            )}
          </div>

          {/* Phones hide the header buttons to keep the bar to one row, so
              both live at the foot of the menu there instead. */}
          <div className={styles.navMobileCtas}>
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
          aria-controls="site-nav"
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
