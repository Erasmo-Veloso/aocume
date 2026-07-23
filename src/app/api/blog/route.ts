import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { blogService } from "@/services/blog-service";
import { createBlogSchema, blogQuerySchema } from "@/validators/blog";

export async function GET(req: NextRequest) {
  return handleRoute(async () => {
    const params = Object.fromEntries(new URL(req.url).searchParams);
    const query = blogQuerySchema.parse(params);
    return ok(await blogService.listPublic(query));
  });
}

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    await requireAdmin();
    const input = createBlogSchema.parse(await req.json());
    return ok(await blogService.create(input), 201);
  });
}
