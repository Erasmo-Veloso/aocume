import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

type Tone = "default" | "surface" | "ink";

const toneClass: Record<Tone, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  ink: "bg-ink text-white",
};

export function Section({
  id,
  tone = "default",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-16 sm:py-20 lg:py-24",
        toneClass[tone],
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
