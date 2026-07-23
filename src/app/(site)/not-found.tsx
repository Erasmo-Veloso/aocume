import { Home, PackageSearch } from "lucide-react";

import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <span className="eyebrow text-gold-strong">Erro 404</span>
      <h1 className="text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Esta página não foi encontrada
      </h1>
      <p className="max-w-md text-pretty text-muted-foreground">
        O caminho que procurava não existe ou foi movido. Volte ao início ou
        explore o nosso catálogo de produtos.
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/" variant="cta" size="xl">
          <Home />
          Voltar ao início
        </LinkButton>
        <LinkButton href="/encomendas" size="xl" variant="outline">
          <PackageSearch />
          Ver produtos
        </LinkButton>
      </div>
    </Container>
  );
}
