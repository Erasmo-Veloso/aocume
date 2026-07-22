"use client";

import { useMemo, useState } from "react";
import { Search, PackageX } from "lucide-react";

import type { Product, Category } from "@/types";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/product-card";

export function ProductCatalog({
  products,
  categories,
  initialCategory = "todos",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(initialCategory);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = active === "todos" || p.categorySlug === active;
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, active]);

  const filters = [{ name: "Todos", slug: "todos" }, ...categories];

  return (
    <div className="flex flex-col gap-8">
      {/* Pesquisa */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar produto ou referência…"
          className="pl-11"
          aria-label="Pesquisar produtos"
        />
      </div>

      {/* Filtro de categorias */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
        {filters.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setActive(cat.slug)}
            aria-pressed={active === cat.slug}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === cat.slug
                ? "border-ink bg-ink text-white"
                : "border-border bg-background text-muted-foreground hover:border-ink hover:text-ink"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Resultados */}
      <p className="font-mono text-xs text-muted-foreground">
        {filtered.length}{" "}
        {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface px-6 py-20 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <PackageX className="size-7" />
          </span>
          <h3 className="text-lg font-semibold text-ink">
            Nenhum produto encontrado
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Não temos ainda este produto no catálogo — mas conseguimos importá-lo
            para si. Fale connosco e diga-nos o que procura.
          </p>
        </div>
      )}
    </div>
  );
}
