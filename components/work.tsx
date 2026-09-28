"use client";

import { useState } from "react";
import { supportViews, type SupportViewId } from "@/content/site";
import { ControlGroup } from "./control-group";

const studies = [
  {
    id: "room",
    title: "Room VLM",
    summary: "Four room labels from NYU Depth frames.",
    body: (
      <>
        <p>
          Qwen3-VL-4B-Instruct, adapted with LoRA and QLoRA. Scene-level splits keep neighboring video frames from leaking into the test set. A conventional classifier would be cheaper for four classes. This project studies the VLM path on purpose.
        </p>
        <p>
          The pipeline can serve an image or a sampled video and return one label. The repository does not download weights when you open it, and this site does not run inference.
        </p>
        <p>
          <a className="text-accent underline" href="https://github.com/NihalCode/room-vlm">
            Repository
          </a>
        </p>
      </>
    ),
  },
  {
    id: "agent",
    title: "AI support agent",
    summary: "Evidence, a routing decision, and an approval gate.",
    body: null,
  },
  {
    id: "docs",
    title: "Runnable API documentation",
    summary: "An unofficial reference for four Cyware products.",
    body: (
      <>
        <p>
          Internship work, published separately from Cyware's own docs. The public repository indexes 639 endpoints across CTIX, CSAP, Orchestrate, and CFTR, with semantic search and runnable snippets.
        </p>
        <p>
          <a className="text-accent underline" href="https://github.com/NihalCode/intel-exchange-runnable-docs">
            Repository
          </a>
        </p>
      </>
    ),
  },
  {
    id: "notebooks",
    title: "Earlier models",
    summary: "Two course notebooks, with the metrics kept specific.",
    body: (
      <>
        <p>
          An LSTM spam detector reached 98.4% accuracy on a validation set of more than 5,500 SMS messages.
        </p>
        <p>
          A three-layer CNN with dropout reached above 90% on Fashion-MNIST, which has 60,000 images. That figure is not the result of the smaller CIFAR-10 exercise.
        </p>
        <p className="flex flex-col gap-2">
          <a
            className="text-accent underline"
            href="https://github.com/NihalCode/Machine-Learning-and-Deep-Learning/blob/main/Spam_Detection_RNN.ipynb"
          >
            Spam detection notebook
          </a>
          <a
            className="text-accent underline"
            href="https://github.com/NihalCode/Machine-Learning-and-Deep-Learning/blob/main/CNN.ipynb"
          >
            CNN notebook
          </a>
        </p>
      </>
    ),
  },
] as const;

export function Work() {
  const [open, setOpen] = useState<string>("agent");
  const [view, setView] = useState<SupportViewId>("alert");
  const active = supportViews.find((item) => item.id === view) ?? supportViews[0];

  return (
    <section id="work" className="border-t border-line px-4 py-20">
      <div className="mx-auto max-w-[760px]">
        <h2 className="font-display text-4xl font-medium tracking-tight">Work</h2>
        <p className="mt-4 max-w-[58ch] leading-relaxed">
          At Cyware, from June to July 2026, I built an AI documentation and support platform for four cybersecurity products. It served 70 clients and 51 employees. Replacing a third-party tool saved about $40,000 a year, and support triage took about 40% less time. Access control used Auth0 and Okta.
        </p>
        <div className="mt-10">
          {studies.map((study) => {
            const expanded = open === study.id;
            return (
              <article key={study.id} className="border-t border-line py-6">
                <h3 className="font-display text-2xl font-medium">
                  <button
                    type="button"
                    className="flex w-full items-baseline justify-between gap-4 text-left"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? "" : study.id)}
                  >
                    <span>
                      {study.title}
                      <span className="mt-1 block text-base font-normal text-muted">{study.summary}</span>
                    </span>
                    <span className="shrink-0 text-sm text-accent">{expanded ? "Hide" : "Show"}</span>
                  </button>
                </h3>
                {expanded ? (
                  <div className="mt-4 max-w-[62ch] space-y-3 leading-relaxed">
                    {study.id === "agent" ? (
                      <>
                        <p>
                          The public agent retrieves repository and ticket context, proposes a diagnosis, and decides whether the client, support, or engineering should take the next step. State-changing actions stay behind an approval queue. With no credentials it runs on mocks. It can connect to GitHub, Jira, and Cyware CTIX when keys are present. This website does not host that agent.
                        </p>
                        <div className="mt-6 border border-line p-4">
                          <p className="text-sm text-muted">Static example</p>
                          <div className="mt-3">
                            <ControlGroup
                              label="Support example"
                              value={view}
                              options={supportViews}
                              onChange={(id) => setView(id as SupportViewId)}
                            />
                          </div>
                          <p className="mt-4 leading-relaxed">{active.body}</p>
                        </div>
                        <p>
                          <a className="text-accent underline" href="https://github.com/NihalCode/ai-support-agent">
                            Repository
                          </a>
                        </p>
                      </>
                    ) : (
                      study.body
                    )}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
