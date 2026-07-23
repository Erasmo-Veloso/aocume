import { Plus, Pencil } from "lucide-react";

import { blogService } from "@/services/blog-service";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("pt-PT", { dateStyle: "medium" });

export default async function AdminBlogPage() {
  const posts = await blogService.listAll();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Blog</h1>
          <p className="text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? "artigo" : "artigos"}
          </p>
        </div>
        <LinkButton href="/admin/blog/novo" variant="cta" size="lg">
          <Plus />
          Novo artigo
        </LinkButton>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Artigo</th>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 text-right font-medium">Acções</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <span className="font-medium text-ink">{p.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    Por {p.author}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {dateFmt.format(p.publishedAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.published ? (
                      <Badge variant="success">Publicado</Badge>
                    ) : (
                      <Badge variant="muted">Rascunho</Badge>
                    )}
                    {p.featured && <Badge variant="gold">Destaque</Badge>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <LinkButton href={`/admin/blog/${p.id}`} variant="outline" size="sm">
                      <Pencil />
                      <span className="hidden sm:inline">Editar</span>
                    </LinkButton>
                    <DeleteButton endpoint={`/api/blog/${p.id}`} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  Ainda não há artigos. Escreva o primeiro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
