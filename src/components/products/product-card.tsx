import Link from "next/link";
import { ArrowUpRight, Clock, Package } from "lucide-react";

import type { Product } from "@/types";
import { formatPrice, productTypeLabel } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-dropdown)]">
      <Link
        href={`/encomendas/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.swatch} 0%, ${product.swatch}cc 100%)`,
        }}
        aria-label={product.title}
      >
        {/* Marcador visual em vez de fotografia (v1 sem imagens reais) */}
        <div className="absolute inset-0 grain opacity-60" aria-hidden />
        <Package
          className="absolute right-4 top-4 size-8 text-white/25"
          aria-hidden
        />
        <span className="absolute left-4 top-4 font-mono text-[0.7rem] tracking-wider text-white/80">
          REF · {product.reference}
        </span>
        <div className="absolute bottom-4 left-4">
          <Badge variant={product.productType === "READY_STOCK" ? "success" : "gold"}>
            {productTypeLabel(product.productType)}
          </Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold leading-snug text-ink">
          <Link
            href={`/encomendas/${product.slug}`}
            className="transition-colors hover:text-gold-strong"
          >
            {product.title}
          </Link>
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Clock className="size-3.5 text-gold-strong" />
          {product.deliveryTime}
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-border pt-4">
          <span className="text-lg font-bold text-ink">
            {formatPrice(product.price)}
          </span>
          <Link
            href={`/encomendas/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-gold-strong"
          >
            Ver detalhes
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
