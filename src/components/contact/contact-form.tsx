"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/whatsapp";
import { useSiteSettings } from "@/components/site-settings";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Formulário de contacto da v1.
 *
 * O canal de conversão da v1.0 é o WhatsApp: ao enviar, os dados são
 * compostos numa mensagem e abre-se a conversa. Quando o endpoint
 * POST /api/contact (ver docs/api.md) estiver disponível, pode passar a
 * gravar-se a mensagem na base de dados em paralelo.
 */
export function ContactForm() {
  const { whatsapp } = useSiteSettings();
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: {
    name: string;
    email: string;
    message: string;
  }): Errors {
    const next: Errors = {};
    if (!data.name.trim()) next.name = "Indique o seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "Indique um e-mail válido.";
    if (data.message.trim().length < 10)
      next.message = "Escreva pelo menos 10 caracteres.";
    return next;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const text =
      `Olá, AOCUME! O meu nome é ${data.name}.\n` +
      (data.subject ? `Assunto: ${data.subject}\n` : "") +
      `\n${data.message}\n\n` +
      `Contactos: ${data.email}` +
      (data.phone ? ` · ${data.phone}` : "");

    window.open(waLink(whatsapp, text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" htmlFor="name" error={errors.name} required>
          <Input
            id="name"
            name="name"
            placeholder="O seu nome"
            aria-invalid={!!errors.name}
            autoComplete="name"
          />
        </Field>
        <Field label="E-mail" htmlFor="email" error={errors.email} required>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="voce@email.com"
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefone" htmlFor="phone">
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+244 …"
            autoComplete="tel"
          />
        </Field>
        <Field label="Assunto" htmlFor="subject">
          <Input id="subject" name="subject" placeholder="Ex.: Importar electrónica" />
        </Field>
      </div>

      <Field label="Mensagem" htmlFor="message" error={errors.message} required>
        <Textarea
          id="message"
          name="message"
          placeholder="Diga-nos o que procura importar…"
          aria-invalid={!!errors.message}
        />
      </Field>

      <Button type="submit" variant="cta" size="xl" className="w-full sm:w-auto">
        <Send />
        Enviar mensagem
      </Button>
      <p className="text-xs text-muted-foreground">
        Ao enviar, abrimos o WhatsApp com a sua mensagem pronta a seguir.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
