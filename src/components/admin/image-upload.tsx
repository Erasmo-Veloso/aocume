"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Upload de imagem para o Supabase Storage.
 * O ficheiro é enviado para /api/uploads (autenticado); o servidor grava no
 * bucket e devolve o URL público. Também aceita colar um URL manualmente.
 */
export function ImageUpload({
  value,
  onChange,
  folder,
  label = "Imagem",
}: {
  value: string;
  onChange: (url: string) => void;
  folder: "products" | "packages" | "testimonials" | "site";
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Falha no upload.");
      }
      onChange(data.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>

      {value ? (
        <div className="relative w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Pré-visualização"
            className="h-40 w-64 rounded-xl border border-border object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remover imagem"
            className="absolute -right-2 -top-2 inline-flex size-7 items-center justify-center rounded-full bg-ink text-white shadow"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-40 w-64 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border bg-surface text-muted-foreground transition-colors hover:border-gold hover:text-ink"
        >
          {uploading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <UploadCloud className="size-6" />
          )}
          <span className="text-sm font-medium">
            {uploading ? "A carregar…" : "Carregar imagem"}
          </span>
          <span className="text-xs">JPG, PNG ou WEBP · máx. 5MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />

      {value && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="animate-spin" /> : <UploadCloud />}
          Substituir
        </Button>
      )}

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ou cole um URL de imagem"
        className="mt-1"
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
