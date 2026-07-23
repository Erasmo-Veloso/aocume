import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { leadService } from "@/services/lead-service";
import { packageLeadSchema } from "@/validators/package";

// Inicia o atendimento (WhatsApp/n8n) de um pacote. `key` = ID do pacote.
type Params = { params: Promise<{ key: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  return handleRoute(async () => {
    const { key } = await params;
    const body = await req.json().catch(() => ({}));
    const input = packageLeadSchema.parse(body);
    return ok(await leadService.createLead(key, input), 201);
  });
}
