import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/encomendas", "/sobre", "/contacto"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const products = PRODUCTS.map((p) => ({
    url: `${SITE.url}/encomendas/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...products];
}
