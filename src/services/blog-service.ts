import { blogRepository } from "@/repositories/blog-repository";
import type { Prisma } from "@prisma/client";
import { slugify } from "@/lib/slug";
import { ConflictError, NotFoundError } from "@/lib/errors";
import type {
  CreateBlogInput,
  UpdateBlogInput,
  BlogQuery,
} from "@/validators/blog";

function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function assertUniqueSlug(slug: string, exceptId?: string) {
  const existing = await blogRepository.findBySlug(slug);
  if (existing && existing.id !== exceptId) {
    throw new ConflictError("Já existe um artigo com este título.");
  }
}

export const blogService = {
  async listPublic(query: BlogQuery) {
    const { items, total } = await blogRepository.findMany({
      category: query.category,
      featured: query.featured ? query.featured === "true" : undefined,
      publishedOnly: true,
      page: query.page,
      limit: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  },

  async getPublicBySlug(slug: string) {
    const post = await blogRepository.findBySlug(slug);
    if (!post || !post.published) {
      throw new NotFoundError("Artigo não encontrado.");
    }
    return post;
  },

  // Admin
  listAll() {
    return blogRepository.listAll();
  },

  async getById(id: string) {
    const post = await blogRepository.findById(id);
    if (!post) throw new NotFoundError("Artigo não encontrado.");
    return post;
  },

  async create(input: CreateBlogInput) {
    const slug = slugify(input.title);
    await assertUniqueSlug(slug);
    return blogRepository.create({
      title: input.title,
      slug,
      excerpt: input.excerpt,
      cover: input.cover ?? null,
      category: input.category,
      author: input.author,
      content: input.content,
      readingMinutes: input.readingMinutes ?? estimateReadingMinutes(input.content),
      featured: input.featured,
      published: input.published,
    });
  },

  async update(id: string, input: UpdateBlogInput) {
    await this.getById(id);
    const data: Prisma.BlogPostUpdateInput = {};
    if (input.title !== undefined) {
      data.title = input.title;
      const slug = slugify(input.title);
      await assertUniqueSlug(slug, id);
      data.slug = slug;
    }
    if (input.excerpt !== undefined) data.excerpt = input.excerpt;
    if (input.cover !== undefined) data.cover = input.cover;
    if (input.category !== undefined) data.category = input.category;
    if (input.author !== undefined) data.author = input.author;
    if (input.content !== undefined) {
      data.content = input.content;
      data.readingMinutes =
        input.readingMinutes ?? estimateReadingMinutes(input.content);
    } else if (input.readingMinutes !== undefined) {
      data.readingMinutes = input.readingMinutes;
    }
    if (input.featured !== undefined) data.featured = input.featured;
    if (input.published !== undefined) data.published = input.published;
    return blogRepository.update(id, data);
  },

  async remove(id: string) {
    await this.getById(id);
    await blogRepository.delete(id);
  },
};
