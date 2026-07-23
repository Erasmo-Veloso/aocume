"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

import { adminApi } from "@/lib/admin-client";
import { Button } from "@/components/ui/button";

/** Botão de eliminar com confirmação. Chama DELETE {endpoint} e actualiza. */
export function DeleteButton({
  endpoint,
  label = "Eliminar",
  confirmMessage = "Tem a certeza que quer eliminar? Esta acção é irreversível.",
  onDeleted,
}: {
  endpoint: string;
  label?: string;
  confirmMessage?: string;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm(confirmMessage)) return;
    setBusy(true);
    try {
      await adminApi.del(endpoint);
      if (onDeleted) onDeleted();
      startTransition(() => router.refresh());
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Erro ao eliminar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={busy || pending}
      aria-label={label}
    >
      {busy || pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Trash2 />
      )}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
