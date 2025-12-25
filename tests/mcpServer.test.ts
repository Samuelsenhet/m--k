import request from 'supertest';
import app from '../server/mcpServer';

describe('MCP server basic', () => {
  it('initializes a session and lists tools', async () => {
    const init = await request(app).post('/mcp/init').send();
    expect(init.status).toBe(200);
    expect(init.body.sessionId).toBeDefined();

    const tools = await request(app).get('/mcp/tools');
    expect(tools.status).toBe(200);
    expect(Array.isArray(tools.body.tools)).toBe(true);
  });

  it('invokes insert_info and read_info', async () => {
    const init = await request(app).post('/mcp/init').send();
    const sessionId = init.body.sessionId;
    const insert = await request(app).post('/mcp/invoke').send({ sessionId, tool: 'insert_info', args: { record: { hello: 'world' } } });
    expect(insert.status).toBe(200);
    expect(insert.body.result).toBeDefined();

    const read = await request(app).post('/mcp/invoke').send({ sessionId, tool: 'read_info', args: {} });
    expect(read.status).toBe(200);
    expect(Array.isArray(read.body.result)).toBe(true);
  });
});
