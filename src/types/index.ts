export type ProductType = "ORDER" | "READY_STOCK";
export type PaymentType = "PARTIAL" | "FULL";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Product {
  id: string;
  reference: string; // código de manifesto, ex.: AOC-0428
  categorySlug: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number | null; // AOA; null = "sob consulta"
  productType: ProductType;
  paymentType: PaymentType;
  minimumQuantity: number;
  deliveryTime: string; // ex.: "18–25 dias"
  featured: boolean;
  /** Cor de fundo para o marcador visual quando não há fotografia. */
  swatch: string;
  /** URL da fotografia do produto (Supabase Storage), quando existir. */
  image?: string | null;
}

export interface Testimonial {
  id: string;
  clientName: string;
  position: string;
  content: string;
  featured: boolean;
  initials: string;
}

export interface Service {
  id: string;
  icon: string; // nome do ícone Lucide
  title: string;
  description: string;
}

export type ProfitBasis = "GROSS" | "NET";

export interface PackageItem {
  label: string;
  quantity?: string;
}

export interface BusinessPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  imageBase: string; // URL base do Unsplash (ver data/images.ts)
  investment: number; // em AOA
  items: PackageItem[];
  profitMargin: string; // ex.: "40–50%"
  estimatedReturn: string; // ex.: "≈ 320.000 Kz por ciclo"
  profitBasis: ProfitBasis;
  ctaLabel: string; // texto do botão de acção (configurável)
  featured: boolean;
  order: number;
}
