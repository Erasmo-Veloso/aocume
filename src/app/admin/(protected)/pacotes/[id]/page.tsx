import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { packageService } from "@/services/package-service";
import { NotFoundError } from "@/lib/errors";
import { PackageForm, type PackageFormValues } from "@/components/admin/package-form";

export const dynamic = "force-dynamic";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let pkg;
  try {
    pkg = await packageService.getById(id);
  } catch (e) {
    if (e instanceof NotFoundError) notFound();
    throw e;
  }

  const initial: PackageFormValues = {
    id: pkg.id,
    name: pkg.name,
    tagline: pkg.tagline,
    image: pkg.image ?? "",
    investment: String(pkg.investment),
    profitMargin: pkg.profitMargin,
    estimatedReturn: pkg.estimatedReturn,
    profitBasis: pkg.profitBasis,
    ctaLabel: pkg.ctaLabel,
    featured: pkg.featured,
    active: pkg.active,
    position: String(pkg.position),
    items: pkg.items.map((it) => ({
      label: it.label,
      quantity: it.quantity ?? "",
    })),
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/pacotes"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ink"
        >
          <ChevronLeft className="size-4" />
          Pacotes
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Editar pacote
        </h1>
      </div>
      <PackageForm initial={initial} />
    </div>
  );
}
