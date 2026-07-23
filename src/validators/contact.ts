import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2, "Indique o seu nome.").max(120),
  email: z.string().email("E-mail inválido."),
  phone: z.string().max(40).optional(),
  subject: z.string().max(160).optional(),
  message: z.string().min(10, "Mensagem demasiado curta.").max(2000),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
