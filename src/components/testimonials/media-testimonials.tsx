import Image from "next/image";
import { Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { unsplashSrc } from "@/data/images";
import type { TestimonialView } from "@/types";
import { VideoTestimonial } from "@/components/testimonials/video-testimonial";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} de 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="size-4 text-gold" fill="currentColor" />
      ))}
    </div>
  );
}

function Card({ t }: { t: TestimonialView }) {
  return (
    <figure className="mb-6 flex break-inside-avoid flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      {t.format === "VIDEO" && t.image && t.videoUrl && (
        <div className="aspect-[4/3]">
          <VideoTestimonial poster={t.image} videoUrl={t.videoUrl} name={t.clientName} />
        </div>
      )}

      {t.format === "IMAGE" && t.image && (
        <div className="relative aspect-[4/3]">
          <Image
            src={unsplashSrc(t.image, 700)}
            alt={`Cliente ${t.clientName}`}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <figcaption className="flex flex-1 flex-col gap-4 p-6">
        {t.format === "TEXT" && <Quote className="size-7 text-gold" aria-hidden />}
        {t.rating ? <Stars n={t.rating} /> : null}
        <blockquote className="flex-1 text-pretty text-[0.95rem] leading-relaxed text-foreground">
          “{t.content}”
        </blockquote>
        <div className="flex items-center gap-3 border-t border-border pt-4">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-gold">
            {t.initials}
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-ink">{t.clientName}</span>
            <span className="text-xs text-muted-foreground">{t.position}</span>
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Parede de testemunhos multimédia (vídeo + imagem + texto).
 * `masonry` usa colunas fluidas; caso contrário, grelha uniforme.
 */
export function MediaTestimonials({
  items,
  masonry = true,
}: {
  items: TestimonialView[];
  masonry?: boolean;
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Ainda não há testemunhos publicados.
      </p>
    );
  }

  if (masonry) {
    return (
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {items.map((t) => (
          <Card key={t.id} t={t} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <div key={t.id} className={cn("[&>figure]:mb-0")}>
          <Card t={t} />
        </div>
      ))}
    </div>
  );
}
