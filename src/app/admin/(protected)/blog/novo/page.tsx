import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { BlogForm } from "@/components/admin/blog-form";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
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
        <h1 className="text-2xl font-bold tracking-tight text-ink">Novo artigo</h1>
      </div>
      <BlogForm />
    </div>
  );
}
