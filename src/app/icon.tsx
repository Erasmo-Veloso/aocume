import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon de marca: "A" dourado sobre fundo tinta. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0b0b0b",
          color: "#f4b731",
          fontSize: 46,
          fontWeight: 700,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
