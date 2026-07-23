"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Mail } from "lucide-react";

import { adminApi } from "@/lib/admin-client";
import { Button } from "@/components/ui/button";

export function MarkReadButton({ id, read }: { id: string; read: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    try {
      await adminApi.patch(`/api/contact/${id}`, { read: !read });
      startTransition(() => router.refresh());
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} disabled={busy || pending}>
      {read ? <Mail /> : <Check />}
      {read ? "Marcar por ler" : "Marcar lida"}
    </Button>
  );
}
