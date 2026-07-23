import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { packageService } from "@/services/package-service";
import { updatePackageSchema } from "@/validators/package";

// GET usa o slug (público); PUT/DELETE usam o id (admin).
type Params = { params: Promise<{ key: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    const { key } = await params;
    return ok(await packageService.getPublicBySlug(key));
  });
}

export async function PUT(req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { key } = await params;
    const input = updatePackageSchema.parse(await req.json());
    return ok(await packageService.update(key, input));
  });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { key } = await params;
    await packageService.remove(key);
    return ok({ deleted: true });
  });
}
