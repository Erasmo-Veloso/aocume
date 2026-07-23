import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { testimonialService } from "@/services/testimonial-service";
import { createTestimonialSchema } from "@/validators/testimonial";

export async function GET(req: NextRequest) {
  return handleRoute(async () => {
    const featuredOnly =
      new URL(req.url).searchParams.get("featured") === "true";
    return ok(await testimonialService.list(featuredOnly));
  });
}

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    await requireAdmin();
    const input = createTestimonialSchema.parse(await req.json());
    return ok(await testimonialService.create(input), 201);
  });
}
