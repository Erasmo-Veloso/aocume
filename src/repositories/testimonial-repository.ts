import { prisma } from "@/lib/prisma";

export const testimonialRepository = {
  findMany(featuredOnly = false) {
    return prisma.testimonial.findMany({
      where: featuredOnly ? { featured: true } : undefined,
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: string) {
    return prisma.testimonial.findUnique({ where: { id } });
  },

  create(data: {
    clientName: string;
    position?: string | null;
    photo?: string | null;
    content: string;
    featured: boolean;
  }) {
    return prisma.testimonial.create({ data });
  },

  update(
    id: string,
    data: {
      clientName?: string;
      position?: string | null;
      photo?: string | null;
      content?: string;
      featured?: boolean;
    }
  ) {
    return prisma.testimonial.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.testimonial.delete({ where: { id } });
  },
};
