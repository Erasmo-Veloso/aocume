import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface ProductFilters {
  categorySlug?: string;
  featured?: boolean;
  type?: "ORDER" | "READY_STOCK";
  search?: string;
  activeOnly?: boolean;
  page: number;
  limit: number;
}

const withImages = {
  images: { orderBy: { position: "asc" } },
  category: true,
} satisfies Prisma.ProductInclude;

export const productRepository = {
  async findMany(filters: ProductFilters) {
    const where: Prisma.ProductWhereInput = {};
    if (filters.activeOnly) where.active = true;
    if (filters.featured !== undefined) where.featured = filters.featured;
    if (filters.type) where.productType = filters.type;
    if (filters.categorySlug) where.category = { slug: filters.categorySlug };
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { shortDescription: { contains: filters.search, mode: "insensitive" } },
        { reference: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: withImages,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
      }),
      prisma.product.count({ where }),
    ]);

    return { items, total };
  },

  listAll() {
    return prisma.product.findMany({
      include: withImages,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  },

  findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: withImages,
    });
  },

  findById(id: string) {
    return prisma.product.findUnique({ where: { id }, include: withImages });
  },

  findByReference(reference: string) {
    return prisma.product.findUnique({ where: { reference } });
  },

  create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({ data, include: withImages });
  },

  update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({ where: { id }, data, include: withImages });
  },

  delete(id: string) {
    return prisma.product.delete({ where: { id } });
  },
};
