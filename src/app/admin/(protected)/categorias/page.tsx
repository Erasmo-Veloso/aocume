import { categoryService } from "@/services/category-service";
import { CategoryManager } from "@/components/admin/category-manager";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await categoryService.list();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Categorias</h1>
        <p className="text-sm text-muted-foreground">
          Organize os produtos por categoria.
        </p>
      </div>
      <CategoryManager
        initial={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
        }))}
      />
    </div>
  );
}
