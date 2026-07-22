import { ShieldCheck, BadgePercent, MapPin, Headphones } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Fornecedores verificados",
    description:
      "Confirmamos cada fabricante e inspeccionamos a mercadoria antes do envio. Importa sem receio de fraudes.",
  },
  {
    icon: BadgePercent,
    title: "Melhores preços",
    description:
      "Negociamos directamente na origem e passamos essa poupança para o seu negócio.",
  },
  {
    icon: MapPin,
    title: "Apoio local em Angola",
    description:
      "Somos angolanos e falamos a sua língua. Está sempre a lidar com uma equipa próxima.",
  },
  {
    icon: Headphones,
    title: "Acompanhamento real",
    description:
      "Respondemos pelo WhatsApp em cada etapa. Sabe sempre onde está a sua encomenda.",
  },
];

export function Benefits() {
  return (
    <Section id="beneficios">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionTitle
          eyebrow="Porquê a AOCUME"
          title="Importar deixa de ser um risco"
          description="Muitos empreendedores perdem dinheiro com fornecedores duvidosos e processos confusos. Nós tiramos esse peso de cima de si."
        />

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="flex flex-col gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15 text-gold-strong">
                  <Icon className="size-6" strokeWidth={2} />
                </span>
                <h3 className="text-base font-semibold text-ink">{b.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
