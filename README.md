# Nihal Samavedam

Personal site. A cutaway room illustrates ongoing vision-language research. The scene is a drawing, not a model output.

## Setup

Node 24 and npm 11 were used. From this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production check:

```bash
npm run build
npm run start
```

End-to-end checks (Playwright, against `next start` on port 4173):

```bash
npx playwright install chromium
npm run test:e2e
```

Fonts are bundled. There is no analytics and no external font request.

## Notes

Content decisions are in `docs/CONTENT_NOTES.md`. The visual direction is in `docs/DESIGN_BRIEF.md`. Generated geometry is described in `docs/ASSETS.md`.

This branch is local. Publishing and the live deployment are separate steps.
