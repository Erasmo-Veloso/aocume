import { productService } from "@/services/product-service";
import { packageService } from "@/services/package-service";
import { testimonialService } from "@/services/testimonial-service";
import { categoryService } from "@/services/category-service";
import { blogService } from "@/services/blog-service";
import { NotFoundError } from "@/lib/errors";
import type {
  Product,
  BusinessPackage,
  Category,
  TestimonialView,
  BlogPostView,
} from "@/types";

/**
 * Camada de leitura para o site público. Chama os serviços (que falam com a
 * base de dados via Prisma) e mapeia as entidades para os tipos que os
 * componentes de UI já consomem.
 */

// Paleta de fundo determinística para produtos sem fotografia.
const SWATCHES = [
  "#1f2937",
  "#0ea5e9",
  "#f59e0b",
  "#64748b",
  "#dc2626",
  "#db2777",
  "#16a34a",
  "#7c3aed",
];

function swatchFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return SWATCHES[hash % SWATCHES.length];
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapProduct(p: any): Product {
  return {
    id: p.id,
    reference: p.reference,
    categorySlug: p.category?.slug ?? "",
    title: p.title,
    slug: p.slug,
    shortDescription: p.shortDescription,
    description: p.description,
    price: p.price ?? null,
    productType: p.productType,
    paymentType: p.paymentType,
    minimumQuantity: p.minimumQuantity,
    deliveryTime: p.deliveryTime,
    featured: p.featured,
    swatch: swatchFor(p.reference ?? p.id),
    image: p.images?.[0]?.url ?? null,
  };
}

function mapPackage(p: any): BusinessPackage {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    imageBase: p.image ?? "",
    investment: p.investment,
    items: (p.items ?? []).map((it: any) => ({
      label: it.label,
      quantity: it.quantity ?? undefined,
    })),
    profitMargin: p.profitMargin,
    estimatedReturn: p.estimatedReturn,
    profitBasis: p.profitBasis,
    ctaLabel: p.ctaLabel,
    featured: p.featured,
    order: p.position,
  };
}

function mapTestimonial(t: any): TestimonialView {
  return {
    id: t.id,
    clientName: t.clientName,
    position: t.position ?? "",
    content: t.content,
    format: t.format,
    image: t.photo ?? null,
    videoUrl: t.videoUrl ?? null,
    rating: t.rating ?? null,
    initials: initialsOf(t.clientName),
  };
}

function mapPost(p: any): BlogPostView {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    cover: p.cover ?? null,
    category: p.category,
    author: p.author,
    date: (p.publishedAt instanceof Date
      ? p.publishedAt
      : new Date(p.publishedAt)
    ).toISOString(),
    readingMinutes: p.readingMinutes,
    content: p.content,
    featured: p.featured,
  };
}

function mapCategory(c: any): Category {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description ?? "",
  };
}

// ── Produtos ─────────────────────────────────────────────────────
export async function getFeaturedProducts(): Promise<Product[]> {
  const { items } = await productService.listPublic({
    featured: "true",
    page: 1,
    limit: 8,
  });
  return items.map(mapProduct);
}

export async function getCatalog(): Promise<{
  products: Product[];
  categories: Category[];
}> {
  const [{ items }, categories] = await Promise.all([
    productService.listPublic({ page: 1, limit: 100 }),
    categoryService.list(),
  ]);
  return {
    products: items.map(mapProduct),
    categories: categories.map(mapCategory),
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return mapProduct(await productService.getPublicBySlug(slug));
  } catch (e) {
    if (e instanceof NotFoundError) return null;
    throw e;
  }
}

export async function getRelatedProducts(
  product: Product,
  limit = 3
): Promise<Product[]> {
  const { items } = await productService.listPublic({
    category: product.categorySlug,
    page: 1,
    limit: limit + 1,
  });
  return items
    .map(mapProduct)
    .filter((p) => p.id !== product.id)
    .slice(0, limit);
}

// ── Pacotes ──────────────────────────────────────────────────────
export async function getFeaturedPackages(): Promise<BusinessPackage[]> {
  const { items } = await packageService.listPublic({
    featured: "true",
    page: 1,
    limit: 6,
  });
  return items.map(mapPackage);
}

export async function getAllPackages(): Promise<BusinessPackage[]> {
  const { items } = await packageService.listPublic({ page: 1, limit: 100 });
  return items.map(mapPackage);
}

export async function getPackageBySlug(
  slug: string
): Promise<BusinessPackage | null> {
  try {
    return mapPackage(await packageService.getPublicBySlug(slug));
  } catch (e) {
    if (e instanceof NotFoundError) return null;
    throw e;
  }
}

export async function getOtherPackages(
  current: BusinessPackage,
  limit = 3
): Promise<BusinessPackage[]> {
  const all = await getAllPackages();
  return all.filter((p) => p.id !== current.id).slice(0, limit);
}

// ── Testemunhos ──────────────────────────────────────────────────
export async function getFeaturedTestimonials(): Promise<TestimonialView[]> {
  const items = await testimonialService.list(true);
  return items.map(mapTestimonial);
}

export async function getAllTestimonials(): Promise<TestimonialView[]> {
  const items = await testimonialService.list(false);
  return items.map(mapTestimonial);
}

// ── Blogue ───────────────────────────────────────────────────────
export async function getBlogPosts(): Promise<BlogPostView[]> {
  const { items } = await blogService.listPublic({ page: 1, limit: 50 });
  return items.map(mapPost);
}

export async function getFeaturedPost(): Promise<BlogPostView | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.featured) ?? posts[0] ?? null;
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostView | null> {
  try {
    return mapPost(await blogService.getPublicBySlug(slug));
  } catch (e) {
    if (e instanceof NotFoundError) return null;
    throw e;
  }
}

export async function getOtherPosts(
  slug: string,
  limit = 3
): Promise<BlogPostView[]> {
  const posts = await getBlogPosts();
  return posts.filter((p) => p.slug !== slug).slice(0, limit);
}

// ── Categorias ───────────────────────────────────────────────────
export async function getCategories(): Promise<Category[]> {
  const items = await categoryService.list();
  return items.map(mapCategory);
}
