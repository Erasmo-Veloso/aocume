import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

/**
 * Cria (se ainda não existir) o bucket público de imagens no Supabase Storage.
 * Correr uma vez: `npm run storage:setup`.
 */
async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "aocume";

  if (!url || !key || key.startsWith("<")) {
    console.error(
      "✗ Falta NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no .env."
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) throw listErr;

  if (buckets?.some((b) => b.name === bucket)) {
    console.log(`✔ Bucket "${bucket}" já existe.`);
    return;
  }

  const { error } = await supabase.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: "5MB",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  if (error) throw error;

  console.log(`✅ Bucket público "${bucket}" criado.`);
}

main().catch((e) => {
  console.error("Erro:", e.message ?? e);
  process.exit(1);
});
