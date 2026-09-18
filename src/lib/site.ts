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
