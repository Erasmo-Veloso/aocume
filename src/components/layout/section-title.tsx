import { cn } from "@/lib/utils";

/**
 * Título de secção com eyebrow em estilo "manifesto de carga".
 * O eyebrow em mono ancora o design no mundo da logística/importação.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "center" && "mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow flex items-center gap-2",
            onDark ? "text-gold" : "text-gold-strong"
          )}
        >
          <span
            aria-hidden
            className={cn("h-px w-6", onDark ? "bg-gold/60" : "bg-gold-strong/60")}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-bold tracking-tight sm:text-4xl",
          onDark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-pretty text-base leading-relaxed sm:text-lg",
            onDark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
