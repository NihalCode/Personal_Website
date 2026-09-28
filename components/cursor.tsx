"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const scale = useSpring(1, { stiffness: 400, damping: 30 });
  const sx = useSpring(x, { stiffness: 700, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 42, mass: 0.35 });
  const labelRef = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (labelRef.current) {
        labelRef.current.textContent = `${Math.round(event.clientX)}`.padStart(4, "0");
      }
      const target = event.target instanceof Element ? event.target.closest("a, button") : null;
      scale.set(target ? 1.65 : 1);
    };

    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [scale, x, y]);

  if (!on) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] -mt-[18px] -ml-[18px]"
      style={{ x: sx, y: sy, scale }}
    >
      <div className="relative h-9 w-9">
        <span className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-lime" />
        <span className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-lime" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-lime" />
        <span className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-lime" />
        <span
          ref={labelRef}
          className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.14em] text-lime"
        >
          0000
        </span>
      </div>
    </motion.div>
  );
}
