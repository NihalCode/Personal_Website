import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070708",
          color: "#f4f4f0",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", color: "#d6ff3f", fontSize: 24 }}>
          DET 00 · PERSON · 0.97
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 0.9 }}>
          <div>Nihal</div>
          <div>Samavedam</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
