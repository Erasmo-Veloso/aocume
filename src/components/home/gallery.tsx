import Image from "next/image";

import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/layout/section-title";
import { cn } from "@/lib/utils";
import { GALLERY_IMAGES, FOUNDER_IMAGE, unsplashSrc } from "@/data/images";

// Galeria do processo (assets.md · Galeria): contentores, porto, produtos,
// escritório, clientes e o fundador. Fotografias de substituição — trocar
// pelas imagens reais da AOCUME.
const items = [
  { ...GALLERY_IMAGES[0], span: "sm:col-span-2 sm:row-span-2" },
  { ...GALLERY_IMAGES[1], span: "" },
  { ...GALLERY_IMAGES[2], span: "" },
  { ...FOUNDER_IMAGE, caption: "Santiago Mulonga · Fundador", span: "" },
  { ...GALLERY_IMAGES[3], span: "" },
  { ...GALLERY_IMAGES[4], span: "sm:col-span-2" },
];

export function Gallery() {
  return (
    <Section id="galeria" tone="surface">
      <SectionTitle
        eyebrow="Em imagens"
        title="O processo, do outro lado do mundo até si"
        align="center"
      />

      <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((item) => (
          <figure
            key={item.caption}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-muted",
              item.span
            )}
          >
            <Image
              src={unsplashSrc(item.base, 800)}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 font-mono text-xs tracking-wide text-white">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
