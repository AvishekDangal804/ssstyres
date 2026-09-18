import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getBaseUrl } from "@/lib/site";
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

const title = "SSS Wheels & Tyres | Australian Wholesale Wheel & Tyre Supplier";
const description =
  "SSS Wheels & Tyres is an Australian trade-only wholesale supplier of wheels and tyres — including the SSS D-Locker and SSS D-Hole wheel range — to panel shops, workshops, fleets and resellers.";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: title,
    template: "%s",
  },
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "SSS Wheels & Tyres",
    images: [{ url: "/assets/hero.png", width: 1881, height: 836 }],
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
