import { NextResponse, type NextRequest } from "next/server";

/**
 * Encaminhamento por subdomínio.
 *
 * admin.localhost:3000 (ou admin.<domínio>) → espaço de rotas /admin.
 * No domínio público, os caminhos /admin não são acessíveis.
 * Os pedidos a /api e aos assets internos nunca são reescritos.
 */
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0];
  const isAdminHost = host === "admin.localhost" || host.startsWith("admin.");
  const { pathname } = req.nextUrl;

  const isInternal =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico";

  if (isAdminHost) {
    if (isInternal || pathname === "/admin" || pathname.startsWith("/admin/")) {
      return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // Domínio público: o painel só existe no subdomínio admin.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
