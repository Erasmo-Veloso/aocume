import type { Metadata } from "next";
import Image from "next/image";
import {
  Target,
  Eye,
  MessageCircle,
  Check,
  ShieldCheck,
  Heart,
  Handshake,
  Sparkles,
  GraduationCap,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { SITE } from "@/lib/site";
import { FOUNDER_IMAGE, unsplashSrc } from "@/data/images";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a AOCUME: a nossa missão, valores e a equipa que ajuda empreendedores angolanos a importar da China com confiança.",
};

const values = [
  { icon: ShieldCheck, title: "Confiança", text: "Fazemos o que dizemos e mostramos cada passo." },
  { icon: Heart, title: "Integridade", text: "Transparência total em preços e prazos." },
  { icon: Handshake, title: "Compromisso", text: "O seu sucesso é a razão do nosso trabalho." },
  { icon: GraduationCap, title: "Aprendizagem", text: "Ensinamos para que cresça de forma autónoma." },
];

const whyChoose = [
  "Fornecedores verificados na origem, na China",
  "Preços negociados directamente com os fabricantes",
  "Acompanhamento em português, por uma equipa angolana",
  "Comunicação directa e rápida pelo WhatsApp",
  "Do sourcing à entrega, tratamos de tudo",
  "Formação prática para importar por conta própria",
];

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre a AOCUME"
        title="Ligamos Angola à China com confiança"
        description="Nasceu da vontade de tornar a importação simples, segura e acessível para quem quer fazer crescer o seu negócio."
      />

      {/* História */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionTitle eyebrow="A nossa história" title="De um problema real a uma solução prática" />
            <div className="flex flex-col gap-4 text-pretty text-base leading-relaxed text-muted-foreground">
              <p>
                Importar da China parece complicado: encontrar um fornecedor de
                confiança, negociar noutra língua, garantir a qualidade e trazer
                a mercadoria com segurança até Angola. Muitos empreendedores
                desistem ou perdem dinheiro pelo caminho.
              </p>
              <p>
                A AOCUME existe para resolver isso. Colocamo-nos entre o
                empreendedor angolano e o fabricante chinês, cuidando de cada
                etapa — do primeiro contacto à entrega — e ensinando quem quer
                aprender a fazê-lo por conta própria.
              </p>
              <p>
                Hoje ajudamos comerciantes, retalhistas e novos negócios de todo
                o país a importar com confiança e a crescer.
              </p>
            </div>
          </div>

          {/* Fundador */}
          <aside className="flex flex-col gap-5 rounded-3xl border border-border bg-surface p-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
              <Image
                src={unsplashSrc(FOUNDER_IMAGE.base, 700)}
                alt={FOUNDER_IMAGE.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-ink">{SITE.founder}</p>
              <p className="text-sm text-muted-foreground">
                Fundador · AOCUME
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                “Quero que qualquer angolano possa importar com a mesma
                segurança de uma grande empresa. É isso que construímos todos os
                dias.”
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* Missão & Visão */}
      <Section tone="surface">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-8">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-ink text-gold">
              <Target className="size-6" />
            </span>
            <h3 className="text-xl font-semibold text-ink">Missão</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Capacitar empreendedores e negócios, simplificando o sourcing e a
              importação internacional através de consultoria profissional e
              educação prática.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-8">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-ink text-gold">
              <Eye className="size-6" />
            </span>
            <h3 className="text-xl font-semibold text-ink">Visão</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Ser uma das principais referências de Angola em consultoria de
              comércio internacional, importação profissional e educação de
              negócio.
            </p>
          </div>
        </div>
      </Section>

      {/* Valores */}
      <Section>
        <SectionTitle
          eyebrow="Aquilo em que acreditamos"
          title="Os nossos valores"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 text-center items-center"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gold/15 text-gold-strong">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-base font-semibold text-ink">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Porquê escolher */}
      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionTitle
            eyebrow="Porquê a AOCUME"
            title="Razões para importar connosco"
            description="Não vendemos apenas um serviço — entregamos tranquilidade em cada encomenda."
            onDark
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed text-white/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <Container className="py-16">
        <div className="flex flex-col items-center gap-5 text-center">
          <Sparkles className="size-8 text-gold" />
          <h2 className="max-w-xl text-balance text-2xl font-bold text-ink sm:text-3xl">
            Pronto para começar a importar com confiança?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink message={generalEnquiryMessage()} variant="cta" size="xl">
              <MessageCircle />
              Falar no WhatsApp
            </WhatsAppLink>
            <LinkButton href="/encomendas" size="xl" variant="outline">
              Ver produtos
            </LinkButton>
          </div>
        </div>
      </Container>
    </>
  );
}
