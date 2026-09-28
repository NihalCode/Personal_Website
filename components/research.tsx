import { labs } from "@/content/site";

export function Research() {
  return (
    <section id="research" className="scroll-mt-16 px-5 py-24 md:px-10 md:py-32">
      <div className="mb-16 flex items-center justify-between font-mono text-[11px] tracking-[0.22em] text-lime uppercase">
        <span>Det 02 · Research</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-hot" />
          Both active
        </span>
      </div>

      <div className="border-t border-paper/15">
        {labs.map((lab) => (
          <article key={lab.id} className="group border-b border-paper/15 py-10 md:py-14">
            <div className="mb-4 flex items-center justify-between font-mono text-[11px] tracking-[0.18em] uppercase">
              <span className="text-lime">{lab.id}</span>
              <span className="text-mist">{lab.when}</span>
            </div>
            <h2 className="stroke-word font-display text-[clamp(4rem,13vw,11rem)] leading-[0.8] tracking-[-0.045em]">
              {lab.word}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <p className="font-mono text-xs tracking-[0.14em] text-paper uppercase">
                {lab.person}
                <span className="mt-1 block text-mist normal-case tracking-normal">
                  {lab.place}
                </span>
              </p>
              <p className="max-w-xl text-lg leading-snug text-mist md:text-2xl">{lab.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
