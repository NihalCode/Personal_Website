export const profile = {
  name: "Nihal Samavedam",
  first: "Nihal",
  last: "Samavedam",
  location: "Madison, WI",
  role: "CS · UW–Madison · Dec 2027",
  statement:
    "I evaluate vision-language models in two labs and build the software around them.",
  emails: [
    { label: "Personal", address: "nihalsamavedam0902@gmail.com" },
    { label: "School", address: "samavedam2@wisc.edu" },
  ],
  github: "https://github.com/NihalCode",
  linkedin: "https://www.linkedin.com/in/nihal-samavedam-2a0785287/",
};

export const projects = [
  {
    id: "01",
    title: "AI Support Agent",
    kicker: "Evidence, then an answer",
    summary:
      "A RAG workflow over GitHub, Jira, Zendesk, Confluence, logs, and Slack. It routes ownership, drafts citable replies, and holds anything sensitive in an approval queue.",
    metric: "555",
    metricLabel: "checks across 100 files",
    stack: "Next.js · TypeScript · OpenAI · Pinecone · Postgres · Redis",
    href: "https://github.com/NihalCode/ai-support-agent",
    link: "Open the repo",
  },
  {
    id: "02",
    title: "Runnable API Docs",
    kicker: "Four products, one portal",
    summary:
      "Internship build for Cyware. Semantic search, product-aware answers, runnable snippets, and in-browser API calls across CTIX, CSAP, Orchestrate, and CFTR.",
    metric: "639",
    metricLabel: "endpoints, indexed",
    stack: "Next.js · OpenAPI · Auth0 · Okta · Pinecone",
    href: "https://github.com/NihalCode/intel-exchange-runnable-docs",
    link: "Open the repo",
  },
  {
    id: "03",
    title: "Room VLM",
    kicker: "Name the room",
    summary:
      "Qwen3-VL, LoRA-tuned on NYU Depth V2, classifies a frame as a bedroom, living room, bathroom, or kitchen. Scene-level splits. No training just from opening the repo.",
    metric: "4B",
    metricLabel: "Qwen3-VL instruct",
    stack: "Python · QLoRA · NYU Depth V2 · FastAPI",
    href: "https://github.com/NihalCode/room-vlm",
    link: "Open the repo",
  },
  {
    id: "04",
    title: "Spam RNN",
    kicker: "Text in, a verdict out",
    summary:
      "Tokenization, embeddings, and an LSTM trained on 5,500+ SMS messages. Beside it, a 3-layer CNN with dropout clears 90%+ on 60,000 images.",
    metric: "98.4%",
    metricLabel: "SMS accuracy",
    stack: "Python · TensorFlow · Keras",
    href: "https://github.com/NihalCode/Machine-Learning-and-Deep-Learning/blob/main/Spam_Detection_RNN.ipynb",
    link: "Open the notebook",
    extraHref:
      "https://github.com/NihalCode/Machine-Learning-and-Deep-Learning/blob/main/CNN.ipynb",
    extraLink: "CNN classifier",
  },
] as const;

export const labs = [
  {
    id: "LAB 01",
    word: "madAbility",
    place: "University of Wisconsin–Madison",
    person: "Prof. Yuhang Zhao",
    when: "Mar 2026 — present",
    text: "Leading the efficacy analysis of vision-language models, including OpenAI and Claude, and the Android app study in the lab.",
  },
  {
    id: "LAB 02",
    word: "Discovery",
    place: "Wisconsin Institute for Discovery",
    person: "Prof. Kevin Ponto",
    when: "Sep 2026 — present",
    text: "Vision-language models for low-light, low-latency room detection.",
  },
] as const;

export const record = {
  org: "Cyware",
  title: "Engineer Intern",
  when: "Jun 2026 — Jul 2026 · Remote",
  summary:
    "Shipped an AI documentation and support platform across four cybersecurity products. 70 clients and 51 employees moved onto it. It replaced a third-party tool, about $40K a year. Auth0 and Okta for role-based access, approval gates, and analytics. 1,700+ Vitest and Playwright checks before it was called ready.",
  stats: [
    { value: "639", label: "endpoints indexed" },
    { value: "40%", label: "less triage time" },
    { value: "$40K", label: "saved each year" },
  ],
  earlier: [
    { when: "Sep 2024", what: "Cognifyz · Machine learning trainee" },
    { when: "Aug 2024", what: "Cognifyz · Java development trainee" },
    { when: "Jun 2024", what: "Encryptix · Java developer trainee" },
  ],
};

export const modelCard = {
  groups: [
    {
      label: "Languages",
      value: "Python, Java, TypeScript, JavaScript, SQL, R",
    },
    {
      label: "Web",
      value: "Next.js, React, Node, REST, HTML, CSS",
    },
    {
      label: "Models",
      value: "Vision-language models, RAG, OpenAI API, Pinecone, TensorFlow, scikit-learn",
    },
    {
      label: "Systems",
      value: "PostgreSQL, Redis, Docker, Vercel, Auth0, Okta, Vitest, Playwright",
    },
    {
      label: "Research",
      value: "Dataset building, user studies, Android app analysis",
    },
  ],
  education: [
    {
      school: "UW–Madison",
      detail: "B.S. Computer Sciences · Dec 2027 · 3.8 GPA · Dean’s List, Spring and Summer 2026",
    },
    {
      school: "Golden Gate University",
      detail: "Associate’s, Computer Science · May 2025",
    },
  ],
  languages: "English, Hindi, Telugu",
};

export const menu = [
  { href: "#work", label: "Work", index: "01" },
  { href: "#research", label: "Research", index: "02" },
  { href: "#record", label: "Record", index: "03" },
  { href: "#model", label: "Model card", index: "04" },
  { href: "#contact", label: "Contact", index: "05" },
] as const;

export const marquee =
  "Vision-language models  ·  RAG  ·  Next.js  ·  madAbility  ·  Wisconsin Institute for Discovery  ·  UW–Madison  ·  Qwen3-VL  ·  Auth0  ·  ";
