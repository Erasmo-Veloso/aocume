import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsappFloating } from "@/components/whatsapp-floating";
import { SITE } from "@/lib/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Importação da China para Angola`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "importação",
    "China",
    "Angola",
    "sourcing",
    "consultoria de importação",
    "encomendas da China",
    "fornecedores chineses",
    "AOCUME",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "pt_AO",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Importação da China para Angola`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Importação da China para Angola`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-AO"
      className={`${poppins.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappFloating />
      </body>
    </html>
  );
}
