"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PORTAL } from "@/lib/wheels-data";
import styles from "./SiteHeader.module.css";

// Groups of routes that fall under one nav item, for the "you are here" red
// underline. Home is deliberately exact-match only — every path starts with
// "/", so a prefix match there would light up on every page.
const MORE_ROUTES = ["/about", "/trade", "/legal", "/contact"];

type Menu = "wheels" | "more" | null;

// Touchscreens (and touch-emulated browsers) synthesize mouseenter/mouseleave
// around a tap, which fights with hover-to-open and closes the dropdown
// before its links can be tapped. Only wire up hover on devices that report
// real hover support — click-to-toggle still works everywhere.
const supportsHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Small generic line icons for the contact bar, matching the manager's
// reference. Decorative only — the link text is the accessible name.
function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 3h3l1.4 3.5-2 1.5a9 9 0 0 0 4.6 4.6l1.5-2L17 12v3a1.5 1.5 0 0 1-1.6 1.5A13 13 0 0 1 3.5 4.6 1.5 1.5 0 0 1 5 3z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M3 5.5l7 5.5 7-5.5" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuBtns = useRef<Record<string, HTMLButtonElement | null>>({});

  const navCls = (active: boolean) =>
    `${styles.navItem} ${active ? styles.navActive : ""}`;
  const navBtnCls = (active: boolean) =>
    `${styles.navButton} ${active ? styles.navActive : ""}`;

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
    <header className={`${styles.wrap} ${mobileOpen ? styles.wrapOpen : ""}`}>
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span className={styles.topbarAddress}>
            <span className={styles.topbarDot} aria-hidden="true" />
            Melbourne — 13 Advantage Drive, Dandenong South · Sydney,
            Brisbane &amp; Adelaide opening soon
          </span>
          <div className={styles.topbarLinks}>
            <a href="tel:0391165787">
              <PhoneIcon />
              03 9116 5787
            </a>
            <a href="mailto:info@ssswheels.com.au">
              <MailIcon />
              info@ssswheels.com.au
            </a>
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
          <Link href="/" className={navCls(pathname === "/")}>
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
              className={navBtnCls(pathname.startsWith("/wheels"))}
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

          <Link href="/accessories" className={navCls(pathname === "/accessories")}>
            Accessories
          </Link>
          <Link href="/fitment" className={navCls(pathname === "/fitment")}>
            Guide
          </Link>
          <Link href="/media" className={navCls(pathname === "/media")}>
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
              className={navBtnCls(MORE_ROUTES.includes(pathname))}
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
                <Link href="/trade">Built for the Trade</Link>
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
            <Link href="/dealer" className={styles.btnRed}>
              Become a Dealer
            </Link>
            <a
              href={PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnRed}
            >
              Wholesale Login
            </a>
          </div>
        </nav>

        <div className={styles.ctaWrap}>
          <Link href="/dealer" className={styles.btnRed}>
            Become a Dealer
          </Link>
          <a
            href={PORTAL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnRed}
          >
            Wholesale Login
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
