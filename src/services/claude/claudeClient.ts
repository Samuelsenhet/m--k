/*
 * Claude client scaffold
 * - Prefers server-side usage. If API key is missing, functions return safe mocks.
 * - Reads key from `ANTHROPIC_API_KEY` or `EXPO_PUBLIC_ANTHROPIC_API_KEY`.
 * - Example functions: `generateIcebreakers`, `analyzePersonality`.
 */

type Icebreaker = { text: string };

const CLAUDE_KEY = process.env.ANTHROPIC_API_KEY || process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || '';
const ANTHROPIC_BASE = 'https://api.anthropic.com/v1';

async function sendPrompt(prompt: string, system = ''): Promise<string> {
  if (!CLAUDE_KEY) {
    // Return a simple mocked response for local development
    return `MOCK_RESPONSE: ${prompt.slice(0, 120)}`;
  }

  try {
    /* Claude client improved scaffold
     * - Attempts to use the `@anthropic-ai/sdk` if available (server-side).
     * - Falls back to direct REST fetch or a safe mock when no key is present.
     */

    type Icebreaker = { text: string };

    const CLAUDE_KEY = process.env.ANTHROPIC_API_KEY || process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || '';
    const ANTHROPIC_BASE = 'https://api.anthropic.com/v1';

    async function sendPromptWithSdk(prompt: string): Promise<string | null> {
      try {
        // dynamic import to avoid bundling SDK into client bundles
        // @ts-ignore
        const sdk = await import('@anthropic-ai/sdk');
        // SDK shape may vary; attempt common constructors
        const Anthropic = sdk?.Anthropic || sdk?.default || sdk;
        if (!Anthropic) return null;
        const client = new Anthropic({ apiKey: CLAUDE_KEY });
        // Try common completion method names
        // @ts-ignore
        if (typeof client.completions?.create === 'function') {
          // @ts-ignore
          const res = await client.completions.create({ model: 'claude-2', prompt, max_tokens: 400, temperature: 0.7 });
          // @ts-ignore
          return res?.completion ?? res?.output?.[0]?.content?.[0]?.text ?? JSON.stringify(res);
        }
        // Fallback: try `complete` method
        // @ts-ignore
        if (typeof client.complete === 'function') {
          // @ts-ignore
          const res = await client.complete({ model: 'claude-2', prompt, max_tokens: 400, temperature: 0.7 });
          // @ts-ignore
          return res?.completion ?? res?.text ?? JSON.stringify(res);
        }
      } catch (e) {
        // SDK not available or errored; caller will fallback
      }
      return null;
    }

    async function sendPromptWithFetch(prompt: string): Promise<string> {
      if (!CLAUDE_KEY) {
        return `MOCK_RESPONSE: ${prompt.slice(0, 120)}`;
      }

      try {
        const body = { prompt, model: 'claude-2', max_tokens: 400, temperature: 0.7 };
        const res = await fetch(`${ANTHROPIC_BASE}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': CLAUDE_KEY },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Anthropic API error: ${res.status} ${txt}`);
        }
        const json = await res.json();
        return json?.completion ?? json?.text ?? JSON.stringify(json);
      } catch (err: any) {
        return `ERROR: ${err?.message ?? String(err)}`;
      }
    }

    async function sendPrompt(prompt: string): Promise<string> {
      // Prefer SDK when available
      const sdkResp = await sendPromptWithSdk(prompt);
      if (sdkResp !== null) return sdkResp;
      return await sendPromptWithFetch(prompt);
    }

    export async function generateIcebreakers({ profileText, count = 3 }: { profileText: string; count?: number; }): Promise<Icebreaker[]> {
      const prompt = `Generate ${count} short, friendly icebreaker questions in Swedish tailored to this profile:\n\n${profileText}\n\nReturn as a numbered list, each on its own line.`;
      const resp = await sendPrompt(prompt);
      const lines = resp.split(/\n+/).map(l => l.replace(/^[0-9\.\)\-\s]+/, '').trim()).filter(Boolean);
      return lines.slice(0, count).map(t => ({ text: t }));
    }

    export async function analyzePersonality(answers: number[]): Promise<{ summary: string; traits: Record<string, number> }> {
      const prompt = `You are given a 30-item Likert answers array (1-5). Convert the answers into five dimension scores (E/I, S/N, T/F, J/P, A/T) as percentages and provide a short Swedish summary and suggested conversation starters. Answers: ${JSON.stringify(answers)}`;
      const text = await sendPrompt(prompt);
      const summary = text.slice(0, 800);
      return { summary, traits: {} };
    }

    export default { generateIcebreakers, analyzePersonality };
