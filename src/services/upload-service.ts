import { randomUUID } from "crypto";

import { uploadImage } from "@/lib/storage";
import { BadRequestError } from "@/lib/errors";

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_MB = Number(process.env.MAX_UPLOAD_MB ?? 5);
const MAX_BYTES = MAX_MB * 1024 * 1024;

const ALLOWED_FOLDERS = new Set(["products", "packages", "testimonials", "site"]);

export const uploadService = {
  async upload(file: File, folder = "site") {
    if (!file) throw new BadRequestError("Nenhum ficheiro enviado.");

    const ext = ALLOWED[file.type];
    if (!ext) {
      throw new BadRequestError(
        "Formato inválido. Apenas JPG, PNG ou WEBP são aceites."
      );
    }
    if (file.size > MAX_BYTES) {
      throw new BadRequestError(`Ficheiro demasiado grande (máx. ${MAX_MB}MB).`);
    }

    const safeFolder = ALLOWED_FOLDERS.has(folder) ? folder : "site";
    const path = `${safeFolder}/${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const url = await uploadImage(buffer, path, file.type);
    return { url };
  },
};
