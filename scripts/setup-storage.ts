import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

/**
 * Cria ou actualiza o bucket público de media (imagens + vídeos) no Supabase
 * Storage. Correr: `npm run storage:setup` (idempotente).
 */
const MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];
const SIZE = "50MB";

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

  const opts = { public: true, fileSizeLimit: SIZE, allowedMimeTypes: MIME };

  if (buckets?.some((b) => b.name === bucket)) {
    const { error } = await supabase.storage.updateBucket(bucket, opts);
    if (error) throw error;
    console.log(`✔ Bucket "${bucket}" actualizado (imagens + vídeos, ${SIZE}).`);
    return;
  }

  const { error } = await supabase.storage.createBucket(bucket, opts);
  if (error) throw error;
  console.log(`✅ Bucket público "${bucket}" criado (imagens + vídeos, ${SIZE}).`);
}

main().catch((e) => {
  console.error("Erro:", e.message ?? e);
  process.exit(1);
});
