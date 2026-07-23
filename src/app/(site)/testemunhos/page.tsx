import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/link-button";
import { MediaTestimonials } from "@/components/testimonials/media-testimonials";
import { getAllTestimonials } from "@/lib/content";
import { generalEnquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Testemunhos",
  description:
    "Histórias reais de empreendedores angolanos que importaram com a AOCUME — em vídeo, imagem e na primeira pessoa.",
};

export const dynamic = "force-dynamic";

export default async function TestemunhosPage() {
  const testimonials = await getAllTestimonials();

  return (
    <>
      <PageHeader
        eyebrow="Testemunhos"
        title="A confiança de quem já faz negócio connosco"
        description="Vídeos e histórias de clientes reais — do primeiro contacto à mercadoria na loja."
      />

      <Section>
        <MediaTestimonials items={testimonials} />
      </Section>

      <Container className="pb-20">
        <div className="grain flex flex-col items-center gap-5 rounded-3xl bg-ink px-6 py-14 text-center text-white">
          <h2 className="max-w-xl text-balance text-2xl font-bold sm:text-3xl">
            Quer ser o próximo a contar a sua história?
          </h2>
          <p className="max-w-md text-white/70">
            Comece a sua importação hoje e junte-se a quem já cresceu com a AOCUME.
          </p>
          <LinkButton href={generalEnquiryLink()} external variant="cta" size="xl">
            <MessageCircle />
            Falar no WhatsApp
          </LinkButton>
        </div>
      </Container>
    </>
  );
}
