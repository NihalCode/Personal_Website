"use client";

import { ReactLenis } from "lenis/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.085, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
