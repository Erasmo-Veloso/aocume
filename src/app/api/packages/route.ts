import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { packageService } from "@/services/package-service";
import { createPackageSchema, packageQuerySchema } from "@/validators/package";

export async function GET(req: NextRequest) {
  return handleRoute(async () => {
    const params = Object.fromEntries(new URL(req.url).searchParams);
    const query = packageQuerySchema.parse(params);
    return ok(await packageService.listPublic(query));
  });
}

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    await requireAdmin();
    const input = createPackageSchema.parse(await req.json());
    return ok(await packageService.create(input), 201);
  });
}
