import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { testimonialService } from "@/services/testimonial-service";
import { updateTestimonialSchema } from "@/validators/testimonial";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { id } = await params;
    const input = updateTestimonialSchema.parse(await req.json());
    return ok(await testimonialService.update(id, input));
  });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { id } = await params;
    await testimonialService.remove(id);
    return ok({ deleted: true });
  });
}
