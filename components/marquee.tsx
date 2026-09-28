import { marquee } from "@/content/site";

export function Marquee() {
  const line = `${marquee}${marquee}`;
  return (
    <div className="overflow-hidden border-y border-ink bg-lime text-ink">
      <div className="marquee-track flex w-max py-3">
        <p className="px-4 font-mono text-sm tracking-[0.18em] uppercase whitespace-nowrap">
          {line}
        </p>
      </div>
    </div>
  );
}
