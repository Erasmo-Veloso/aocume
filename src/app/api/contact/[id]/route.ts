import type { NextRequest } from "next/server";
import { z } from "zod";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { contactService } from "@/services/contact-service";

const patchSchema = z.object({ read: z.boolean() });

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    await requireAdmin();
    const { id } = await params;
    const { read } = patchSchema.parse(await req.json());
    return ok(await contactService.markRead(id, read));
  });
}
