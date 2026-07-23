"use client";

import { useState } from "react";
import { Save, Loader2, Check } from "lucide-react";

import { adminApi } from "@/lib/admin-client";
import { Field } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";

export interface SettingsValues {
  companyName: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  logo: string;
  heroTitle: string;
  heroSubtitle: string;
}

export function SettingsForm({ initial }: { initial: SettingsValues }) {
  const [values, setValues] = useState<SettingsValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof SettingsValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  const setLogo = (url: string) => set("logo", url);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await adminApi.put("/api/settings", values);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-3xl flex-col gap-6">
      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-ink">Contactos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome da empresa">
            <Input value={values.companyName} onChange={(e) => set("companyName", e.target.value)} />
          </Field>
          <Field label="E-mail">
            <Input type="email" value={values.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
          <Field label="Telefone">
            <Input value={values.phone} onChange={(e) => set("phone", e.target.value)} />
          </Field>
          <Field label="WhatsApp" hint="Só dígitos, ex.: 244923000000">
            <Input value={values.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
          </Field>
        </div>
        <Field label="Morada">
          <Input value={values.address} onChange={(e) => set("address", e.target.value)} />
        </Field>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-ink">Redes sociais</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Facebook">
            <Input value={values.facebook} onChange={(e) => set("facebook", e.target.value)} placeholder="https://…" />
          </Field>
          <Field label="Instagram">
            <Input value={values.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="https://…" />
          </Field>
          <Field label="LinkedIn">
            <Input value={values.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://…" />
          </Field>
          <Field label="YouTube">
            <Input value={values.youtube} onChange={(e) => set("youtube", e.target.value)} placeholder="https://…" />
          </Field>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-ink">Logótipo</h2>
        <ImageUpload
          label="Logótipo do site"
          folder="site"
          value={values.logo}
          onChange={setLogo}
        />
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-ink">Herói da página inicial</h2>
        <Field label="Título do herói" hint="Deixe vazio para usar o texto padrão do site.">
          <Input value={values.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} />
        </Field>
        <Field label="Subtítulo do herói">
          <Textarea value={values.heroSubtitle} onChange={(e) => set("heroSubtitle", e.target.value)} />
        </Field>
      </section>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="cta" size="lg" disabled={saving}>
          {saving ? <Loader2 className="animate-spin" /> : <Save />}
          Guardar definições
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-success">
            <Check className="size-4" />
            Guardado
          </span>
        )}
      </div>
    </form>
  );
}
