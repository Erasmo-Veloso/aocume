import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { contactService } from "@/services/contact-service";
import { createContactSchema } from "@/validators/contact";

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    const input = createContactSchema.parse(await req.json());
    await contactService.create(input);
    return ok({ received: true }, 201);
  });
}

export async function GET() {
  return handleRoute(async () => {
    await requireAdmin();
    return ok(await contactService.list());
  });
}
