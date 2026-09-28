export function Research() {
  return (
    <section id="research" className="border-t border-line px-4 py-20">
      <div className="mx-auto max-w-[760px]">
        <h2 className="font-display text-4xl font-medium tracking-tight">Research</h2>
        <div className="mt-10 space-y-8 leading-relaxed">
          <article>
            <h3 className="font-display text-2xl font-medium">madAbility</h3>
            <p className="mt-1 text-sm text-muted">2026-present, Prof. Yuhang Zhao</p>
            <p className="mt-3">
              I study how vision-language models answer visual questions, including OpenAI and Claude models. I lead the efficacy analysis on the current project.
            </p>
          </article>
          <article>
            <h3 className="font-display text-2xl font-medium">Wisconsin Institute for Discovery</h3>
            <p className="mt-1 text-sm text-muted">September 2026 to present, Prof. Kevin Ponto</p>
            <p className="mt-3">
              Undergraduate research on vision-language models for low-light room understanding. The room on this page is a drawing of that problem. It is not a reconstruction from the model, and it is not a latency or accuracy result.
            </p>
          </article>
          <article>
            <h3 className="font-display text-2xl font-medium">Room VLM</h3>
            <p className="mt-3">
              The public project fine-tunes Qwen3-VL-4B-Instruct with LoRA and QLoRA on NYU Depth V2. Frames come from video, and every frame from one physical room stays in the same split. The label is one of bedroom, living room, bathroom, or kitchen. Opening the repository does not train a model.
            </p>
            <p className="mt-3">
              <a className="text-accent underline" href="https://github.com/NihalCode/room-vlm">
                Room VLM repository
              </a>
            </p>
          </article>
          <article>
            <h3 className="font-display text-2xl font-medium">Earlier research</h3>
            <p className="mt-1 text-sm text-muted">October 2024 to January 2025, Prof. Durga Sharma</p>
            <p className="mt-3">
              At Golden Gate University I compared machine-learning models on NASA GRACE data. Random Forest was the model we kept, and tuning cut its cost by about 15%.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
