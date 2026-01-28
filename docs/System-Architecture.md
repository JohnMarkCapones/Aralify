# CODEFORGE
## Technical Blueprint & Architecture Document

**Version:** 1.0  
**Date:** January 2026  
**Status:** Planning Phase

---

# Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Feature Breakdown](#3-feature-breakdown)
4. [Tech Stack](#4-tech-stack)
5. [System Architecture](#5-system-architecture)
6. [Database Schema](#6-database-schema)
7. [API Architecture](#7-api-architecture)
8. [Gamification System](#8-gamification-system)
9. [Content Pipeline](#9-content-pipeline)
10. [Code Execution Strategy](#10-code-execution-strategy)
11. [Offline Support](#11-offline-support)
12. [Internationalization](#12-internationalization)
13. [Security & Compliance](#13-security--compliance)
14. [Development Phases](#14-development-phases)
15. [Team Structure](#15-team-structure)

---

# 1. Executive Summary

CodeForge is a next-generation interactive programming education platform designed to make learning to code engaging, accessible, and effective. Unlike existing solutions, CodeForge introduces an innovative **difficulty tier system** where each lesson offers Easy, Medium, and Hard variants, allowing learners to progress at their own pace while being incentivized to master content at higher difficulty levels.

The platform will launch with four core languages: **Python, JavaScript, HTML, and CSS**, targeting a global audience of aspiring developers. Built with modern technologies including Next.js for web, React Native for mobile, and PostgreSQL for data persistence, CodeForge is architected for scale, performance, and an exceptional user experience.

**Key Differentiators:**
- Unique difficulty tier system (Easy/Medium/Hard per level)
- Meaningful gamification with XP multipliers and mastery tracking
- Real code execution in-browser
- Offline learning support for mobile
- Robust social layer with profiles, leaderboards, and discussions

---

# 2. Product Overview

## 2.1 Vision Statement

To democratize programming education by creating the most engaging, effective, and accessible platform for learning to code, where every learner can find their optimal challenge level and build real skills through practice.

## 2.2 Target Audience

| Segment | Description | Needs |
|---------|-------------|-------|
| **Primary** | Complete beginners with no programming experience | Gentle onboarding, clear explanations, encouragement |
| **Secondary** | Self-taught developers filling knowledge gaps | Flexibility to skip basics, challenging content |
| **Tertiary** | Students supplementing formal CS education | Practice problems, quick reference |

## 2.3 Core Value Proposition

CodeForge offers a unique difficulty tier system that respects different learning speeds while encouraging mastery. Users can:
- Progress quickly through Easy tiers to survey content
- Challenge themselves with Hard tiers for deeper understanding
- Earn greater rewards for higher difficulty completion
- Return to master content they initially skipped

## 2.4 Platform Support

| Platform | Technology | Key Features |
|----------|------------|--------------|
| Web Application | Next.js 14+ | Full feature set, responsive design, PWA support |
| iOS Application | React Native + Expo | Offline lessons, push notifications, native feel |
| Android Application | React Native + Expo | Offline lessons, push notifications, native feel |

## 2.5 Languages at Launch

1. **Python** — Most popular beginner language, versatile
2. **JavaScript** — Essential for web development
3. **HTML** — Foundation of web content
4. **CSS** — Styling and visual design

---

# 3. Feature Breakdown

## 3.1 MVP Features (Phase 1)

### Learning System
- Course structure with levels containing Easy/Medium/Hard tiers
- Lesson content with text, code examples, and interactive elements
- Quiz system (multiple choice, fill-in-the-blank, code completion)
- Code challenges with real execution and output validation
- Progress tracking per course, level, and tier
- Flexible navigation — users can jump between topics

### Difficulty Tier System
| Tier | XP Multiplier | Characteristics |
|------|---------------|-----------------|
| Easy | 1x | Basic questions, more hints, no time pressure |
| Medium | 2x | Moderate difficulty, fewer hints, optional time limits |
| Hard | 3x | Complex challenges, minimal hints, time pressure |

**Progression Rule:** Passing ANY tier unlocks the next level. Users can return to complete higher tiers for additional rewards.

### User System
- Registration (email/password)
- OAuth authentication (Google, GitHub, Facebook)
- User profiles with avatar, bio, public stats
- Settings and preferences
- Notification preferences

### Gamification (Core)
- XP system with difficulty multipliers
- Level/rank system based on total XP
- Daily streak tracking with rewards
- Mastery percentage per topic (33%/66%/100%)
- Achievement system (first quiz, 7-day streak, etc.)
- Global leaderboard

### Admin Panel
- Lesson and quiz CRUD operations
- User management (view, ban, role assignment)
- Analytics dashboard (DAU, completion rates, popular courses)
- Content moderation tools

## 3.2 Phase 2 Features

### Social & Community
- Friend system (follow/following model)
- Comments and discussions on lessons
- Friends leaderboard
- Activity feed showing friend progress
- Direct messaging
- Report/moderation system for user content

### Enhanced Gamification
- Extended badge system with categories:
  - **Completion:** Course completionist, language master
  - **Streak:** 7-day, 30-day, 100-day, 365-day
  - **Speed:** Speedrunner, quick learner
  - **Mastery:** Perfectionist (100% mastery), Hard mode hero
  - **Social:** Helpful commenter, community star
- Unlockable titles for profile display
- Weekly challenges with special rewards
- Seasonal events and limited-time content
- Secret/bonus levels for high achievers

### Mobile Enhancements
- Full offline mode with lesson downloads
- Push notifications (streaks, achievements, social)
- Home screen widgets for streak tracking
- Haptic feedback for achievements

## 3.3 Future Features (Phase 3+)

- Additional languages (Java, C++, TypeScript, SQL, Go, Rust)
- Project-based learning tracks
- AI-powered code review and personalized hints
- Certification system with verifiable credentials
- Team/classroom features for educators
- Premium subscription tier
- Ad integration for free tier
- Public API for third-party integrations
- Live coding challenges (competitive)
- Mentorship matching system

---

# 4. Tech Stack

## 4.1 Frontend

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Web Framework | **Next.js 14+** (App Router) | SSR/SSG, excellent DX, React ecosystem, API routes |
| Mobile Framework | **React Native + Expo** | Code sharing potential, native performance, OTA updates |
| State Management | **Zustand** + **TanStack Query** | Lightweight, performant, excellent caching |
| Styling | **Tailwind CSS** + **NativeWind** | Consistent design system across platforms |
| Code Editor | **Monaco Editor** (web) | VS Code-quality editing experience |
| UI Components | **Radix UI** + **shadcn/ui** | Accessible, customizable primitives |
| Forms | **React Hook Form** + **Zod** | Performant forms with type-safe validation |
| Animations | **Framer Motion** | Smooth, declarative animations |

## 4.2 Backend

| Layer | Technology | Rationale |
|-------|------------|-----------|
| API Framework | **NestJS** | Enterprise-grade Node.js framework, TypeScript-first, modular architecture |
| Runtime | **Node.js 20+** | Fast, scalable, extensive ecosystem |
| Database | **PostgreSQL** | Robust, scalable, excellent tooling |
| ORM | **Prisma** | Type-safe queries, migrations, excellent DX |
| Authentication | **Passport.js** + **JWT** | Flexible auth strategies, industry standard |
| File Storage | **AWS S3** or **Supabase Storage** | Scalable object storage, CDN integration |
| Caching | **Redis** (Upstash) | Session management, rate limiting, caching |
| Real-time | **Socket.io** | WebSocket support for live features |
| Background Jobs | **Bull** (Redis-based) | Reliable job queue, retry mechanisms, scheduling |
| Email | **Resend** or **SendGrid** | Developer-friendly transactional email |
| Validation | **class-validator** + **class-transformer** | Declarative validation with decorators |

## 4.3 Code Execution

| Component | Technology | Purpose |
|-----------|------------|---------|
| Primary Engine | **Judge0 API** | Secure sandboxed execution for Python, JS |
| Fallback | **Piston API** | Alternative execution engine |
| Web Preview | **iframe sandbox** | HTML/CSS/JS live preview |
| Rate Limiting | **Upstash Redis** | Prevent abuse of execution API |

## 4.4 Infrastructure

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Web Hosting | **Vercel** | Optimal Next.js hosting, edge functions |
| API Hosting | **Railway** or **Render** | Containerized NestJS deployment, auto-scaling |
| Database | **Railway Postgres** or **Supabase** | Managed Postgres, automatic backups |
| CDN | **Cloudflare** | Global content delivery |
| Mobile Builds | **EAS (Expo)** | Cloud builds, OTA updates |
| Monitoring | **Sentry** | Error tracking, performance monitoring |
| Analytics | **PostHog** | Product analytics, feature flags |
| CI/CD | **GitHub Actions** | Automated testing and deployment |

## 4.5 Development Tools

| Tool | Purpose |
|------|---------|
| TypeScript | Type safety across entire stack |
| ESLint + Prettier | Code quality and formatting |
| Husky | Git hooks for pre-commit checks |
| Turborepo | Monorepo management |
| Storybook | Component documentation and testing |

---

# 5. System Architecture

## 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                  │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   Web (Next.js) │ iOS (RN/Expo)   │ Android (RN/Expo)           │
└────────┬────────┴────────┬────────┴──────────┬──────────────────┘
         │                 │                   │
         └─────────────────┼───────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EDGE LAYER (Vercel)                        │
├─────────────────────────────────────────────────────────────────┤
│  CDN │ Edge Functions │ Rate Limiting │ Bot Protection          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                            │
├─────────────────┬───────────────────┬───────────────────────────┤
│  Next.js App    │   NestJS API      │   Background Jobs         │
│  (SSR/SSG)      │   (REST)          │   (Bull Queue)            │
└────────┬────────┴─────────┬─────────┴──────────┬────────────────┘
         │                  │                    │
         ▼                  ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                               │
├──────────┬──────────┬──────────┬──────────┬─────────────────────┤
│  Auth    │  Content │  Progress│  Social  │  Gamification       │
│  Service │  Service │  Service │  Service │  Service            │
└────┬─────┴────┬─────┴────┬─────┴────┬─────┴────┬────────────────┘
     │          │          │          │          │
     └──────────┴──────────┼──────────┴──────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                 │
├─────────────────┬───────────────────┬───────────────────────────┤
│  PostgreSQL     │   Redis           │   Object Storage          │
│  (Supabase)     │   (Upstash)       │   (Supabase Storage)      │
└─────────────────┴───────────────────┴───────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                             │
├─────────────────┬───────────────────┬───────────────────────────┤
│  Judge0 API     │   OAuth Providers │   Resend (Email)          │
│  (Code Exec)    │   (Google, GitHub)│                           │
└─────────────────┴───────────────────┴───────────────────────────┘
```

## 5.2 Service Breakdown

### Auth Service
- User registration and login
- OAuth integration (Google, GitHub, Facebook)
- Session management
- Password reset flows
- Account deletion

### Content Service
- Course and lesson management
- Quiz and challenge delivery
- Content versioning
- Media asset management
- Search and filtering

### Progress Service
- Track lesson completion
- Manage tier progression
- Calculate mastery percentages
- Sync offline progress
- Generate learning analytics

### Social Service
- Friend relationships
- Activity feeds
- Comments and discussions
- Direct messaging
- Content moderation

### Gamification Service
- XP calculations and awards
- Streak management
- Achievement evaluation
- Leaderboard computation
- Badge and title unlocks

---

# 6. Database Schema

## 6.0 ERD Entities → DFD Data Stores Mapping

| **ERD Entity** | **DFD Data Store** |
|----------------|-------------------|
| users | D1: USERS |
| courses | D2: COURSES |
| levels | D3: LEVELS |
| lessons | D4: LESSONS |
| quizzes | D5: QUIZZES |
| code_challenges | D6: CHALLENGES |
| user_progress | D7: USER_PROGRESS |
| xp_transactions | D8: XP_TRANSACTIONS |
| achievements | D9: ACHIEVEMENTS |
| user_achievements | D10: USER_ACHIEVEMENTS |
| badges | D11: BADGES |
| user_badges | D12: USER_BADGES |
| streak_history | D13: STREAKS |
| level_unlocks | D14: LEVEL_UNLOCKS |
| comments | D15: COMMENTS |
| comment_likes | D16: COMMENT_LIKES |
| follows | D17: FOLLOWS |
| activities | D18: ACTIVITIES |
| leaderboard_snapshots | D19: LEADERBOARD_SNAPSHOTS |

## 6.1 Core Entities

### Users
```sql
users
├── id: uuid (PK)
├── email: string (unique)
├── username: string (unique)
├── display_name: string
├── avatar_url: string?
├── bio: string?
├── locale: string (default: 'en')
├── timezone: string
├── role: enum (user, moderator, admin)
├── xp_total: integer (default: 0)
├── level: integer (default: 1)
├── streak_current: integer (default: 0)
├── streak_longest: integer (default: 0)
├── streak_last_date: date?
├── created_at: timestamp
├── updated_at: timestamp
└── deleted_at: timestamp?
```

### Courses
```sql
courses
├── id: uuid (PK)
├── slug: string (unique)
├── language: enum (python, javascript, html, css)
├── title: jsonb {en: string, fil: string}
├── description: jsonb {en: string, fil: string}
├── icon_url: string
├── color: string (hex)
├── order_index: integer
├── is_published: boolean
├── created_at: timestamp
└── updated_at: timestamp
```

### Levels
```sql
levels
├── id: uuid (PK)
├── course_id: uuid (FK → courses)
├── slug: string
├── title: jsonb {en: string, fil: string}
├── description: jsonb {en: string, fil: string}
├── order_index: integer
├── prerequisites: uuid[] (level IDs, can be empty for flexible nav)
├── is_published: boolean
├── created_at: timestamp
└── updated_at: timestamp

UNIQUE(course_id, slug)
```

### Lessons (Tiers)
```sql
lessons
├── id: uuid (PK)
├── level_id: uuid (FK → levels)
├── difficulty: enum (easy, medium, hard)
├── title: jsonb {en: string, fil: string}
├── content: jsonb (structured lesson content)
├── xp_reward: integer
├── time_limit_seconds: integer? (null = no limit)
├── order_index: integer
├── is_published: boolean
├── created_at: timestamp
└── updated_at: timestamp

UNIQUE(level_id, difficulty)
```

### Quizzes
```sql
quizzes
├── id: uuid (PK)
├── lesson_id: uuid (FK → lessons)
├── question_type: enum (multiple_choice, fill_blank, code_completion, code_output)
├── question: jsonb {en: string, fil: string}
├── options: jsonb? (for multiple choice)
├── correct_answer: jsonb
├── code_template: string? (for code questions)
├── hints: jsonb[] {en: string, fil: string}
├── explanation: jsonb {en: string, fil: string}
├── order_index: integer
├── created_at: timestamp
└── updated_at: timestamp
```

### Code Challenges
```sql
code_challenges
├── id: uuid (PK)
├── lesson_id: uuid (FK → lessons)
├── title: jsonb {en: string, fil: string}
├── description: jsonb {en: string, fil: string}
├── starter_code: string
├── solution_code: string
├── test_cases: jsonb[]
├── hints: jsonb[]
├── order_index: integer
├── created_at: timestamp
└── updated_at: timestamp
```

## 6.2 Progress Tracking

### User Progress
```sql
user_progress
├── id: uuid (PK)
├── user_id: uuid (FK → users)
├── lesson_id: uuid (FK → lessons)
├── status: enum (not_started, in_progress, completed)
├── score: integer? (percentage)
├── xp_earned: integer
├── time_spent_seconds: integer
├── attempts: integer
├── completed_at: timestamp?
├── created_at: timestamp
└── updated_at: timestamp

UNIQUE(user_id, lesson_id)
```

### Level Unlocks
```sql
level_unlocks
├── id: uuid (PK)
├── user_id: uuid (FK → users)
├── level_id: uuid (FK → levels)
├── unlocked_at: timestamp
└── unlocked_by_lesson_id: uuid (FK → lessons)

UNIQUE(user_id, level_id)
```

## 6.3 Gamification

### Achievements
```sql
achievements
├── id: uuid (PK)
├── slug: string (unique)
├── name: jsonb {en: string, fil: string}
├── description: jsonb {en: string, fil: string}
├── icon_url: string
├── category: enum (completion, streak, speed, mastery, social)
├── xp_reward: integer
├── criteria: jsonb (evaluation rules)
├── is_secret: boolean
├── created_at: timestamp
└── updated_at: timestamp
```

### User Achievements
```sql
user_achievements
├── id: uuid (PK)
├── user_id: uuid (FK → users)
├── achievement_id: uuid (FK → achievements)
├── earned_at: timestamp
└── notified: boolean

UNIQUE(user_id, achievement_id)
```

### Badges
```sql
badges
├── id: uuid (PK)
├── slug: string (unique)
├── name: jsonb {en: string, fil: string}
├── description: jsonb {en: string, fil: string}
├── icon_url: string
├── rarity: enum (common, uncommon, rare, epic, legendary)
├── criteria: jsonb
├── created_at: timestamp
└── updated_at: timestamp
```

### User Badges
```sql
user_badges
├── id: uuid (PK)
├── user_id: uuid (FK → users)
├── badge_id: uuid (FK → badges)
├── earned_at: timestamp
├── is_displayed: boolean (for profile showcase)
└── display_order: integer?

UNIQUE(user_id, badge_id)
```

### XP Transactions
```sql
xp_transactions
├── id: uuid (PK)
├── user_id: uuid (FK → users)
├── amount: integer
├── source_type: enum (lesson, achievement, streak, challenge, bonus)
├── source_id: uuid?
├── multiplier: decimal (1.0, 2.0, 3.0)
├── description: string
├── created_at: timestamp
```

### Streaks
```sql
streak_history
├── id: uuid (PK)
├── user_id: uuid (FK → users)
├── date: date
├── activities_count: integer
├── xp_earned: integer
└── created_at: timestamp

UNIQUE(user_id, date)
```

## 6.4 Social

### Follows
```sql
follows
├── id: uuid (PK)
├── follower_id: uuid (FK → users)
├── following_id: uuid (FK → users)
├── created_at: timestamp

UNIQUE(follower_id, following_id)
CHECK(follower_id != following_id)
```

### Comments
```sql
comments
├── id: uuid (PK)
├── user_id: uuid (FK → users)
├── lesson_id: uuid (FK → lessons)
├── parent_id: uuid? (FK → comments, for replies)
├── content: text
├── likes_count: integer (default: 0)
├── is_pinned: boolean
├── is_hidden: boolean (moderation)
├── created_at: timestamp
├── updated_at: timestamp
└── deleted_at: timestamp?
```

### Comment Likes
```sql
comment_likes
├── id: uuid (PK)
├── user_id: uuid (FK → users)
├── comment_id: uuid (FK → comments)
├── created_at: timestamp

UNIQUE(user_id, comment_id)
```

### Activity Feed
```sql
activities
├── id: uuid (PK)
├── user_id: uuid (FK → users)
├── activity_type: enum (completed_lesson, earned_achievement, earned_badge, started_course, reached_level, streak_milestone)
├── metadata: jsonb
├── created_at: timestamp

INDEX(user_id, created_at DESC)
```

## 6.5 Leaderboards

```sql
leaderboard_snapshots
├── id: uuid (PK)
├── period_type: enum (daily, weekly, monthly, all_time)
├── period_start: date
├── period_end: date
├── rankings: jsonb[] (user_id, rank, xp, change)
├── created_at: timestamp

INDEX(period_type, period_start)
```

---

# 7. API Architecture

## 7.1 NestJS REST API Structure

### Project Structure
```
src/
├── main.ts                          # Application entry point
├── app.module.ts                    # Root module
├── config/
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── redis.config.ts
├── common/
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   ├── roles.decorator.ts
│   │   └── public.decorator.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.guard.ts
│   │   └── throttler.guard.ts
│   ├── interceptors/
│   │   ├── transform.interceptor.ts
│   │   └── logging.interceptor.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── pipes/
│   │   └── validation.pipe.ts
│   └── dto/
│       ├── pagination.dto.ts
│       └── response.dto.ts
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── google.strategy.ts
│   │   │   ├── github.strategy.ts
│   │   │   └── facebook.strategy.ts
│   │   └── dto/
│   │       ├── register.dto.ts
│   │       ├── login.dto.ts
│   │       └── reset-password.dto.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.repository.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   ├── courses/
│   │   ├── courses.module.ts
│   │   ├── courses.controller.ts
│   │   ├── courses.service.ts
│   │   ├── courses.repository.ts
│   │   └── dto/
│   ├── lessons/
│   │   ├── lessons.module.ts
│   │   ├── lessons.controller.ts
│   │   ├── lessons.service.ts
│   │   └── dto/
│   ├── progress/
│   │   ├── progress.module.ts
│   │   ├── progress.controller.ts
│   │   ├── progress.service.ts
│   │   └── dto/
│   ├── quizzes/
│   │   ├── quizzes.module.ts
│   │   ├── quizzes.controller.ts
│   │   ├── quizzes.service.ts
│   │   └── dto/
│   ├── challenges/
│   │   ├── challenges.module.ts
│   │   ├── challenges.controller.ts
│   │   ├── challenges.service.ts
│   │   └── services/
│   │       └── code-execution.service.ts
│   ├── gamification/
│   │   ├── gamification.module.ts
│   │   ├── gamification.controller.ts
│   │   ├── gamification.service.ts
│   │   └── services/
│   │       ├── xp.service.ts
│   │       ├── achievements.service.ts
│   │       └── streaks.service.ts
│   ├── social/
│   │   ├── social.module.ts
│   │   ├── social.controller.ts
│   │   ├── social.service.ts
│   │   └── dto/
│   ├── leaderboards/
│   │   ├── leaderboards.module.ts
│   │   ├── leaderboards.controller.ts
│   │   └── leaderboards.service.ts
│   └── admin/
│       ├── admin.module.ts
│       ├── controllers/
│       │   ├── admin-courses.controller.ts
│       │   ├── admin-users.controller.ts
│       │   └── admin-analytics.controller.ts
│       └── services/
│           ├── admin-courses.service.ts
│           └── admin-analytics.service.ts
└── prisma/
    ├── schema.prisma
    └── migrations/
```

## 7.2 API Versioning

All API endpoints are versioned and prefixed with `/api/v1/`:

```typescript
// main.ts
app.setGlobalPrefix('api/v1');
```

```
Base URL: https://api.codeforge.com/api/v1/
```

## 7.3 Authentication

### JWT + Passport Strategy
- JWT-based authentication using Passport.js
- Access tokens (15 min expiry) and refresh tokens (7 days)
- OAuth strategies for Google, GitHub, Facebook

```typescript
// jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return this.usersService.findById(payload.sub);
  }
}

// Protected route example
@Controller('users')
export class UsersController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
```

## 7.4 RESTful Endpoints

### Authentication Endpoints
```
POST   /api/v1/auth/register              - Create new account
POST   /api/v1/auth/login                 - Email/password login
POST   /api/v1/auth/logout                - End session (revoke token)
POST   /api/v1/auth/refresh               - Refresh access token
GET    /api/v1/auth/oauth/google          - Redirect to Google OAuth
GET    /api/v1/auth/oauth/google/callback - Handle Google callback
GET    /api/v1/auth/oauth/github          - Redirect to GitHub OAuth
GET    /api/v1/auth/oauth/github/callback - Handle GitHub callback
GET    /api/v1/auth/oauth/facebook        - Redirect to Facebook OAuth
GET    /api/v1/auth/oauth/facebook/callback - Handle Facebook callback
POST   /api/v1/auth/forgot-password       - Send reset email
POST   /api/v1/auth/reset-password        - Set new password
POST   /api/v1/auth/verify-email          - Verify email address
POST   /api/v1/auth/resend-verification   - Resend verification email
```

### User Endpoints
```
GET    /api/v1/user/profile               - Get authenticated user profile
PUT    /api/v1/user/profile               - Update profile
PUT    /api/v1/user/avatar                - Upload avatar
GET    /api/v1/user/settings              - Get user settings
PUT    /api/v1/user/settings              - Update settings
DELETE /api/v1/user/account               - Delete account
GET    /api/v1/users/{username}           - Get public profile
```

### Course Endpoints
```
GET    /api/v1/courses                    - List all published courses
GET    /api/v1/courses/{slug}             - Get course with levels
GET    /api/v1/courses/{slug}/progress    - Get user's progress in course
GET    /api/v1/courses/{slug}/levels      - Get all levels for course
```

### Level Endpoints
```
GET    /api/v1/levels/{id}                - Get level details
GET    /api/v1/levels/{id}/lessons        - Get all lessons/tiers for level
GET    /api/v1/levels/{id}/progress       - Get user's level progress
```

### Lesson Endpoints
```
GET    /api/v1/lessons/{id}               - Get lesson content
POST   /api/v1/lessons/{id}/start         - Begin lesson attempt
POST   /api/v1/lessons/{id}/complete      - Mark lesson complete
GET    /api/v1/lessons/{id}/quizzes       - Get quizzes for lesson
GET    /api/v1/lessons/{id}/challenges    - Get code challenges
```

### Progress Endpoints
```
GET    /api/v1/progress/courses/{slug}    - Detailed course progress
GET    /api/v1/progress/levels/{id}       - Level completion status
GET    /api/v1/progress/mastery           - Overall mastery stats
POST   /api/v1/progress/sync              - Sync offline progress
GET    /api/v1/progress/recent            - Recent activity
```

### Quiz Endpoints
```
GET    /api/v1/quizzes/{id}               - Get quiz details
POST   /api/v1/quizzes/{id}/submit        - Submit quiz answers
GET    /api/v1/quizzes/{id}/results       - Get results with explanations
POST   /api/v1/quizzes/{id}/retry         - Retry quiz
```

### Challenge Endpoints
```
GET    /api/v1/challenges/{id}            - Get challenge details
POST   /api/v1/challenges/{id}/execute    - Run code (test)
POST   /api/v1/challenges/{id}/submit     - Submit solution
GET    /api/v1/challenges/{id}/hints      - Get available hints
POST   /api/v1/challenges/{id}/hint       - Unlock next hint
```

### Gamification Endpoints
```
GET    /api/v1/gamification/profile       - XP, level, and stats
GET    /api/v1/gamification/achievements  - All achievements + progress
GET    /api/v1/gamification/badges        - Earned badges
GET    /api/v1/gamification/streak        - Current streak info
POST   /api/v1/gamification/daily-claim   - Claim daily bonus
GET    /api/v1/gamification/xp-history    - XP transaction history
```

### Social Endpoints
```
POST   /api/v1/social/follow/{userId}     - Follow user
DELETE /api/v1/social/follow/{userId}     - Unfollow user
GET    /api/v1/social/followers           - Get user's followers
GET    /api/v1/social/following           - Get who user follows
GET    /api/v1/social/feed                - Activity feed
GET    /api/v1/social/friends             - Get friends list
```

### Comment Endpoints
```
GET    /api/v1/lessons/{id}/comments      - Get lesson comments
POST   /api/v1/lessons/{id}/comments      - Create comment
PUT    /api/v1/comments/{id}              - Update comment
DELETE /api/v1/comments/{id}              - Delete comment
POST   /api/v1/comments/{id}/like         - Like comment
DELETE /api/v1/comments/{id}/like         - Unlike comment
POST   /api/v1/comments/{id}/reply        - Reply to comment
POST   /api/v1/comments/{id}/report       - Report comment
```

### Leaderboard Endpoints
```
GET    /api/v1/leaderboards/global        - Global rankings
GET    /api/v1/leaderboards/friends       - Friends rankings
GET    /api/v1/leaderboards/weekly        - Weekly rankings
GET    /api/v1/leaderboards/monthly       - Monthly rankings
GET    /api/v1/leaderboards/course/{slug} - Course-specific rankings
GET    /api/v1/leaderboards/rank          - Current user's position
```

### Admin Endpoints (Protected by admin middleware)
```
# Course Management
GET    /api/v1/admin/courses              - List all courses (including unpublished)
POST   /api/v1/admin/courses              - Create course
PUT    /api/v1/admin/courses/{id}         - Update course
DELETE /api/v1/admin/courses/{id}         - Delete course
POST   /api/v1/admin/courses/{id}/publish - Publish course

# Lesson Management
POST   /api/v1/admin/lessons              - Create lesson
PUT    /api/v1/admin/lessons/{id}         - Update lesson
DELETE /api/v1/admin/lessons/{id}         - Delete lesson
POST   /api/v1/admin/lessons/ai-generate  - AI-assisted content generation
POST   /api/v1/admin/lessons/{id}/clone   - Clone lesson for difficulty variants

# User Management
GET    /api/v1/admin/users                - List all users (paginated)
GET    /api/v1/admin/users/{id}           - Get user details
POST   /api/v1/admin/users/{id}/ban       - Ban user
POST   /api/v1/admin/users/{id}/unban     - Unban user
PUT    /api/v1/admin/users/{id}/role      - Change user role

# Analytics
GET    /api/v1/admin/analytics/dashboard  - Key metrics (DAU, MAU, etc.)
GET    /api/v1/admin/analytics/courses    - Course completion rates
GET    /api/v1/admin/analytics/users      - User engagement metrics
GET    /api/v1/admin/analytics/revenue    - Revenue metrics (future)

# Content Moderation
GET    /api/v1/admin/moderation/reports   - Get reported content
PUT    /api/v1/admin/moderation/comments/{id} - Hide/pin/delete comment
```

## 7.5 Response Patterns

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful",
  "meta": {
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 100,
      "last_page": 5,
      "has_more": true
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": {
      "field": "token",
      "issue": "Token expired"
    }
  }
}
```

### Validation Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The given data was invalid",
    "details": {
      "email": ["The email field is required."],
      "password": ["The password must be at least 8 characters."]
    }
  }
}
```

## 7.6 HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 204 | No Content | Successful DELETE (no response body) |
| 400 | Bad Request | Invalid request format |
| 401 | Unauthorized | Authentication required/failed |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable Entity | Validation errors |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Maintenance mode |

## 7.7 Rate Limiting

Implemented using NestJS Throttler with Redis storage:

```typescript
// app.module.ts
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
      storage: new ThrottlerStorageRedisService(redisClient),
    }),
  ],
})

// Custom rate limits per route
@Controller('auth')
export class AuthController {
  @Post('login')
  @Throttle(5, 60) // 5 requests per minute
  async login(@Body() loginDto: LoginDto) {
    // ...
  }
}

@Controller('challenges')
export class ChallengesController {
  @Post(':id/execute')
  @Throttle(10, 60) // 10 requests per minute
  @UseGuards(JwtAuthGuard)
  async executeCode(@Param('id') id: string, @Body() code: ExecuteCodeDto) {
    // ...
  }
}
```

### Rate Limit Headers
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640995200
```

## 7.8 Middleware & Guards Stack

```typescript
// main.ts - Global middleware
app.use(helmet()); // Security headers
app.enableCors(); // CORS configuration
app.useGlobalPipes(new ValidationPipe()); // Request validation
app.useGlobalFilters(new HttpExceptionFilter()); // Error handling
app.useGlobalInterceptors(new TransformInterceptor()); // Response transformation

// Guards applied per route
@UseGuards(JwtAuthGuard) // Authentication
@UseGuards(RolesGuard) // Authorization (admin check)
@UseGuards(ThrottlerGuard) // Rate limiting
```

## 7.9 Request Validation

Using class-validator and class-transformer DTOs:

```typescript
// dto/register.dto.ts
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain uppercase, lowercase, and number',
  })
  password: string;

  @IsString()
  @MaxLength(50)
  display_name: string;
}

// Automatic validation in controller
@Post('register')
async register(@Body() registerDto: RegisterDto) {
  return this.authService.register(registerDto);
}
```

## 7.10 Response Serialization

Using class-transformer for consistent response formatting:

```typescript
// entities/user.entity.ts
export class UserEntity {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  display_name: string;

  @Expose()
  avatar_url: string;

  @Expose()
  xp_total: number;

  @Expose()
  level: number;

  @Expose()
  streak_current: number;

  @Expose()
  created_at: Date;

  @Exclude() // Never expose password
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

// Transform interceptor for automatic serialization
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data: data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

---

# 8. Gamification System

## 8.1 XP System

### XP Sources
| Source | Base XP | Easy (1x) | Medium (2x) | Hard (3x) |
|--------|---------|-----------|-------------|-----------|
| Complete Lesson | 100 | 100 | 200 | 300 |
| Perfect Quiz Score | 50 | 50 | 100 | 150 |
| Code Challenge | 75 | 75 | 150 | 225 |
| Daily Login | 10 | — | — | — |
| Streak Bonus (7 days) | 50 | — | — | — |
| Streak Bonus (30 days) | 200 | — | — | — |
| Achievement Unlock | varies | — | — | — |

### Level Thresholds
```
Level 1:    0 XP
Level 2:    100 XP
Level 3:    300 XP
Level 4:    600 XP
Level 5:    1,000 XP
Level 10:   5,000 XP
Level 20:   20,000 XP
Level 50:   100,000 XP
Level 100:  500,000 XP
```

Formula: `XP_required = floor(100 * (level ^ 1.5))`

### Rank Titles
| Level Range | Title |
|-------------|-------|
| 1-4 | Novice |
| 5-9 | Apprentice |
| 10-19 | Developer |
| 20-34 | Engineer |
| 35-49 | Senior Engineer |
| 50-74 | Expert |
| 75-99 | Master |
| 100+ | Grandmaster |

## 8.2 Streak System

### Rules
- Streak increments when user completes at least 1 lesson per day
- Streak resets at midnight (user's timezone)
- Grace period: Streak freezes available (future premium feature)

### Streak Milestones & Rewards
| Days | Badge | XP Bonus |
|------|-------|----------|
| 3 | Getting Started | 25 |
| 7 | Week Warrior | 50 |
| 14 | Dedicated | 100 |
| 30 | Monthly Master | 200 |
| 60 | Unstoppable | 400 |
| 100 | Century Club | 750 |
| 365 | Year of Code | 2000 |

## 8.3 Mastery System

### Calculation
```
Mastery % = (tiers_completed / total_tiers) × 100

Per Level:
- Easy only: 33%
- Easy + Medium: 66%
- All three: 100%

Per Course:
- Sum of all level masteries / number of levels
```

### Mastery Badges
| Mastery | Badge |
|---------|-------|
| 100% on any level | Level Master |
| 100% on any course | Course Master |
| 100% all Hard tiers in course | Hardcore |
| 100% all courses | Platform Master |

## 8.4 Achievement Categories

### Completion Achievements
- First Steps: Complete your first lesson
- Getting Serious: Complete 10 lessons
- Dedicated Learner: Complete 50 lessons
- Course Graduate: Complete an entire course
- Polyglot: Complete courses in 2+ languages
- Completionist: 100% mastery on all courses

### Streak Achievements
- (See Streak Milestones above)

### Speed Achievements
- Quick Learner: Complete a lesson in under 2 minutes
- Speedrunner: Complete a Hard tier with time remaining
- Blitz Master: Complete 5 lessons in one hour

### Mastery Achievements
- Perfectionist: 100% score on a quiz
- Flawless: Complete a Hard tier without hints
- Zero Errors: Pass code challenge on first attempt

### Social Achievements
- First Friend: Follow another user
- Popular: Reach 10 followers
- Helpful: Get 10 likes on comments
- Mentor: Have 5 comments pinned by moderators

## 8.5 Leaderboard Design

### Types
1. **Global All-Time** — Total XP ever earned
2. **Global Weekly** — XP earned this week (resets Monday)
3. **Friends** — Ranking among followed users
4. **Course-Specific** — Top learners per language

### Display
- Top 100 shown publicly
- User always sees their rank + surrounding 5 users
- Weekly resets encourage ongoing engagement

---

# 9. Content Pipeline

## 9.1 Content Structure

### Lesson Content Schema
```json
{
  "sections": [
    {
      "type": "text",
      "content": { "en": "...", "fil": "..." }
    },
    {
      "type": "code_example",
      "language": "python",
      "code": "print('Hello')",
      "explanation": { "en": "...", "fil": "..." }
    },
    {
      "type": "interactive",
      "component": "code_playground",
      "config": { ... }
    },
    {
      "type": "callout",
      "style": "tip | warning | info",
      "content": { "en": "...", "fil": "..." }
    }
  ]
}
```

## 9.2 Admin Content Editor

### Features
- Rich text editor with code highlighting
- Side-by-side language editing (EN/FIL)
- Preview mode (see exactly what learners see)
- Drag-and-drop section reordering
- Media upload and management
- Version history and rollback
- Publish/unpublish controls
- Clone lesson (for creating difficulty variants)

## 9.3 AI-Assisted Content Creation

### Use Cases
1. **Generate quiz questions** from lesson content
2. **Create difficulty variants** — take Easy and generate Medium/Hard
3. **Generate hints** for code challenges
4. **Translate content** — EN to FIL (with human review)
5. **Generate explanations** for wrong answers

### Workflow
```
Admin writes base lesson (Easy)
         │
         ▼
    AI generates:
    ├── Medium variant (less hints, harder questions)
    ├── Hard variant (time pressure, complex challenges)
    ├── Quiz questions (5-10 per lesson)
    └── Code challenge test cases
         │
         ▼
    Admin reviews & edits
         │
         ▼
    Publish
```

### AI Guardrails
- All AI content requires admin approval
- Version tracking shows AI vs human edits
- Quality scoring flags potentially poor content
- Human review required for translations

## 9.4 Content Review Checklist

Before publishing any lesson:
- [ ] Content is accurate and up-to-date
- [ ] Code examples are tested and working
- [ ] All difficulty tiers maintain consistent learning objectives
- [ ] Quizzes align with lesson content
- [ ] Translations reviewed by native speaker
- [ ] Accessibility: alt text, keyboard navigation
- [ ] Time estimates are realistic

---

# 10. Code Execution Strategy

## 10.1 Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│  API Server  │────▶│  Judge0 API │
│  (Monaco)   │◀────│  (Next.js)   │◀────│  (Sandbox)  │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Redis     │
                    │ (Rate Limit) │
                    └──────────────┘
```

## 10.2 Execution Flow

1. User writes code in Monaco editor
2. Client sends code to `/api/execute`
3. Server validates:
   - User authenticated
   - Rate limit not exceeded (10 executions/minute)
   - Code length within limits (10KB max)
4. Server sends to Judge0 with:
   - Language ID
   - Source code
   - Stdin (if any)
   - Time limit (5s default)
   - Memory limit (128MB)
5. Judge0 executes in isolated container
6. Server receives result:
   - stdout
   - stderr
   - execution time
   - memory used
   - status (success, error, timeout, etc.)
7. Server validates against test cases (if challenge)
8. Result returned to client

## 10.3 Language Support

| Language | Judge0 ID | Available |
|----------|-----------|-----------|
| Python 3 | 71 | MVP |
| JavaScript (Node) | 63 | MVP |
| HTML/CSS/JS | — | iframe preview |
| Java | 62 | Phase 3 |
| C++ | 54 | Phase 3 |

## 10.4 Security Measures

- **Sandboxed execution** — Judge0 containers are isolated
- **Time limits** — Max 5 seconds per execution
- **Memory limits** — Max 128MB
- **Network disabled** — No outbound connections
- **Rate limiting** — 10 executions/minute/user
- **Code scanning** — Block obvious malicious patterns
- **No file system access** — Temporary only

## 10.5 HTML/CSS/JS Preview

For web languages, use client-side iframe sandbox:

```html
<iframe
  sandbox="allow-scripts"
  srcdoc={userCode}
  referrerpolicy="no-referrer"
/>
```

Benefits:
- Instant preview
- No server round-trip
- Safe (sandboxed)
- Supports real-time editing

---

# 11. Offline Support

## 11.1 Strategy

Mobile apps support **download-first** offline learning:
- Users explicitly download courses/levels for offline use
- Progress syncs when back online
- Downloaded content auto-updates when online

## 11.2 What's Available Offline

| Feature | Offline | Notes |
|---------|---------|-------|
| Lesson content | ✅ | Text, images, code examples |
| Quizzes | ✅ | All question types |
| Code challenges | ⚠️ | Limited (no execution) |
| Progress tracking | ✅ | Syncs when online |
| Leaderboards | ❌ | Requires connection |
| Comments | ❌ | Requires connection |
| Code execution | ❌ | Requires Judge0 |

## 11.3 Data Storage

```
React Native Storage Stack:
├── MMKV — Fast key-value (preferences, small data)
├── SQLite — Structured data (lessons, progress)
└── File System — Large assets (images)
```

### Download Package Structure
```json
{
  "course_id": "uuid",
  "version": "1.2.3",
  "downloaded_at": "2026-01-15T...",
  "levels": [
    {
      "level_id": "uuid",
      "lessons": [...],
      "quizzes": [...],
      "assets": ["image1.png", "image2.png"]
    }
  ]
}
```

## 11.4 Sync Strategy

### Progress Sync
```
1. User completes lesson offline
2. Progress saved locally with timestamp
3. When online, client sends batch:
   POST /api/progress/sync
   {
     "entries": [
       { lesson_id, completed_at, score, time_spent }
     ]
   }
4. Server reconciles:
   - If server has newer data → return server version
   - If client has newer data → update server
   - Conflicts → latest timestamp wins
5. Client updates local data
```

### Content Updates
```
1. App checks for updates on launch (if online)
2. Compare local version vs server version
3. If update available:
   - Show badge on course
   - User can update or continue with old version
4. Update downloads only changed content (delta)
```

---

# 12. Internationalization

## 12.1 Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | en | Primary (MVP) |
| Filipino | fil | MVP |
| (More) | — | Future |

## 12.2 Implementation

### Frontend (next-intl)
```typescript
// messages/en.json
{
  "home": {
    "title": "Start Learning to Code",
    "subtitle": "Master programming with interactive lessons"
  }
}

// messages/fil.json
{
  "home": {
    "title": "Simulan ang Pag-aaral ng Code",
    "subtitle": "Master ang programming sa interactive na mga aralin"
  }
}
```

### Database Content
All user-facing content stored as JSONB:
```json
{
  "en": "Variables store data",
  "fil": "Ang mga variable ay nag-iimbak ng data"
}
```

### Selection Logic
1. Check user preference (if logged in)
2. Check browser/device locale
3. Fall back to English

## 12.3 Translation Workflow

1. Content created in English (source of truth)
2. AI generates initial Filipino translation
3. Native speaker reviews and corrects
4. Both versions published together
5. Missing translations fall back to English

## 12.4 RTL Considerations

Not needed for EN/FIL, but architecture supports future RTL:
- Tailwind's RTL utilities ready
- Layout components use logical properties (start/end vs left/right)

---

# 13. Security & Compliance

## 13.1 Authentication Security

- **Password hashing** — bcrypt with cost factor 12
- **JWT tokens** — Short-lived access (15min), long-lived refresh (7d)
- **OAuth** — Only trusted providers (Google, GitHub, Facebook)
- **Rate limiting** — Login attempts limited (5/minute)
- **Account lockout** — After 10 failed attempts

## 13.2 Data Protection

### Personal Data Stored
- Email address
- Username
- Display name
- Profile picture
- Learning progress
- IP addresses (for security logs)

### Data Handling
- Encryption at rest (Supabase default)
- Encryption in transit (TLS 1.3)
- No selling of personal data
- User can export their data
- User can delete their account

## 13.3 Content Security

- **XSS prevention** — All user input sanitized
- **CSRF protection** — Token-based
- **CSP headers** — Strict content security policy
- **Code execution** — Fully sandboxed (Judge0)

## 13.4 Compliance Targets

| Regulation | Status | Notes |
|------------|--------|-------|
| GDPR | Planned | EU users data rights |
| CCPA | Planned | California users |
| COPPA | Planned | Under-13 restrictions |
| Data Privacy Act (PH) | Planned | Philippine users |

### COPPA Considerations
- Age gate at registration
- Parental consent flow for under-13
- Limited data collection for minors
- No behavioral advertising to minors

## 13.5 Security Checklist

- [ ] HTTPS everywhere
- [ ] Security headers configured
- [ ] SQL injection prevention (Prisma parameterized queries)
- [ ] Rate limiting on all endpoints
- [ ] Input validation (Zod schemas)
- [ ] Dependency scanning (Dependabot)
- [ ] Regular security audits
- [ ] Bug bounty program (future)

---

# 14. Development Phases

## Phase 1: MVP (3-4 months)

### Month 1: Foundation
- [ ] Project setup (monorepo, CI/CD)
- [ ] Database schema and migrations
- [ ] Authentication system
- [ ] Basic UI component library
- [ ] Admin panel foundation

### Month 2: Core Learning
- [ ] Course/level/lesson data models
- [ ] Lesson viewer component
- [ ] Quiz system (all question types)
- [ ] Code editor integration (Monaco)
- [ ] Judge0 integration
- [ ] Progress tracking

### Month 3: Gamification & Polish
- [ ] XP and leveling system
- [ ] Streak tracking
- [ ] Basic achievements
- [ ] Leaderboard (global)
- [ ] User profiles
- [ ] Content: Python course (10 levels)

### Month 4: Launch Prep
- [ ] Content: JS, HTML, CSS courses
- [ ] Mobile app (React Native) — core features
- [ ] Testing and bug fixes
- [ ] Performance optimization
- [ ] Beta testing
- [ ] Launch!

## Phase 2: Social & Growth (2-3 months)

- [ ] Friend/follow system
- [ ] Comments on lessons
- [ ] Activity feed
- [ ] Friends leaderboard
- [ ] Push notifications
- [ ] Offline mode (mobile)
- [ ] Extended badge system
- [ ] Weekly challenges
- [ ] Filipino translations

## Phase 3: Monetization & Scale (3+ months)

- [ ] Premium subscription tier
- [ ] Ad integration (free tier)
- [ ] Additional languages (Java, C++, etc.)
- [ ] Certification system
- [ ] Classroom/team features
- [ ] AI-powered hints
- [ ] Project-based learning
- [ ] API for integrations

---

# 15. Team Structure

## 15.1 Recommended Roles

### Core Team (MVP)
| Role | Count | Responsibilities |
|------|-------|------------------|
| **Project Lead** | 1 | Vision, priorities, stakeholder management |
| **Full-Stack Developer** | 2-3 | Next.js, React Native, API development |
| **UI/UX Designer** | 1 | Interface design, user research |
| **Content Creator** | 1-2 | Lesson writing, quiz creation |
| **QA Tester** | 1 | Testing, bug reporting |

### Extended Team (Post-MVP)
| Role | Count | Responsibilities |
|------|-------|------------------|
| **DevOps Engineer** | 1 | Infrastructure, CI/CD, monitoring |
| **Mobile Developer** | 1 | React Native specialist |
| **Community Manager** | 1 | User support, moderation |
| **Marketing** | 1 | Growth, social media, partnerships |

## 15.2 Skill Requirements

### Full-Stack Developer
- Strong TypeScript
- Next.js (App Router)
- React Native / Expo
- PostgreSQL / Prisma
- tRPC (nice to have)
- Tailwind CSS

### UI/UX Designer
- Figma proficiency
- Mobile app design experience
- Design system creation
- Basic prototyping

### Content Creator
- Programming knowledge (Python, JS, HTML, CSS)
- Technical writing skills
- Curriculum design experience (nice to have)
- Bilingual EN/FIL (nice to have)

## 15.3 Development Workflow

### Git Strategy
- `main` — Production
- `develop` — Integration branch
- `feature/*` — Feature branches
- `fix/*` — Bug fix branches

### PR Process
1. Create feature branch from `develop`
2. Implement and test locally
3. Open PR with description
4. Code review (1 approval required)
5. Automated tests pass
6. Merge to `develop`
7. Weekly release to `main`

### Communication
- Daily async standups (Slack/Discord)
- Weekly sync meeting (30 min)
- Sprint planning bi-weekly
- Retrospectives monthly

---

# Appendix A: Tech Stack Quick Reference

```
Frontend:
├── Next.js 14+ (App Router)
├── React Native + Expo
├── TypeScript
├── Tailwind CSS + NativeWind
├── Zustand + TanStack Query
├── Monaco Editor
├── Radix UI + shadcn/ui

Backend:
├── NestJS
├── Node.js 20+
├── Prisma ORM
├── PostgreSQL
├── Passport.js + JWT
├── Redis (Upstash)
├── Bull Queue (background jobs)
├── Socket.io (real-time)

Infrastructure:
├── Vercel (web hosting)
├── Railway/Render (API hosting)
├── Railway Postgres/Supabase (database)
├── Cloudflare (CDN)
├── Judge0 (code execution)
├── Upstash Redis (rate limiting & caching)
├── Sentry (monitoring)
├── PostHog (analytics)
├── GitHub Actions (CI/CD)
```

---

# Appendix B: API Rate Limits

| Endpoint Category | Limit | Window |
|-------------------|-------|--------|
| Authentication | 5 | 1 minute |
| Code Execution | 10 | 1 minute |
| General API | 100 | 1 minute |
| Leaderboards | 30 | 1 minute |
| Search | 20 | 1 minute |

---

# Appendix C: Glossary

| Term | Definition |
|------|------------|
| **Tier** | Difficulty variant of a lesson (Easy/Medium/Hard) |
| **Level** | A topic containing 3 tiers |
| **Course** | A complete curriculum for one language |
| **Mastery** | Percentage of tiers completed |
| **XP** | Experience points earned through activities |
| **Streak** | Consecutive days of activity |

---

# Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial blueprint |

---

**End of Document**