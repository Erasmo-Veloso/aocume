import { prisma } from "@/lib/prisma";

export const contactRepository = {
  create(data: {
    name: string;
    email: string;
    phone?: string | null;
    subject?: string | null;
    message: string;
  }) {
    return prisma.contactMessage.create({ data });
  },

  findMany() {
    return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  },

  markRead(id: string, read: boolean) {
    return prisma.contactMessage.update({ where: { id }, data: { read } });
  },
};
