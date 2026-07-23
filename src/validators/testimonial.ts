import { z } from "zod";

export const createTestimonialSchema = z.object({
  clientName: z.string().min(2).max(120),
  position: z.string().max(120).optional(),
  photo: z.string().url().nullable().optional(),
  content: z.string().min(2).max(600),
  featured: z.boolean().default(false),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
