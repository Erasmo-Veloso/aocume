import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface BlogFilters {
  category?: string;
  featured?: boolean;
  publishedOnly?: boolean;
  page: number;
  limit: number;
}

export const blogRepository = {
  async findMany(filters: BlogFilters) {
    const where: Prisma.BlogPostWhereInput = {};
    if (filters.publishedOnly) where.published = true;
    if (filters.featured !== undefined) where.featured = filters.featured;
    if (filters.category) where.category = filters.category;

    const [items, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [{ publishedAt: "desc" }],
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
      }),
      prisma.blogPost.count({ where }),
    ]);
    return { items, total };
  },

  listAll() {
    return prisma.blogPost.findMany({ orderBy: [{ publishedAt: "desc" }] });
  },

  findBySlug(slug: string) {
    return prisma.blogPost.findUnique({ where: { slug } });
  },

  findById(id: string) {
    return prisma.blogPost.findUnique({ where: { id } });
  },

  create(data: Prisma.BlogPostCreateInput) {
    return prisma.blogPost.create({ data });
  },

  update(id: string, data: Prisma.BlogPostUpdateInput) {
    return prisma.blogPost.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.blogPost.delete({ where: { id } });
  },
};
