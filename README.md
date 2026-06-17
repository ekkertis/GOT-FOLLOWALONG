# GOT-FOLLOWALONG

A Game of Thrones episode companion: spoiler-free/spoiler synopses, a live Westeros map, illustrated character portraits, watched-episode tracking, and per-episode notes.

## Stack

- React 18 + Vite (frontend)
- Express (serves the built frontend in production)

Character portraits are static SVGs generated once by `scripts/generate-portraits.mjs` and committed under `public/portraits/`.

## Local development

```bash
npm install
npm run dev
```

Runs the Vite dev server at `http://localhost:5173`.

## Production build

```bash
npm run build
npm start
```

`npm start` runs the Express server, which serves the built static files from `dist/` on `PORT`.
