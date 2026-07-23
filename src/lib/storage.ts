import { createClient } from "@supabase/supabase-js";

import { AppError } from "@/lib/errors";

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "aocume";

/**
 * Cliente Supabase com a service-role key (apenas servidor) para o Storage.
 * NUNCA importar este módulo em código de cliente.
 */
function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new AppError("Storage do Supabase não configurado.", 500);
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Faz upload de uma imagem e devolve o URL público. */
export async function uploadImage(
  file: Buffer,
  path: string,
  contentType: string
): Promise<string> {
  const supabase = client();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType, upsert: false });

  if (error) {
    throw new AppError(`Falha ao carregar a imagem: ${error.message}`, 500);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Remove uma imagem do Storage a partir do seu caminho no bucket. */
export async function deleteImage(path: string): Promise<void> {
  const supabase = client();
  await supabase.storage.from(BUCKET).remove([path]);
}

/** Extrai o caminho dentro do bucket a partir de um URL público do Supabase. */
export function pathFromPublicUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}
