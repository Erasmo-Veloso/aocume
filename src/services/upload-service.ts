import { randomUUID } from "crypto";

import { uploadImage } from "@/lib/storage";
import { BadRequestError } from "@/lib/errors";

const IMAGE_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const VIDEO_EXT: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

const MAX_IMAGE_MB = Number(process.env.MAX_UPLOAD_MB ?? 5);
const MAX_VIDEO_MB = Number(process.env.MAX_VIDEO_MB ?? 50);

const ALLOWED_FOLDERS = new Set([
  "products",
  "packages",
  "testimonials",
  "blog",
  "videos",
  "site",
]);

export const uploadService = {
  async upload(file: File, folder = "site") {
    if (!file) throw new BadRequestError("Nenhum ficheiro enviado.");

    const isVideo = file.type.startsWith("video/");
    const ext = isVideo ? VIDEO_EXT[file.type] : IMAGE_EXT[file.type];

    if (!ext) {
      throw new BadRequestError(
        "Formato inválido. Imagens: JPG, PNG, WEBP. Vídeos: MP4, WEBM, MOV."
      );
    }

    const maxMb = isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB;
    if (file.size > maxMb * 1024 * 1024) {
      throw new BadRequestError(`Ficheiro demasiado grande (máx. ${maxMb}MB).`);
    }

    const safeFolder = ALLOWED_FOLDERS.has(folder) ? folder : "site";
    const path = `${safeFolder}/${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const url = await uploadImage(buffer, path, file.type);
    return { url };
  },
};
