import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { categoryService } from "@/services/category-service";
import { updateCategorySchema } from "@/validators/category";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    const { id } = await params;
    return ok(await categoryService.get(id));
  });
}

export async function PUT(req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { id } = await params;
    const input = updateCategorySchema.parse(await req.json());
    return ok(await categoryService.update(id, input));
  });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { id } = await params;
    await categoryService.remove(id);
    return ok({ deleted: true });
  });
}
