"use client";

import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { FloatingShapes } from "@/components/effects";
import { Sparkles, Bug, Wrench, Rocket } from "lucide-react";

type ChangeType = "feature" | "fix" | "improvement";

interface ChangeItem {
  type: ChangeType;
  text: string;
}

interface ChangelogEntry {
  version: string;
  title: string;
  date: string;
  description: string;
  borderColor: string;
  changes: ChangeItem[];
}

const changeTypeConfig: Record<ChangeType, { icon: React.ReactNode; label: string; color: string }> = {
  feature: { icon: <Sparkles size={14} />, label: "Feature", color: "text-primary bg-primary/10" },
  fix: { icon: <Bug size={14} />, label: "Fix", color: "text-destructive bg-destructive/10" },
  improvement: { icon: <Wrench size={14} />, label: "Improvement", color: "text-secondary bg-secondary/10" },
};

const changelogEntries: ChangelogEntry[] = [
  {
    version: "v1.4.0",
    title: "Social Features",
    date: "February 3, 2026",
    description: "Connect with other learners through comments, follows, and activity feeds. Learning is better together.",
    borderColor: "border-l-primary",
    changes: [
      { type: "feature", text: "Comment on lessons and code challenges with rich text support" },
      { type: "feature", text: "Follow other learners and see their progress in your activity feed" },
      { type: "feature", text: "Like and reply to comments with nested threading" },
      { type: "feature", text: "Real-time notification system for follows, likes, and replies" },
      { type: "improvement", text: "Profile pages now show learning stats and recent activity" },
      { type: "fix", text: "Fixed avatar rendering issues on certain browsers" },
    ],
  },
  {
    version: "v1.3.0",
    title: "Gamification Overhaul",
    date: "January 24, 2026",
    description: "A complete revamp of the XP and rewards system. Harder challenges now give bigger rewards, and we added tons of new badges.",
    borderColor: "border-l-accent",
    changes: [
      { type: "feature", text: "XP multipliers: Easy (1x), Medium (2x), Hard (3x) per lesson difficulty" },
      { type: "feature", text: "15 new achievement badges across Learning, Streaks, Social, and Mastery categories" },
      { type: "feature", text: "Weekly and monthly leaderboards with podium display for top 3" },
      { type: "improvement", text: "Streak tracking now accounts for timezone differences" },
      { type: "improvement", text: "XP transaction history visible in user dashboard" },
      { type: "fix", text: "Streak counter no longer resets when completing a lesson at exactly midnight" },
    ],
  },
  {
    version: "v1.2.0",
    title: "Code Execution Improvements",
    date: "January 15, 2026",
    description: "Faster, more reliable code execution powered by Judge0 with support for even more programming languages.",
    borderColor: "border-l-secondary",
    changes: [
      { type: "feature", text: "Added support for Rust, Go, Kotlin, and Swift in the code sandbox" },
      { type: "feature", text: "Real-time code output streaming instead of waiting for full execution" },
      { type: "improvement", text: "50% faster code execution times with optimized Judge0 integration" },
      { type: "improvement", text: "Better error messages with line-number highlighting for syntax errors" },
      { type: "improvement", text: "Circuit breaker pattern prevents cascade failures during high traffic" },
      { type: "fix", text: "Fixed memory limit display showing incorrect values for certain languages" },
    ],
  },
  {
    version: "v1.1.0",
    title: "Course Catalog Redesign",
    date: "January 8, 2026",
    description: "A fresh new look for browsing courses, with better filtering, difficulty indicators, and estimated completion times.",
    borderColor: "border-l-green-500",
    changes: [
      { type: "feature", text: "New course cards with difficulty tier badges and XP reward previews" },
      { type: "feature", text: "Filter courses by language, difficulty, and estimated duration" },
      { type: "feature", text: "Course progress indicators show completion percentage per difficulty tier" },
      { type: "improvement", text: "Responsive grid layout adapts to all screen sizes" },
      { type: "improvement", text: "Course search with instant results and keyword highlighting" },
      { type: "fix", text: "Fixed course enrollment button not working on Safari mobile" },
    ],
  },
  {
    version: "v1.0.0",
    title: "Initial Launch",
    date: "January 1, 2026",
    description: "The very first release of Aralify! Interactive coding education with difficulty tiers, gamification, and real code execution.",
    borderColor: "border-l-foreground",
    changes: [
      { type: "feature", text: "8 programming courses covering Python, JavaScript, TypeScript, HTML/CSS, and more" },
      { type: "feature", text: "Three difficulty tiers (Easy, Medium, Hard) for every lesson" },
      { type: "feature", text: "Judge0-powered code sandbox for real code execution in 50+ languages" },
      { type: "feature", text: "User accounts with progress tracking, XP system, and streak counter" },
      { type: "feature", text: "Neo-brutalist design system with dark mode support" },
      { type: "feature", text: "Responsive web app built with Next.js 14 and Tailwind CSS" },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border relative overflow-hidden">
        <FloatingShapes shapes={[
          { type: "circle", size: 30, x: "90%", y: "20%", color: "bg-primary", delay: 0, duration: 8 },
          { type: "square", size: 22, x: "5%", y: "70%", color: "bg-secondary", delay: 1, duration: 10, rotate: 45 },
          { type: "diamond", size: 26, x: "85%", y: "75%", color: "bg-accent", delay: 2, duration: 9 },
          { type: "cross", size: 18, x: "15%", y: "15%", color: "bg-primary", delay: 1.5, duration: 11 },
          { type: "ring", size: 45, x: "70%", y: "10%", color: "border-secondary", delay: 0.5, duration: 13 },
        ]} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-4">
              WHAT&apos;S NEW
            </h1>
            <p className="text-lg font-medium text-muted-foreground max-w-xl mx-auto">
              Follow our journey as we build the best coding education platform. Here&apos;s everything we&apos;ve shipped.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-10">
              {changelogEntries.map((entry, i) => (
                <motion.div
                  key={entry.version}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 relative"
                >
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center shrink-0 z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white neo-brutal-border rounded-full flex items-center justify-center">
                      <Rocket size={20} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden border-l-[6px] ${entry.borderColor}`}>
                    {/* Card Header */}
                    <div className="px-6 pt-6 pb-4">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="bg-foreground text-background px-3 py-1 font-mono font-black text-xs rounded-full neo-brutal-border">
                          {entry.version}
                        </span>
                        <span className="text-sm font-bold text-muted-foreground">
                          {entry.date}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter">
                        {entry.title}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground mt-2 leading-relaxed">
                        {entry.description}
                      </p>
                    </div>

                    {/* Changes List */}
                    <div className="px-6 pb-6">
                      <div className="space-y-2">
                        {entry.changes.map((change, j) => {
                          const config = changeTypeConfig[change.type];
                          return (
                            <div key={j} className="flex items-start gap-2.5">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase shrink-0 mt-0.5 ${config.color}`}>
                                {config.icon}
                                {config.label}
                              </span>
                              <span className="text-sm font-medium leading-snug">
                                {change.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* End dot */}
            <div className="flex items-center gap-6 mt-10 relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-muted neo-brutal-border rounded-full flex items-center justify-center z-10 shrink-0">
                <span className="text-lg">&#x1F331;</span>
              </div>
              <p className="font-black text-muted-foreground uppercase tracking-wider text-sm">
                The beginning. More to come...
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
