import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface PackageFilters {
  featured?: boolean;
  activeOnly?: boolean;
  page: number;
  limit: number;
}

const withItems = {
  items: { orderBy: { position: "asc" } },
} satisfies Prisma.BusinessPackageInclude;

export const packageRepository = {
  async findMany(filters: PackageFilters) {
    const where: Prisma.BusinessPackageWhereInput = {};
    if (filters.activeOnly) where.active = true;
    if (filters.featured !== undefined) where.featured = filters.featured;

    const [items, total] = await Promise.all([
      prisma.businessPackage.findMany({
        where,
        include: withItems,
        orderBy: [{ position: "asc" }, { createdAt: "desc" }],
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
      }),
      prisma.businessPackage.count({ where }),
    ]);

    return { items, total };
  },

  listAll() {
    return prisma.businessPackage.findMany({
      include: withItems,
      orderBy: [{ position: "asc" }, { createdAt: "desc" }],
    });
  },

  findBySlug(slug: string) {
    return prisma.businessPackage.findUnique({
      where: { slug },
      include: withItems,
    });
  },

  findById(id: string) {
    return prisma.businessPackage.findUnique({
      where: { id },
      include: withItems,
    });
  },

  create(data: Prisma.BusinessPackageCreateInput) {
    return prisma.businessPackage.create({ data, include: withItems });
  },

  update(id: string, data: Prisma.BusinessPackageUpdateInput) {
    return prisma.businessPackage.update({
      where: { id },
      data,
      include: withItems,
    });
  },

  /** Substitui todos os itens de um pacote (usado ao editar). */
  async replaceItems(
    packageId: string,
    items: { label: string; quantity?: string | null; position: number }[]
  ) {
    await prisma.$transaction([
      prisma.packageItem.deleteMany({ where: { packageId } }),
      prisma.packageItem.createMany({
        data: items.map((it) => ({ ...it, packageId })),
      }),
    ]);
  },

  delete(id: string) {
    return prisma.businessPackage.delete({ where: { id } });
  },
};
