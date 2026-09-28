import { profile } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line px-4 py-20">
      <div className="mx-auto max-w-[760px]">
        <h2 className="font-display text-4xl font-medium tracking-tight">Contact</h2>
        <div className="mt-8 space-y-6">
          <p>
            <span className="block text-sm text-muted">Academic</span>
            <a className="text-lg text-accent underline" href={`mailto:${profile.emails.academic}`}>
              {profile.emails.academic}
            </a>
          </p>
          <p>
            <span className="block text-sm text-muted">Personal</span>
            <a className="text-accent underline" href={`mailto:${profile.emails.personal}`}>
              {profile.emails.personal}
            </a>
          </p>
          <p className="flex flex-col gap-2">
            <a className="text-accent underline" href={profile.links.github}>
              GitHub
            </a>
            <a className="text-accent underline" href={profile.links.linkedin}>
              LinkedIn
            </a>
          </p>
        </div>
        <p className="mt-12 max-w-[52ch] text-sm text-muted">
          No analytics. No session replay. Fonts are served from this site.
        </p>
      </div>
    </section>
  );
}
