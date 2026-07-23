import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { productService } from "@/services/product-service";
import { categoryService } from "@/services/category-service";
import { NotFoundError } from "@/lib/errors";
import { ProductForm, type ProductFormValues } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    product = await productService.getById(id);
  } catch (e) {
    if (e instanceof NotFoundError) notFound();
    throw e;
  }

  const categories = await categoryService.list();

  const initial: ProductFormValues = {
    id: product.id,
    title: product.title,
    reference: product.reference,
    categoryId: product.categoryId,
    shortDescription: product.shortDescription,
    description: product.description,
    price: product.price != null ? String(product.price) : "",
    productType: product.productType,
    paymentType: product.paymentType,
    minimumQuantity: String(product.minimumQuantity),
    deliveryTime: product.deliveryTime,
    availableQuantity:
      product.availableQuantity != null ? String(product.availableQuantity) : "",
    featured: product.featured,
    active: product.active,
    imageUrl: product.images[0]?.url ?? "",
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/produtos"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ink"
        >
          <ChevronLeft className="size-4" />
          Produtos
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Editar produto
        </h1>
      </div>
      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        initial={initial}
      />
    </div>
  );
}
