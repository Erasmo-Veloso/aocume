"use client";

import { useState } from "react";
import { Plus, Pencil, Check, X, Loader2 } from "lucide-react";

import { adminApi } from "@/lib/admin-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export function CategoryManager({ initial }: { initial: Category[] }) {
  const [items, setItems] = useState<Category[]>(initial);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      const created = await adminApi.post<Category>("/api/categories", {
        name,
        description: description || undefined,
      });
      setItems((v) => [...v, created].sort((a, b) => a.name.localeCompare(b.name)));
      setName("");
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar.");
    } finally {
      setCreating(false);
    }
  }

  function startEdit(c: Category) {
    setEditingId(c.id);
    setEditName(c.name);
    setEditDesc(c.description ?? "");
  }

  async function saveEdit(id: string) {
    try {
      const updated = await adminApi.put<Category>(`/api/categories/${id}`, {
        name: editName,
        description: editDesc || undefined,
      });
      setItems((v) => v.map((c) => (c.id === id ? updated : c)));
      setEditingId(null);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Erro ao guardar.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={create}
        className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Nova categoria
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            required
          />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Descrição
          </label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Opcional"
          />
        </div>
        <Button type="submit" variant="cta" size="lg" disabled={creating}>
          {creating ? <Loader2 className="animate-spin" /> : <Plus />}
          Adicionar
        </Button>
      </form>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Descrição</th>
              <th className="px-4 py-3 text-right font-medium">Acções</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0">
                {editingId === c.id ? (
                  <>
                    <td className="px-4 py-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                      {c.slug}
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="cta" onClick={() => saveEdit(c.id)}>
                          <Check />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          <X />
                        </Button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 font-medium text-ink">{c.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {c.slug}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {c.description || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEdit(c)}>
                          <Pencil />
                        </Button>
                        <DeleteButton
                          endpoint={`/api/categories/${c.id}`}
                          onDeleted={() =>
                            setItems((v) => v.filter((x) => x.id !== c.id))
                          }
                        />
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                  Ainda não há categorias.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
