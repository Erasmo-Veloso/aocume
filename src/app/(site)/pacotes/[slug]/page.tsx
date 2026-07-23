import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Check,
  TrendingUp,
  Wallet,
  MessageCircle,
  ShieldCheck,
  Package as PackageIcon,
  Headset,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { Badge } from "@/components/ui/badge";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { PackageCard } from "@/components/packages/package-card";
import { getPackageBySlug, getOtherPackages } from "@/lib/content";
import { formatPrice, profitBasisLabel } from "@/lib/format";
import { unsplashSrc } from "@/data/images";
import { packageEnquiryMessage } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return { title: "Pacote não encontrado" };
  return {
    title: pkg.name,
    description: `${pkg.tagline} Investimento ${formatPrice(
      pkg.investment
    )}, ${profitBasisLabel(pkg.profitBasis)} de ${pkg.profitMargin}.`,
    openGraph: { title: pkg.name, description: pkg.tagline },
  };
}

// O que a consulta acrescenta — o "como" que não cabe na página.
const consultingPoints = [
  "Onde e a quem comprar cada item, ao melhor preço",
  "Como definir os preços de venda para a margem indicada",
  "Gestão do stock e do ciclo de reposição",
  "Estratégia para vender mais depressa no seu mercado",
];

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const others = await getOtherPackages(pkg);

  return (
    <>
      {/* Breadcrumb */}
      <Container className="pt-8">
        <nav
          aria-label="Trilho de navegação"
          className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        >
          <Link href="/" className="hover:text-ink">
            Início
          </Link>
          <ChevronRight className="size-4" />
          <Link href="/pacotes" className="hover:text-ink">
            Pacotes de Negócio
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-ink">{pkg.name}</span>
        </nav>
      </Container>

      <Container className="grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
        {/* Imagem */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
          <Image
            src={unsplashSrc(pkg.imageBase, 1000)}
            alt={`Negócio: ${pkg.name}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"
          />
          <Badge variant="gold" className="absolute left-5 top-5">
            <TrendingUp className="size-3.5" />
            Lucro {pkg.profitMargin}
          </Badge>
          <span className="absolute right-5 top-5 font-mono text-sm tracking-wider text-white/85">
            {pkg.id}
          </span>
        </div>

        {/* Resumo + CTA */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-gold-strong">Oportunidade de negócio</span>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {pkg.name}
            </h1>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              {pkg.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4">
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <Wallet className="size-4 text-gold-strong" />
                Investimento
              </span>
              <span className="text-2xl font-bold text-ink">
                {formatPrice(pkg.investment)}
              </span>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4">
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="size-4 text-gold-strong" />
                Retorno estimado
              </span>
              <span className="text-base font-semibold text-ink">
                {pkg.estimatedReturn}
              </span>
              <span className="text-xs text-muted-foreground">
                {profitBasisLabel(pkg.profitBasis)}
              </span>
            </div>
          </div>

          <WhatsAppLink
            message={packageEnquiryMessage(pkg)}
            variant="cta"
            size="xl"
            className="w-full sm:w-auto"
          >
            <MessageCircle />
            {pkg.ctaLabel}
          </WhatsAppLink>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-success" />
            Fornecedores verificados e acompanhamento em todo o processo.
          </p>
        </div>
      </Container>

      {/* O quê vs Como — o cerne do modelo */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* O que recebe */}
          <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink text-gold">
                <PackageIcon className="size-6" />
              </span>
              <h2 className="text-xl font-semibold text-ink">O que recebe</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Tudo o que precisa para arrancar com este negócio, importado e
              entregue por nós.
            </p>
            <ul className="flex flex-col gap-3">
              {pkg.items.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-foreground">
                    {item.label}
                    {item.quantity && (
                      <span className="text-muted-foreground"> · {item.quantity}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Como alcançar o lucro */}
          <div className="flex flex-col gap-5 rounded-2xl border border-gold/40 bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold text-ink">
                <Headset className="size-6" />
              </span>
              <h2 className="text-xl font-semibold text-ink">
                Como alcançar o lucro
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              O pacote mostra-lhe o destino. O caminho — o plano concreto para
              chegar lá — damos-lho numa consulta gratuita pelo WhatsApp:
            </p>
            <ul className="flex flex-col gap-3">
              {consultingPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-strong">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <WhatsAppLink
              message={packageEnquiryMessage(pkg)}
              variant="cta"
              size="lg"
              className="mt-auto w-full sm:w-fit"
            >
              <MessageCircle />
              {pkg.ctaLabel}
            </WhatsAppLink>
          </div>
        </div>
      </Section>

      {/* Outros pacotes */}
      {others.length > 0 && (
        <Section>
          <SectionTitle eyebrow="Outras oportunidades" title="Veja outros pacotes" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
