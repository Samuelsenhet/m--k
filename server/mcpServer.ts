import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

/**
 * Minimal MCP protocol server (example)
 * - Endpoints:
 *   POST /mcp/init -> { sessionId }
 *   GET  /mcp/stream?sessionId= -> SSE event stream
 *   POST /mcp/invoke -> { sessionId, tool, args } -> executes tool and returns result
 *   GET  /mcp/tools -> list available tools/resources
 *
 * - Tools implemented: read_info, insert_info, change_info, delete_info
 * - Emits resource events: info_added, info_changed, info_deleted
 */

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.MCP_PORT || 8788;

type Session = {
  id: string;
  clients: Array<express.Response>;
};

const sessions: Record<string, Session> = {};

// In-memory datastore for example
type RecordItem = { id: string; [k: string]: any };
const datastore: Record<string, RecordItem> = {};

const tools: Record<string, Function> = {};

function emitEvent(sessionId: string | null, event: string, payload: any) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  if (sessionId && sessions[sessionId]) {
    sessions[sessionId].clients.forEach(res => {
      try { res.write(msg); } catch (e) { /* ignore */ }
    });
  }
  // Broadcast to all sessions as well
  Object.values(sessions).forEach(s => {
    s.clients.forEach(res => {
      try { res.write(msg); } catch (e) { /* ignore */ }
    });
  });
}

// Tool implementations
tools.read_info = async ({ id }: { id?: string }) => {
  if (id) return datastore[id] ?? null;
  return Object.values(datastore);
};

tools.insert_info = async ({ record }: { record: any }) => {
  const id = uuidv4();
  const item = { id, ...record } as RecordItem;
  datastore[id] = item;
  // emit resource event
  emitEvent(null, 'info_added', { item });
  return item;
};

tools.change_info = async ({ id, changes }: { id: string; changes: any }) => {
  if (!datastore[id]) throw new Error('Not found');
  datastore[id] = { ...datastore[id], ...changes };
  emitEvent(null, 'info_changed', { item: datastore[id] });
  return datastore[id];
};

tools.delete_info = async ({ id }: { id: string }) => {
  if (!datastore[id]) throw new Error('Not found');
  const item = datastore[id];
  delete datastore[id];
  emitEvent(null, 'info_deleted', { item });
  return { id };
};

app.post('/mcp/init', (req, res) => {
  const sessionId = uuidv4();
  sessions[sessionId] = { id: sessionId, clients: [] };
  res.json({ sessionId });
});

app.get('/mcp/stream', (req, res) => {
  const sessionId = String(req.query.sessionId || '');
  if (!sessionId || !sessions[sessionId]) return res.status(400).send('invalid sessionId');

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  sessions[sessionId].clients.push(res);

  // welcome event
  res.write(`event: connected\ndata: ${JSON.stringify({ sessionId })}\n\n`);

  req.on('close', () => {
    // remove client
    sessions[sessionId].clients = sessions[sessionId].clients.filter(r => r !== res);
  });
});

app.get('/mcp/tools', (req, res) => {
  const toolList = Object.keys(tools);
  res.json({ tools: toolList, resources: ['info_added', 'info_changed', 'info_deleted'] });
});

app.post('/mcp/invoke', async (req, res) => {
  const { sessionId, tool, args } = req.body || {};
  if (!tool || typeof tool !== 'string') return res.status(400).json({ error: 'tool required' });

  const fn = tools[tool];
  if (!fn) return res.status(404).json({ error: 'tool not found' });

  try {
    // Provide an emit helper to the tool via its closure if needed
    const result = await fn(args || {});
    // Also emit an invocation event
    emitEvent(sessionId || null, 'invocation_result', { tool, result });
    res.json({ result });
  } catch (err: any) {
    emitEvent(sessionId || null, 'invocation_error', { tool, error: String(err) });
    res.status(500).json({ error: String(err) });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`MCP server listening on http://localhost:${PORT}`);
  });
}

export default app;
