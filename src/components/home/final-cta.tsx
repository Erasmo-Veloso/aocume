import { MessageCircle, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grain relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -bottom-24 size-80 rounded-full bg-gold/10 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="eyebrow text-gold">Comece hoje</span>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Diga-nos o que quer importar. Tratamos do resto.
            </h2>
            <p className="text-pretty text-lg text-white/70">
              Fale connosco pelo WhatsApp e receba uma cotação sem compromisso.
              O primeiro passo para o seu negócio importar com confiança.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink message={generalEnquiryMessage()} variant="cta" size="xl">
                <MessageCircle />
                Pedir cotação
              </WhatsAppLink>
              <LinkButton
                href="/encomendas"
                size="xl"
                className="border border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                Ver produtos
                <ArrowRight />
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
