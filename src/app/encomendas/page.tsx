import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ProductCatalog } from "@/components/products/product-catalog";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";

export const metadata: Metadata = {
  title: "Encomendas",
  description:
    "Explore produtos disponíveis para importação da China ou pronta entrega em Angola. Pesquise, filtre por categoria e peça a sua cotação pelo WhatsApp.",
};

export default async function EncomendasPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const initialCategory =
    categoria && CATEGORIES.some((c) => c.slug === categoria)
      ? categoria
      : "todos";

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Produtos para importar ou levar já"
        description="Uma selecção do que pode encomendar da China ou receber de pronta entrega em Angola. Não encontra o que procura? Nós importamos para si."
      />
      <Section>
        <ProductCatalog
          products={PRODUCTS}
          categories={CATEGORIES}
          initialCategory={initialCategory}
        />
      </Section>
    </>
  );
}
