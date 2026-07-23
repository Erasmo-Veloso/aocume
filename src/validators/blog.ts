import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3).max(160),
  excerpt: z.string().min(10).max(400),
  cover: z.string().url().nullable().optional(),
  category: z.string().min(2).max(60),
  author: z.string().min(2).max(120),
  content: z.string().min(10),
  readingMinutes: z.number().int().min(1).max(60).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const updateBlogSchema = createBlogSchema.partial();

export const blogQuerySchema = z.object({
  category: z.string().optional(),
  featured: z.enum(["true", "false"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type BlogQuery = z.infer<typeof blogQuerySchema>;
