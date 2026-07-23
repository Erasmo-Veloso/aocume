import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ProductCatalog } from "@/components/products/product-catalog";
import { getCatalog } from "@/lib/content";

export const metadata: Metadata = {
  title: "Encomendas",
  description:
    "Explore produtos disponíveis para importação da China ou pronta entrega em Angola. Pesquise, filtre por categoria e peça a sua cotação pelo WhatsApp.",
};

export const dynamic = "force-dynamic";

export default async function EncomendasPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const { products, categories } = await getCatalog();
  const initialCategory =
    categoria && categories.some((c) => c.slug === categoria)
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
          products={products}
          categories={categories}
          initialCategory={initialCategory}
        />
      </Section>
    </>
  );
}
