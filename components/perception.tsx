"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { profile, sceneModes, type SceneModeId } from "@/content/site";
import { ControlGroup } from "./control-group";
import { RoomPoster } from "./room-poster";

const RoomCanvas = dynamic(() => import("./room-canvas"), {
  ssr: false,
});

export function Perception() {
  const [mode, setMode] = useState<SceneModeId>("observe");
  const [reduced, setReduced] = useState(false);
  const locked = useRef(false);
  const sceneRef = useRef<HTMLElement>(null);
  const structureRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const nodes: Array<[HTMLElement | null, SceneModeId]> = [
      [sceneRef.current, "observe"],
      [structureRef.current, "interpret"],
      [descriptionRef.current, "communicate"],
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        if (locked.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = nodes.find(([node]) => node === visible.target)?.[1];
        if (next) setMode(next);
      },
      { threshold: [0.6] },
    );
    for (const [node] of nodes) {
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  function choose(id: string) {
    locked.current = true;
    setMode(id as SceneModeId);
  }

  return (
    <section id="top" className="px-4 pb-20 pt-8">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="max-w-[12ch] font-display text-[clamp(2.6rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-tight">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-[36ch] text-lg leading-snug text-ink">{profile.statement}</p>
        <div className="mt-6">
          <ControlGroup label="Room state" value={mode} options={sceneModes} onChange={choose} />
        </div>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.8fr)]">
          <div className="relative aspect-[4/3] w-full bg-paper lg:sticky lg:top-24 lg:max-h-[62dvh]">
            <RoomPoster mode={mode} />
            <RoomCanvas mode={mode} reduced={reduced} />
          </div>
          <div className="flex flex-col gap-8">
            {sceneModes.map((item) => {
              const ref =
                item.id === "observe" ? sceneRef : item.id === "interpret" ? structureRef : descriptionRef;
              const active = mode === item.id;
              return (
                <article
                  key={item.id}
                  ref={ref}
                  aria-current={active ? "true" : undefined}
                  className={`border-l-2 pl-4 ${active ? "border-accent text-ink" : "border-line text-muted"}`}
                >
                  <h2 className="font-display text-2xl font-medium">{item.label}</h2>
                  <p className="mt-2 max-w-[58ch] leading-relaxed">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
