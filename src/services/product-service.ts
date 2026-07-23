import { productRepository } from "@/repositories/product-repository";
import { categoryRepository } from "@/repositories/category-repository";
import type { Prisma } from "@/generated/prisma/client";
import { slugify } from "@/lib/slug";
import { BadRequestError, ConflictError, NotFoundError } from "@/lib/errors";
import type {
  CreateProductInput,
  UpdateProductInput,
  ProductQuery,
} from "@/validators/product";

async function assertUniqueSlug(slug: string, exceptId?: string) {
  const existing = await productRepository.findBySlug(slug);
  if (existing && existing.id !== exceptId) {
    throw new ConflictError("Já existe um produto com este título.");
  }
}

export const productService = {
  async listPublic(query: ProductQuery) {
    const { items, total } = await productRepository.findMany({
      categorySlug: query.category,
      featured: query.featured ? query.featured === "true" : undefined,
      type: query.type,
      search: query.search,
      activeOnly: true,
      page: query.page,
      limit: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  },

  async getPublicBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug);
    if (!product || !product.active) {
      throw new NotFoundError("Produto não encontrado.");
    }
    return product;
  },

  // Admin: todos os produtos (inclui inactivos).
  listAll() {
    return productRepository.listAll();
  },

  async getById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) throw new NotFoundError("Produto não encontrado.");
    return product;
  },

  async create(input: CreateProductInput) {
    const category = await categoryRepository.findById(input.categoryId);
    if (!category) throw new BadRequestError("Categoria inexistente.");

    const slug = slugify(input.title);
    await assertUniqueSlug(slug);

    if (await productRepository.findByReference(input.reference)) {
      throw new ConflictError("Já existe um produto com esta referência.");
    }

    return productRepository.create({
      reference: input.reference,
      title: input.title,
      slug,
      shortDescription: input.shortDescription,
      description: input.description,
      price: input.price ?? null,
      productType: input.productType,
      paymentType: input.paymentType,
      minimumQuantity: input.minimumQuantity,
      deliveryTime: input.deliveryTime,
      availableQuantity: input.availableQuantity ?? null,
      featured: input.featured,
      active: input.active,
      category: { connect: { id: input.categoryId } },
      images: input.images?.length
        ? { create: input.images }
        : undefined,
    });
  },

  async update(id: string, input: UpdateProductInput) {
    const product = await productRepository.findById(id);
    if (!product) throw new NotFoundError("Produto não encontrado.");

    const data: Record<string, unknown> = {};
    if (input.title !== undefined) {
      data.title = input.title;
      const slug = slugify(input.title);
      await assertUniqueSlug(slug, id);
      data.slug = slug;
    }
    if (input.reference !== undefined && input.reference !== product.reference) {
      const clash = await productRepository.findByReference(input.reference);
      if (clash && clash.id !== id) {
        throw new ConflictError("Já existe um produto com esta referência.");
      }
      data.reference = input.reference;
    }
    if (input.categoryId !== undefined) {
      const category = await categoryRepository.findById(input.categoryId);
      if (!category) throw new BadRequestError("Categoria inexistente.");
      data.category = { connect: { id: input.categoryId } };
    }
    for (const key of [
      "shortDescription",
      "description",
      "productType",
      "paymentType",
      "minimumQuantity",
      "deliveryTime",
      "featured",
      "active",
    ] as const) {
      if (input[key] !== undefined) data[key] = input[key];
    }
    if (input.price !== undefined) data.price = input.price;
    if (input.availableQuantity !== undefined)
      data.availableQuantity = input.availableQuantity;
    if (input.images !== undefined) {
      data.images = { deleteMany: {}, create: input.images };
    }

    return productRepository.update(id, data as Prisma.ProductUpdateInput);
  },

  async remove(id: string) {
    const product = await productRepository.findById(id);
    if (!product) throw new NotFoundError("Produto não encontrado.");
    await productRepository.delete(id);
  },
};
