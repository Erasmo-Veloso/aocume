import "dotenv/config";
import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

// ── Administrador ────────────────────────────────────────────────
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@aocume.co.ao";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Aocume@2026";

// ── Categorias ───────────────────────────────────────────────────
const categories = [
  { name: "Electrónica", slug: "electronica", description: "Telemóveis, acessórios e equipamento electrónico." },
  { name: "Casa & Electrodomésticos", slug: "casa-electrodomesticos", description: "Equipamento para casa, cozinha e conforto." },
  { name: "Energia Solar", slug: "energia-solar", description: "Painéis, baterias e soluções de energia autónoma." },
  { name: "Construção", slug: "construcao", description: "Ferramentas e materiais para obra." },
  { name: "Beleza & Cuidado", slug: "beleza-cuidado", description: "Produtos de estética, cabelo e cuidado pessoal." },
];

// ── Produtos ─────────────────────────────────────────────────────
const products = [
  { reference: "AOC-0428", categorySlug: "electronica", title: 'Smartphone 6.7" 128GB (lote)', slug: "smartphone-67-128gb", shortDescription: "Telemóveis Android desbloqueados, prontos para revenda.", description: "Lote de smartphones Android desbloqueados, ecrã 6.7\", 128GB, câmara tripla. Amostra antes do fecho e verificação de qualidade na origem.", price: null, productType: "ORDER", paymentType: "PARTIAL", minimumQuantity: 20, deliveryTime: "22–30 dias", featured: true },
  { reference: "AOC-0431", categorySlug: "electronica", title: "Auriculares Bluetooth TWS", slug: "auriculares-bluetooth-tws", shortDescription: "Auriculares sem fios com caixa de carregamento.", description: "Auriculares Bluetooth TWS com caixa de carregamento e autonomia até 5 horas. Alta rotação de venda.", price: 8500, productType: "READY_STOCK", paymentType: "FULL", minimumQuantity: 10, deliveryTime: "Disponível em Luanda", featured: true },
  { reference: "AOC-0512", categorySlug: "energia-solar", title: "Kit Solar Residencial 3kW", slug: "kit-solar-residencial-3kw", shortDescription: "Painéis, inversor e bateria de lítio para uma habitação média.", description: "Kit solar completo de 3kW: painéis monocristalinos, inversor híbrido e bateria LiFePO4. Inclui esquema de instalação.", price: null, productType: "ORDER", paymentType: "PARTIAL", minimumQuantity: 1, deliveryTime: "28–40 dias", featured: true },
  { reference: "AOC-0533", categorySlug: "construcao", title: "Berbequim de Impacto 850W", slug: "berbequim-de-impacto-850w", shortDescription: "Ferramenta profissional com mala e conjunto de brocas.", description: "Berbequim de impacto profissional de 850W, velocidade variável, mala rígida e brocas para betão, madeira e metal.", price: 24000, productType: "READY_STOCK", paymentType: "FULL", minimumQuantity: 5, deliveryTime: "Disponível em Luanda", featured: false },
  { reference: "AOC-0547", categorySlug: "beleza-cuidado", title: "Secador Profissional 2200W", slug: "secador-profissional-2200w", shortDescription: "Secador iónico para salões e revenda.", description: "Secador de cabelo profissional de 2200W, tecnologia iónica, três níveis de temperatura e concentrador.", price: null, productType: "ORDER", paymentType: "PARTIAL", minimumQuantity: 10, deliveryTime: "22–30 dias", featured: true },
  { reference: "AOC-0558", categorySlug: "electronica", title: "Power Bank 20.000mAh", slug: "power-bank-20000mah", shortDescription: "Bateria externa com carregamento rápido e ecrã de nível.", description: "Power bank de 20.000mAh, carregamento rápido PD 22.5W, duas saídas USB e ecrã de nível de carga.", price: 12000, productType: "READY_STOCK", paymentType: "FULL", minimumQuantity: 10, deliveryTime: "Disponível em Luanda", featured: false },
] as const;

