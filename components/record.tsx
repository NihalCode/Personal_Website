import { record } from "@/content/site";

export function Record() {
  return (
    <section id="record" className="scroll-mt-16 bg-paper px-5 py-24 text-ink md:px-10 md:py-32">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase">
        <span>Det 03 · Record</span>
        <span>{record.when}</span>
      </div>

      <p className="mt-10 font-mono text-xs tracking-[0.2em] uppercase">{record.org}</p>
      <h2 className="mt-2 max-w-[12ch] font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.82] tracking-[-0.045em]">
        {record.title}
      </h2>

      <div className="mt-14 grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-3">
        {record.stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-none tracking-[-0.05em]">
              {stat.value}
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.16em] uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 max-w-3xl text-lg leading-snug md:text-2xl">{record.summary}</p>

      <ul className="mt-14 grid gap-3 border-t border-ink/15 pt-6 md:grid-cols-3">
        {record.earlier.map((item) => (
          <li key={item.what} className="font-mono text-xs tracking-[0.08em] uppercase">
            <span className="block text-ink/50">{item.when}</span>
            {item.what}
          </li>
        ))}
      </ul>
    </section>
  );
}
