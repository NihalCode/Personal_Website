"use client";

import { profile } from "@/content/site";
import { useState } from "react";

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden bg-lime px-5 py-20 text-ink md:px-10 md:py-28"
    >
      <p
        aria-hidden
        className="pointer-events-none absolute -top-[0.18em] left-3 font-display text-[22vw] leading-none tracking-[-0.06em] text-transparent select-none md:left-6"
        style={{ WebkitTextStroke: "1.5px #070708" }}
      >
        Contact
      </p>

      <div className="relative pt-[18vw]">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase">Det 05 · Open channel</p>
        <ul className="mt-8 space-y-8">
          {profile.emails.map((item) => (
            <li key={item.address}>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase">{item.label}</p>
              <a
                href={`mailto:${item.address}`}
                className="mt-2 block max-w-full font-display text-[clamp(1.7rem,4.2vw,4.4rem)] leading-[0.9] tracking-[-0.04em] break-all"
              >
                {item.address}
              </a>
              <button
                type="button"
                onClick={() => copy(item.address)}
                className="mt-2 font-mono text-xs tracking-[0.14em] uppercase"
              >
                {copied === item.address ? "Copied" : `Copy ${item.label.toLowerCase()}`}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="font-display text-3xl">
            GitHub →
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-display text-3xl"
          >
            LinkedIn →
          </a>
        </div>

        <p className="mt-16 max-w-md font-mono text-[11px] tracking-[0.12em] uppercase">
          No analytics. No session replay. Fonts are served from this site.
        </p>
      </div>
    </section>
  );
}
