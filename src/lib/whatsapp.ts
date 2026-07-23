import { formatPrice } from "@/lib/format";

/**
 * Constrói um link wa.me com mensagem pré-preenchida.
 * O número vem das definições do site (BD) — ver getContact()/useSiteSettings().
 */
export function waLink(whatsapp: string, message?: string): string {
  const base = `https://wa.me/${whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Mensagem genérica para o CTA principal. */
export function generalEnquiryMessage(): string {
  return "Olá, AOCUME! Gostaria de saber mais sobre os vossos serviços de importação.";
}

/** Mensagem específica de um produto. */
export function productEnquiryMessage(product: {
  title: string;
  reference: string;
}): string {
  return `Olá, AOCUME! Tenho interesse no produto "${product.title}" (Ref. ${product.reference}). Podem enviar-me mais informações?`;
}

/**
 * Mensagem de um Pacote de Negócio. Transporta o nome, o valor do investimento
 * e o ID do pacote — o payload que o fluxo n8n precisa de identificar.
 */
export function packageEnquiryMessage(pkg: {
  id: string;
  name: string;
  investment: number;
  ctaLabel: string;
}): string {
  return (
    `Olá, AOCUME! Tenho interesse no pacote de negócio *${pkg.name}* ` +
    `(ID: ${pkg.id} · Investimento: ${formatPrice(pkg.investment)}). ` +
    `Quero ${pkg.ctaLabel.toLowerCase()} e receber o plano detalhado para alcançar o lucro.`
  );
}
