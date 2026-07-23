import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PackageForm } from "@/components/admin/package-form";

export const dynamic = "force-dynamic";

export default function NewPackagePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/pacotes"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ink"
        >
          <ChevronLeft className="size-4" />
          Pacotes
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Novo pacote</h1>
      </div>
      <PackageForm />
    </div>
  );
}
