import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { settingsService } from "@/services/settings-service";
import { updateSettingsSchema } from "@/validators/settings";

export async function GET() {
  return handleRoute(async () => ok(await settingsService.get()));
}

export async function PUT(req: NextRequest) {
  return handleRoute(async () => {
    await requireAdmin();
    const input = updateSettingsSchema.parse(await req.json());
    return ok(await settingsService.update(input));
  });
}
