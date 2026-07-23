import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { TestimonialCard } from "@/components/testimonial-card";
import { getFeaturedTestimonials } from "@/lib/content";

export async function Testimonials() {
  const testimonials = await getFeaturedTestimonials();

  return (
    <Section id="testemunhos">
      <SectionTitle
        eyebrow="Quem já importou"
        title="A confiança de quem faz negócio connosco"
        description="Empreendedores de todo o país que passaram da dúvida à primeira encomenda."
        align="center"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    </Section>
  );
}
