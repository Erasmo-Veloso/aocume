import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { ProductCard } from "@/components/products/product-card";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <Section id="destaques">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Catálogo"
          title="Produtos em destaque"
          description="Uma amostra do que pode importar connosco. Muitos mais no catálogo completo."
        />
        <Link
          href="/encomendas"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-gold-strong"
        >
          Ver todos os produtos
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}
