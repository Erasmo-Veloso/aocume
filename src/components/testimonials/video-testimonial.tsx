"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

/**
 * Cartão de testemunho em vídeo: mostra o poster com botão de reprodução;
 * ao clicar, abre um modal com o vídeo. (Vídeos de amostra na demo.)
 */
export function VideoTestimonial({
  poster,
  videoUrl,
  name,
}: {
  poster: string;
  videoUrl: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver o testemunho em vídeo de ${name}`}
        className="group/vid relative block size-full overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${poster}?auto=format&fit=crop&w=800&q=70`}
          alt={`Testemunho de ${name}`}
          className="size-full object-cover transition-transform duration-300 group-hover/vid:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform duration-200 group-hover/vid:scale-110">
          <Play className="ml-0.5 size-7" fill="currentColor" />
        </span>
        <span className="eyebrow absolute bottom-4 left-4 text-white/90">
          Testemunho em vídeo
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute right-5 top-5 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={() => setOpen(false)}
          >
            <X className="size-6" />
          </button>
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
