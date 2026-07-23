"use client";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useSiteSettings } from "@/components/site-settings";
import { waLink } from "@/lib/whatsapp";

type Props = {
  /** Mensagem pré-preenchida (sem número — o número vem das definições). */
  message?: string;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Link/botão de WhatsApp que usa o número das definições do site (BD, via
 * contexto). Funciona em componentes de servidor e de cliente. Se `variant`
 * for definido, aplica o estilo de botão; caso contrário usa apenas className.
 */
export function WhatsAppLink({
  message,
  variant,
  size,
  className,
  children,
  ...props
}: Props) {
  const { whatsapp } = useSiteSettings();
  const styled =
    variant || size ? cn(buttonVariants({ variant, size }), className) : className;

  return (
    <a
      href={waLink(whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={styled}
      {...props}
    >
      {children}
    </a>
  );
}
