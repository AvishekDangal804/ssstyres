import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Static (non-nonce) CSP so every page keeps its static prerendering — a
// nonce-based CSP requires *all* pages to render dynamically per request
// (see Next.js's CSP guide), which isn't worth trading away for a marketing
// site that never reflects user-supplied content back into the page.
// 'unsafe-inline' is required for script-src because static HTML can't carry
// a per-request nonce, but the other directives still meaningfully block the
// higher-impact vectors: external script/style/image hosts, framing,
// plugin/object embeds, and form hijacking.
const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data:`,
  `font-src 'self'`,
  `connect-src 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    // Source assets are 1.4–2.8 MB PNGs; serve WebP at responsive sizes.
    // AVIF is deliberately off: encoding beadlock-exploded.png as AVIF hung
    // for 60s+ (WebP: 0.4s) in testing, which would break the footer image
    // on every page. Re-test before enabling AVIF.
    formats: ["image/webp"],
    // Only the shipped asset folder may be run through the optimizer.
    localPatterns: [{ pathname: "/assets/**", search: "" }],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
