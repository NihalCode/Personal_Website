import { profile } from "@/content/site";

const links = [
  { href: "#research", label: "Research" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4">
        <a href="#top" className="font-display text-base font-medium tracking-tight sm:text-lg">
          <span className="sm:hidden">Nihal</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>
        <nav aria-label="Page" className="flex items-center gap-3 text-sm sm:gap-6">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-ink">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
