import type { BusinessPackage } from "@/types";
import { PACKAGE_IMAGES } from "@/data/images";

/**
 * Pacotes de Negócio — oportunidades de investimento estruturadas.
 *
 * Cada pacote mostra o *quê* (investimento, itens incluídos e lucro estimado)
 * como um modelo de negócio a seguir. O *como* (plano detalhado para alcançar
 * o lucro) é entregue por consulta via WhatsApp.
 *
 * Dados de demonstração da v1.0. Na v2 passam a vir da API (/api/packages) e a
 * ser geridos no painel administrativo. Valores em AOA — estimativas.
 */
export const PACKAGES: BusinessPackage[] = [
  {
    id: "PKG-ACS-01",
    slug: "acessorios-de-telemovel",
    name: "Acessórios de Telemóvel",
    tagline:
      "Comece pequeno, com alta rotação de venda. Ideal para um primeiro negócio ou quiosque.",
    imageBase: PACKAGE_IMAGES.acessorios,
    investment: 450000,
    items: [
      { label: "Capas variadas", quantity: "50 un." },
      { label: "Películas de vidro temperado", quantity: "40 un." },
      { label: "Carregadores rápidos", quantity: "30 un." },
      { label: "Cabos USB-C / Lightning", quantity: "30 un." },
      { label: "Auriculares", quantity: "20 un." },
    ],
    profitMargin: "45–55%",
    estimatedReturn: "≈ 220.000 Kz por ciclo",
    profitBasis: "GROSS",
    ctaLabel: "Iniciar Projecto",
    featured: true,
    order: 1,
  },
  {
    id: "PKG-COS-02",
    slug: "loja-de-cosmeticos",
    name: "Loja de Cosméticos & Beleza",
    tagline:
      "Um sector de procura constante. Monte a sua loja de beleza com stock inicial completo.",
    imageBase: PACKAGE_IMAGES.cosmeticos,
    investment: 700000,
    items: [
      { label: "Cosméticos variados", quantity: "sortido" },
      { label: "Produtos capilares", quantity: "sortido" },
      { label: "Secadores profissionais", quantity: "10 un." },
      { label: "Cremes e cuidado da pele", quantity: "sortido" },
      { label: "Expositor de balcão", quantity: "1 un." },
    ],
    profitMargin: "40–50%",
    estimatedReturn: "≈ 320.000 Kz por ciclo",
    profitBasis: "GROSS",
    ctaLabel: "Receber Detalhes",
    featured: true,
    order: 2,
  },
  {
    id: "PKG-ELE-03",
    slug: "negocio-de-electronica",
    name: "Negócio de Electrónica",
    tagline:
      "Produtos de alto valor e forte margem. Para quem quer escalar no retalho de tecnologia.",
    imageBase: PACKAGE_IMAGES.electronica,
    investment: 1200000,
    items: [
      { label: "Smartphones", quantity: "20 un." },
      { label: "Auriculares Bluetooth (TWS)", quantity: "30 un." },
      { label: "Power banks", quantity: "15 un." },
      { label: "Colunas Bluetooth", quantity: "10 un." },
      { label: "Material de exposição", quantity: "1 conj." },
    ],
    profitMargin: "35–45%",
    estimatedReturn: "≈ 480.000 Kz por ciclo",
    profitBasis: "GROSS",
    ctaLabel: "Solicitar Cotação",
    featured: true,
    order: 3,
  },
  {
    id: "PKG-SOL-04",
    slug: "revenda-de-energia-solar",
    name: "Revenda de Energia Solar",
    tagline:
      "Resolva um problema real de Angola e ganhe com isso. Negócio de ticket alto e grande procura.",
    imageBase: PACKAGE_IMAGES.solar,
    investment: 2500000,
    items: [
      { label: "Kits solares residenciais 3kW", quantity: "5 un." },
      { label: "Baterias de reserva (lítio)", quantity: "5 un." },
      { label: "Material de instalação", quantity: "1 conj." },
      { label: "Ferramentas básicas", quantity: "1 conj." },
    ],
    profitMargin: "30–40%",
    estimatedReturn: "≈ 850.000 Kz por ciclo",
    profitBasis: "GROSS",
    ctaLabel: "Iniciar Projecto",
    featured: true,
    order: 4,
  },
  {
    id: "PKG-MOD-05",
    slug: "moda-e-vestuario",
    name: "Moda & Vestuário",
    tagline:
      "Renove o stock todas as estações. Um clássico do comércio, com margens fortes.",
    imageBase: PACKAGE_IMAGES.moda,
    investment: 900000,
    items: [
      { label: "Peças de vestuário", quantity: "100 un." },
      { label: "Calçado", quantity: "40 pares" },
      { label: "Acessórios de moda", quantity: "sortido" },
      { label: "Araras e expositores", quantity: "1 conj." },
    ],
    profitMargin: "45–55%",
    estimatedReturn: "≈ 430.000 Kz por ciclo",
    profitBasis: "GROSS",
    ctaLabel: "Receber Detalhes",
    featured: false,
    order: 5,
  },
  {
    id: "PKG-MIN-06",
    slug: "mini-mercado-utilidades",
    name: "Mini-Mercado & Utilidades",
    tagline:
      "Monte um ponto de venda de bairro com utilidades domésticas e electrodomésticos.",
    imageBase: PACKAGE_IMAGES.minimercado,
    investment: 1500000,
    items: [
      { label: "Arca congeladora", quantity: "1 un." },
      { label: "Pequenos electrodomésticos", quantity: "sortido" },
      { label: "Utilidades domésticas", quantity: "sortido" },
      { label: "Prateleiras", quantity: "1 conj." },
      { label: "Stock inicial variado", quantity: "1 conj." },
    ],
    profitMargin: "30–40%",
    estimatedReturn: "≈ 500.000 Kz por ciclo",
    profitBasis: "GROSS",
    ctaLabel: "Solicitar Cotação",
    featured: false,
    order: 6,
  },
];

export function getFeaturedPackages(): BusinessPackage[] {
  return PACKAGES.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getPackageBySlug(slug: string): BusinessPackage | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function getOtherPackages(
  current: BusinessPackage,
  limit = 3
): BusinessPackage[] {
  return PACKAGES.filter((p) => p.id !== current.id).slice(0, limit);
}
