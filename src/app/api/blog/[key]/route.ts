import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { blogService } from "@/services/blog-service";
import { updateBlogSchema } from "@/validators/blog";

// GET por slug (público); PUT/DELETE por id (admin).
type Params = { params: Promise<{ key: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    const { key } = await params;
    return ok(await blogService.getPublicBySlug(key));
  });
}

export async function PUT(req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { key } = await params;
    const input = updateBlogSchema.parse(await req.json());
    return ok(await blogService.update(key, input));
  });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { key } = await params;
    await blogService.remove(key);
    return ok({ deleted: true });
  });
}
