import Image from "next/image";
import { MessageCircle, Plane, Ship, Warehouse, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { generalEnquiryMessage } from "@/lib/whatsapp";
import { HERO_IMAGE, unsplashSrc } from "@/data/images";

const routeStops = [
  { icon: Warehouse, place: "Guangzhou", note: "Origem · China", code: "CN" },
  { icon: Plane, place: "Em trânsito", note: "Verificação + envio", code: "··" },
  { icon: Ship, place: "Luanda", note: "Destino · Angola", code: "AO" },
];

const manifest = [
  { label: "Encomendas entregues", value: "540+" },
  { label: "Fornecedores verificados", value: "120" },
  { label: "Prazo médio", value: "24 dias" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Fotografia de fundo — porto/contentores (assets.md · Hero) */}
      <Image
        src={unsplashSrc(HERO_IMAGE.base, 1920)}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-25"
      />
      {/* Sobreposição para legibilidade do texto */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60"
      />
      <div aria-hidden className="grain absolute inset-0" />
      {/* Halo dourado subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-gold/10 blur-3xl"
      />
      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="flex flex-col gap-7 animate-rise">
          <span className="eyebrow flex items-center gap-2 text-gold">
            <span aria-hidden className="h-px w-6 bg-gold/60" />
            Importação China → Angola
          </span>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Importe da China com quem trata de tudo por si.
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/70">
            A AOCUME encontra o fornecedor certo, verifica a qualidade na
            origem e acompanha a sua encomenda até Angola. Você decide o
            produto — nós tratamos do resto.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/encomendas" variant="cta" size="xl">
              Fazer encomenda
              <ArrowRight />
            </LinkButton>
            <WhatsAppLink
              message={generalEnquiryMessage()}
              size="xl"
              className="border border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <MessageCircle />
              Falar no WhatsApp
            </WhatsAppLink>
          </div>

          <dl className="mt-4 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {manifest.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="font-mono text-2xl font-medium text-gold">
                  {item.value}
                </dt>
                <dd className="text-xs leading-tight text-white/50">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Painel de rota — o elemento-assinatura */}
        <div className="animate-rise [animation-delay:120ms]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="eyebrow text-white/50">Guia de importação</span>
              <span className="font-mono text-xs text-gold">REF · AOC-0428</span>
            </div>

            <ol className="relative mt-6 flex flex-col gap-6">
              {/* Linha de percurso */}
              <span
                aria-hidden
                className="absolute left-[1.375rem] top-4 bottom-4 w-px bg-gradient-to-b from-gold via-gold/40 to-white/10"
              />
              {routeStops.map((stop, i) => {
                const Icon = stop.icon;
                return (
                  <li key={stop.place} className="relative flex items-center gap-4">
                    <span className="relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-ink text-gold">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex flex-1 flex-col">
                      <span className="text-base font-semibold text-white">
                        {stop.place}
                      </span>
                      <span className="text-xs text-white/50">{stop.note}</span>
                    </span>
                    <span className="font-mono text-sm text-white/40">
                      {i === 0 ? "01" : i === 1 ? "··" : "→"}
                      <span className="ml-2 text-gold">{stop.code}</span>
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 rounded-xl bg-gold/10 p-4">
              <p className="text-sm leading-relaxed text-white/80">
                Acompanhamento em cada etapa, comunicação directa pelo WhatsApp e
                mercadoria verificada antes de sair da China.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
