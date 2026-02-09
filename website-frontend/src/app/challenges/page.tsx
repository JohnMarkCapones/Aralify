"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  Trophy,
  Flame,
  ArrowRight,
  Code2,
  Star,
  Users,
  Target,
  Calendar,
  Timer,
  Swords,
  Crown,
  CheckCircle,
} from "lucide-react";

const dailyChallenges = [
  {
    title: "Reverse a Linked List",
    language: "Python",
    difficulty: "Medium",
    xp: 200,
    timeLimit: "15 min",
    solvedBy: 342,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    tags: ["Data Structures", "Linked Lists"],
  },
  {
    title: "Binary Search Implementation",
    language: "JavaScript",
    difficulty: "Easy",
    xp: 100,
    timeLimit: "10 min",
    solvedBy: 891,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    tags: ["Algorithms", "Search"],
  },
  {
    title: "Build a REST API Endpoint",
    language: "TypeScript",
    difficulty: "Hard",
    xp: 300,
    timeLimit: "25 min",
    solvedBy: 156,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tags: ["Backend", "API Design"],
  },
];

const weeklyChallenges = [
  {
    title: "Full-Stack Todo App",
    description: "Build a complete todo app with React frontend and Node.js backend. Includes auth, CRUD, and persistence.",
    difficulty: "Hard",
    xp: 1500,
    timeLeft: "4 days, 12 hours",
    participants: 234,
    submissions: 89,
    tags: ["Full-Stack", "React", "Node.js"],
  },
  {
    title: "Algorithm Speed Run",
    description: "Solve 5 algorithm challenges in under 30 minutes. Each correct answer earns bonus XP.",
    difficulty: "Medium",
    xp: 750,
    timeLeft: "4 days, 12 hours",
    participants: 567,
    submissions: 312,
    tags: ["Algorithms", "Speed"],
  },
];

const pastWinners = [
  { name: "CyberNinja", challenge: "Binary Tree Traversal", time: "4:23", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { name: "PixelQueen", challenge: "API Rate Limiter", time: "8:45", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { name: "DevStar_PH", challenge: "React State Machine", time: "12:01", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevStar" },
];

const diffColor: Record<string, string> = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
};

export default function ChallengesPage() {
  const [tab, setTab] = useState<"daily" | "weekly">("daily");

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-destructive text-white px-4 py-1.5 neo-brutal-border rounded-full font-black text-sm uppercase tracking-widest mb-6">
              <Swords size={14} /> Challenge Arena
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">CHALLENGES</h1>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              Test your skills with daily and weekly coding challenges. Compete against the clock and other learners for XP and glory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-6 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: <Timer size={16} />, label: "Next challenge in", value: "2h 34m" },
              { icon: <Users size={16} />, label: "Active now", value: "1,247" },
              { icon: <Flame size={16} />, label: "Your streak", value: "12 days" },
              { icon: <Trophy size={16} />, label: "Challenges solved", value: "47" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-primary">{s.icon}</span>
                <span className="font-medium text-muted-foreground">{s.label}:</span>
                <span className="font-black">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Selector */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 mb-8">
            {(["daily", "weekly"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 neo-brutal-border rounded-xl font-black text-sm uppercase transition-all ${
                  tab === t ? "bg-primary text-white neo-brutal-shadow-sm" : "bg-card hover:bg-primary/5"
                }`}
              >
                {t === "daily" ? "Daily Challenges" : "Weekly Challenges"}
              </button>
            ))}
          </div>

          {tab === "daily" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-primary" />
                <span className="font-black text-sm uppercase tracking-wider">Today&apos;s Challenges</span>
                <span className="text-xs font-bold text-muted-foreground">· Resets in 14h 26m</span>
              </div>

              {dailyChallenges.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 group cursor-pointer transition-shadow hover:neo-brutal-shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.icon} alt={c.language} className="w-10 h-10 shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-black text-lg">{c.title}</h3>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border ${diffColor[c.difficulty]}`}>
                            {c.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          {c.tags.map((tag) => (
                            <span key={tag} className="text-xs font-bold text-muted-foreground">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-center">
                        <div className="text-xs font-bold text-muted-foreground uppercase">XP</div>
                        <div className="font-black text-primary flex items-center gap-1"><Zap size={12} /> {c.xp}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-muted-foreground uppercase">Time</div>
                        <div className="font-black flex items-center gap-1"><Clock size={12} /> {c.timeLimit}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-muted-foreground uppercase">Solved</div>
                        <div className="font-black flex items-center gap-1"><Users size={12} /> {c.solvedBy}</div>
                      </div>
                      <NeoButton variant="primary" size="sm" className="gap-1">
                        START <ArrowRight size={12} />
                      </NeoButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {weeklyChallenges.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-8 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border ${diffColor[c.difficulty]}`}>
                          {c.difficulty}
                        </span>
                        <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                          <Clock size={10} /> {c.timeLeft} left
                        </span>
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">{c.title}</h3>
                      <p className="text-sm font-medium text-muted-foreground mt-1">{c.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-black text-primary flex items-center gap-1 justify-end">
                        <Zap size={18} /> {c.xp} XP
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span key={tag} className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full neo-brutal-border">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t-2 border-border">
                    <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground">
                      <span className="flex items-center gap-1"><Users size={14} /> {c.participants} joined</span>
                      <span className="flex items-center gap-1"><CheckCircle size={14} /> {c.submissions} submitted</span>
                    </div>
                    <NeoButton variant="primary" className="gap-2">
                      JOIN CHALLENGE <ArrowRight size={14} />
                    </NeoButton>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Winners */}
      <section className="py-20 bg-card border-y-4 border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-12">RECENT WINNERS</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {pastWinners.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background neo-brutal-border neo-brutal-shadow rounded-2xl p-6 text-center space-y-3"
              >
                <Crown size={20} className="text-accent mx-auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.avatar} alt={w.name} className="w-16 h-16 rounded-full neo-brutal-border mx-auto" loading="lazy" />
                <div>
                  <div className="font-black text-lg">{w.name}</div>
                  <div className="text-sm font-medium text-muted-foreground">{w.challenge}</div>
                  <div className="text-xs font-black text-primary mt-1 flex items-center justify-center gap-1">
                    <Timer size={10} /> {w.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
