"use client";

import { menu, profile } from "@/content/site";
import { Cursor } from "@/components/cursor";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [lenis, open]);

  const go = (href: string) => {
    setOpen(false);
    lenis?.start();
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -8 });
      return;
    }
    target.scrollIntoView();
  };

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed top-0 left-0 z-[75] h-[3px] w-full origin-left bg-lime"
      />
      <header className="fixed top-0 z-40 flex w-full items-center justify-between px-5 py-5 mix-blend-difference md:px-10">
        <a href="#top" className="font-display text-2xl tracking-tight text-white">
          NS
        </a>
        <div className="flex items-center gap-6 text-white">
          <nav className="hidden items-center gap-5 font-mono text-[11px] tracking-[0.18em] uppercase md:flex">
            {menu.slice(0, 3).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="font-mono text-[11px] tracking-[0.18em] uppercase"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Sections"
            className="fixed inset-0 z-50 flex flex-col bg-ink px-5 py-8 md:px-10"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.2em] text-lime uppercase">
                Ctrl K
              </span>
              <button type="button" onClick={() => setOpen(false)} className="font-display text-3xl">
                Close
              </button>
            </div>
            <ul className="mt-8 flex flex-1 flex-col justify-center">
              {menu.map((item) => (
                <li key={item.href} className="border-t border-paper/15">
                  <button
                    type="button"
                    onClick={() => go(item.href)}
                    className="group flex w-full items-baseline gap-5 py-3 text-left md:py-4"
                  >
                    <span className="font-mono text-xs text-lime">{item.index}</span>
                    <span className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.85] tracking-[-0.045em] group-hover:text-lime">
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-1 font-mono text-xs tracking-[0.12em] text-mist">
              {profile.emails.map((item) => (
                <a key={item.address} href={`mailto:${item.address}`}>
                  {item.address}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
      <Cursor />
    </>
  );
}
