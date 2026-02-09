"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle, Award, TrendingUp, Swords, BookOpen, Zap,
  Code2, Settings, User, Calendar,
} from "lucide-react";
import { LogoutButton } from "../logout-button";

type ActivityType = "all" | "lessons" | "challenges" | "achievements";

const activities = [
  { group: "Today", items: [
    { text: 'Completed "Functions & Scope" (Hard)', xp: "+150 XP", time: "2h ago", icon: <CheckCircle size={16} className="text-emerald-500" />, type: "lessons" as const },
    { text: 'Solved "Binary Search" challenge', xp: "+100 XP", time: "3h ago", icon: <Swords size={16} className="text-primary" />, type: "challenges" as const },
    { text: 'Earned "Speed Demon" badge', xp: "+50 XP", time: "3h ago", icon: <Award size={16} className="text-yellow-500" />, type: "achievements" as const },
  ]},
  { group: "Yesterday", items: [
    { text: 'Completed "Loops in Python" (Medium)', xp: "+100 XP", time: "1d ago", icon: <CheckCircle size={16} className="text-emerald-500" />, type: "lessons" as const },
    { text: 'Earned "10-Day Streak" badge', xp: "+50 XP", time: "1d ago", icon: <Award size={16} className="text-yellow-500" />, type: "achievements" as const },
    { text: 'Completed "Variables" in JS (Easy)', xp: "+50 XP", time: "1d ago", icon: <CheckCircle size={16} className="text-emerald-500" />, type: "lessons" as const },
  ]},
  { group: "This Week", items: [
    { text: 'Climbed to Rank #142 on leaderboard', xp: "", time: "2d ago", icon: <TrendingUp size={16} className="text-primary" />, type: "achievements" as const },
    { text: 'Started "React From Zero" course', xp: "", time: "3d ago", icon: <BookOpen size={16} className="text-blue-500" />, type: "lessons" as const },
    { text: 'Solved "Reverse Linked List" challenge', xp: "+200 XP", time: "3d ago", icon: <Swords size={16} className="text-primary" />, type: "challenges" as const },
    { text: 'Completed "Arrays & Objects" (Hard)', xp: "+150 XP", time: "4d ago", icon: <CheckCircle size={16} className="text-emerald-500" />, type: "lessons" as const },
    { text: 'Earned "First Challenge" badge', xp: "+25 XP", time: "5d ago", icon: <Award size={16} className="text-yellow-500" />, type: "achievements" as const },
  ]},
];

const filterTabs: { id: ActivityType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "lessons", label: "Lessons" },
  { id: "challenges", label: "Challenges" },
  { id: "achievements", label: "Achievements" },
];

export function ActivityClient({ userEmail }: { userEmail: string }) {
  const [filter, setFilter] = useState<ActivityType>("all");

  const filteredActivities = activities.map((group) => ({
    ...group,
    items: group.items.filter((item) => filter === "all" || item.type === filter),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      {/* Top bar */}
      <div className="border-b-3 border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-primary text-white rounded-lg neo-brutal-border">
              <Code2 size={18} />
            </div>
            <span className="font-display font-black text-xl uppercase tracking-tighter">Aralify</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <Link href="/settings" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Settings">
              <Settings size={18} />
            </Link>
            <Link href="/profile/me" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Profile">
              <User size={18} />
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Calendar size={28} /> ACTIVITY
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Your recent learning activity.</p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 neo-brutal-border rounded-xl font-black text-sm uppercase transition-all ${
                filter === tab.id
                  ? "bg-primary text-white neo-brutal-shadow-sm"
                  : "bg-card hover:bg-primary/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="space-y-8">
          {filteredActivities.map((group) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">{group.group}</h2>
              <div className="space-y-3">
                {group.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-card neo-brutal-border rounded-xl hover:neo-brutal-shadow-sm transition-shadow"
                  >
                    <div className="mt-0.5 shrink-0 p-2 bg-muted/50 rounded-lg">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm leading-snug">{item.text}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-muted-foreground">{item.time}</span>
                        {item.xp && (
                          <span className="text-xs font-black text-primary flex items-center gap-0.5">
                            <Zap size={10} /> {item.xp}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
