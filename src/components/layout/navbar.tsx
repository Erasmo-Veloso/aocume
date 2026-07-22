"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/site";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/link-button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao mudar de página.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/90 backdrop-blur transition-shadow",
        scrolled ? "border-border shadow-sm" : "border-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-ink"
                  : "text-muted-foreground hover:text-ink"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <LinkButton href={generalEnquiryLink()} external variant="cta" size="lg">
            <MessageCircle />
            WhatsApp
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-muted text-ink"
                    : "text-muted-foreground hover:bg-muted hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
            <LinkButton
              href={generalEnquiryLink()}
              external
              variant="cta"
              size="xl"
              className="mt-2 w-full"
            >
              <MessageCircle />
              Falar no WhatsApp
            </LinkButton>
          </Container>
        </div>
      )}
    </header>
  );
}
