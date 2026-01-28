<p align="center">
  <img src="https://via.placeholder.com/120x120/1a365d/ffffff?text=CF" alt="Aralify Logo" width="120" height="120">
</p>

<h1 align="center">Aralify</h1>

<p align="center">
  <strong>Learn to code through interactive challenges — at your own pace, your own difficulty.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/platform-web%20%7C%20ios%20%7C%20android-lightgrey.svg" alt="Platform">
</p>

---

## 🚀 About

Aralify is a next-generation interactive programming education platform. Unlike traditional linear courses, every lesson offers **Easy**, **Medium**, and **Hard** difficulty tiers — letting learners progress at their own pace while being rewarded for mastering harder content.

**Why Aralify?**

- 🎯 **Flexible Difficulty** — Pass any tier to progress. Return for harder challenges anytime.
- 💻 **Real Code Execution** — Write code that actually runs, not just theory.
- 🔥 **Meaningful Gamification** — XP multipliers, streaks, badges, and leaderboards that reward real effort.
- 📱 **Cross-Platform** — Web, iOS, and Android with offline support.
- 🌍 **Multilingual** — English and Filipino, with more languages coming.

---

## ✨ Features

### Core Learning

- 📚 Structured courses with levels and difficulty tiers (Easy/Medium/Hard)
- ✍️ Interactive lessons with code examples and explanations
- ❓ Multiple quiz types (multiple choice, fill-in-blank, code completion)
- 🖥️ In-browser code execution with instant feedback
- 📊 Progress tracking with mastery percentages

### Gamification

- ⭐ XP system with difficulty multipliers (1x / 2x / 3x)
- 🔥 Daily streak tracking with milestone rewards
- 🏆 Achievements and collectible badges
- 📈 Global and friends leaderboards
- 🎖️ Rank titles based on total XP

### Social

- 👥 User profiles with public stats
- 👫 Follow system to connect with friends
- 💬 Comments and discussions on lessons
- 📰 Activity feed showing friend progress

### Platform

- 🌐 Responsive web application
- 📱 Native mobile apps (iOS & Android)
- 📴 Offline mode with downloadable lessons
- 🌏 Internationalization (EN, FIL)

---

## 🛠️ Tech Stack

### Frontend

| Technology                                                           | Purpose                    |
| -------------------------------------------------------------------- | -------------------------- |
| [Next.js 14](https://nextjs.org/)                                    | Web framework (App Router) |
| [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) | Mobile apps                |
| [TypeScript](https://www.typescriptlang.org/)                        | Type safety                |
| [Tailwind CSS](https://tailwindcss.com/)                             | Styling                    |
| [Zustand](https://zustand-demo.pmnd.rs/)                             | State management           |
| [TanStack Query](https://tanstack.com/query)                         | Data fetching & caching    |
| [Monaco Editor](https://microsoft.github.io/monaco-editor/)          | Code editor                |

### Backend

| Technology                                  | Purpose                                     |
| ------------------------------------------- | ------------------------------------------- |
| [NestJS](https://nestjs.com/)               | Backend framework (REST API)                |
| [Node.js 20+](https://nodejs.org/)          | Runtime                                     |
| [Prisma](https://www.prisma.io/)            | ORM                                         |
| [PostgreSQL](https://www.postgresql.org/)   | Primary database                            |
| [Supabase](https://supabase.com/)           | Auth, Postgres hosting, storage, realtime   |
| [Redis](https://redis.io/)                  | Caching, rate limiting, queues              |
| [Bull](https://github.com/OptimalBits/bull) | Background jobs & scheduling                |
| [Socket.io](https://socket.io/)             | Real-time features (activity, leaderboards) |
| [Judge0](https://judge0.com/)               | Code execution sandbox                      |

### Infrastructure

| Technology                       | Purpose          |
| -------------------------------- | ---------------- |
| [Vercel](https://vercel.com/)    | Web hosting      |
| [Expo EAS](https://expo.dev/eas) | Mobile builds    |
| [Sentry](https://sentry.io/)     | Error monitoring |
| [PostHog](https://posthog.com/)  | Analytics        |

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL (or Supabase account)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/Aralify.git
   cd Aralify
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required values:

   ```env
   # Database
   DATABASE_URL="postgresql://..."

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"
   SUPABASE_SERVICE_ROLE_KEY="xxx"

   # Judge0 (Code Execution)
   JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
   JUDGE0_API_KEY="xxx"

   # OAuth (optional)
   GOOGLE_CLIENT_ID="xxx"
   GOOGLE_CLIENT_SECRET="xxx"
   GITHUB_CLIENT_ID="xxx"
   GITHUB_CLIENT_SECRET="xxx"
   ```

4. **Set up the database**

   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open the app**
   - Web: [http://localhost:3000](http://localhost:3000)
   - Mobile: Run `pnpm mobile` and scan QR with Expo Go

---

## 📁 Project Structure

```
Aralify/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   └── lib/             # Utilities
│   └── mobile/              # React Native app
│       ├── app/             # Expo router screens
│       └── components/      # RN components
├── packages/
│   ├── api/                 # tRPC routers
│   ├── db/                  # Prisma schema & client
│   ├── ui/                  # Shared UI components
│   └── config/              # Shared configs
├── docs/                    # Documentation
└── scripts/                 # Utility scripts
```

---

## 📜 Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `pnpm dev`       | Start web development server   |
| `pnpm mobile`    | Start Expo development server  |
| `pnpm build`     | Build for production           |
| `pnpm lint`      | Run ESLint                     |
| `pnpm test`      | Run tests                      |
| `pnpm db:push`   | Push schema to database        |
| `pnpm db:seed`   | Seed database with sample data |
| `pnpm db:studio` | Open Prisma Studio             |

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a PR.

### Quick Start

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance
```

---

## 🗺️ Roadmap

- [x] Project setup and architecture
- [ ] **Phase 1: MVP**
  - [ ] Authentication system
  - [ ] Course and lesson structure
  - [ ] Quiz system
  - [ ] Code execution integration
  - [ ] Basic gamification (XP, streaks)
  - [ ] Python & JavaScript courses
- [ ] **Phase 2: Social**
  - [ ] Friend system
  - [ ] Comments and discussions
  - [ ] Activity feed
  - [ ] Offline mode
- [ ] **Phase 3: Growth**
  - [ ] Additional languages
  - [ ] Premium subscriptions
  - [ ] Certification system
  - [ ] AI-powered hints

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Sololearn](https://www.sololearn.com/) — Inspiration for interactive learning
- [Duolingo](https://www.duolingo.com/) — Gamification inspiration
- [Judge0](https://judge0.com/) — Code execution API
- [Supabase](https://supabase.com/) — Backend infrastructure

---

<p align="center">
  <strong>Build your skills. Forge your future.</strong>
</p>

<p align="center">
  <a href="https://Aralify.app">Website</a> •
  <a href="https://twitter.com/Aralifyapp">Twitter</a> •
  <a href="https://discord.gg/Aralify">Discord</a>
</p>
