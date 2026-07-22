import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark da AOCUME — "AO / CUME" com a barra dourada, conforme a identidade
 * da marca. A tagline "Comércio Internacional" é opcional (usada no rodapé).
 *
 * Reproduzido em texto para ficar nítido em qualquer ecrã e adaptar-se a
 * fundos claros/escuros. Se preferir o ficheiro oficial, coloque-o em
 * `public/logo.svg` e troque este componente por um <Image>.
 */
export function Logo({
  onDark = false,
  withTagline = false,
  className,
}: {
  onDark?: boolean;
  withTagline?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="AOCUME — Comércio Internacional · página inicial"
      className={cn("group inline-flex flex-col items-center", className)}
    >
      <span
        className={cn(
          "text-2xl font-bold leading-none tracking-tight",
          onDark ? "text-white" : "text-ink"
        )}
      >
        AO
        <span className="mx-0.5 text-gold transition-transform duration-200 group-hover:-translate-y-px inline-block">
          /
        </span>
        CUME
      </span>
      {withTagline && (
        <span className="mt-1.5 flex items-center gap-2">
          <span aria-hidden className="h-px w-4 bg-gold" />
          <span
            className={cn(
              "font-mono text-[0.55rem] font-medium uppercase tracking-[0.25em]",
              onDark ? "text-white/70" : "text-muted-foreground"
            )}
          >
            Comércio Internacional
          </span>
          <span aria-hidden className="h-px w-4 bg-gold" />
        </span>
      )}
    </Link>
  );
}
