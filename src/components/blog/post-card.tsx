import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { unsplashSrc } from "@/data/images";
import type { BlogPostView } from "@/types";

const dateFmt = new Intl.DateTimeFormat("pt-PT", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function PostCard({
  post,
  featured = false,
}: {
  post: BlogPostView;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-dropdown)]",
        featured && "lg:flex-row"
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "relative block overflow-hidden",
          featured ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]"
        )}
      >
        {post.cover ? (
          <Image
            src={unsplashSrc(post.cover, featured ? 1000 : 700)}
            alt={post.title}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grain size-full bg-ink" aria-hidden />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-gold backdrop-blur">
          {post.category}
        </span>
      </Link>

      <div className={cn("flex flex-1 flex-col gap-3 p-6", featured && "lg:justify-center lg:p-8")}>
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>{dateFmt.format(new Date(post.date))}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readingMinutes} min
          </span>
        </div>
        <h3
          className={cn(
            "font-bold leading-snug text-ink",
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-gold-strong">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-1 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">Por {post.author}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-gold-strong"
          >
            Ler artigo
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
