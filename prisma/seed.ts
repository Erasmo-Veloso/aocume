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

// ── Testemunhos ──────────────────────────────────────────────────
const testimonials = [
  { clientName: "Domingas Faria", position: "Comércio de electrónica · Luanda", content: "Importei o meu primeiro lote de telemóveis com a AOCUME sem nunca ter saído de Luanda. Explicaram cada passo e a mercadoria chegou como combinado.", featured: true },
  { clientName: "Nelson Cabral", position: "Instalador de energia solar · Benguela", content: "Precisava de kits solares fiáveis e a preço competitivo. A equipa verificou o fornecedor na origem e poupei bastante.", featured: true },
  { clientName: "Aline Sebastião", position: "Salão de beleza · Huambo", content: "O acompanhamento pelo WhatsApp fez toda a diferença. Respondiam sempre e senti confiança para avançar.", featured: true },
  { clientName: "Paulo Kiala", position: "Retalhista · Lubango", content: "Fiz a formação e hoje faço as minhas próprias encomendas. O melhor investimento que fiz este ano.", featured: false },
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
  await prisma.testimonial.createMany({ data: testimonials as unknown as [] });
  console.log(`  ✔ ${testimonials.length} testemunhos`);

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
