/**
 * Configuração central do site.
 *
 * NOTA: os contactos abaixo são valores de referência. Substitua o número de
 * WhatsApp, o e-mail e as redes sociais pelos dados reais da AOCUME antes de
 * publicar. Na v2 estes valores passarão a vir de SiteSettings (base de dados).
 */
export const SITE = {
  name: "AOCUME",
  legalName: "AOCUME — Consultoria e Importação",
  description:
    "A AOCUME liga empreendedores angolanos a fabricantes na China. Sourcing, importação e consultoria com acompanhamento do início ao fim.",
  url: "https://aocume.co.ao",

  // Contactos (substituir pelos reais)
  whatsapp: "244923000000", // formato internacional, só dígitos
  phoneDisplay: "+244 923 000 000",
  email: "geral@aocume.co.ao",
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
