import { contactRepository } from "@/repositories/contact-repository";
import type { CreateContactInput } from "@/validators/contact";

export const contactService = {
  // v1 apenas guarda a mensagem; não envia e-mail (docs/backend.md).
  create(input: CreateContactInput) {
    return contactRepository.create({
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      subject: input.subject ?? null,
      message: input.message,
    });
  },

  list() {
    return contactRepository.findMany();
  },

  markRead(id: string, read: boolean) {
    return contactRepository.markRead(id, read);
  },
};
