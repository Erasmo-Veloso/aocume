import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Boxes,
  CreditCard,
  Package,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { ProductCard } from "@/components/products/product-card";
import {
  getProductBySlug,
  getRelatedProducts,
  getCategories,
} from "@/lib/content";
import {
  formatPrice,
  productTypeLabel,
  paymentTypeLabel,
} from "@/lib/format";
import { productEnquiryLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = (await getCategories()).find(
    (c) => c.slug === product.categorySlug
  );
  const related = await getRelatedProducts(product);

  const specs = [
    { icon: Clock, label: "Prazo de entrega", value: product.deliveryTime },
    {
      icon: Boxes,
      label: "Quantidade mínima",
      value: `${product.minimumQuantity} ${
        product.minimumQuantity === 1 ? "unidade" : "unidades"
      }`,
    },
    {
      icon: CreditCard,
      label: "Pagamento",
      value: paymentTypeLabel(product.paymentType),
    },
    {
      icon: Package,
      label: "Tipo",
      value: productTypeLabel(product.productType),
    },
  ];

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
          <Link href="/encomendas" className="hover:text-ink">
            Encomendas
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-ink">{product.title}</span>
        </nav>
      </Container>

      <Container className="grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
        {/* Marcador visual */}
        <div
          className="grain relative aspect-square overflow-hidden rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${product.swatch} 0%, ${product.swatch}bb 100%)`,
          }}
        >
          <Package className="absolute right-6 top-6 size-12 text-white/25" />
          <span className="absolute left-6 top-6 font-mono text-sm tracking-wider text-white/80">
            REF · {product.reference}
          </span>
          <div className="absolute bottom-6 left-6">
            <Badge
              variant={product.productType === "READY_STOCK" ? "success" : "gold"}
            >
              {productTypeLabel(product.productType)}
            </Badge>
          </div>
        </div>

        {/* Detalhes */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {category && (
              <Link
                href={`/encomendas?categoria=${category.slug}`}
                className="eyebrow w-fit text-gold-strong hover:underline"
              >
                {category.name}
              </Link>
            )}
            <h1 className="text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {product.title}
            </h1>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.price == null && (
              <span className="text-sm text-muted-foreground">
                preço conforme quantidade
              </span>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {specs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4"
                >
                  <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="size-4 text-gold-strong" />
                    {spec.label}
                  </dt>
                  <dd className="text-sm font-semibold text-ink">
                    {spec.value}
                  </dd>
                </div>
              );
            })}
          </dl>

          <LinkButton
            href={productEnquiryLink(product)}
            external
            variant="cta"
            size="xl"
            className="w-full sm:w-auto"
          >
            <MessageCircle />
            Encomendar pelo WhatsApp
          </LinkButton>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-success" />
            Fornecedor verificado e mercadoria conferida na origem.
          </p>
        </div>
      </Container>

      {/* Descrição completa */}
      <Section tone="surface" className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <SectionTitle eyebrow="Descrição" title="Sobre este produto" />
          <p className="mt-6 text-pretty text-base leading-relaxed text-foreground">
            {product.description}
          </p>
        </div>
      </Section>

      {/* Relacionados */}
      {related.length > 0 && (
        <Section>
          <SectionTitle
            eyebrow="Também pode importar"
            title="Produtos relacionados"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
