import { icons } from "lucide-react";

import type { Service } from "@/types";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = icons[service.icon as keyof typeof icons] ?? icons.Package;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6",
        "transition-colors duration-200 hover:border-gold"
      )}
    >
      <span className="eyebrow absolute right-6 top-6 text-muted-foreground/50">
        {number}
      </span>
      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-ink text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
        <Icon className="size-6" strokeWidth={2} />
      </span>
      <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
    </article>
  );
}
