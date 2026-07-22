/**
 * Catálogo de imagens do site.
 *
 * As fotografias são do Unsplash (licença livre, hotlink permitido via CDN),
 * escolhidas a partir das descrições de docs/assets.md. São imagens de
 * substituição (stock) — devem ser trocadas por fotografias reais da AOCUME
 * (contentores, porto, produtos, escritório, clientes e Santiago Mulonga)
 * quando disponíveis.
 *
 * `unsplashSrc()` acrescenta parâmetros de dimensionamento/compressão ao URL
 * base para não servir o original em resolução máxima.
 */

export function unsplashSrc(base: string, width = 1200): string {
  return `${base}?auto=format&fit=crop&w=${width}&q=70`;
}

export interface SiteImage {
  base: string;
  alt: string;
}

// Hero — empresário/porto em ambiente de comércio internacional (assets.md · Hero)
export const HERO_IMAGE: SiteImage = {
  base: "https://images.unsplash.com/photo-1678182451047-196f22a4143e",
  alt: "Porto marítimo africano com contentores prontos para importação",
};

// Serviços (assets.md · Serviços)
export const SERVICE_IMAGES: Record<string, SiteImage> = {
  importacao: {
    base: "https://images.unsplash.com/photo-1601311852860-1d8f42381551",
    alt: "Navio porta-contentores a chegar ao porto",
  },
  consultoria: {
    base: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e",
    alt: "Reunião de negócios numa sala de reuniões",
  },
  mentoria: {
    base: "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52",
    alt: "Sessão de mentoria entre dois profissionais",
  },
  treinamentos: {
    base: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    alt: "Sala de formação com empreendedores",
  },
  intermediacao: {
    base: "https://images.unsplash.com/photo-1758599543152-a73184816eba",
    alt: "Aperto de mão entre parceiros de negócio",
  },
  produtos: {
    base: "https://images.unsplash.com/photo-1684695749267-233af13276d0",
    alt: "Prateleiras de armazém com produtos importados",
  },
};

// Galeria — fotos reais (assets.md · Galeria)
export interface GalleryImage extends SiteImage {
  caption: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    base: "https://images.unsplash.com/photo-1578575437130-527eed3abbec",
    alt: "Contentores de carga empilhados num navio",
    caption: "Contentores · carga marítima",
  },
  {
    base: "https://images.unsplash.com/photo-1673896493356-6684ede37a7d",
    alt: "Gruas de um porto marítimo movimentam contentores",
    caption: "Porto de destino",
  },
  {
    base: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866",
    alt: "Prateleiras de armazém cheias de caixas de produtos",
    caption: "Produtos em armazém",
  },
  {
    base: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
    alt: "Escritório moderno da equipa",
    caption: "O nosso escritório",
  },
  {
    base: "https://images.unsplash.com/photo-1739298061766-e2751d92e9db",
    alt: "Equipa de profissionais a colaborar",
    caption: "Clientes e parceiros",
  },
];

// Retrato do fundador — substituir pela fotografia real de Santiago Mulonga
export const FOUNDER_IMAGE: SiteImage = {
  base: "https://images.unsplash.com/photo-1621973133111-63649acea55a",
  alt: "Retrato de Santiago Mulonga, fundador da AOCUME",
};
