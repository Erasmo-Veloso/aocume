import { Quote } from "lucide-react";

import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <Quote className="size-7 text-gold" aria-hidden />
      <blockquote className="flex-1 text-pretty text-base leading-relaxed text-foreground">
        “{testimonial.content}”
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-sm font-semibold text-gold">
          {testimonial.initials}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-ink">
            {testimonial.clientName}
          </span>
          <span className="text-xs text-muted-foreground">
            {testimonial.position}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
