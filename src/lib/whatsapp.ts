import { SITE } from "@/lib/site";

/**
 * Constrói um link wa.me com mensagem pré-preenchida.
 * O comportamento de conversão de toda a plataforma assenta neste helper.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Mensagem genérica para o CTA principal. */
export function generalEnquiryLink(): string {
  return whatsappLink(
    `Olá, AOCUME! Gostaria de saber mais sobre os vossos serviços de importação.`
  );
}

/** Mensagem específica de um produto, usada nos cartões e na página de detalhe. */
export function productEnquiryLink(product: {
  title: string;
  reference: string;
}): string {
  return whatsappLink(
    `Olá, AOCUME! Tenho interesse no produto "${product.title}" (Ref. ${product.reference}). Podem enviar-me mais informações?`
  );
}
