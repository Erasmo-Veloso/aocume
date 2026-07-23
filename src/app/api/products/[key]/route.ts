import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { productService } from "@/services/product-service";
import { updateProductSchema } from "@/validators/product";

// GET usa o slug (público); PUT/DELETE usam o id (admin) — ver docs/api.md.
type Params = { params: Promise<{ key: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    const { key } = await params;
    return ok(await productService.getPublicBySlug(key));
  });
}

export async function PUT(req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { key } = await params;
    const input = updateProductSchema.parse(await req.json());
    return ok(await productService.update(key, input));
  });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { key } = await params;
    await productService.remove(key);
    return ok({ deleted: true });
  });
}
