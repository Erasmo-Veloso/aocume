import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { categoryService } from "@/services/category-service";
import { createCategorySchema } from "@/validators/category";

export async function GET() {
  return handleRoute(async () => ok(await categoryService.list()));
}

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    await requireAdmin();
    const input = createCategorySchema.parse(await req.json());
    return ok(await categoryService.create(input), 201);
  });
}
