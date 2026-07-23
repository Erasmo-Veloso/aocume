import { prisma } from "@/lib/prisma";

export const adminRepository = {
  findByEmail(email: string) {
    return prisma.administrator.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.administrator.findUnique({ where: { id } });
  },

  create(data: { name?: string | null; email: string; password: string }) {
    return prisma.administrator.create({ data });
  },
};
