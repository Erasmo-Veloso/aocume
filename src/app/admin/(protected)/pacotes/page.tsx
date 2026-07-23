import { Plus, Pencil } from "lucide-react";

import { packageService } from "@/services/package-service";
import { formatPrice } from "@/lib/format";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const packages = await packageService.listAll();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            Pacotes de Negócio
          </h1>
          <p className="text-sm text-muted-foreground">
            {packages.length} {packages.length === 1 ? "pacote" : "pacotes"}
          </p>
        </div>
        <LinkButton href="/pacotes/novo" variant="cta" size="lg">
          <Plus />
          Novo pacote
        </LinkButton>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Pacote</th>
              <th className="px-4 py-3 font-medium">Investimento</th>
              <th className="px-4 py-3 font-medium">Lucro</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 text-right font-medium">Acções</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <span className="font-medium text-ink">{p.name}</span>
                  <span className="block font-mono text-xs text-muted-foreground">
                    {p.items.length} itens · pos. {p.position}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink">{formatPrice(p.investment)}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.profitMargin}</td>
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
                      href={`/pacotes/${p.id}`}
                      variant="outline"
                      size="sm"
                    >
                      <Pencil />
                      <span className="hidden sm:inline">Editar</span>
                    </LinkButton>
                    <DeleteButton endpoint={`/api/packages/${p.id}`} />
                  </div>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  Ainda não há pacotes. Crie o primeiro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
