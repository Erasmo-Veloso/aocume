import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O cliente Prisma é gerado em src/generated/prisma (pasta personalizada).
  // O motor de consultas (.so.node) é carregado dinamicamente, por isso o
  // tracing do Next não o deteta — é preciso incluí-lo no bundle das funções,
  // senão dá "Query Engine not found for rhel-openssl-3.0.x" na Vercel.
  outputFileTracingIncludes: {
    "/**": ["./src/generated/prisma/**/*"],
  },
  images: {
    // As imagens são servidas pelo CDN do Unsplash, já dimensionadas via query
    // params (ver unsplashSrc). Dispensamos o optimizador do Next para evitar
    // o custo de re-descarregar e reprocessar cada imagem no servidor.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
