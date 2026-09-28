"use client";

import { Canvas } from "@react-three/fiber";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import type { SceneModeId } from "@/content/site";
import { RoomPoster } from "./room-poster";
import { RoomScene } from "./room-scene";

class CanvasGuard extends Component<
  { mode: SceneModeId; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div
          className="absolute inset-0"
          role="img"
          aria-label="Architectural elevation of a desk, chair, lamp, window, and doorway."
        >
          <RoomPoster mode={this.props.mode} />
        </div>
      );
    }
    return this.props.children;
  }
}

export default function RoomCanvas({
  mode,
  reduced,
}: {
  mode: SceneModeId;
  reduced: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = wrap.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    const kick = () => window.dispatchEvent(new Event("resize"));
    const frame = requestAnimationFrame(kick);
    const timer = window.setTimeout(kick, 60);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  if (failed) {
    return (
      <div
        className="absolute inset-0"
        role="img"
        aria-label="Architectural elevation of a desk, chair, lamp, window, and doorway."
      >
        <RoomPoster mode={mode} />
      </div>
    );
  }

  return (
    <CanvasGuard mode={mode}>
      <div ref={wrap} className="absolute inset-0">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [1.85, 1.32, 3.35], fov: 32, near: 0.1, far: 40 }}
          frameloop={inView && !reduced ? "always" : "demand"}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            gl.setClearColor("#e4e7ea");
            gl.domElement.addEventListener("webglcontextlost", (event) => {
              event.preventDefault();
              setFailed(true);
            });
          }}
        >
          <RoomScene mode={mode} reduced={reduced} />
        </Canvas>
      </div>
    </CanvasGuard>
  );
}
