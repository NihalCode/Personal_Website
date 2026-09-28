export function About() {
  return (
    <section id="about" className="border-t border-line px-4 py-20">
      <div className="mx-auto max-w-[760px]">
        <h2 className="font-display text-4xl font-medium tracking-tight">About</h2>
        <dl className="mt-10 space-y-6">
          <div>
            <dt className="text-sm text-muted">School</dt>
            <dd className="mt-1 max-w-[58ch] leading-relaxed">
              Bachelor of Science in Computer Science, University of Wisconsin-Madison, expected December 2027. GPA 3.8. Dean's List, Spring 2026 and Summer 2026.
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Tools</dt>
            <dd className="mt-1 max-w-[58ch] leading-relaxed">
              Python and TypeScript. The current work is vision-language models, retrieval, and the support tooling from the Cyware internship.
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Languages</dt>
            <dd className="mt-1">English, Hindi, and Telugu.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
