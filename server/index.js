import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "../dist");

const PORT = process.env.PORT || 3001;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/portrait", async (req, res) => {
  if (!ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: "Portrait generation is not configured on this server." });
  }

  const { name, house, role, accent, badge } = req.body || {};
  if (!name || !house || !role) {
    return res.status(400).json({ error: "Missing character fields." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Create an SVG portrait (120x160 viewBox) of ${name} from Game of Thrones (${role}, House ${house}).
Return ONLY the SVG element, no markdown, no explanation.
Style: medieval illuminated manuscript / painted portrait. Dark background.
Primary accent color: ${accent}. House badge color: ${badge}.
Include: stylized face appropriate for the character (hair, expression), simple medieval clothing with house colors, decorative border.
Keep shapes simple and bold. Must start with <svg and end with </svg>.`,
        }],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Anthropic API error:", response.status, detail);
      return res.status(502).json({ error: "Portrait generation failed upstream." });
    }

    const data = await response.json();
    const text = (data.content || []).find((b) => b.type === "text")?.text || "";
    const match = text.match(/<svg[\s\S]*?<\/svg>/i);
    if (!match) {
      return res.status(502).json({ error: "No SVG found in model response." });
    }

    res.json({ svg: match[0] });
  } catch (err) {
    console.error("Portrait generation error:", err);
    res.status(500).json({ error: "Failed to generate portrait." });
  }
});

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
