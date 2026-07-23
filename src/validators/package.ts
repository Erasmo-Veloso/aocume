import { z } from "zod";

export const packageItemSchema = z.object({
  label: z.string().min(1).max(120),
  quantity: z.string().max(40).optional(),
  position: z.number().int().min(0).default(0),
});

export const createPackageSchema = z.object({
  name: z.string().min(2).max(120),
  tagline: z.string().min(2).max(300),
  image: z.string().url().nullable().optional(),
  investment: z.number().int().nonnegative(),
  currency: z.string().max(8).default("AOA"),
  profitMargin: z.string().min(1).max(40),
  estimatedReturn: z.string().min(1).max(80),
  profitBasis: z.enum(["GROSS", "NET"]).default("GROSS"),
  ctaLabel: z.string().min(1).max(40),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  position: z.number().int().min(0).default(0),
  items: z.array(packageItemSchema).default([]),
});

export const updatePackageSchema = createPackageSchema.partial();

export const packageQuerySchema = z.object({
  featured: z.enum(["true", "false"]).optional(),
  active: z.enum(["true", "false"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
});

// Dados adicionais que o frontend pode enviar ao iniciar o atendimento (n8n).
export const packageLeadSchema = z.object({
  clientName: z.string().max(120).optional(),
  phone: z.string().max(40).optional(),
});

export type CreatePackageInput = z.infer<typeof createPackageSchema>;
export type UpdatePackageInput = z.infer<typeof updatePackageSchema>;
export type PackageQuery = z.infer<typeof packageQuerySchema>;
export type PackageLeadInput = z.infer<typeof packageLeadSchema>;
