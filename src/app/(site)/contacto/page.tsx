import type { Metadata } from "next";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { ContactForm } from "@/components/contact/contact-form";
import { getContact } from "@/lib/content";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Fale com a AOCUME. Peça uma cotação, tire dúvidas sobre importação ou comece a sua encomenda. Resposta rápida pelo WhatsApp.",
};

export const dynamic = "force-dynamic";

export default async function ContactoPage() {
  const contact = await getContact();
  const channels = [
    {
      icon: Phone,
      label: "WhatsApp / Telefone",
      value: contact.phone,
      href: `https://wa.me/${contact.whatsapp}`,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    { icon: MapPin, label: "Localização", value: contact.address },
    { icon: Clock, label: "Horário", value: "Seg. a Sáb. · 08h–18h" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Vamos começar a sua importação"
        description="Diga-nos o que procura e recebemos a sua mensagem em minutos. Sem compromisso, sem complicações."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Canais */}
          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border border-border bg-ink p-6 text-white">
              <MessageCircle className="size-8 text-gold" />
              <h2 className="mt-4 text-xl font-semibold">
                A forma mais rápida é o WhatsApp
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Fale directamente com a nossa equipa e comece a sua encomenda
                hoje mesmo.
              </p>
              <WhatsAppLink
                message={generalEnquiryMessage()}
                variant="cta"
                size="xl"
                className="mt-5 w-full"
              >
                <MessageCircle />
                Falar no WhatsApp
              </WhatsAppLink>
            </div>

            <dl className="grid gap-5 sm:grid-cols-2">
              {channels.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <>
                    <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon className="size-4 text-gold-strong" />
                      {c.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink">
                      {c.value}
                    </dd>
                  </>
                );
                return (
                  <div
                    key={c.label}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="block transition-opacity hover:opacity-80"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Formulário */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <h2 className="text-xl font-semibold text-ink">Envie uma mensagem</h2>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">
              Preencha e falamos consigo o mais breve possível.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
