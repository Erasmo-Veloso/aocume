import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { blogService } from "@/services/blog-service";
import { NotFoundError } from "@/lib/errors";
import { BlogForm, type BlogFormValues } from "@/components/admin/blog-form";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let post;
  try {
    post = await blogService.getById(id);
  } catch (e) {
    if (e instanceof NotFoundError) notFound();
    throw e;
  }

  const initial: BlogFormValues = {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    cover: post.cover ?? "",
    content: post.content,
    featured: post.featured,
    published: post.published,
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/blog"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ink"
        >
          <ChevronLeft className="size-4" />
          Blog
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Editar artigo</h1>
      </div>
      <BlogForm initial={initial} />
    </div>
  );
}
