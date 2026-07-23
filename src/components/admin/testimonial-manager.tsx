"use client";

import { useState } from "react";
import { Save, Loader2, Pencil, Star } from "lucide-react";

import { adminApi } from "@/lib/admin-client";
import { Field } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { DeleteButton } from "@/components/admin/delete-button";
import { ImageUpload } from "@/components/admin/image-upload";
import { VideoUpload } from "@/components/admin/video-upload";

type Format = "TEXT" | "IMAGE" | "VIDEO";

interface Testimonial {
  id: string;
  clientName: string;
  position: string | null;
  content: string;
  photo: string | null;
  videoUrl: string | null;
  format: Format;
  rating: number | null;
  featured: boolean;
}

const EMPTY = {
  clientName: "",
  position: "",
  content: "",
  photo: "",
  videoUrl: "",
  format: "TEXT" as Format,
  rating: "5",
  featured: false,
};

const FORMAT_LABEL: Record<Format, string> = {
  TEXT: "Texto",
  IMAGE: "Imagem",
  VIDEO: "Vídeo",
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
      format: form.format,
      photo: form.photo.trim() || null,
      videoUrl: form.format === "VIDEO" ? form.videoUrl.trim() || null : null,
      rating: form.rating ? Number(form.rating) : null,
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
      videoUrl: t.videoUrl ?? "",
      format: t.format,
      rating: t.rating ? String(t.rating) : "",
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

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Formato">
            <Select
              value={form.format}
              onChange={(e) => setForm((f) => ({ ...f, format: e.target.value as Format }))}
            >
              <option value="TEXT">Texto</option>
              <option value="IMAGE">Imagem</option>
              <option value="VIDEO">Vídeo</option>
            </Select>
          </Field>
          <Field label="Avaliação">
            <Select
              value={form.rating}
              onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
            >
              <option value="">Sem avaliação</option>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{"★".repeat(n)}</option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Testemunho" required>
          <Textarea
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            required
          />
        </Field>

        {(form.format === "IMAGE" || form.format === "VIDEO") && (
          <ImageUpload
            label={form.format === "VIDEO" ? "Poster do vídeo" : "Foto do cliente"}
            folder="testimonials"
            value={form.photo}
            onChange={(url) => setForm((f) => ({ ...f, photo: url }))}
          />
        )}

        {form.format === "VIDEO" && (
          <VideoUpload
            value={form.videoUrl}
            onChange={(url) => setForm((f) => ({ ...f, videoUrl: url }))}
          />
        )}

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
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge variant="muted">{FORMAT_LABEL[t.format]}</Badge>
                {t.featured && (
                  <Badge variant="gold">
                    <Star className="size-3" />
                    Destaque
                  </Badge>
                )}
              </div>
            </div>
            <p className="line-clamp-4 text-sm text-muted-foreground">“{t.content}”</p>
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
