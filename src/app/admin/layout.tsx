import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel · AOCUME",
  robots: { index: false, follow: false },
};

// Casca base do painel administrativo (subdomínio admin).
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-surface">{children}</div>;
}
