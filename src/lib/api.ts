import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { AppError } from "@/lib/errors";

/**
 * Formato de resposta padrão da API (docs/api.md):
 *   sucesso → { success: true, data }
 *   erro    → { success: false, message }
 */
export function ok<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(
  message: string,
  status = 400,
  errors?: unknown
): NextResponse {
  return NextResponse.json(
    { success: false, message, ...(errors ? { errors } : {}) },
    { status }
  );
}

/**
 * Envolve um handler de rota, traduzindo erros conhecidos em respostas HTTP
 * consistentes. Nunca expõe detalhes internos ao cliente (docs/security.md).
 */
export async function handleRoute(
  fn: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ZodError) {
      return fail("Dados inválidos.", 400, error.flatten());
    }
    if (error instanceof AppError) {
      return fail(error.message, error.statusCode);
    }
    // Log interno; resposta genérica ao cliente.
    console.error("[API] erro inesperado:", error);
    return fail("Ocorreu um erro inesperado.", 500);
  }
}
