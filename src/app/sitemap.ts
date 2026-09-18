import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";

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
  const base = getBaseUrl();
  return ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
