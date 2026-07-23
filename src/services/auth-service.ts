import { adminRepository } from "@/repositories/admin-repository";
import { verifyPassword } from "@/lib/password";
import { signSession } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/errors";
import type { LoginInput } from "@/validators/auth";

export const authService = {
  async login(input: LoginInput) {
    const admin = await adminRepository.findByEmail(input.email);
    // Mensagem genérica: não revelar se o e-mail existe (docs/security.md).
    if (!admin) throw new UnauthorizedError("Credenciais inválidas.");

    const valid = await verifyPassword(input.password, admin.password);
    if (!valid) throw new UnauthorizedError("Credenciais inválidas.");

    const token = await signSession({ sub: admin.id, email: admin.email });

    return {
      token,
      user: { id: admin.id, name: admin.name, email: admin.email },
    };
  },
};
