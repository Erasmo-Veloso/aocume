import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { uploadService } from "@/services/upload-service";
import { BadRequestError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    await requireAdmin();
    const form = await req.formData();
    const file = form.get("file");
    const folder = (form.get("folder") as string) || "site";
    if (!(file instanceof File)) {
      throw new BadRequestError("Campo 'file' em falta.");
    }
    return ok(await uploadService.upload(file, folder), 201);
  });
}
