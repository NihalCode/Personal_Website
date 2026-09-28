export const profile = {
  name: "Nihal Samavedam",
  statement: "Computer Science at UW-Madison. I study how a model describes a room.",
  emails: {
    academic: "samavedam2@wisc.edu",
    personal: "nihalsamavedam0902@gmail.com",
  },
  links: {
    github: "https://github.com/NihalCode",
    linkedin: "https://www.linkedin.com/in/nihal-samavedam-2a0785287/",
  },
} as const;

export const sceneModes = [
  {
    id: "observe",
    label: "Scene",
    body: "One lamp, a window, and most of the room still in shadow. This is the kind of view the low-light work has to start from. The model is not running here.",
  },
  {
    id: "interpret",
    label: "Structure",
    body: "Points sit on the edges of the desk, chair, lamp, walls, window, and doorway. They show the idea of sampling a room. They are not a reconstruction from Room VLM.",
  },
  {
    id: "communicate",
    label: "Description",
    body: "The same room, lit enough to name. Room VLM's job is one label: bedroom, living room, bathroom, or kitchen. It does not rebuild the furniture.",
  },
] as const;

export type SceneModeId = (typeof sceneModes)[number]["id"];

export const supportViews = [
  {
    id: "alert",
    label: "Alert",
    body: "After the release, indicator search on CTIX returns HTTP 404. The client can still sign in.",
  },
  {
    id: "reading",
    label: "Reading",
    body: "Product: CTIX. Failure: a published search path returns 404. Likely owner: support checks the path and the release notes before engineering is asked. This sample is not a live ticket, and the agent is not running on this site.",
  },
] as const;

export type SupportViewId = (typeof supportViews)[number]["id"];
