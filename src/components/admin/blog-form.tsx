"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

import { adminApi } from "@/lib/admin-client";
import { Field } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { ImageUpload } from "@/components/admin/image-upload";

export interface BlogFormValues {
  id?: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  cover: string;
  content: string;
  featured: boolean;
  published: boolean;
}

const EMPTY: BlogFormValues = {
  title: "",
  excerpt: "",
  category: "",
  author: "Equipa AOCUME",
  cover: "",
  content: "",
  featured: false,
  published: true,
};

export function BlogForm({ initial }: { initial?: BlogFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<BlogFormValues>(initial ?? EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      title: values.title,
      excerpt: values.excerpt,
      category: values.category,
      author: values.author,
      cover: values.cover.trim() || null,
      content: values.content,
      featured: values.featured,
      published: values.published,
    };
    try {
      if (isEdit) {
        await adminApi.put(`/api/blog/${initial!.id}`, payload);
      } else {
        await adminApi.post("/api/blog", payload);
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao guardar.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-3xl flex-col gap-6">
      <Field label="Título" required>
        <Input value={values.title} onChange={(e) => set("title", e.target.value)} required />
      </Field>

      <Field label="Resumo (excerpt)" required hint="Aparece nos cartões e nos resultados de pesquisa.">
        <Textarea value={values.excerpt} onChange={(e) => set("excerpt", e.target.value)} required />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Categoria" required hint="Ex.: Guia, Custos, Negócio">
          <Input value={values.category} onChange={(e) => set("category", e.target.value)} required />
        </Field>
        <Field label="Autor" required>
          <Input value={values.author} onChange={(e) => set("author", e.target.value)} required />
        </Field>
      </div>

      <ImageUpload
        label="Imagem de capa"
        folder="blog"
        value={values.cover}
        onChange={(url) => set("cover", url)}
      />

      <Field
        label="Conteúdo (Markdown)"
        required
        hint="Use ## para títulos, - para listas, **texto** para negrito."
      >
        <Textarea
          className="min-h-80 font-mono text-sm"
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          required
        />
      </Field>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
        <CheckboxField
          label="Artigo em destaque"
          description="Aparece em grande na página do blog."
          checked={values.featured}
          onChange={(c) => set("featured", c)}
        />
        <CheckboxField
          label="Publicado"
          description="Visível no site público."
          checked={values.published}
          onChange={(c) => set("published", c)}
        />
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" variant="cta" size="lg" disabled={saving}>
          {saving ? <Loader2 className="animate-spin" /> : <Save />}
          {isEdit ? "Guardar alterações" : "Publicar artigo"}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.push("/admin/blog")}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
