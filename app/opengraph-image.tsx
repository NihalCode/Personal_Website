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
          background: "#e4e7ea",
          color: "#171a1f",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", width: 72, height: 8, background: "#1f4e5f" }} />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1 }}>
          <div>Nihal</div>
          <div>Samavedam</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
