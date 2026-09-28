"use client";

import { projects } from "@/content/site";
import { useLenis } from "lenis/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const frames = [
  ...projects,
  {
    id: "05",
    title: "Keep going",
    kicker: "End of reel",
    summary: "Two labs. One internship. The model card is the spec sheet.",
    metric: "↓",
    metricLabel: "scroll",
    stack: "",
    href: "#research",
    link: "Research",
    extraHref: undefined,
    extraLink: undefined,
    invert: true,
  },
];

function Panel({
  frame,
  index,
  pin = false,
  onFocusPanel,
}: {
  frame: (typeof frames)[number];
  index: number;
  pin?: boolean;
  onFocusPanel?: (index: number) => void;
}) {
  const invert = "invert" in frame && frame.invert;
  return (
    <article
      data-index={index}
      className={`flex shrink-0 flex-col justify-between px-5 py-24 md:px-12 ${
        pin ? "h-[100svh] w-screen" : "min-h-[100svh] w-full"
      } ${invert ? "bg-lime text-ink" : "bg-ink text-paper"}`}
    >
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase">
        <span className={invert ? "text-ink" : "text-lime"}>Frame {frame.id}</span>
        <span className={invert ? "text-ink/70" : "text-mist"}>{frame.kicker}</span>
      </div>

      <h3 className="max-w-[10ch] font-display text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.82] tracking-[-0.04em]">
        {frame.title}
      </h3>

      <div className="grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className={`max-w-md text-lg leading-snug ${invert ? "text-ink/80" : "text-mist"}`}>
            {frame.summary}
          </p>
          {frame.stack ? (
            <p className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase">{frame.stack}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={frame.href}
              onFocus={() => onFocusPanel?.(index)}
              className="font-display text-2xl"
              {...(frame.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {frame.link}
              <span> →</span>
            </a>
            {"extraHref" in frame && frame.extraHref ? (
              <a
                href={frame.extraHref}
                target="_blank"
                rel="noreferrer"
                onFocus={() => onFocusPanel?.(index)}
                className="font-display text-2xl"
              >
                {frame.extraLink}
                <span> →</span>
              </a>
            ) : null}
          </div>
        </div>
        <div className="md:text-right">
          <p
            className={`font-display text-[clamp(4.5rem,9vw,8rem)] leading-none tracking-[-0.05em] ${
              invert ? "text-ink" : "text-lime"
            }`}
          >
            {frame.metric}
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.18em] uppercase">
            {frame.metricLabel}
          </p>
        </div>
      </div>
    </article>
  );
}

function Stack() {
  return (
    <div>
      {frames.map((frame, index) => (
        <Panel key={frame.id} frame={frame} index={index} />
      ))}
    </div>
  );
}

function Reel() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -max]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setMax(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const reveal = (index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const travel = root.offsetHeight - window.innerHeight;
    const top = root.offsetTop + (travel * index) / (frames.length - 1);
    if (lenis) {
      lenis.scrollTo(top, { immediate: true });
      return;
    }
    window.scrollTo({ top, behavior: "auto" });
  };

  return (
    <section ref={rootRef} className="relative h-[500svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex h-full w-max">
          {frames.map((frame, index) => (
            <Panel key={frame.id} frame={frame} index={index} pin onFocusPanel={reveal} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <div id="work">
      <div className="work-reel">
        <Reel />
      </div>
      <div className="work-stack">
        <Stack />
      </div>
    </div>
  );
}
