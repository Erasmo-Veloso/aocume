import type { Testimonial } from "@/types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    clientName: "Domingas Faria",
    position: "Comércio de electrónica · Luanda",
    initials: "DF",
    content:
      "Importei o meu primeiro lote de telemóveis com a AOCUME sem nunca ter saído de Luanda. Explicaram cada passo e a mercadoria chegou exactamente como combinado.",
    featured: true,
  },
  {
    id: "t-2",
    clientName: "Nelson Cabral",
    position: "Instalador de energia solar · Benguela",
    initials: "NC",
    content:
      "Precisava de kits solares fiáveis e a preço competitivo. A equipa verificou o fornecedor na origem e poupei bastante face ao que pagava aqui.",
    featured: true,
  },
  {
    id: "t-3",
    clientName: "Aline Sebastião",
    position: "Salão de beleza · Huambo",
    initials: "AS",
    content:
      "O acompanhamento pelo WhatsApp fez toda a diferença. Respondiam sempre e senti confiança para avançar com a encomenda.",
    featured: true,
  },
  {
    id: "t-4",
    clientName: "Paulo Kiala",
    position: "Retalhista · Lubango",
    initials: "PK",
    content:
      "Fiz a formação e hoje faço as minhas próprias encomendas. Foi o melhor investimento que fiz para o meu negócio este ano.",
    featured: false,
  },
];

export function getFeaturedTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.featured);
}
