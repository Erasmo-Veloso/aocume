"use client";

import { useState } from "react";
import { Save, Loader2, Pencil, Star } from "lucide-react";

import { adminApi } from "@/lib/admin-client";
import { Field } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { DeleteButton } from "@/components/admin/delete-button";
import { ImageUpload } from "@/components/admin/image-upload";

interface Testimonial {
  id: string;
  clientName: string;
  position: string | null;
  content: string;
  photo: string | null;
  featured: boolean;
}

const EMPTY = {
  clientName: "",
  position: "",
  content: "",
  photo: "",
  featured: false,
};

export function TestimonialManager({ initial }: { initial: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initial);
  const [form, setForm] = useState({ ...EMPTY });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setForm({ ...EMPTY });
    setEditingId(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      clientName: form.clientName,
      position: form.position || undefined,
      content: form.content,
      photo: form.photo.trim() || null,
      featured: form.featured,
    };
    try {
      if (editingId) {
        const updated = await adminApi.put<Testimonial>(
          `/api/testimonials/${editingId}`,
          payload
        );
        setItems((v) => v.map((t) => (t.id === editingId ? updated : t)));
      } else {
        const created = await adminApi.post<Testimonial>(
          "/api/testimonials",
          payload
        );
        setItems((v) => [created, ...v]);
      }
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao guardar.");
    } finally {
      setSaving(false);
    }
  }

  function edit(t: Testimonial) {
    setEditingId(t.id);
    setForm({
      clientName: t.clientName,
      position: t.position ?? "",
      content: t.content,
      photo: t.photo ?? "",
      featured: t.featured,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
      >
        <h2 className="text-sm font-semibold text-ink">
          {editingId ? "Editar testemunho" : "Novo testemunho"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do cliente" required>
            <Input
              value={form.clientName}
              onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
              required
            />
          </Field>
          <Field label="Cargo / localização">
            <Input
              value={form.position}
              onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
              placeholder="Comércio · Luanda"
            />
          </Field>
        </div>
        <Field label="Testemunho" required>
          <Textarea
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            required
          />
        </Field>
        <ImageUpload
          label="Foto do cliente (opcional)"
          folder="testimonials"
          value={form.photo}
          onChange={(url) => setForm((f) => ({ ...f, photo: url }))}
        />
        <CheckboxField
          label="Destacar na página inicial"
          checked={form.featured}
          onChange={(c) => setForm((f) => ({ ...f, featured: c }))}
        />
        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <Button type="submit" variant="cta" size="lg" disabled={saving}>
            {saving ? <Loader2 className="animate-spin" /> : <Save />}
            {editingId ? "Guardar" : "Adicionar"}
          </Button>
          {editingId && (
            <Button type="button" variant="outline" size="lg" onClick={reset}>
              Cancelar
            </Button>
          )}
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink">{t.clientName}</p>
                {t.position && (
                  <p className="text-xs text-muted-foreground">{t.position}</p>
                )}
              </div>
              {t.featured && (
                <Badge variant="gold">
                  <Star className="size-3" />
                  Destaque
                </Badge>
              )}
            </div>
            <p className="line-clamp-4 text-sm text-muted-foreground">
              “{t.content}”
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => edit(t)}>
                <Pencil />
                Editar
              </Button>
              <DeleteButton
                endpoint={`/api/testimonials/${t.id}`}
                onDeleted={() => setItems((v) => v.filter((x) => x.id !== t.id))}
              />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">Ainda não há testemunhos.</p>
        )}
      </div>
    </div>
  );
}
