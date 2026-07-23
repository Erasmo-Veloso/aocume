/**
 * Configuração central do site.
 *
 * NOTA: os contactos abaixo são valores de referência. Substitua o número de
 * WhatsApp, o e-mail e as redes sociais pelos dados reais da AOCUME antes de
 * publicar. Na v2 estes valores passarão a vir de SiteSettings (base de dados).
 */

/**
 * URL público do site, usado nos metadados (canónicos, Open Graph, sitemap).
 * Prioridade: NEXT_PUBLIC_SITE_URL → URL de produção da Vercel → aocume.com.
 * Assim o OG funciona no vercel.app antes do domínio próprio estar activo.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "https://aocume.com";
}

export const SITE = {
  name: "AOCUME",
  legalName: "AOCUME — Comércio Internacional",
  description:
    "A AOCUME liga empreendedores angolanos a fabricantes na China. Sourcing, importação e consultoria com acompanhamento do início ao fim.",
  url: resolveSiteUrl(),

  // Contactos (substituir pelos reais)
  whatsapp: "244923000000", // formato internacional, só dígitos
  phoneDisplay: "+244 923 000 000",
  email: "geral@aocume.com",
  address: "Luanda, Angola",

  founder: "Santiago Mulonga",

  social: {
    facebook: "https://facebook.com/aocume",
    instagram: "https://instagram.com/aocume",
    linkedin: "https://linkedin.com/company/aocume",
    youtube: "",
  },
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Pacotes", href: "/pacotes" },
  { label: "Encomendas", href: "/encomendas" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contacto", href: "/contacto" },
] as const;