// ── Pacotes de Negócio ───────────────────────────────────────────
const packages = [
  { name: "Acessórios de Telemóvel", slug: "acessorios-de-telemovel", tagline: "Comece pequeno, com alta rotação de venda. Ideal para um primeiro negócio ou quiosque.", image: "https://images.unsplash.com/photo-1620786963525-4a74f1697a46", investment: 450000, profitMargin: "45–55%", estimatedReturn: "≈ 220.000 Kz por ciclo", profitBasis: "GROSS", ctaLabel: "Iniciar Projecto", featured: true, position: 1, items: [["Capas variadas", "50 un."], ["Películas de vidro temperado", "40 un."], ["Carregadores rápidos", "30 un."], ["Cabos USB-C / Lightning", "30 un."], ["Auriculares", "20 un."]] },
  { name: "Loja de Cosméticos & Beleza", slug: "loja-de-cosmeticos", tagline: "Um sector de procura constante. Monte a sua loja de beleza com stock inicial completo.", image: "https://images.unsplash.com/photo-1676570092589-a6c09ecbb373", investment: 700000, profitMargin: "40–50%", estimatedReturn: "≈ 320.000 Kz por ciclo", profitBasis: "GROSS", ctaLabel: "Receber Detalhes", featured: true, position: 2, items: [["Cosméticos variados", "sortido"], ["Produtos capilares", "sortido"], ["Secadores profissionais", "10 un."], ["Cremes e cuidado da pele", "sortido"], ["Expositor de balcão", "1 un."]] },
  { name: "Negócio de Electrónica", slug: "negocio-de-electronica", tagline: "Produtos de alto valor e forte margem. Para quem quer escalar no retalho de tecnologia.", image: "https://images.unsplash.com/photo-1761494296583-99b15e9063c5", investment: 1200000, profitMargin: "35–45%", estimatedReturn: "≈ 480.000 Kz por ciclo", profitBasis: "GROSS", ctaLabel: "Solicitar Cotação", featured: true, position: 3, items: [["Smartphones", "20 un."], ["Auriculares Bluetooth (TWS)", "30 un."], ["Power banks", "15 un."], ["Colunas Bluetooth", "10 un."], ["Material de exposição", "1 conj."]] },
  { name: "Revenda de Energia Solar", slug: "revenda-de-energia-solar", tagline: "Resolva um problema real de Angola e ganhe com isso. Negócio de ticket alto e grande procura.", image: "https://images.unsplash.com/photo-1668097613572-40b7c11c8727", investment: 2500000, profitMargin: "30–40%", estimatedReturn: "≈ 850.000 Kz por ciclo", profitBasis: "GROSS", ctaLabel: "Iniciar Projecto", featured: true, position: 4, items: [["Kits solares residenciais 3kW", "5 un."], ["Baterias de reserva (lítio)", "5 un."], ["Material de instalação", "1 conj."], ["Ferramentas básicas", "1 conj."]] },
  { name: "Moda & Vestuário", slug: "moda-e-vestuario", tagline: "Renove o stock todas as estações. Um clássico do comércio, com margens fortes.", image: "https://images.unsplash.com/photo-1767334010488-83cdb8539273", investment: 900000, profitMargin: "45–55%", estimatedReturn: "≈ 430.000 Kz por ciclo", profitBasis: "GROSS", ctaLabel: "Receber Detalhes", featured: false, position: 5, items: [["Peças de vestuário", "100 un."], ["Calçado", "40 pares"], ["Acessórios de moda", "sortido"], ["Araras e expositores", "1 conj."]] },
  { name: "Mini-Mercado & Utilidades", slug: "mini-mercado-utilidades", tagline: "Monte um ponto de venda de bairro com utilidades domésticas e electrodomésticos.", image: "https://images.unsplash.com/photo-1604719312497-c6fc196f51ec", investment: 1500000, profitMargin: "30–40%", estimatedReturn: "≈ 500.000 Kz por ciclo", profitBasis: "GROSS", ctaLabel: "Solicitar Cotação", featured: false, position: 6, items: [["Arca congeladora", "1 un."], ["Pequenos electrodomésticos", "sortido"], ["Utilidades domésticas", "sortido"], ["Prateleiras", "1 conj."], ["Stock inicial variado", "1 conj."]] },
] as const;

// ── Testemunhos (vídeo + imagem + texto) ─────────────────────────
const V1 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
const V2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

