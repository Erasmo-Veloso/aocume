import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/blog/post-card";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guias práticos sobre importação da China para Angola: custos, fornecedores, produtos rentáveis e como evitar fraudes. Aprenda com a AOCUME.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : [];
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Aprenda a importar com confiança"
        description="Guias práticos, custos reais e estratégias para importar da China e crescer o seu negócio em Angola."
      />

      <Section>
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ainda não há artigos publicados. Volte em breve.
          </p>
        ) : (
          <>
            <div className="mb-10 flex flex-wrap gap-2">
              <Badge variant="default">Todos</Badge>
              {categories.map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </div>

            {featured && <PostCard post={featured} featured />}

            {rest.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
}
