import type { Metadata } from "next";
import { ShieldCheck, MessageCircle, Compass } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { PackageCard } from "@/components/packages/package-card";
import { getAllPackages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pacotes de Negócio",
  description:
    "Modelos de negócio prontos a seguir para importar e vender em Angola: investimento, itens incluídos e lucro estimado de cada oportunidade. Peça o plano detalhado pelo WhatsApp.",
};

export const dynamic = "force-dynamic";

const notes = [
  {
    icon: Compass,
    title: "Um modelo a seguir",
    text: "Cada pacote mostra o que precisa de ter e o lucro que pode esperar.",
  },
  {
    icon: MessageCircle,
    title: "O plano é por consulta",
    text: "Falamos consigo no WhatsApp e explicamos como alcançar esse lucro.",
  },
  {
    icon: ShieldCheck,
    title: "Sem risco de arrancar",
    text: "Fornecedores verificados e acompanhamento em cada etapa.",
  },
];

export default async function PacotesPage() {
  const packages = await getAllPackages();

  return (
    <>
      <PageHeader
        eyebrow="Pacotes de Negócio"
        title="Escolha um negócio. Nós montamos a operação."
        description="Cada pacote é uma oportunidade de investimento estruturada: mostramos o investimento, os itens incluídos e o lucro estimado. Para saber exactamente como alcançar esse lucro, fale connosco."
      />

      <Section tone="surface" className="py-10 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {notes.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.title} className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-strong">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-ink">{n.title}</h2>
                  <p className="text-sm text-muted-foreground">{n.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </Section>
    </>
  );
}
