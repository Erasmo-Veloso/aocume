import Link from "next/link";
import { Package, Boxes, MessageSquare, Star, Tag } from "lucide-react";

import { productService } from "@/services/product-service";
import { packageService } from "@/services/package-service";
import { testimonialService } from "@/services/testimonial-service";
import { contactService } from "@/services/contact-service";
import { categoryService } from "@/services/category-service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [products, packages, testimonials, messages, categories] =
    await Promise.all([
      productService.listPublic({ page: 1, limit: 1 }),
      packageService.listPublic({ page: 1, limit: 1 }),
      testimonialService.list(),
      contactService.list(),
      categoryService.list(),
    ]);

  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { icon: Package, label: "Produtos activos", value: products.total, href: "/produtos" },
    { icon: Boxes, label: "Pacotes activos", value: packages.total, href: "/pacotes" },
    { icon: Tag, label: "Categorias", value: categories.length, href: "/categorias" },
    { icon: Star, label: "Testemunhos", value: testimonials.length, href: "/testemunhos" },
    {
      icon: MessageSquare,
      label: "Mensagens",
      value: messages.length,
      note: unread > 0 ? `${unread} por ler` : undefined,
      href: "/mensagens",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Bem-vindo ao painel
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão geral do conteúdo do site. A gestão detalhada (criar, editar,
          eliminar) chega no próximo passo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="flex items-start justify-between rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-colors hover:border-gold"
            >
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-mono text-3xl font-bold text-ink">
                  {s.value}
                </p>
                {s.note && (
                  <p className="mt-1 text-xs font-medium text-gold-strong">
                    {s.note}
                  </p>
                )}
              </div>
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink text-gold">
                <Icon className="size-5" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl border border-dashed border-border bg-surface p-6">
        <span className="w-full text-sm font-semibold text-ink">Acções rápidas</span>
        <Link
          href="/produtos/novo"
          className="text-sm font-medium text-gold-strong hover:underline"
        >
          + Novo produto
        </Link>
        <span className="text-border">·</span>
        <Link
          href="/pacotes/novo"
          className="text-sm font-medium text-gold-strong hover:underline"
        >
          + Novo pacote
        </Link>
        <span className="text-border">·</span>
        <Link
          href="/categorias"
          className="text-sm font-medium text-gold-strong hover:underline"
        >
          Gerir categorias
        </Link>
      </div>
    </div>
  );
}
