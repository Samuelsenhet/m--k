MÄÄK — Prototype Dating App (AI-powered)

MÄÄK is a prototype Swedish dating app focused on personality-first matching and AI-powered conversation helpers. This repository contains early frontend components, a personality-test flow, and service scaffolding for Claude (Anthropic) and Supabase integration.
Features
- AI-generated icebreakers and personality analysis (Claude SDK)
- Personality test (30-question Likert scale)
- Matching algorithm scaffold and DB schema (Supabase)
- Real-time chat scaffolding and components

Quickstart (developer)
MÄÄK — Development Plan & Developer README

This repository contains the prototype code and implementation plan for MÄÄK — a personality-first dating app using Claude (Anthropic) for AI features and Supabase for backend services.

This README is a focused, developer-friendly guide: architecture overview, quickstart, file map, and the next steps to continue building the MVP.

--

## Project Overview

MÄÄK pairs a React Native frontend (Expo-friendly) with a lightweight backend (Supabase / Postgres) and an AI layer powered by Claude. Key features:

- Personality-first matching (30-question test)
- AI personality analysis and compatibility scoring
- AI-generated icebreakers and conversation coaching
- Real-time chat and community features (Supabase realtime)

Language: Swedish-focused UX and prompts; code is TypeScript.

--

## Quickstart (developer)

1) Install dependencies

```bash
npm install
```

2) Environment variables

Copy or create `.env` (see `.env.example`) with at least:

```
DATABASE_URL=postgresql://user:password@localhost:5432/maak?schema=public
ANTHROPIC_API_KEY=your_anthropic_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_key
```

3) Generate Prisma client

```bash
npx prisma generate
```

4) If you plan to run the mobile UI with Expo, install/expose required native libs

```bash
# Optional: install Expo CLI
npm install -g expo-cli

# Navigation and core libs
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context

# Expo-managed native dependencies
npx expo install react-native-gesture-handler react-native-reanimated
```

5) Start the app (Expo)

```bash
expo start
```

Or run the backend services:

```bash
# Run the Node.js backend
npm run dev

# Run the MCP server
npm run start:mcp

# Run the Claude proxy server
ts-node server/claudeProxy.ts
```

--

## Architecture (high-level)

Frontend (React Native / Expo)
- Screens: onboarding, personality test, matches, chat, community
- Components: `src/components/*`

Backend
- Supabase (Postgres + RLS) for auth, storage, realtime
- Optional Node.js server for heavier tasks or secure Claude calls

AI Layer
- Claude SDK client under `src/services/claude/` (icebreaker generation, personality analysis, matching)
- Caching & rate limits to control costs

--

## File map (important files)

- `App.tsx` — app entry, mounts the navigator
- `src/navigation/AppNavigator.tsx` — stack navigator with test & result screens
- `src/components/personality/PersonalityTest.tsx` — 30-question Likert UI and scoring
- `src/screens/PersonalityTestScreen.tsx` — screen wrapper for the test
- `src/screens/PersonalityResultScreen.tsx` — displays computed scores
- `src/services/claude/` — AI client and services (implement as needed)
- `src/services/supabase/` — add `supabaseClient.ts` and auth helpers
- `prisma/` — optional Prisma schema/back-end tooling (if used)

--

## Database schema (summary)

The project uses a Supabase/Postgres schema including:

- `users`, `personality_scores`, `personality_test_answers`, `user_interests`
- `matches`, `messages`, `ai_icebreakers`, `community_questions`, `daily_match_queue`

Row Level Security (RLS) is recommended for user isolation. A full SQL migration is kept in project notes and can be applied in Supabase SQL editor.

--

## Personality test flow (how it works now)

1. User completes the 30-question Likert survey in `PersonalityTest`.
2. Local scoring maps each 1–5 answer into 0–100 per dimension (E/I, S/N, T/F, J/P, A/T).
3. A heuristic computes a category (`DIPLOMAT`, `STRATEGER`, `BYGGARE`, `UPPTÄCKARE`).
4. The app attempts to upsert results into `personality_scores` (best-effort; requires `supabaseClient`).
5. `PersonalityResult` screen shows scores and quick tips.

--

## Next actionable steps (suggested)

1. Implement `src/services/supabase/supabaseClient.ts` and wire authentication (RLS-safe).
2. Add Claude client at `src/services/claude/claudeClient.ts` (secure server-side or env-based in Expo).
3. Improve personality test: real questions, progress persistence, resume functionality.
4. Implement matching service and daily match queue server-side.
5. Add unit tests for AI prompt outputs and service fallbacks.

--

## Running locally: tips

- If using Expo: run `expo start` and open on simulator/device.
- To test Supabase interactions, set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` and create the schema in Supabase.
- For Claude/Anthropic API, prefer calling the API from a server or Cloud Function to keep the API key secret. If you must call from the client during prototyping, use `EXPO_PUBLIC_...` vars but rotate keys.

--

## Contributing

- Keep PRs small and focused (one feature or bugfix per PR).
- Add tests for new services and components.
- Add brief design notes for any prompt engineering changes.

--

If you want, I can now:

- Add the `claudeClient.ts` scaffold in `src/services/claude/`.
- Implement `supabaseClient.ts` and a small auth demo.
- Expand the personality test with real questions and persistence.

Tell me which to do next and I will implement it.
Step 1: Environment Setup

add_note
Request
{
	`name`: `MÄÄK Development Log - Day 1`,
	`content`: `MÄÄK Development Progress Tracker
