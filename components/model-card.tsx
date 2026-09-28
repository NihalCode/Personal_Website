import { modelCard } from "@/content/site";

export function ModelCard() {
  return (
    <section id="model" className="scroll-mt-16 px-5 py-24 md:px-10 md:py-32">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] text-lime uppercase">
        <span>Det 04 · Spec</span>
        <span>Model card</span>
      </div>

      <h2 className="mt-8 font-display text-[clamp(4rem,12vw,10rem)] leading-[0.8] tracking-[-0.05em]">
        What I
        <span className="block text-lime">actually use.</span>
      </h2>

      <dl className="mt-16 border-t border-paper/15">
        {modelCard.groups.map((group) => (
          <div
            key={group.label}
            className="grid gap-2 border-b border-paper/15 py-6 md:grid-cols-[180px_1fr] md:items-baseline"
          >
            <dt className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">
              {group.label}
            </dt>
            <dd className="text-xl leading-snug md:text-3xl">{group.value}</dd>
          </div>
        ))}
        <div className="grid gap-2 border-b border-paper/15 py-6 md:grid-cols-[180px_1fr]">
          <dt className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">
            Education
          </dt>
          <dd className="space-y-4">
            {modelCard.education.map((item) => (
              <p key={item.school} className="text-xl leading-snug md:text-3xl">
                <span className="text-paper">{item.school}</span>
                <span className="mt-1 block text-base text-mist md:text-lg">{item.detail}</span>
              </p>
            ))}
          </dd>
        </div>
        <div className="grid gap-2 border-b border-paper/15 py-6 md:grid-cols-[180px_1fr] md:items-baseline">
          <dt className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">
            Languages
          </dt>
          <dd className="text-xl md:text-3xl">{modelCard.languages}</dd>
        </div>
      </dl>
    </section>
  );
}
