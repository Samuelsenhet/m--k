/**
 * Simple Express proxy example to keep Anthropic API key server-side.
 * Run with: `node ./server/claudeProxy.js` (build/ts-node as needed).
 */

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8787;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_BASE = 'https://api.anthropic.com/v1';

if (!ANTHROPIC_KEY) {
  // eslint-disable-next-line no-console
  console.warn('Warning: ANTHROPIC_API_KEY not set — proxy will return mocks.');
}

app.post('/api/generate-icebreakers', async (req, res) => {
  const { profileText, count = 3 } = req.body || {};
  if (!profileText) return res.status(400).json({ error: 'profileText required' });

  if (!ANTHROPIC_KEY) {
    // Return simple mock
    return res.json({ icebreakers: Array.from({ length: count }).map((_, i) => ({ text: `Mock icebreaker ${i + 1} for ${profileText.slice(0, 30)}` })) });
  }

  try {
    const prompt = `Generate ${count} short, friendly icebreaker questions in Swedish tailored to this profile:\n\n${profileText}\n\nReturn as a numbered list, each on its own line.`;
    const body = { prompt, model: 'claude-2', max_tokens: 400, temperature: 0.7 };
    const r = await fetch(`${ANTHROPIC_BASE}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': ANTHROPIC_KEY },
      body: JSON.stringify(body),
    });
    const json = await r.json() as { completion?: string; text?: string };
    const text = json?.completion ?? json?.text ?? JSON.stringify(json);
    const lines = text.split(/\n+/).map((l: string) => l.replace(/^[0-9\.\)\-\s]+/, '').trim()).filter(Boolean);
    return res.json({ icebreakers: lines.slice(0, count).map((t: string) => ({ text: t })) });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? String(err) });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Claude proxy listening on http://localhost:${PORT}`);
});
