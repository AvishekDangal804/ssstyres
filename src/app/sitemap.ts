import type { MetadataRoute } from "next";

const BASE_URL = "https://www.ssstyres.com.au";

const ROUTES = [
  "",
  "/wheels",
  "/collections",
  "/types",
  "/fitment",
  "/dealer",
  "/contact",
  "/about",
  "/accessories",
  "/media",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
