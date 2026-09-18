import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getBaseUrl, ORGANIZATION_JSON_LD, SITE_NAME } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} | Australian Wholesale Wheel & Tyre Supplier`,
    template: "%s",
  },
  description:
    "SSS Wheels & Tyres is an Australian trade-only wholesale supplier of wheels and tyres to panel shops, workshops, fleets and resellers.",
};

// Static, server-controlled JSON. "<" is escaped so the payload can never
// close the script tag, whatever its contents.
const organizationJsonLd = JSON.stringify(ORGANIZATION_JSON_LD).replace(
  /</g,
  "\\u003c"
);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <a href="#main" className="skipLink">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="main">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
      </body>
    </html>
  );
}
