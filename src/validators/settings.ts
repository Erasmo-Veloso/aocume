import { z } from "zod";

const optionalUrl = z
  .string()
  .url()
  .or(z.literal(""))
  .optional();

export const updateSettingsSchema = z.object({
  companyName: z.string().min(1).max(120).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(40).optional(),
  whatsapp: z.string().max(40).optional(),
  address: z.string().max(200).optional(),
  facebook: optionalUrl,
  instagram: optionalUrl,
  youtube: optionalUrl,
  linkedin: optionalUrl,
  logo: optionalUrl,
  heroTitle: z.string().max(200).optional(),
  heroSubtitle: z.string().max(300).optional(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
