import type { Metadata } from "next";

// The custom domain isn't connected yet, so hardcoding it would make the
// sitemap/robots/OG tags point search engines at URLs that 404. Vercel sets
// VERCEL_PROJECT_PRODUCTION_URL to whatever the project's actual production
// domain is — the .vercel.app one today, the custom domain automatically
// once it's attached in Vercel's dashboard, no code change needed either way.
export function getBaseUrl(): string {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "https://www.ssstyres.com.au";
}

export const SITE_NAME = "SSS Wheels & Tyres";

const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "SSS beadlock-style wheels in front of the illuminated SSS logo",
};

/** Per-page metadata with a canonical URL and matching OG/Twitter cards. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { title, description, path } = opts;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_AU",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

// Organization structured data — only facts already published on the site
// (legal name from the footer, address/phone/email from the header/contact).
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: "SSS Wheels & Tyres Pty Ltd",
  description:
    "Australian trade-only wholesale supplier of wheels and tyres to panel shops, workshops, fleets and resellers.",
  telephone: "+61 3 9116 5787",
  email: "info@ssswheels.com.au",
  areaServed: "AU",
  address: {
    "@type": "PostalAddress",
    streetAddress: "13 Advantage Drive",
    addressLocality: "Dandenong South",
    addressRegion: "VIC",
    postalCode: "3175",
    addressCountry: "AU",
  },
};

// Real Google Business Profile links, not invented ones -- resolved from the
// "Read Our Reviews"/"Write a Review" links actually published on
// ssswheels.com.au (the official site), which redirect to this business's
// real Google Maps listing (ftid 0x6ad613c72ac0d1cb:0xc567250597c2d208).
// There's no Google Places API key configured in this project, so these are
// static facts rather than a live feed: the 5.0 rating is what
// ssswheels.com.au itself displayed when checked (Oct 2026), and the review
// count is what Google's own embedded map info card showed for this listing
// on the same date. Re-verify both against the live listing before reusing
// them much later.
export const GOOGLE_RATING = "5.0";
export const GOOGLE_REVIEW_COUNT = 7;
export const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/vpy9hU5MruXXstAU7";
export const GOOGLE_WRITE_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=SSS+Wheels+%26+Tyres%2C+13+Advantage+Drive%2C+Dandenong+South";
export const GOOGLE_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=13+Advantage+Drive%2C+Dandenong+South+VIC+3175";
// No-API-key "share > embed a map" iframe URL -- works without any Google
// Cloud credentials, unlike the Places/Maps JS APIs.
export const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=SSS+Tyres+%26+Wheels+-+Wholesale%2C+13+Advantage+Dr%2C+Dandenong+South+VIC+3175%2C+Australia&output=embed";
