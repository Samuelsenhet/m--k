/*
 * Simple MCP client for browser/React Native (example).
 * - createSession(): returns { sessionId }
 * - subscribe(sessionId, onEvent): opens EventSource to MCP server stream
 * - invoke(sessionId, tool, args): calls POST /mcp/invoke
 *
 * Note: In React Native you may need an EventSource polyfill.
 */

const MCP_BASE = process.env.MCP_BASE_URL || 'http://localhost:8788';

export async function createSession() {
  const res = await fetch(`${MCP_BASE}/mcp/init`, { method: 'POST' });
  return res.json();
}

export function subscribe(sessionId: string, onEvent: (event: string, payload: any) => void) {
  const url = `${MCP_BASE}/mcp/stream?sessionId=${encodeURIComponent(sessionId)}`;
  const es = new EventSource(url);
  es.onmessage = (ev) => {
    // default message event
    try { onEvent('message', JSON.parse(ev.data)); } catch (e) { onEvent('message', ev.data); }
  };
  es.addEventListener('connected', (ev: any) => { onEvent('connected', JSON.parse(ev.data)); });
  es.addEventListener('invocation_result', (ev: any) => { onEvent('invocation_result', JSON.parse(ev.data)); });
  es.addEventListener('invocation_error', (ev: any) => { onEvent('invocation_error', JSON.parse(ev.data)); });
  es.addEventListener('info_added', (ev: any) => { onEvent('info_added', JSON.parse(ev.data)); });
  es.addEventListener('info_changed', (ev: any) => { onEvent('info_changed', JSON.parse(ev.data)); });
  es.addEventListener('info_deleted', (ev: any) => { onEvent('info_deleted', JSON.parse(ev.data)); });

  return {
    close: () => { es.close(); }
  };
}

export async function invoke(sessionId: string | null, tool: string, args?: any) {
  const body = { sessionId, tool, args };
  const res = await fetch(`${MCP_BASE}/mcp/invoke`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return res.json();
}

export async function listTools() {
  const res = await fetch(`${MCP_BASE}/mcp/tools`);
  return res.json();
}

export default { createSession, subscribe, invoke, listTools };
