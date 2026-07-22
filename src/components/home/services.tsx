import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { ServiceCard } from "@/components/service-card";
import { SERVICES } from "@/data/services";

export function Services() {
  return (
    <Section id="servicos">
      <SectionTitle
        eyebrow="O que fazemos"
        title="Serviços pensados para o seu negócio"
        description="Da procura do fornecedor à entrega em Angola — acompanhamos cada parte do caminho."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </Section>
  );
}
