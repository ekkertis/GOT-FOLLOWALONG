# GOT-FOLLOWALONG

A Game of Thrones episode companion: spoiler-free/spoiler synopses, active-location view, illustrated character portraits, watched-episode tracking, and per-episode notes.

## Stack

- React 18 + Vite (frontend)
- Express (serves the built frontend in production)

Character portraits are now rendered as inline SVGs in `src/components/GOTCompanionExpanded.jsx`. There is no external image API or API key involved — everything runs locally and on Railway with no configuration.

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

## Character portraits and roster

To add or adjust character art, edit the inline `Avatar` component in `src/components/GOTCompanionExpanded.jsx`. To add more characters, update the `P` people map and the episode character arrays in the same file.

The older `scripts/generate-portraits.mjs` script and committed files under `public/portraits/` are still present as a static-export helper, but the live app now uses generated inline SVG portraits instead of those static files.
