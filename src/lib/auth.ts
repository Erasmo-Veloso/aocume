import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { UnauthorizedError } from "@/lib/errors";

export const AUTH_COOKIE = "aocume_token";
const TOKEN_TTL = "7d";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

export interface SessionPayload {
  sub: string; // id do administrador
  email: string;
}

function secret(): Uint8Array {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error("JWT_SECRET não configurado.");
  return new TextEncoder().encode(value);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(secret());
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub || typeof payload.email !== "string") return null;
    return { sub: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

/** Lê a sessão do cookie HTTP-only. Devolve null se não autenticado. */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

/** Exige um administrador autenticado; lança 401 caso contrário. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new UnauthorizedError();
  return session;
}

/** Define o cookie de autenticação na resposta. */
export async function setAuthCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAuthCookie(): Promise<void> {
  const store = await cookies();
  store.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
