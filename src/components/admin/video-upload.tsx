"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/** Upload de vídeo para o Supabase Storage (ou colar um URL de vídeo). */
export function VideoUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
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
      fd.append("folder", "videos");
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
      <span className="text-sm font-medium text-ink">Vídeo</span>

      {value && (
        <div className="relative w-fit">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video src={value} controls className="h-40 w-64 rounded-xl border border-border bg-black object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remover vídeo"
            className="absolute -right-2 -top-2 inline-flex size-7 items-center justify-center rounded-full bg-ink text-white shadow"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="animate-spin" /> : <UploadCloud />}
          {uploading ? "A carregar…" : "Carregar vídeo"}
        </Button>
        <span className="text-xs text-muted-foreground">MP4, WEBM ou MOV · máx. 50MB</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={handleFile}
      />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ou cole um URL de vídeo (MP4)"
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
