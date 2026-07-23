import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { ArticleBody } from "@/components/blog/article-body";
import { PostCard } from "@/components/blog/post-card";
import { getPostBySlug, getOtherPosts } from "@/lib/content";
import { unsplashSrc } from "@/data/images";
import { SITE } from "@/lib/site";
import { generalEnquiryMessage } from "@/lib/whatsapp";

const dateFmt = new Intl.DateTimeFormat("pt-PT", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getOtherPosts(slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="pt-8">
        <nav
          aria-label="Trilho de navegação"
          className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        >
          <Link href="/" className="hover:text-ink">Início</Link>
          <ChevronRight className="size-4" />
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          <ChevronRight className="size-4" />
          <span className="text-ink">{post.category}</span>
        </nav>
      </Container>

      <article>
        <Container className="py-8 lg:py-12">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow text-gold-strong">{post.category}</span>
            <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
              <span className="font-medium text-ink">{post.author}</span>
              <span>{dateFmt.format(new Date(post.date))}</span>
              <span className="inline-flex items-center gap-1 font-mono text-xs">
                <Clock className="size-3.5" />
                {post.readingMinutes} min de leitura
              </span>
            </div>
          </div>

          {post.cover && (
            <div className="relative mx-auto mt-8 aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl bg-muted">
              <Image
                src={unsplashSrc(post.cover, 1400)}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          )}

          <div className="mx-auto mt-10 max-w-3xl">
            <ArticleBody content={post.content} />

            <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-gold/40 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-ink">
                  Pronto para importar com acompanhamento?
                </p>
                <p className="text-sm text-muted-foreground">
                  Fale connosco e receba um plano à medida do seu negócio.
                </p>
              </div>
              <WhatsAppLink message={generalEnquiryMessage()} variant="cta" size="lg">
                <MessageCircle />
                Falar no WhatsApp
              </WhatsAppLink>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Section tone="surface">
          <SectionTitle eyebrow="Continuar a ler" title="Artigos relacionados" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
