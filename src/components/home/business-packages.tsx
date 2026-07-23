import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { PackageCard } from "@/components/packages/package-card";
import { getFeaturedPackages } from "@/lib/content";

export async function BusinessPackages() {
  const packages = (await getFeaturedPackages()).slice(0, 3);

  return (
    <Section id="pacotes" tone="surface">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Pacotes de Negócio"
          title="Não venda produtos. Comece um negócio."
          description="Modelos de negócio prontos a seguir: mostramos o investimento, o que está incluído e o lucro que pode esperar. O plano detalhado para lá chegar, damos-lho por WhatsApp."
        />
        <Link
          href="/pacotes"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-gold-strong"
        >
          Ver todos os pacotes
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </Section>
  );
}
