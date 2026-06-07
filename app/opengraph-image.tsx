import { ImageResponse } from "next/og";

export const alt = "Courtside Padel — Padel-lessen die bij jou passen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#F4EFE3",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(15,32,26,0.68)",
          }}
        >
          PADEL · PROGRAM Nº 024
        </div>
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 96,
            lineHeight: 1,
            color: "#0F201A",
            marginTop: 24,
          }}
        >
          Courtside Padel
        </div>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 36,
            color: "rgba(15,32,26,0.68)",
            marginTop: 24,
          }}
        >
          Padel-lessen die bij jou passen
        </div>
      </div>
    ),
    { ...size },
  );
}
