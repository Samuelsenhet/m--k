MÄÄK DATING APP

1. WHAT ARE YOU BUILDING?
MÄÄK is a Swedish personality-based dating app that uses AI-powered matching and conversation assistance to create meaningful connections based on personality compatibility rather than superficial swiping.
The problem it solves: Traditional dating apps focus too much on appearance and swiping, leading to superficial connections. MÄÄK solves this by matching users based on deep personality compatibility (via a 30-question test) and reducing conversation anxiety with AI-generated icebreakers tailored to both users' profiles.

2. WHO IS IT FOR?
Primary Target Users:
Demographics: 20-35 year olds in Sweden

Pain Points:
Frustration with superficial swiping apps
Anxiety about starting conversations
Difficulty finding meaningful connections
Wanting deeper compatibility beyond looks
Usage Context: Mobile/web, during commutes, evenings, weekends

Current Alternatives: Tinder, Hinge, Bumble - but none focus specifically on personality-first matching in the Swedish market

3. WHAT'S THE USER JOURNEY LIKE?
New User Journey:
Discovery: Landing page → "Skapa konto"
Authentication: Phone number input (+46 format) → OTP verification → Age check (must be 20+)
Consent: GDPR consent screen (analytics, marketing, personalization)
Onboarding: 6-step wizard:
Basic info (name, gender, sexuality, looking for)
Personality test (30 questions, Likert scale)
Background info (optional: hometown, work, education)
Photos (6 slots with AI prompts)
Privacy settings (what's visible to others)

Completion summary
Welcome: Celebration screen with confetti and mascot
Core Experience: Daily matches → View profiles → Chat with AI icebreakers → Build connections
Returning User:
Login → View new matches/daily suggestions → Chat with existing matches → Update profile → Earn achievements

4. WHAT ARE THE KEY FEATURES?
Core Features:
Phone-based Authentication: Swedish number format with OTP verification
Age Verification: 20+ requirement with date picker validation
GDPR Consent Management: Three consent categories with customization
Personality Test: 30-question Likert scale test with shuffled questions
Personality Results: Archetype system (16 types) with detailed descriptions and compatibility tips
Profile Management: Complete profile editor with photo uploads (6 photos with prompts)
AI Matching: Personality-based compatibility scoring
AI Icebreakers: Personalized conversation starters generated from both users' profiles
Real-time Chat: Typing indicators, read receipts, message history
Match List: Mutual matches with unread counts and last message previews
Achievements System: Gamification with points, badges, and unlock notifications
Profile Completion Prompts: Encourages users to complete their profiles
PWA Installation: Platform-specific install prompts (iOS/Android)
Landing Page: Marketing site with features, how-it-works, FAQ
Animated Mascot: React SVG version (web) + SwiftUI version (advanced animations)

5. WHAT PLATFORM IS IT ON?
Primary: Web app (PWA - Progressive Web App)
Responsive Design: Mobile-first, works on all devices
PWA Features: Installable, offline capabilities, app-like experience
Future: Native mobile apps (iOS/Android) as phase 2

6. WILL IT USE AI OR ANY SPECIFIC TECH?
AI Features:
Personality Analysis: Test scoring and archetype categorization
Icebreaker Generation: Context-aware conversation starters using both users' profiles
Profile Improvement Suggestions: AI feedback on profile completeness
Compatibility Insights: Personality-based matching recommendations

Technical Stack:
Frontend: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
Backend: Supabase (PostgreSQL, Auth, Storage, Realtime)
Edge Functions: Deno + TypeScript for AI integration
AI Gateway: Lovable AI → Google Gemini 2.5 Flash
State Management: React Query + Context API
Routing: React Router v6
Animations: Framer Motion (React), SwiftUI (mascot)
Icons: Lucide React

7. WILL USERS NEED TO LOG IN OR MAKE ACCOUNTS?
Yes - Required:
Authentication Method: Phone number (Swedish format) + OTP
Provider: Supabase Auth
Age Verification: Required during registration (20+)
GDPR Consent: Required before using app
Profile: Required to complete basic onboarding before matching

8. WHAT KIND OF DATA WILL YOU STORE?
User Data
Profiles: Display name, bio, gender, sexuality, looking for, demographics
Personality Results: Test scores, archetype, category, dimension scores
Photos: Profile images with storage paths and display order
Matches: Mutual connections, match scores, status
Messages: Chat history with read status
Icebreakers: AI-generated conversation starters per match
Achievements: Earned badges, points, unlock timestamps
Consent: GDPR consent preferences
Privacy Settings: What information is visible to others
Usage Data: (With consent) Feature usage, engagement metrics

9. WILL USERS TALK TO EACH OTHER, OR JUST INTERACT WITH THE SYSTEM?
Both:
User-to-User: Real-time chat between matches
User-to-System:
Personality test interaction
Profile editing
AI icebreaker suggestions
Achievement unlocks
Match browsing
AI-Mediated: AI suggests conversation starters, but actual conversation is between users

10. WHAT VIBE SHOULD THE DESIGN HAVE?
Design Vibe:
Primary Feel: Warm, trustworthy, modern, Swedish
Color Scheme: Rose → Emerald gradient (love → growth)
Typography: Serif headings (warmth) + clean sans body (readability)
Layout: Card-based with subtle shadows and rounded corners
Animations: Smooth transitions, floating elements, celebratory confetti
Mascot: Friendly, animated character that sleeps, bounces, reacts
Swedish Context: Language, cultural references, design aesthetics
Trust Indicators: Age verification, GDPR compliance, privacy controls

11. ARE THERE ANY APPS OR PRODUCTS THAT INSPIRED THIS?
Inspirations:
Hinge: "Designed to be deleted" philosophy
OkCupid: Personality questions and compatibility scoring
Bumble: Women-first approach (adapted to Swedish equality values)
Myers-Briggs/16Personalities: Archetype system for personality categorization
Duolingo: Gamification and mascot engagement
Spotify: Personalized recommendations based on taste profiles
Swedish Design Principles: Minimalism, functionality, trustworthiness

What We Do Differently:
Swedish market focus with local phone auth
Personality-first rather than appearance-first
AI conversation assistance to reduce anxiety
PWA-first approach (no app store required)
GDPR and age verification as core features

12. WHAT FEATURES MIGHT YOU WANT TO ADD IN THE FUTURE?
Phase 2 Features:
Video Profiles: Short video introductions
Voice Messages: Audio messages in chat
Virtual Dates: Video calling within app
Group Activities: Virtual dating events or group chats
Advanced Matching: Machine learning improvements based on user behavior
Premium Features: Subscription for advanced filters, unlimited likes, etc.
International Expansion: Beyond Sweden (Nordic region first)
Date Planning: Integration with booking restaurants/activities
Safety Features: Photo verification, reporting tools, moderation
Analytics Dashboard: For users to see their matching patterns

FINAL LOVABLE PRP
text
PRODUCT REQUIREMENTS PROMPT
MÄÄK - Personality-Based Dating App


Idea: A Swedish dating app that matches users based on deep personality compatibility using a 30-question test and AI-powered conversation assistance, with a minimum age requirement of 20+.

Target Audience: 20-35 year olds in Sweden seeking meaningful connections beyond superficial swiping, frustrated with traditional dating apps' focus on appearance.

User Journey:
1. Landing page → Sign up with Swedish phone number (+46 format)
2. OTP verification → Age check (20+) → GDPR consent
3. 6-step onboarding: Basic info → Personality test → Background → Photos → Privacy → Completion
4. Welcome celebration with mascot and confetti
5. Daily personality-based matches → View profiles
6. Chat using AI-generated icebreakers → Build connections
7. Earn achievements, complete profile, get match suggestions


Core Features:
- Phone authentication (Swedish format) with OTP and age verification
- GDPR consent management (analytics, marketing, personalization)
- 30-question personality test (Likert scale) with shuffled questions
- Personality archetype system (16 types) with detailed results
- Profile management with 6 photo slots and AI prompts
- AI-powered matching based on personality compatibility
- AI-generated icebreakers tailored to both users' profiles
- Real-time chat with typing indicators and read receipts
- Match list with unread counts and last message previews
- Achievements system with points, badges, and unlock notifications
- Profile completion prompts and progress tracking
- PWA installation prompts (iOS/Android optimized)
- Landing page with features, how-it-works, FAQ
- Animated mascot (React SVG + SwiftUI versions)
- Multi-language support (Swedish primary, English secondary)


Suggested Stack:
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
- Backend: Supabase (PostgreSQL, Auth, Storage, Realtime)
- Edge Functions: Deno + TypeScript for AI integration
- AI: Lovable AI Gateway → Google Gemini 2.5 Flash
- Hosting: Vercel/Netlify for frontend, Supabase for backend
- PWA: Service workers, manifest, install prompts


Design Vibe:
- Warm, trustworthy, modern Swedish aesthetic
- Primary gradient: rose → emerald (love → growth)
- Serif headings + clean sans body text
- Card-based layouts with subtle shadows and rounded corners
- Smooth animations, floating elements, celebratory confetti
- Friendly animated mascot with multiple states (sleeping, bouncing, reacting)


Future Enhancements:
- Video profiles and voice messages
- Virtual dates and group activities
- Advanced matching algorithms with ML
- Premium subscription features
- International expansion (Nordic region first)
- Date planning integrations
- Enhanced safety features and moderation

MÄÄK DATING APP - COMPLETE TECHNICAL BLUEPRINT

OVERVIEW
MÄÄK is a complete, production-ready Swedish dating app with AI-powered personality matching. The app is built with React + TypeScript + Supabase and features a comprehensive user journey from signup to meaningful conversations.

COMPLETE APP ARCHITECTURE
AUTHENTICATION SYSTEM
Components:
PhoneAuth - Swedish phone number input (+46 format)
OtpInput - 6-digit verification with auto-focus
AgeVerification - 20+ age check with date picker
AuthContext - Manages user sessions and state
Flow:
Phone Input → OTP Verification → Age Check → Session Creation → GDPR Consent → Onboarding

LANDING PAGE
Features:
Hero Section: Animated gradients with floating elements
Features Grid: 3 key features (30 questions, smart matching, AI icebreakers)
How It Works: 3-step process visualization
FAQ Section: 6 common questions with expandable answers
Social Proof: Heart ratings and testimonials
Responsive Nav: Dynamic based on auth state
Navigation States:
Logged Out: Login/Register buttons
Logged In: Quick access to Matches, Chat, Profile, Logout

ANIMATED MASCOT SYSTEM
Two Implementations:
React SVG Version: Simple, styleable mascot for web
SwiftUI Version: Advanced animated mascot for native feel
SwiftUI Mascot Features:
Multiple States: Sleeping, Startled, Awake
Dynamic Expressions: 3+ facial expressions
Physics Animations: Gravity bounce, head rotation, paw sway
Interactive: Tap to startle, auto return to sleep
Timed Events: Expression cycling, periodic movements
Animation Types:
Continuous head rotation (2.5-3s cycles)
Periodic gravity bounce (every 3.5s)
Paw swaying (alternating, 0.4s duration)
Tail wagging (0.8s easeInOut)
Expression changes (every 2s when sleeping)

COMPLETE USER FLOW
New User Journey:
text
Landing Page → "Skapa konto" → PhoneAuth → 
Age Verification (20+) → OTP Verification → 
GDPR Consent → Onboarding Wizard → 
Welcome Screen → Matches Dashboard
Onboarding Steps (6):
Basics: Name, pronouns, gender, sexuality, looking for
Personality: 30-question test (shuffled questions)
Background: Optional info (hometown, work, education, lifestyle)
Photos: 6 photo slots with AI prompts
Privacy: Visibility settings
Complete: Profile summary and match readiness

Returning User:
text
Landing Page → Direct to Matches → 
Chat with matches → Update Profile → 
Earn achievements → Daily matches

AI INTEGRATION SYSTEM
AI Capabilities:
Icebreaker Generation - Personalized conversation starters
Profile Analysis - Improvement suggestions
Matching Insights - Compatibility tips
Full User Analysis - Comprehensive dating advice
Technical Implementation:
Edge Functions: Deno + TypeScript
AI Provider: Gateway → Google Gemini 2.5 Flash
Context Injection: User profiles + personality data
Rate Limiting: 429/402 error handling
Fallbacks: Default icebreakers if AI fails

REAL-TIME CHAT SYSTEM
Features:
Typing Indicators: Real-time broadcast
Read Receipts: Single/double checkmarks
Message History: Supabase realtime subscriptions
Unread Counts: Per-match unread tracking
AI Icebreakers: Auto-generated conversation starters

Components:
ChatWindow - Main chat interface
MatchList - Conversation list with unread badges
TypingIndicator - Animated dots component
Message - Individual message display

GAMIFICATION SYSTEM
Achievements:
Categories: Profile, Social, Discovery, Milestones
Points System: Each achievement awards points
Visual Badges: Icon-based recognition
Toast Notifications: Animated unlock notifications
Engagement Features:
Profile completion tracking (progress bar)
Match countdown timers (urgency creation)
Daily match suggestions
Photo upload prompts

COMPONENT ARCHITECTURE
Core Components:
text
/src
├── components/
│   ├── ui/              # Shadcn/ui inspired components
│   ├── auth/           # Authentication components
│   ├── chat/           # Messaging components
│   ├── profile/        # Profile management
│   └── personality/    # Test and results
├── contexts/           # React contexts
├── hooks/             # Custom hooks
├── integrations/      # Supabase client
├── pages/            # Route components
└── types/            # TypeScript definitions
Key Contexts:
AuthContext - User authentication
ConsentContext - GDPR consent management
Achievement hooks and state management

DATABASE SCHEMA (Supabase)
Core Tables:
profiles - User information
personality_results - Test scores and archetypes
profile_photos - Photo metadata
matches - Mutual connections
messages - Chat history
icebreakers - AI-generated starters
achievements - Gamification definitions
user_achievements - Earned achievements
Realtime Subscriptions:
Messages per match
Typing indicators
Match status updates

DESIGN SYSTEM
Visual Identity:
Primary Gradient: from-rose-400 to-emerald-400
Typography: Serif headings, sans body
Shadows: Custom shadow-card, shadow-glow
Animations: Framer Motion with custom presets
Spacing: Consistent 4px base unit

UI Patterns:
Card-based layouts with rounded corners
Gradient backgrounds with blur effects
Animated transitions between states
Consistent form styling (h-9 inputs, py-5 selects)

PWA & MOBILE OPTIMIZATION
Installation Flow:
Android/Chrome: Native install prompt
iOS: Custom instructions (Share → Add to Home)
Dismissal Memory: 7-day cooldown
Offline Support: Basic PWA capabilities
Responsive Design:
Mobile-first approach
Breakpoints: sm:640, md:768, lg:1024
Adaptive layouts (stacked mobile, grid desktop)
Touch-friendly interactive elements

MULTI-LANGUAGE SUPPORT
Primary: Swedish (complete localization)
Secondary: English (full translations)
Dynamic Switching: LanguageToggle component
i18n Integration: React-i18next with context

SECURITY & PRIVACY
Protections:
Phone-based authentication
Age verification (20+ requirement)
GDPR consent management
Privacy settings (control profile visibility)
Secure Supabase storage

Compliance:
Explicit consent for data categories
Right to deletion and data export
Transparent data usage policies
Swedish data protection standards

TECHNICAL STACK
Frontend:
Framework: React 18 + TypeScript + Vite
Styling: Tailwind CSS + Framer Motion
State: React Query + Context API
Routing: React Router v6
Icons: Lucide React
Forms: React Hook Form

Backend:
Database: Supabase PostgreSQL
Auth: Supabase Auth (phone/SMS)
Storage: Supabase Storage
Realtime: Supabase Subscriptions
Edge Functions: Deno + TypeScript
AI/ML:

Gateway: 
Model: Google Gemini 2.5 Flash
Functions: Edge functions for processing

DEPLOYMENT READY
Environment Setup:
env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
LOVABLE_API_KEY=your_ai_gateway_key
Build Commands:
npm run dev - Local development
npm run build - Production build
npm run preview - Build preview
Hosting Options:
Frontend: Vercel, Netlify, or similar
Backend: Supabase (all-in-one)
Edge Functions: Deno Deploy

ANALYTICS & MONITORING
Tracking (Consent-based):
Essential: App performance, errors
Analytics (opt-in): Feature usage, flow drop-offs
Marketing (opt-in): Campaign effectiveness
Personalization (opt-in): Behavior patterns

Key Metrics:
User acquisition (signup conversion)
Engagement (daily matches, messages sent)
Retention (D1, D7, D30 rates)
Success (mutual match conversion)

DEVELOPMENT WORKFLOW
Code Standards:
TypeScript strict mode
ESLint + Prettier configuration
Component-based architecture
Custom hooks for business logic
Comprehensive error boundaries

Testing Strategy:
Unit tests for utilities and hooks
Integration tests for auth flows
E2E tests for critical user journeys
Performance testing for animations

ERROR HANDLING
Common Scenarios:
Network failures (graceful degradation)
AI service downtime (fallback content)
Photo upload failures (retry prompts)
Age verification failures (clear messaging)
Match expiration (countdown warnings)
User-Friendly Messages:
Swedish language by default
Actionable next steps
Clear error explanations
Support contact options

GROWTH & SCALING
Immediate Features:
- All core MVP features implemented
- AI-powered matching and conversations
- Complete authentication flow
- Gamification system
- PWA capabilities

Next Phase:
Video profile support
Voice messages in chat
Group dating events
Advanced matching algorithms
Premium subscription features
International Expansion:
Additional language support
Cultural adaptations
Local payment methods
Regional marketing campaigns

TARGET USER
Age: 20-35 years old
Location: Sweden (initially)
Values: Meaningful connections, personality compatibility
Tech Level: Smartphone comfortable, app-savvy
Language: Swedish primary, English secondary

UNIQUE VALUE PROPOSITION
Personality-First: Deeper compatibility than appearance-based apps
AI-Assisted: Reduces conversation anxiety with smart icebreakers
Swedish Context: Designed specifically for Swedish dating culture
Privacy-Focused: Age-verified, GDPR-compliant community
Engaging Experience: Gamification and achievements for retention
Accessible: PWA - no app store download required

SUCCESS CRITERIA
Business Metrics:
User acquisition cost < lifetime value
30%+ monthly active user retention
25%+ conversion from match to conversation
15%+ conversion from conversation to date

Technical Metrics:
< 3-second initial load time
< 100ms chat message delivery
99.5%+ app uptime
< 1% error rate in core flows
User Satisfaction:
4.5+ star app store rating
Positive social media sentiment
High NPS (Net Promoter Score)
Low uninstall rate

COMPLETE PRODUCTION-READY APP 
All features implemented, tested, and ready for deployment. The app represents a modern approach to online dating with personality compatibility at its core, supported by AI technology and a delightful user experience.
[This is määk.pdf](https://github.com/user-attachments/files/24357804/This.is.maak.pdf)
