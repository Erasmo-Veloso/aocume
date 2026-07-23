import { categoryRepository } from "@/repositories/category-repository";
import { slugify } from "@/lib/slug";
import { ConflictError, NotFoundError } from "@/lib/errors";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/validators/category";

export const categoryService = {
  list() {
    return categoryRepository.findMany();
  },

  async get(id: string) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new NotFoundError("Categoria não encontrada.");
    return category;
  },

  async create(input: CreateCategoryInput) {
    const slug = slugify(input.name);
    if (await categoryRepository.findBySlug(slug)) {
      throw new ConflictError("Já existe uma categoria com este nome.");
    }
    return categoryRepository.create({
      name: input.name,
      slug,
      description: input.description ?? null,
    });
  },

  async update(id: string, input: UpdateCategoryInput) {
    await this.get(id);
    const data: { name?: string; slug?: string; description?: string | null } =
      {};
    if (input.name !== undefined) {
      data.name = input.name;
      const slug = slugify(input.name);
      const existing = await categoryRepository.findBySlug(slug);
      if (existing && existing.id !== id) {
        throw new ConflictError("Já existe uma categoria com este nome.");
      }
      data.slug = slug;
    }
    if (input.description !== undefined) data.description = input.description;
    return categoryRepository.update(id, data);
  },

  async remove(id: string) {
    await this.get(id);
    const count = await categoryRepository.countProducts(id);
    if (count > 0) {
      throw new ConflictError(
        "Não é possível eliminar: existem produtos nesta categoria."
      );
    }
    await categoryRepository.delete(id);
  },
};
