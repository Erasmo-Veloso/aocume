import { Plus, Pencil } from "lucide-react";

import { productService } from "@/services/product-service";
import { formatPrice } from "@/lib/format";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await productService.listAll();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Produtos</h1>
          <p className="text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "produto" : "produtos"}
          </p>
        </div>
        <LinkButton href="/admin/produtos/novo" variant="cta" size="lg">
          <Plus />
          Novo produto
        </LinkButton>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Preço</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 text-right font-medium">Acções</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <span className="font-medium text-ink">{p.title}</span>
                  <span className="block font-mono text-xs text-muted-foreground">
                    {p.reference}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {p.category?.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-ink">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.active ? (
                      <Badge variant="success">Activo</Badge>
                    ) : (
                      <Badge variant="muted">Inactivo</Badge>
                    )}
                    {p.featured && <Badge variant="gold">Destaque</Badge>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <LinkButton
                      href={`/admin/produtos/${p.id}`}
                      variant="outline"
                      size="sm"
                    >
                      <Pencil />
                      <span className="hidden sm:inline">Editar</span>
                    </LinkButton>
                    <DeleteButton endpoint={`/api/products/${p.id}`} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  Ainda não há produtos. Crie o primeiro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
