import type { NextRequest } from "next/server";

import { handleRoute, ok } from "@/lib/api";
import { setAuthCookie } from "@/lib/auth";
import { authService } from "@/services/auth-service";
import { loginSchema } from "@/validators/auth";

export async function POST(req: NextRequest) {
  return handleRoute(async () => {
    const input = loginSchema.parse(await req.json());
    const { token, user } = await authService.login(input);
    await setAuthCookie(token);
    return ok({ user });
  });
}
