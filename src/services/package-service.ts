import { packageRepository } from "@/repositories/package-repository";
import type { Prisma } from "@/generated/prisma/client";
import { slugify } from "@/lib/slug";
import { ConflictError, NotFoundError } from "@/lib/errors";
import type {
  CreatePackageInput,
  UpdatePackageInput,
  PackageQuery,
} from "@/validators/package";

async function assertUniqueSlug(slug: string, exceptId?: string) {
  const existing = await packageRepository.findBySlug(slug);
  if (existing && existing.id !== exceptId) {
    throw new ConflictError("Já existe um pacote com este nome.");
  }
}

export const packageService = {
  async listPublic(query: PackageQuery) {
    const { items, total } = await packageRepository.findMany({
      featured: query.featured ? query.featured === "true" : undefined,
      activeOnly: true,
      page: query.page,
      limit: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  },

  async getPublicBySlug(slug: string) {
    const pkg = await packageRepository.findBySlug(slug);
    if (!pkg || !pkg.active) throw new NotFoundError("Pacote não encontrado.");
    return pkg;
  },

  async getById(id: string) {
    const pkg = await packageRepository.findById(id);
    if (!pkg) throw new NotFoundError("Pacote não encontrado.");
    return pkg;
  },

  // Admin: todos os pacotes (inclui inactivos).
  listAll() {
    return packageRepository.listAll();
  },

  async create(input: CreatePackageInput) {
    const slug = slugify(input.name);
    await assertUniqueSlug(slug);

    return packageRepository.create({
      name: input.name,
      slug,
      tagline: input.tagline,
      image: input.image ?? null,
      investment: input.investment,
      currency: input.currency,
      profitMargin: input.profitMargin,
      estimatedReturn: input.estimatedReturn,
      profitBasis: input.profitBasis,
      ctaLabel: input.ctaLabel,
      featured: input.featured,
      active: input.active,
      position: input.position,
      items: {
        create: input.items.map((it, i) => ({
          label: it.label,
          quantity: it.quantity ?? null,
          position: it.position ?? i,
        })),
      },
    });
  },

  async update(id: string, input: UpdatePackageInput) {
    await this.getById(id);

    const data: Record<string, unknown> = {};
    if (input.name !== undefined) {
      data.name = input.name;
      const slug = slugify(input.name);
      await assertUniqueSlug(slug, id);
      data.slug = slug;
    }
    for (const key of [
      "tagline",
      "investment",
      "currency",
      "profitMargin",
      "estimatedReturn",
      "profitBasis",
      "ctaLabel",
      "featured",
      "active",
      "position",
    ] as const) {
      if (input[key] !== undefined) data[key] = input[key];
    }
    if (input.image !== undefined) data.image = input.image;
    if (input.items !== undefined) {
      data.items = {
        deleteMany: {},
        create: input.items.map((it, i) => ({
          label: it.label,
          quantity: it.quantity ?? null,
          position: it.position ?? i,
        })),
      };
    }

    return packageRepository.update(
      id,
      data as Prisma.BusinessPackageUpdateInput
    );
  },

  async remove(id: string) {
    await this.getById(id);
    await packageRepository.delete(id);
  },
};
