import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { productService } from "@/services/product-service";
import { createProductSchema, productQuerySchema } from "@/validators/product";

export async function GET(req: NextRequest) {
  return handleRoute(async () => {
    const params = Object.fromEntries(new URL(req.url).searchParams);
    const query = productQuerySchema.parse(params);
    return ok(await productService.listPublic(query));
  });
}

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    await requireAdmin();
    const input = createProductSchema.parse(await req.json());
    return ok(await productService.create(input), 201);
  });
}
