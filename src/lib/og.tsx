import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Tenta carregar a Poppins 700 (Google Fonts); devolve null em caso de falha. */
async function loadPoppins(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\((.+?)\)\s*format/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

/**
 * Imagem de marca para partilha em redes sociais (og:image / twitter:image):
 * o wordmark AO/CUME com a barra dourada e a assinatura.
 */
export async function renderBrandOgImage() {
  const poppins = await loadPoppins();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f7f5f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 190,
            fontWeight: 700,
            letterSpacing: -6,
          }}
        >
          <span style={{ color: "#0b0b0b" }}>AO</span>
          <span style={{ color: "#f4b731", margin: "0 4px" }}>/</span>
          <span style={{ color: "#0b0b0b" }}>CUME</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 28 }}>
          <div style={{ width: 44, height: 4, backgroundColor: "#f4b731" }} />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 10,
              color: "#333333",
              margin: "0 20px",
            }}
          >
            COMÉRCIO INTERNACIONAL
          </div>
          <div style={{ width: 44, height: 4, backgroundColor: "#f4b731" }} />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: poppins
        ? [{ name: "Poppins", data: poppins, weight: 700 as const, style: "normal" as const }]
        : undefined,
    }
  );
}
