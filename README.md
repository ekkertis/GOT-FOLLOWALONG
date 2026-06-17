# GOT-FOLLOWALONG

A Game of Thrones episode companion: spoiler-free/spoiler synopses, a live Westeros map, illustrated character portraits, watched-episode tracking, and per-episode notes.

## Stack

- React 18 + Vite (frontend)
- Express (serves the built frontend in production)

Character portraits are static SVGs generated once by `scripts/generate-portraits.mjs` and committed under `public/portraits/`. There's no external API or API key involved — everything runs locally and on Railway with no configuration.

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

`npm start` runs the Express server, which serves the built static files from `dist/` on `PORT` (defaults to `3001`).

## Deploying to Railway

1. Create a new Railway project from this repo.
2. Railway auto-detects Node via Nixpacks and uses `railway.json`, which runs `npm install`, `npm run build`, then `npm start`.
3. Railway injects `PORT` automatically — the server already reads `process.env.PORT`, so no extra config is needed.

## Regenerating character portraits

```bash
node scripts/generate-portraits.mjs
```

Edit the `CHARACTERS` roster in that script to add/adjust characters, then re-run it to refresh the SVGs in `public/portraits/`.
