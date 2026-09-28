"use client";

import { profile } from "@/content/site";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.h1
      className="font-display text-[clamp(2.15rem,10.4vw,12.5rem)] leading-[0.82] tracking-[-0.045em] whitespace-nowrap"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.035, delayChildren: delay } },
      }}
    >
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.8, ease } },
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between px-5 pt-24 pb-8 md:px-10"
    >
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] text-lime uppercase">
        <span>Det 00 · Subject</span>
        <span className="hidden sm:inline">{profile.location}</span>
        <span>Conf 0.97</span>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute -inset-x-2 -inset-y-5 md:-inset-x-4 md:-inset-y-8">
          <span className="absolute top-0 left-0 h-10 w-10 border-t-[3px] border-l-[3px] border-lime" />
          <span className="absolute top-0 right-0 h-10 w-10 border-t-[3px] border-r-[3px] border-lime" />
          <span className="absolute bottom-0 left-0 h-10 w-10 border-b-[3px] border-l-[3px] border-lime" />
          <span className="absolute right-0 bottom-0 h-10 w-10 border-r-[3px] border-b-[3px] border-lime" />
          <span className="absolute -top-3 left-8 bg-lime px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] text-ink">
            PERSON · 0.97
          </span>
          <motion.span
            aria-hidden
            className="absolute right-4 left-4 h-px bg-lime"
            initial={{ top: "8%", opacity: 0 }}
            animate={{ top: ["8%", "92%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, delay: 0.7, ease: "easeInOut", times: [0, 0.15, 0.8, 1] }}
          />
        </div>

        <Line text={profile.first} delay={0.08} />
        <Line text={profile.last} delay={0.22} />

        <motion.p
          className="mt-8 max-w-xl text-lg leading-snug text-mist md:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease }}
        >
          {profile.statement}
        </motion.p>
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">
          {profile.role}
        </p>
        <a href="#work" className="font-display text-2xl tracking-tight md:text-4xl">
          Enter the reel
          <span className="text-lime"> →</span>
        </a>
      </div>
    </header>
  );
}
