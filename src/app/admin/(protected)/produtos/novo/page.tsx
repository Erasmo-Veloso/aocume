import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { categoryService } from "@/services/category-service";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await categoryService.list();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/produtos"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ink"
        >
          <ChevronLeft className="size-4" />
          Produtos
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Novo produto
        </h1>
      </div>
      <ProductForm categories={categories.map((c) => ({ id: c.id, name: c.name }))} />
    </div>
  );
}
