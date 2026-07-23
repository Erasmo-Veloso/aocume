import { z } from "zod";

const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().max(160).optional(),
  position: z.number().int().min(0).default(0),
});

export const createProductSchema = z.object({
  categoryId: z.string().uuid("Categoria inválida."),
  reference: z.string().min(1).max(40),
  title: z.string().min(2).max(160),
  shortDescription: z.string().min(2).max(300),
  description: z.string().min(2),
  price: z.number().int().nonnegative().nullable().optional(),
  productType: z.enum(["ORDER", "READY_STOCK"]).default("ORDER"),
  paymentType: z.enum(["PARTIAL", "FULL"]).default("PARTIAL"),
  minimumQuantity: z.number().int().positive().default(1),
  deliveryTime: z.string().min(1).max(60),
  availableQuantity: z.number().int().nonnegative().nullable().optional(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  images: z.array(imageSchema).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  category: z.string().optional(),
  featured: z.enum(["true", "false"]).optional(),
  type: z.enum(["ORDER", "READY_STOCK"]).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
