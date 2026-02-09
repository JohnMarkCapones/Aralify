# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aralify (internally "CodeForge") is an interactive programming education platform with a unique difficulty tier system (Easy/Medium/Hard) per lesson. Learners can progress at their own pace while earning XP multipliers (1x/2x/3x) for harder challenges.

**Core features:** Real code execution (Piston sandbox), gamification (XP, streaks, badges, leaderboards), cross-platform (Next.js web + React Native mobile), offline support, multilingual (EN/FIL).

## Tech Stack

- **Frontend:** Next.js 14+ (App Router), React Native + Expo, TypeScript, Tailwind CSS, Zustand + TanStack Query, Monaco Editor
- **Backend:** NestJS, Node.js 20+, Prisma ORM, PostgreSQL (Supabase), Redis (Upstash), Bull Queue, Socket.io
- **Code Execution:** Piston API (sandboxed execution)
- **Infrastructure:** Vercel (web), Expo EAS (mobile), Sentry (monitoring), PostHog (analytics)

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start web development server (localhost:3000)
pnpm mobile           # Start Expo development server
pnpm build            # Production build
pnpm lint             # Run ESLint
pnpm test             # Run tests
pnpm db:push          # Push Prisma schema to database
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Prisma Studio GUI
```

## Architecture

```

### Backend Architecture (NestJS)

Uses Controller → Service → Repository pattern:
- **Controllers:** Thin, HTTP concerns only (routing, params, DTO validation)
- **Services:** Business logic per bounded context
- **Repositories:** Data access layer over Prisma (never use Prisma directly in services)

**12 NestJS modules:** Auth, Users, Courses, Lessons, Progress, Quizzes, Challenges, Gamification, Social, Comments, Leaderboards, Notifications, Admin

### Key Services
- `LearningFlowService`: Orchestrates lesson completion → XP award → achievement check
- `CodeExecutionService`: Piston integration with rate limiting and circuit breaker
- `GamificationService` + `XpService` + `AchievementsService`: XP calculations, streak updates, achievement evaluation

### Database Schema (Prisma + PostgreSQL)
- **Users & Auth:** users, user_settings, privacy_settings
- **Content:** courses, levels, lessons, quizzes, code_challenges
- **Progress:** user_progress, level_unlocks, streak_history
- **Gamification:** xp_transactions, achievements, user_achievements, badges, leaderboard_snapshots
- **Social:** follows, comments, comment_likes, activities

## Git Workflow

**Branching (Git Flow):**
- `main` - Production-ready (requires 2 approvals)
- `staging` - Testing environment
- `develop` - Integration branch (requires 1 approval)
- `feature/*`, `fix/*`, `hotfix/*`, `docs/*`, `refactor/*`, `test/*`

**Branch naming:** `<type>/<ticket-id>-<short-description>` (e.g., `feature/CF-123-user-authentication`)

**Commits (Conventional Commits):**
```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
Scopes: auth, api, db, ui, quiz, challenge, gamification, social, admin, mobile, web, i18n, deps, config
```

**Merge strategy:** Squash and merge (creates clean, linear history)

## Documentation

- `docs/System-Architecture.md` - Complete system design (1,880 lines)
- `docs/Technical-Design.md` - NestJS patterns, sequence diagrams, error handling
- `docs/ARALIFY_API_ENDPOINTS.md` - 220+ endpoint specifications
- `docs/Contributing-Guidelines.md` - Git flow, commit conventions, PR process

## Development Skills (.agents/skills/)

The `.agents/skills/` directory contains 30+ specialized development guidance files for NestJS, Next.js, Supabase/PostgreSQL, security, coding standards, and senior-level patterns. Reference these when working in specific domains.
