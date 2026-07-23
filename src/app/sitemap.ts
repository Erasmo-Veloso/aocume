import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { getAllPackages, getCatalog, getBlogPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/pacotes",
    "/encomendas",
    "/blog",
    "/testemunhos",
    "/sobre",
    "/contacto",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const [packages, catalog, blogPosts] = await Promise.all([
    getAllPackages(),
    getCatalog(),
    getBlogPosts(),
  ]);

  const posts = blogPosts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const packageUrls = packages.map((p) => ({
    url: `${SITE.url}/pacotes/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productUrls = catalog.products.map((p) => ({
    url: `${SITE.url}/encomendas/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...packageUrls, ...productUrls, ...posts];
}
