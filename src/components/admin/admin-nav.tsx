"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Boxes,
  Tag,
  Star,
  Newspaper,
  MessageSquare,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Início", icon: LayoutDashboard },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/pacotes", label: "Pacotes", icon: Boxes },
  { href: "/admin/categorias", label: "Categorias", icon: Tag },
  { href: "/admin/testemunhos", label: "Testemunhos", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/mensagens", label: "Mensagens", icon: MessageSquare },
  { href: "/admin/definicoes", label: "Definições", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav className="flex flex-col gap-1" aria-label="Navegação do painel">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(link.href)
                ? "bg-ink text-white"
                : "text-muted-foreground hover:bg-muted hover:text-ink"
            )}
          >
            <Icon className="size-4.5" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