================================

Date: December 24, 2025
Phase: Initial Setup & Architecture Design

TCRIE Framework Applied:
------------------------
T - Task: Build MÄÄK dating app MVP using Claude SDK
C - Context: React Native app with AI-powered features
R - Resources: Claude SDK, React Native, Supabase, OpenAI
I - Iterate: Start with core features, add complexity
E - Evaluate: Test each component before moving forward

Today's Goals:
--------------
✅ Project architecture design
✅ Development environment setup
✅ Claude SDK integration planning
✅ Database schema design
✅ Component structure planning

Next Steps:
-----------
- Initialize React Native project
- Configure Claude SDK
- Build personality test component
- Implement matching algorithm

Success Metrics (Week 1):
-------------------------
- Working dev environment
- Claude SDK responding
- Basic UI components rendering
- Database schema deployed`
}
Response
Note created successfully: MÄÄK Development Log - Day 1
Now let me create a comprehensive development plan:

🏗️ ARCHITECTURE DESIGN
System Architecture with Claude SDK
┌─────────────────────────────────────────────────────────┐
│                    MÄÄK Application                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐         ┌──────────────┐            │
│  │   Frontend   │ ◄─────► │   Backend    │            │
│  │ React Native │         │   Node.js    │            │
│  │              │         │  + Supabase  │            │
│  └──────────────┘         └──────────────┘            │
│         │                         │                     │
│         │                         ▼                     │
│         │                 ┌──────────────┐            │
│         │                 │  PostgreSQL  │            │
│         │                 │   Database   │            │
│         │                 └──────────────┘            │
│         │                                              │
│         ▼                                              │
│  ┌─────────────────────────────────────┐             │
│  │        Claude SDK Layer             │             │
│  ├─────────────────────────────────────┤             │
│  │ 1. AI Icebreaker Generator          │             │
│  │ 2. Personality Analysis Engine       │             │
│  │ 3. Match Compatibility Scorer        │             │
│  │ 4. Community Question Generator      │             │
│  │ 5. Conversation Coach                │             │
│  └─────────────────────────────────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘

💻 IMPLEMENTATION PLAN
Phase 1: Project Initialization (Week 1)
1.1 Create React Native Project
```bash
# Initialize Expo project with TypeScript
npx create-expo-app@latest maak --template expo-template-blank-typescript

cd maak

# Install core dependencies
npm install @supabase/supabase-js
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-safe-area-context react-native-screens
npm install nativewind
npm install tailwindcss
npm install @anthropic-ai/sdk

# Install development dependencies
npm install --save-dev @types/react @types/react-native
npm install --save-dev typescript

# Install additional UI libraries
npm install react-native-reanimated
npm install expo-linear-gradient
npm install lottie-react-native
npm install @shopify/flash-list

# Install utilities
npm install zustand # State management
npm install react-hook-form # Form handling
npm install zod # Validation
npm install date-fns # Date utilities
```

#### **1.2 Project Structure**
```
maak/
├── src/
│   ├── components/
│   │   ├── onboarding/
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── GDPRConsent.tsx
│   │   │   └── AccountSetup.tsx
│   │   ├── personality/
│   │   │   ├── PersonalityTest.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── ResultsScreen.tsx
│   │   ├── matching/
│   │   │   ├── MatchCard.tsx
│   │   │   ├── MatchList.tsx
│   │   │   └── ProfileDetail.tsx
│   │   ├── chat/
│   │   │   ├── ChatScreen.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   └── AIIcebreaker.tsx
│   │   └── community/
│   │       ├── DailyQuestion.tsx
│   │       └── CommunityFeed.tsx
│   ├── services/
│   │   ├── claude/
│   │   │   ├── claudeClient.ts
│   │   │   ├── icebreakerService.ts
│   │   │   ├── personalityAnalysis.ts
│   │   │   └── matchingService.ts
│   │   ├── supabase/
│   │   │   ├── supabaseClient.ts
│   │   │   ├── authService.ts
│   │   │   └── databaseService.ts
│   │   └── personality/
│   │       ├── scoringAlgorithm.ts
│   │       └── compatibilityMatrix.ts
│   ├── types/
│   │   ├── personality.ts
│   │   ├── user.ts
│   │   ├── match.ts
│   │   └── message.ts
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── MatchesScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   └── CommunityScreen.tsx
│   ├── store/
│   │   ├── userStore.ts
│   │   ├── matchStore.ts
│   │   └── chatStore.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── validators.ts
│   └── config/
│       ├── env.ts
│       └── theme.ts
├── assets/
│   ├── animations/
│   ├── images/
│   └── fonts/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

... (full implementation plan retained) ...

For full details, check the project notes or ask me to expand any section into files and tasks.
