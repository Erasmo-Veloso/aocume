import Image from "next/image";
import Link from "next/link";
import { Check, TrendingUp, ArrowUpRight } from "lucide-react";

import type { BusinessPackage } from "@/types";
import { formatPrice, profitBasisLabel } from "@/lib/format";
import { unsplashSrc } from "@/data/images";
import { packageEnquiryMessage } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { WhatsAppLink } from "@/components/whatsapp-link";

export function PackageCard({ pkg }: { pkg: BusinessPackage }) {
  const visibleItems = pkg.items.slice(0, 3);
  const remaining = pkg.items.length - visibleItems.length;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-dropdown)]">
      <Link
        href={`/pacotes/${pkg.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
        aria-label={pkg.name}
      >
        <Image
          src={unsplashSrc(pkg.imageBase, 720)}
          alt={`Negócio: ${pkg.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
        />
        <Badge variant="gold" className="absolute left-4 top-4">
          <TrendingUp className="size-3.5" />
          Lucro {pkg.profitMargin}
        </Badge>
        <span className="absolute right-4 top-4 font-mono text-[0.7rem] tracking-wider text-white/85">
          {pkg.id}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold leading-snug text-ink">
            <Link
              href={`/pacotes/${pkg.slug}`}
              className="transition-colors hover:text-gold-strong"
            >
              {pkg.name}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {pkg.tagline}
          </p>
        </div>

        {/* Painel de investimento + retorno (estilo manifesto) */}
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-4">
          <div className="flex flex-col gap-0.5">
            <span className="eyebrow text-muted-foreground">Investimento</span>
            <span className="text-lg font-bold text-ink">
              {formatPrice(pkg.investment)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 border-l border-border pl-3">
            <span className="eyebrow text-gold-strong">Retorno</span>
            <span className="text-sm font-semibold text-ink">
              {pkg.estimatedReturn}
            </span>
          </div>
        </div>

        {/* Itens incluídos (resumo) */}
        <ul className="flex flex-col gap-1.5">
          {visibleItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check className="size-4 shrink-0 text-success" />
              <span>
                {item.label}
                {item.quantity && (
                  <span className="text-muted-foreground/70"> · {item.quantity}</span>
                )}
              </span>
            </li>
          ))}
          {remaining > 0 && (
            <li className="pl-6 text-xs text-muted-foreground/70">
              + {remaining} {remaining === 1 ? "item incluído" : "itens incluídos"}
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">
            {formatPrice(pkg.investment)} · {profitBasisLabel(pkg.profitBasis)}
          </span>
          <div className="flex items-center gap-3">
            <WhatsAppLink
              message={packageEnquiryMessage(pkg)}
              variant="cta"
              size="lg"
              className="flex-1"
            >
              {pkg.ctaLabel}
            </WhatsAppLink>
            <Link
              href={`/pacotes/${pkg.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-gold-strong"
            >
              Ver plano
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
