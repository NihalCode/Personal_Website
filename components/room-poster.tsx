import type { SceneModeId } from "@/content/site";

export function RoomPoster({ mode }: { mode: SceneModeId }) {
  return (
    <div className="poster" data-mode={mode} aria-hidden="true">
      <div className="poster-wall" />
      <div className="poster-window" />
      <div className="poster-floor" />
      <div className="poster-desk" />
      <div className="poster-chair" />
      <div className="poster-lamp" />
      <div className="poster-door" />
      <span className="poster-point" style={{ left: "22%", bottom: "33%" }} />
      <span className="poster-point" style={{ left: "52%", bottom: "33%" }} />
      <span className="poster-point" style={{ left: "40%", bottom: "42%" }} />
      <span className="poster-point" style={{ left: "30%", top: "22%" }} />
      <span className="poster-point" style={{ right: "18%", bottom: "24%" }} />
    </div>
  );
}
