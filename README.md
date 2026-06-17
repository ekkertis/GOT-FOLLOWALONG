# GOT-FOLLOWALONG

A Game of Thrones episode companion: spoiler-free/spoiler synopses, a live Westeros map, AI-illustrated character portraits, watched-episode tracking, and per-episode notes.

## Stack

- React 18 + Vite (frontend)
- Express (serves the built frontend and proxies AI portrait generation)

## Local development

```bash
npm install
npm run dev
```

This runs the Vite dev server (`http://localhost:5173`) and the API server (`http://localhost:3001`) together, with `/api/*` requests proxied to the API server.

To enable the AI-illustrated character portraits locally, copy `.env.example` to `.env` and set `ANTHROPIC_API_KEY`. Without a key, the app works normally — the Characters tab just shows initials instead of generated portraits.

## Production build

```bash
npm run build
npm start
```

`npm start` runs the Express server, which serves the built static files from `dist/` and exposes the `/api/portrait` endpoint on `PORT` (defaults to `3001`).

## Deploying to Railway

1. Create a new Railway project from this repo.
2. Railway auto-detects Node via Nixpacks and uses `railway.json`, which runs `npm install`, `npm run build`, then `npm start`.
3. Set the `ANTHROPIC_API_KEY` environment variable in the Railway project settings if you want AI portrait generation enabled in production.
4. Railway injects `PORT` automatically — the server already reads `process.env.PORT`, so no extra config is needed.
