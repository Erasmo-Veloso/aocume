import { testimonialRepository } from "@/repositories/testimonial-repository";
import type { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import type {
  CreateTestimonialInput,
  UpdateTestimonialInput,
} from "@/validators/testimonial";

export const testimonialService = {
  list(featuredOnly = false) {
    return testimonialRepository.findMany(featuredOnly);
  },

  async get(id: string) {
    const item = await testimonialRepository.findById(id);
    if (!item) throw new NotFoundError("Testemunho não encontrado.");
    return item;
  },

  create(input: CreateTestimonialInput) {
    return testimonialRepository.create({
      clientName: input.clientName,
      position: input.position ?? null,
      photo: input.photo ?? null,
      videoUrl: input.videoUrl ?? null,
      content: input.content,
      format: input.format,
      rating: input.rating ?? null,
      featured: input.featured,
    });
  },

  async update(id: string, input: UpdateTestimonialInput) {
    await this.get(id);
    const data: Prisma.TestimonialUpdateInput = {};
    if (input.clientName !== undefined) data.clientName = input.clientName;
    if (input.position !== undefined) data.position = input.position;
    if (input.photo !== undefined) data.photo = input.photo;
    if (input.videoUrl !== undefined) data.videoUrl = input.videoUrl;
    if (input.content !== undefined) data.content = input.content;
    if (input.format !== undefined) data.format = input.format;
    if (input.rating !== undefined) data.rating = input.rating;
    if (input.featured !== undefined) data.featured = input.featured;
    return testimonialRepository.update(id, data);
  },

  async remove(id: string) {
    await this.get(id);
    await testimonialRepository.delete(id);
  },
};
