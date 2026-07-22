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
  /** Cor de fundo para o marcador visual do produto (sem fotografias reais na v1). */
  swatch: string;
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