const testimonials = [
  { clientName: "Nelson Cabral", position: "Energia solar · Benguela", content: "Filmei a minha experiência: importei kits solares com a AOCUME e o processo foi transparente do início ao fim.", format: "VIDEO", photo: "https://images.unsplash.com/photo-1650490323009-96fc950a959c", videoUrl: V1, rating: 5, featured: true },
  { clientName: "Domingas Faria", position: "Comércio de electrónica · Luanda", content: "Em vídeo é mais fácil de acreditar: recebi o meu primeiro lote de telemóveis exactamente como combinado.", format: "VIDEO", photo: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074", videoUrl: V2, rating: 5, featured: true },
  { clientName: "Aline Sebastião", position: "Salão de beleza · Huambo", content: "O acompanhamento pelo WhatsApp fez toda a diferença. Hoje o meu salão vende produtos que importei com eles.", format: "IMAGE", photo: "https://images.unsplash.com/photo-1765648684630-ac9c15ac98d5", videoUrl: null, rating: 5, featured: true },
  { clientName: "Paulo Kiala", position: "Retalhista · Lubango", content: "Comecei com um pacote de acessórios e hoje faço as minhas próprias encomendas. Mudou o meu negócio.", format: "IMAGE", photo: "https://images.unsplash.com/photo-1761370571806-886404629697", videoUrl: null, rating: 5, featured: true },
  { clientName: "Kiluanji Manuel", position: "Importador · Cabinda", content: "Já tinha sido enganado com um fornecedor chinês. Com a AOCUME, a mercadoria é verificada antes de sair. Recomendo.", format: "TEXT", photo: null, videoUrl: null, rating: 5, featured: false },
  { clientName: "Beatriz Ndala", position: "Loja de cosméticos · Luanda", content: "Explicaram-me tudo com paciência, mesmo sendo a minha primeira importação. Senti confiança para avançar.", format: "TEXT", photo: null, videoUrl: null, rating: 5, featured: false },
] as const;

// ── Blogue ───────────────────────────────────────────────────────
const IMG = (id: string) => `https://images.unsplash.com/${id}`;
const blogPosts = [
  { slug: "como-importar-da-china-em-6-passos", title: "Como importar da China em 6 passos (sem cometer erros)", excerpt: "Um guia claro do primeiro contacto à entrega em Angola — o mesmo processo que usamos com os nossos clientes.", cover: IMG("photo-1601311852860-1d8f42381551"), category: "Guia", author: "Santiago Mulonga", featured: true, readingMinutes: 7, content: "Importar da China deixou de ser exclusivo das grandes empresas. Com o processo certo, qualquer empreendedor angolano pode trazer produtos com qualidade e boa margem.\n\n## 1. Escolha o produto certo\nComece pela procura do seu mercado, não pelo que é barato na origem.\n\n## 2. Verifique o fornecedor\nConfirme a fábrica, peça amostras e valide certificações antes de pagar.\n\n## 3. Peça a cotação completa\nPreço, quantidade mínima, prazo e condições de pagamento — tudo claro.\n\n## 4. Pague com segurança\nUse um sinal e liquide o restante mediante verificação da mercadoria.\n\n## 5. Transporte e desembaraço\nMarítimo é mais barato, aéreo mais rápido. A documentação tem de estar correcta.\n\n## 6. Receba e comece a vender\nUm bom preço de compra dá-lhe margem para competir." },
  { slug: "quanto-custa-importar-para-angola", title: "Quanto custa realmente importar para Angola?", excerpt: "Para além do preço do produto: frete, desembaraço, taxas e a margem que sobra.", cover: IMG("photo-1673896493356-6684ede37a7d"), category: "Custos", author: "Equipa AOCUME", featured: false, readingMinutes: 6, content: "O preço na fábrica é apenas o início. Para saber se compensa, some todos os custos até à sua loja.\n\n## Os custos que contam\n- Preço do produto (FOB)\n- Transporte internacional\n- Seguro de carga\n- Desembaraço e taxas\n- Transporte interno\n\nSó depois consegue calcular a margem real." },
  { slug: "produtos-com-maior-margem-para-revender", title: "5 produtos com maior margem para revender em Angola", excerpt: "Categorias com procura forte e boa rentabilidade para quem está a começar.", cover: IMG("photo-1587293852726-70cdb56c2866"), category: "Negócio", author: "Santiago Mulonga", featured: false, readingMinutes: 5, content: "Nem todos os produtos dão o mesmo lucro. Estas categorias combinam procura estável com boas margens:\n\n- Acessórios de telemóvel\n- Beleza e cuidado pessoal\n- Pequenos electrodomésticos\n- Energia solar\n- Moda e vestuário\n\nCada uma está disponível como Pacote de Negócio pronto a seguir." },
  { slug: "onde-encontrar-fornecedores-na-china", title: "Alibaba, 1688 ou feiras: onde encontrar fornecedores", excerpt: "As principais formas de encontrar fabricantes na China e como evitar intermediários.", cover: IMG("photo-1606836591695-4d58a73eba1e"), category: "Sourcing", author: "Equipa AOCUME", featured: false, readingMinutes: 6, content: "Encontrar o fornecedor certo é metade do sucesso.\n\n## As opções mais comuns\n- **Alibaba** — grande variedade, ideal para começar\n- **1688** — preços de origem, mas em chinês\n- **Feiras** — contacto directo com fabricantes\n\nO nosso trabalho é chegar ao fabricante real e negociar em seu nome." },
  { slug: "como-evitar-fraudes-ao-importar", title: "Como evitar fraudes ao importar da China", excerpt: "Sinais de alerta e boas práticas para não perder dinheiro com fornecedores duvidosos.", cover: IMG("photo-1758599543152-a73184816eba"), category: "Segurança", author: "Santiago Mulonga", featured: false, readingMinutes: 5, content: "A maioria das fraudes acontece antes do primeiro envio.\n\n## Sinais de alerta\n- Preços muito abaixo do mercado\n- Recusa em fornecer amostras\n- Pagamento só para contas pessoais\n- Pressão para decidir rápido\n\nVerificamos cada fornecedor e a mercadoria na origem." },
  { slug: "do-contentor-a-loja", title: "Do contentor à loja: o percurso da sua encomenda", excerpt: "Uma viagem pelos bastidores da importação — do pagamento à entrega em Angola.", cover: IMG("photo-1578575437130-527eed3abbec"), category: "Logística", author: "Equipa AOCUME", featured: false, readingMinutes: 4, content: "Depois de fechar a encomenda, começa uma operação que acompanhamos de perto.\n\n- Compra e controlo de qualidade na fábrica\n- Consolidação e envio marítimo\n- Chegada ao porto de Luanda e desembaraço\n- Entrega final ao cliente\n\nEm cada etapa, comunicação directa pelo WhatsApp." },
] as const;

async function main() {
  console.log("→ A semear a base de dados AOCUME...");

  // Administrador
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await prisma.administrator.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: { name: "Administrador", email: ADMIN_EMAIL, password: passwordHash },
  });
  console.log(`  ✔ Admin: ${ADMIN_EMAIL}`);

  // Categorias
  const categoryIdBySlug = new Map<string, string>();
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description },
      create: c,
    });
    categoryIdBySlug.set(c.slug, cat.id);
  }
  console.log(`  ✔ ${categories.length} categorias`);

  // Produtos
  for (const p of products) {
    const categoryId = categoryIdBySlug.get(p.categorySlug)!;
    const { categorySlug, ...data } = p;
    void categorySlug;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...data, categoryId },
      create: { ...data, categoryId },
    });
  }
  console.log(`  ✔ ${products.length} produtos`);

  // Pacotes de negócio
  for (const pkg of packages) {
    const { items, ...data } = pkg;
    const saved = await prisma.businessPackage.upsert({
      where: { slug: pkg.slug },
      update: data,
      create: data,
    });
    await prisma.packageItem.deleteMany({ where: { packageId: saved.id } });
    await prisma.packageItem.createMany({
      data: items.map(([label, quantity], i) => ({
        packageId: saved.id,
        label,
        quantity,
        position: i,
      })),
    });
  }
  console.log(`  ✔ ${packages.length} pacotes de negócio`);

  // Testemunhos (recria do zero — sem chave natural)
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: testimonials.map((t) => ({
      clientName: t.clientName,
      position: t.position,
      content: t.content,
      format: t.format,
      photo: t.photo,
      videoUrl: t.videoUrl,
      rating: t.rating,
      featured: t.featured,
    })),
  });
  console.log(`  ✔ ${testimonials.length} testemunhos`);

  // Blogue (upsert por slug)
  for (const p of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        cover: p.cover,
        category: p.category,
        author: p.author,
        content: p.content,
        readingMinutes: p.readingMinutes,
        featured: p.featured,
      },
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        cover: p.cover,
        category: p.category,
        author: p.author,
        content: p.content,
        readingMinutes: p.readingMinutes,
        featured: p.featured,
        published: true,
      },
    });
  }
  console.log(`  ✔ ${blogPosts.length} artigos do blogue`);

  // Definições do site (uma linha)
  const existingSettings = await prisma.siteSettings.findFirst();
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        companyName: "AOCUME",
        email: "geral@aocume.co.ao",
        phone: "+244 923 000 000",
        whatsapp: "244923000000",
        address: "Luanda, Angola",
        heroTitle: "Importe da China com quem trata de tudo por si.",
        heroSubtitle:
          "Sourcing, importação e consultoria com acompanhamento do início ao fim.",
      },
    });
    console.log("  ✔ Definições do site");
  }

  console.log("✅ Seed concluído.");
}

main()
  .catch((e) => {
    console.error("Seed falhou:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
