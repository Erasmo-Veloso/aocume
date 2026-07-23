import { SITE } from "@/lib/site";
import { formatPrice } from "@/lib/format";

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

/**
 * Mensagem de um Pacote de Negócio. Transporta o nome, o valor do investimento
 * e o ID do pacote — o payload que o fluxo n8n precisa de identificar (ver
 * docs/api.md · Package Lead).
 */
export function packageEnquiryLink(pkg: {
  id: string;
  name: string;
  investment: number;
  ctaLabel: string;
}): string {
  return whatsappLink(
    `Olá, AOCUME! Tenho interesse no pacote de negócio *${pkg.name}* ` +
      `(ID: ${pkg.id} · Investimento: ${formatPrice(pkg.investment)}). ` +
      `Quero ${pkg.ctaLabel.toLowerCase()} e receber o plano detalhado para alcançar o lucro.`
  );
}
