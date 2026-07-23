"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

import { adminApi } from "@/lib/admin-client";
import { Field } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { ImageUpload } from "@/components/admin/image-upload";

export interface ProductFormValues {
  id?: string;
  title: string;
  reference: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  price: string; // vazio = sob consulta
  productType: "ORDER" | "READY_STOCK";
  paymentType: "PARTIAL" | "FULL";
  minimumQuantity: string;
  deliveryTime: string;
  availableQuantity: string;
  featured: boolean;
  active: boolean;
  imageUrl: string;
}

const EMPTY: ProductFormValues = {
  title: "",
  reference: "",
  categoryId: "",
  shortDescription: "",
  description: "",
  price: "",
  productType: "ORDER",
  paymentType: "PARTIAL",
  minimumQuantity: "1",
  deliveryTime: "",
  availableQuantity: "",
  featured: false,
  active: true,
  imageUrl: "",
};

export function ProductForm({
  categories,
  initial,
}: {
  categories: { id: string; name: string }[];
  initial?: ProductFormValues;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<ProductFormValues>(
    initial ?? { ...EMPTY, categoryId: categories[0]?.id ?? "" }
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K]
  ) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      title: values.title,
      reference: values.reference,
      categoryId: values.categoryId,
      shortDescription: values.shortDescription,
      description: values.description,
      price: values.price === "" ? null : Number(values.price),
      productType: values.productType,
      paymentType: values.paymentType,
      minimumQuantity: Number(values.minimumQuantity || 1),
      deliveryTime: values.deliveryTime,
      availableQuantity:
        values.availableQuantity === "" ? null : Number(values.availableQuantity),
      featured: values.featured,
      active: values.active,
      images: values.imageUrl.trim()
        ? [{ url: values.imageUrl.trim(), position: 0 }]
        : [],
    };

    try {
      if (isEdit) {
        await adminApi.put(`/api/products/${initial!.id}`, payload);
      } else {
        await adminApi.post("/api/products", payload);
      }
      router.push("/admin/produtos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao guardar.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-3xl flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Título" htmlFor="title" required>
          <Input
            id="title"
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            required
          />
        </Field>
        <Field label="Referência" htmlFor="reference" required hint="Ex.: AOC-0428">
          <Input
            id="reference"
            value={values.reference}
            onChange={(e) => set("reference", e.target.value)}
            required
          />
        </Field>
      </div>

      <Field label="Categoria" htmlFor="categoryId" required>
        <Select
          id="categoryId"
          value={values.categoryId}
          onChange={(e) => set("categoryId", e.target.value)}
          required
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Descrição curta" htmlFor="shortDescription" required>
        <Input
          id="shortDescription"
          value={values.shortDescription}
          onChange={(e) => set("shortDescription", e.target.value)}
          required
        />
      </Field>

      <Field label="Descrição completa" htmlFor="description" required>
        <Textarea
          id="description"
          className="min-h-36"
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          required
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Preço (AOA)" htmlFor="price" hint="Vazio = sob consulta">
          <Input
            id="price"
            type="number"
            min={0}
            value={values.price}
            onChange={(e) => set("price", e.target.value)}
          />
        </Field>
        <Field label="Prazo de entrega" htmlFor="deliveryTime" required>
          <Input
            id="deliveryTime"
            value={values.deliveryTime}
            onChange={(e) => set("deliveryTime", e.target.value)}
            placeholder="22–30 dias"
            required
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Tipo de produto" htmlFor="productType">
          <Select
            id="productType"
            value={values.productType}
            onChange={(e) =>
              set("productType", e.target.value as ProductFormValues["productType"])
            }
          >
            <option value="ORDER">Por encomenda</option>
            <option value="READY_STOCK">Pronta entrega</option>
          </Select>
        </Field>
        <Field label="Pagamento" htmlFor="paymentType">
          <Select
            id="paymentType"
            value={values.paymentType}
            onChange={(e) =>
              set("paymentType", e.target.value as ProductFormValues["paymentType"])
            }
          >
            <option value="PARTIAL">Sinal + saldo</option>
            <option value="FULL">Pagamento total</option>
          </Select>
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Quantidade mínima" htmlFor="minimumQuantity">
          <Input
            id="minimumQuantity"
            type="number"
            min={1}
            value={values.minimumQuantity}
            onChange={(e) => set("minimumQuantity", e.target.value)}
          />
        </Field>
        <Field
          label="Quantidade disponível"
          htmlFor="availableQuantity"
          hint="Opcional"
        >
          <Input
            id="availableQuantity"
            type="number"
            min={0}
            value={values.availableQuantity}
            onChange={(e) => set("availableQuantity", e.target.value)}
          />
        </Field>
      </div>

      <ImageUpload
        label="Imagem do produto"
        folder="products"
        value={values.imageUrl}
        onChange={(url) => set("imageUrl", url)}
      />

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
        <CheckboxField
          label="Produto em destaque"
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
          {isEdit ? "Guardar alterações" : "Criar produto"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/admin/produtos")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
