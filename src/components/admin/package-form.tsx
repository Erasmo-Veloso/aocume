"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Plus, X } from "lucide-react";

import { adminApi } from "@/lib/admin-client";
import { Field } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { ImageUpload } from "@/components/admin/image-upload";

export interface PackageItemValue {
  label: string;
  quantity: string;
}

export interface PackageFormValues {
  id?: string;
  name: string;
  tagline: string;
  image: string;
  investment: string;
  profitMargin: string;
  estimatedReturn: string;
  profitBasis: "GROSS" | "NET";
  ctaLabel: string;
  featured: boolean;
  active: boolean;
  position: string;
  items: PackageItemValue[];
}

const EMPTY: PackageFormValues = {
  name: "",
  tagline: "",
  image: "",
  investment: "",
  profitMargin: "",
  estimatedReturn: "",
  profitBasis: "GROSS",
  ctaLabel: "Receber Detalhes",
  featured: false,
  active: true,
  position: "0",
  items: [{ label: "", quantity: "" }],
};

const CTA_OPTIONS = ["Solicitar Cotação", "Receber Detalhes", "Iniciar Projecto"];

export function PackageForm({ initial }: { initial?: PackageFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<PackageFormValues>(initial ?? EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof PackageFormValues>(
    key: K,
    value: PackageFormValues[K]
  ) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function setItem(index: number, key: keyof PackageItemValue, value: string) {
    setValues((v) => {
      const items = [...v.items];
      items[index] = { ...items[index], [key]: value };
      return { ...v, items };
    });
  }

  function addItem() {
    setValues((v) => ({ ...v, items: [...v.items, { label: "", quantity: "" }] }));
  }

  function removeItem(index: number) {
    setValues((v) => ({ ...v, items: v.items.filter((_, i) => i !== index) }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      name: values.name,
      tagline: values.tagline,
      image: values.image.trim() || null,
      investment: Number(values.investment || 0),
      currency: "AOA",
      profitMargin: values.profitMargin,
      estimatedReturn: values.estimatedReturn,
      profitBasis: values.profitBasis,
      ctaLabel: values.ctaLabel,
      featured: values.featured,
      active: values.active,
      position: Number(values.position || 0),
      items: values.items
        .filter((it) => it.label.trim())
        .map((it, idx) => ({
          label: it.label.trim(),
          quantity: it.quantity.trim() || undefined,
          position: idx,
        })),
    };

    try {
      if (isEdit) {
        await adminApi.put(`/api/packages/${initial!.id}`, payload);
      } else {
        await adminApi.post("/api/packages", payload);
      }
      router.push("/admin/pacotes");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao guardar.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-3xl flex-col gap-6">
      <Field label="Nome" htmlFor="name" required>
        <Input
          id="name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          required
        />
      </Field>

      <Field label="Descrição / tagline" htmlFor="tagline" required>
        <Textarea
          id="tagline"
          value={values.tagline}
          onChange={(e) => set("tagline", e.target.value)}
          required
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Investimento (AOA)" htmlFor="investment" required>
          <Input
            id="investment"
            type="number"
            min={0}
            value={values.investment}
            onChange={(e) => set("investment", e.target.value)}
            required
          />
        </Field>
        <Field label="Posição" htmlFor="position" hint="Ordem de apresentação">
          <Input
            id="position"
            type="number"
            min={0}
            value={values.position}
            onChange={(e) => set("position", e.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Margem de lucro" htmlFor="profitMargin" required hint="Ex.: 40–50%">
          <Input
            id="profitMargin"
            value={values.profitMargin}
            onChange={(e) => set("profitMargin", e.target.value)}
            required
          />
        </Field>
        <Field
          label="Retorno estimado"
          htmlFor="estimatedReturn"
          required
          hint="Ex.: ≈ 320.000 Kz por ciclo"
        >
          <Input
            id="estimatedReturn"
            value={values.estimatedReturn}
            onChange={(e) => set("estimatedReturn", e.target.value)}
            required
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Base do lucro" htmlFor="profitBasis">
          <Select
            id="profitBasis"
            value={values.profitBasis}
            onChange={(e) =>
              set("profitBasis", e.target.value as PackageFormValues["profitBasis"])
            }
          >
            <option value="GROSS">Bruto</option>
            <option value="NET">Líquido</option>
          </Select>
        </Field>
        <Field label="Texto do botão" htmlFor="ctaLabel">
          <Select
            id="ctaLabel"
            value={values.ctaLabel}
            onChange={(e) => set("ctaLabel", e.target.value)}
          >
            {CTA_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <ImageUpload
        label="Imagem do negócio"
        folder="packages"
        value={values.image}
        onChange={(url) => set("image", url)}
      />

      {/* Itens incluídos */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink">Itens incluídos</span>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus />
            Adicionar item
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {values.items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Descrição do item"
                value={item.label}
                onChange={(e) => setItem(i, "label", e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Qtd."
                value={item.quantity}
                onChange={(e) => setItem(i, "quantity", e.target.value)}
                className="w-28"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(i)}
                aria-label="Remover item"
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
        <CheckboxField
          label="Pacote em destaque"
          description="Aparece na página inicial."
          checked={values.featured}
          onChange={(c) => set("featured", c)}
        />
        <CheckboxField
          label="Activo"
          description="Visível no site público."
          checked={values.active}
          onChange={(c) => set("active", c)}
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
          {isEdit ? "Guardar alterações" : "Criar pacote"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/admin/pacotes")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
