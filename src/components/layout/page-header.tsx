import { Container } from "@/components/layout/container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-white/5 bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-gold/10 blur-3xl"
      />
      <Container className="relative flex flex-col gap-4 py-16 sm:py-20">
        {eyebrow && (
          <span className="eyebrow flex items-center gap-2 text-gold">
            <span aria-hidden className="h-px w-6 bg-gold/60" />
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-white/70">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
