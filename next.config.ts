import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
