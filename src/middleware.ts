import { NextResponse, type NextRequest } from "next/server";

/**
 * Encaminhamento do painel de administração.
 *
 * - O painel vive no espaço de rotas /admin e está acessível em /admin em
 *   qualquer domínio (protegido por login).
 * - Além disso, num subdomínio admin.* (ex.: admin.aocume.co.ao) os pedidos à
 *   raiz são normalizados para /admin, para o painel abrir directamente.
 * - Pedidos a /api e a assets internos nunca são tocados.
 */
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0];
  const isAdminHost = host === "admin.localhost" || host.startsWith("admin.");
  const { pathname } = req.nextUrl;

  const isInternal =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico";

  if (isAdminHost && !isInternal && !pathname.startsWith("/admin")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
