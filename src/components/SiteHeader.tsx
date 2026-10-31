"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PORTAL, CATEGORIES, MODELS } from "@/lib/wheels-data";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { PhoneIcon } from "@/components/BrandIcons";
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
  const pathname = usePathname();
  const [menu, setMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuBtns = useRef<Record<string, HTMLButtonElement | null>>({});
  const headerRef = useRef<HTMLElement | null>(null);

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

  // Clicking anywhere outside the header closes an open dropdown (the mobile
  // menu itself, opened by the burger, is untouched by this).
  useEffect(() => {
    if (!menu) return;
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenu(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [menu]);

  return (
    <header
      ref={headerRef}
      className={`${styles.wrap} ${mobileOpen ? styles.wrapOpen : ""}`}
    >
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

        <div className={styles.mobileIcons}>
          <a href="tel:0391165787" aria-label="Call 03 9116 5787" className={styles.callBtn}>
            <PhoneIcon />
          </a>
          <button
            type="button"
            className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="site-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

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
              aria-haspopup="true"
              aria-expanded={menu === "wheels"}
              aria-controls="menu-wheels"
            >
              Wheels{" "}
              <span
                className={`${styles.caret} ${menu === "wheels" ? styles.caretOpen : ""}`}
              >
                ▼
              </span>
            </button>
            <div
              className={`${styles.dropdown} ${styles.wheelsMenu} ${menu === "wheels" ? styles.dropdownOpen : ""}`}
              id="menu-wheels"
              role="menu"
            >
              <div className={styles.tileGrid}>
                {MODELS.map((m) => {
                  // Prefer a non-black finish, but only if it actually has a
                  // photo -- otherwise a model whose only real picture is on
                  // its black finish (e.g. D-Hole's White/Silver are real
                  // stock with no photo yet) would show a placeholder here
                  // instead of the one real picture it has.
                  const finish =
                    m.finishes.find((f) => !/black/i.test(f.name) && f.img) ??
                    m.finishes.find((f) => f.img) ??
                    m.finishes[0];
                  return (
                    <Link
                      key={m.id}
                      href={`/wheels?model=${m.id}`}
                      className={styles.tile}
                    >
                      <span className={styles.tileImg}>
                        {finish.img ? (
                          <Image src={finish.img} alt="" fill sizes="90px" />
                        ) : (
                          <ImagePlaceholder label={m.name} showLabel={false} compact />
                        )}
                      </span>
                      <span className={styles.tileLabel}>{m.name}</span>
                    </Link>
                  );
                })}
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.id}
                    href={`/wheels?cat=${c.id}`}
                    className={styles.tile}
                  >
                    <span className={styles.tileImg}>
                      <Image src={c.img} alt="" fill sizes="90px" />
                    </span>
                    <span className={styles.tileLabel}>{c.name}</span>
                  </Link>
                ))}
              </div>
              <div className={styles.dropdownDivider} />
              <Link href="/wheels" className={styles.strong}>
                All wheels →
              </Link>
            </div>
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
      </div>
    </header>
  );
}
