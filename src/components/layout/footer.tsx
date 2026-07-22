import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

import { SITE, NAV_LINKS } from "@/lib/site";
import { CATEGORIES } from "@/data/categories";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/layout/container";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/social";

const socialLinks = [
  { icon: FacebookIcon, href: SITE.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: SITE.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: SITE.social.linkedin, label: "LinkedIn" },
].filter((s) => s.href);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain bg-ink text-white/70">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo onDark withTagline />
            <p className="max-w-xs text-sm leading-relaxed">
              Importação e consultoria que ligam empreendedores angolanos a
              fabricantes na China — com acompanhamento do início ao fim.
            </p>
            <div className="mt-2 flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navegação" className="flex flex-col gap-3">
            <h3 className="eyebrow text-white/50">Navegação</h3>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Categorias" className="flex flex-col gap-3">
            <h3 className="eyebrow text-white/50">Categorias</h3>
            {CATEGORIES.slice(0, 5).map((cat) => (
              <Link
                key={cat.slug}
                href={`/encomendas?categoria=${cat.slug}`}
                className="text-sm transition-colors hover:text-gold"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="eyebrow text-white/50">Contacto</h3>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors hover:text-gold"
            >
              <Phone className="size-4 shrink-0 text-gold" />
              {SITE.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 text-sm transition-colors hover:text-gold"
            >
              <Mail className="size-4 shrink-0 text-gold" />
              {SITE.email}
            </a>
            <p className="flex items-center gap-3 text-sm">
              <MapPin className="size-4 shrink-0 text-gold" />
              {SITE.address}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.legalName}. Todos os direitos reservados.
          </p>
          <p className="font-mono tracking-wide">
            Luanda · China — comércio com confiança
          </p>
        </div>
      </Container>
    </footer>
  );
}
