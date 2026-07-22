import {
  PackageSearch,
  FileText,
  Wallet,
  ShoppingBag,
  Ship,
  Truck,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";

const steps = [
  {
    icon: PackageSearch,
    title: "Escolha o produto",
    description:
      "Diga-nos o que procura. Nós encontramos e verificamos o fornecedor na China.",
  },
  {
    icon: FileText,
    title: "Peça a cotação",
    description:
      "Enviamos preço, prazo e condições, com tudo claro antes de decidir.",
  },
  {
    icon: Wallet,
    title: "Pagamento",
    description:
      "Formaliza a encomenda com um sinal e paga o saldo conforme o combinado.",
  },
  {
    icon: ShoppingBag,
    title: "Compra na China",
    description:
      "Compramos e conferimos a qualidade da mercadoria na origem.",
  },
  {
    icon: Ship,
    title: "Transporte internacional",
    description:
      "Tratamos do envio e do desembaraço até Angola, sem complicações.",
  },
  {
    icon: Truck,
    title: "Entrega em Angola",
    description:
      "Recebe a sua encomenda e começa a vender. Simples do início ao fim.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" tone="surface">
      <SectionTitle
        eyebrow="Processo ⁄ 6 passos"
        title="Como funciona a sua importação"
        description="Um caminho claro, do primeiro contacto até à mercadoria na sua mão. Sem surpresas."
        align="center"
      />

      <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const number = String(i + 1).padStart(2, "0");
          return (
            <li key={step.title} className="relative flex gap-5">
              <div className="flex flex-col items-center">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-ink">
                  <Icon className="size-6" strokeWidth={2} />
                </span>
              </div>
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="eyebrow text-gold-strong">Passo {number}</span>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
