import { renderBrandOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "AOCUME — Comércio Internacional";

export default function TwitterImage() {
  return renderBrandOgImage();
}
