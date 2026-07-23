import { testimonialRepository } from "@/repositories/testimonial-repository";
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
      content: input.content,
      featured: input.featured,
    });
  },

  async update(id: string, input: UpdateTestimonialInput) {
    await this.get(id);
    return testimonialRepository.update(id, input);
  },

  async remove(id: string) {
    await this.get(id);
    await testimonialRepository.delete(id);
  },
};
