import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

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

  create(data: Prisma.TestimonialCreateInput) {
    return prisma.testimonial.create({ data });
  },

  update(id: string, data: Prisma.TestimonialUpdateInput) {
    return prisma.testimonial.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.testimonial.delete({ where: { id } });
  },
};
