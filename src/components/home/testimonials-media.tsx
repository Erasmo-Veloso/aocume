import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { MediaTestimonials } from "@/components/testimonials/media-testimonials";
import { getFeaturedTestimonials } from "@/lib/content";

export async function TestimonialsMedia() {
  const testimonials = (await getFeaturedTestimonials()).slice(0, 3);

  if (testimonials.length === 0) return null;

  return (
    <Section id="testemunhos">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Quem já importou"
          title="Histórias reais, em vídeo e na primeira pessoa"
          description="Empreendedores de todo o país que passaram da dúvida à primeira encomenda — e filmaram a experiência."
        />
        <Link
          href="/testemunhos"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-gold-strong"
        >
          Ver todos os testemunhos
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-12">
        <MediaTestimonials items={testimonials} masonry={false} />
      </div>
    </Section>
  );
}
