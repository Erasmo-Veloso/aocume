"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Boxes,
  Tag,
  Star,
  MessageSquare,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Início", icon: LayoutDashboard },
  { href: "/produtos", label: "Produtos", icon: Package },
  { href: "/pacotes", label: "Pacotes", icon: Boxes },
  { href: "/categorias", label: "Categorias", icon: Tag },
  { href: "/testemunhos", label: "Testemunhos", icon: Star },
  { href: "/mensagens", label: "Mensagens", icon: MessageSquare },
  { href: "/definicoes", label: "Definições", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
