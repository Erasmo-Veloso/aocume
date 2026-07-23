import { z } from "zod";

export const createTestimonialSchema = z.object({
  clientName: z.string().min(2).max(120),
  position: z.string().max(120).optional(),
  photo: z.string().url().nullable().optional(),
  videoUrl: z.string().url().nullable().optional(),
  content: z.string().min(2).max(600),
  format: z.enum(["TEXT", "IMAGE", "VIDEO"]).default("TEXT"),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  featured: z.boolean().default(false),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
