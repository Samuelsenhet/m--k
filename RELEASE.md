# Release: Initial MVP scaffolds

This release contains the initial scaffolding and developer tooling for the MÄÄK project.

Highlights
- MCP server (Express + SSE) with a minimal in-memory datastore and tools (`read_info`, `insert_info`, `change_info`, `delete_info`).
- MCP client library (`src/mcp/client.ts`) and a demo UI screen (`src/screens/McpDemoScreen.tsx`).
- Personality test UI (`src/components/personality/PersonalityTest.tsx`) and result screen with AI icebreaker integration.
- Supabase client scaffold (`src/services/supabase/supabaseClient.ts`) and Claude (Anthropic) scaffold (`src/services/claude/claudeClient.ts`).
- Tests for MCP server (`tests/mcpServer.test.ts`) and GitHub Actions CI to run the tests.

Quickstart

1. Install dependencies:

```bash
npm install
```

2. Run tests locally:

```bash
npm run test
```

3. Start the MCP server (for local dev):

```bash
npm run start:mcp
```

4. Run the mobile app (if using Expo):

```bash
expo start
```

Notes & next steps
- Add production-ready Supabase schema and secure server methods for Claude calls.
- Implement tests for Supabase helpers and add CI steps to run lint/typecheck.
- Consider adding a small backend to host the MCP server or convert to serverless functions.
