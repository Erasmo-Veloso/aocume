import type { Product } from "@/types";

/**
 * Catálogo de demonstração da v1.0.
 * Na v2 estes dados passam a ser servidos pela API (/api/products).
 */
export const PRODUCTS: Product[] = [
  {
    id: "p-0428",
    reference: "AOC-0428",
    categorySlug: "electronica",
    title: "Smartphone 6.7\" 128GB (lote)",
    slug: "smartphone-67-128gb",
    shortDescription:
      "Telemóveis Android desbloqueados, prontos para revenda. Ecrã 6.7\", 128GB.",
    description:
      "Lote de smartphones Android desbloqueados, com ecrã de 6.7 polegadas, 128GB de armazenamento e câmara tripla. Ideais para revenda em Angola, com margem confortável. Fornecemos amostra antes do fecho da encomenda e verificamos a qualidade na origem, na China, antes do envio.",
    price: null,
    productType: "ORDER",
    paymentType: "PARTIAL",
    minimumQuantity: 20,
    deliveryTime: "22–30 dias",
    featured: true,
    swatch: "#1f2937",
  },
  {
    id: "p-0431",
    reference: "AOC-0431",
    categorySlug: "electronica",
    title: "Auriculares Bluetooth TWS",
    slug: "auriculares-bluetooth-tws",
    shortDescription:
      "Auriculares sem fios com caixa de carregamento. Excelente rotação de venda.",
    description:
      "Auriculares Bluetooth TWS com caixa de carregamento, cancelamento de ruído básico e autonomia de até 5 horas. Produto de alta rotação no mercado angolano. Embalagem individual pronta para prateleira.",
    price: 8500,
    productType: "READY_STOCK",
    paymentType: "FULL",
    minimumQuantity: 10,
    deliveryTime: "Disponível em Luanda",
    featured: true,
    swatch: "#0ea5e9",
  },
  {
    id: "p-0512",
    reference: "AOC-0512",
    categorySlug: "energia-solar",
    title: "Kit Solar Residencial 3kW",
    slug: "kit-solar-residencial-3kw",
    shortDescription:
      "Painéis, inversor e bateria de lítio para uma habitação média.",
    description:
      "Kit solar completo de 3kW: painéis monocristalinos, inversor híbrido e bateria de lítio LiFePO4. Concebido para responder à instabilidade da rede eléctrica em Angola. Inclui esquema de instalação e apoio técnico à distância.",
    price: null,
    productType: "ORDER",
    paymentType: "PARTIAL",
    minimumQuantity: 1,
    deliveryTime: "28–40 dias",
    featured: true,
    swatch: "#f59e0b",
  },
  {
    id: "p-0520",
    reference: "AOC-0520",
    categorySlug: "casa-electrodomesticos",
    title: "Arca Congeladora 200L",
    slug: "arca-congeladora-200l",
    shortDescription: "Arca horizontal 200L, baixo consumo, ideal para negócio.",
    description:
      "Arca congeladora horizontal de 200 litros, classe energética A+, com fecho e dreno. Muito procurada por pequenos comércios e restaurantes. Importada por encomenda com garantia de origem.",
    price: null,
    productType: "ORDER",
    paymentType: "PARTIAL",
    minimumQuantity: 2,
    deliveryTime: "30–45 dias",
    featured: false,
    swatch: "#64748b",
  },
  {
    id: "p-0533",
    reference: "AOC-0533",
    categorySlug: "construcao",
    title: "Berbequim de Impacto 850W",
    slug: "berbequim-de-impacto-850w",
    shortDescription:
      "Ferramenta profissional com mala e conjunto de brocas.",
    description:
      "Berbequim de impacto profissional de 850W, com velocidade variável, mala rígida e conjunto de brocas para betão, madeira e metal. Robusto para uso intensivo em obra.",
    price: 24000,
    productType: "READY_STOCK",
    paymentType: "FULL",
    minimumQuantity: 5,
    deliveryTime: "Disponível em Luanda",
    featured: false,
    swatch: "#dc2626",
  },
  {
    id: "p-0547",
    reference: "AOC-0547",
    categorySlug: "beleza-cuidado",
    title: "Secador Profissional 2200W",
    slug: "secador-profissional-2200w",
    shortDescription:
      "Secador iónico para salões e revenda. Motor de longa duração.",
    description:
      "Secador de cabelo profissional de 2200W com tecnologia iónica, três níveis de temperatura e concentrador. Preferido por salões de beleza e cabeleireiros. Importado por encomenda com controlo de qualidade na origem.",
    price: null,
    productType: "ORDER",
    paymentType: "PARTIAL",
    minimumQuantity: 10,
    deliveryTime: "22–30 dias",
    featured: true,
    swatch: "#db2777",
  },
  {
    id: "p-0558",
    reference: "AOC-0558",
    categorySlug: "electronica",
    title: "Power Bank 20.000mAh",
    slug: "power-bank-20000mah",
    shortDescription:
      "Bateria externa com carregamento rápido e ecrã de nível.",
    description:
      "Power bank de 20.000mAh com carregamento rápido (PD 22.5W), duas saídas USB e ecrã de nível de carga. Essencial num mercado com cortes frequentes de energia. Pronto para revenda.",
    price: 12000,
    productType: "READY_STOCK",
    paymentType: "FULL",
    minimumQuantity: 10,
    deliveryTime: "Disponível em Luanda",
    featured: false,
    swatch: "#16a34a",
  },
  {
    id: "p-0571",
    reference: "AOC-0571",
    categorySlug: "casa-electrodomesticos",
    title: "Máquina de Costura Doméstica",
    slug: "maquina-de-costura-domestica",
    shortDescription:
      "Máquina compacta com 12 pontos, ideal para pequenos negócios.",
    description:
      "Máquina de costura doméstica compacta com 12 tipos de ponto, iluminação LED e pedal. Muito procurada por costureiras e pequenos ateliers. Importada por encomenda.",
    price: null,
    productType: "ORDER",
    paymentType: "PARTIAL",
    minimumQuantity: 3,
    deliveryTime: "28–40 dias",
    featured: false,
    swatch: "#7c3aed",
  },
];

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, limit);
}
