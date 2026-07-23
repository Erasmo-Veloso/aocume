import { handleRoute, ok } from "@/lib/api";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  return handleRoute(async () => {
    await clearAuthCookie();
    return ok({ loggedOut: true });
  });
}
