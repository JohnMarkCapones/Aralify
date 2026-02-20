"use client";

import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Trophy,
  Flame,
  Code2,
  Star,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Zap,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "@/components/ui/neo-button";

const activityFeed = [
  { user: "Maria Santos", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", action: "completed", target: "Python Basics — Lesson 12", xp: 150, time: "2 min ago", type: "lesson" },
  { user: "Carlo Reyes", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlo", action: "earned badge", target: "Speed Demon 🚀", xp: 0, time: "5 min ago", type: "badge" },
  { user: "Ana Cruz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", action: "solved challenge", target: "Daily Challenge: Binary Search", xp: 300, time: "12 min ago", type: "challenge" },
  { user: "Miguel Torres", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel", action: "started course", target: "React From Zero", xp: 0, time: "18 min ago", type: "course" },
  { user: "Sofia Garcia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia", action: "reached streak", target: "30-Day Streak 🔥", xp: 500, time: "25 min ago", type: "streak" },
  { user: "Jem Villanueva", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jem", action: "completed", target: "JavaScript Essentials — Final Project", xp: 450, time: "32 min ago", type: "lesson" },
];

const topContributors = [
  { name: "CyberNinja", xp: 15400, streak: 45, badges: 23, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { name: "PixelQueen", xp: 14200, streak: 38, badges: 19, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { name: "CodeCrusher", xp: 12800, streak: 30, badges: 17, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
  { name: "DevStar_PH", xp: 11500, streak: 28, badges: 15, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevStar" },
  { name: "ByteHunter", xp: 10200, streak: 22, badges: 14, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ByteHunter" },
];

const discussions = [
  { title: "Best way to learn recursion?", author: "newbie_dev", replies: 24, likes: 45, tag: "Python", tagColor: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" },
  { title: "Tips for the Daily Challenge streak", author: "streak_master", replies: 18, likes: 67, tag: "General", tagColor: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400" },
  { title: "React hooks explained simply", author: "react_guru", replies: 31, likes: 89, tag: "React", tagColor: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400" },
  { title: "How I went from 0 to hired in 6 months", author: "success_story", replies: 56, likes: 234, tag: "Career", tagColor: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400" },
];

const communityStats = [
  { label: "Active Learners", value: "2,500+", icon: Users, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/40" },
  { label: "Discussions", value: "1,200+", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/40" },
  { label: "Challenges Solved", value: "45,000+", icon: Code2, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/40" },
  { label: "Badges Earned", value: "8,300+", icon: Trophy, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/40" },
];

const TYPE_STYLES: Record<string, { border: string; iconBg: string; iconColor: string }> = {
  lesson: { border: "border-l-blue-500", iconBg: "bg-blue-100 dark:bg-blue-950/40", iconColor: "text-blue-500" },
  badge: { border: "border-l-amber-500", iconBg: "bg-amber-100 dark:bg-amber-950/40", iconColor: "text-amber-500" },
  challenge: { border: "border-l-emerald-500", iconBg: "bg-emerald-100 dark:bg-emerald-950/40", iconColor: "text-emerald-500" },
  course: { border: "border-l-purple-500", iconBg: "bg-purple-100 dark:bg-purple-950/40", iconColor: "text-purple-500" },
  streak: { border: "border-l-orange-500", iconBg: "bg-orange-100 dark:bg-orange-950/40", iconColor: "text-orange-500" },
};

function ActivityIcon({ type }: { type: string }) {
  const style = TYPE_STYLES[type] || TYPE_STYLES.lesson;
  const iconClass = cn("shrink-0", style.iconColor);
  switch (type) {
    case "lesson": return <BookOpen size={14} className={iconClass} />;
    case "badge": return <Star size={14} className={iconClass} />;
    case "challenge": return <Zap size={14} className={iconClass} />;
    case "course": return <ArrowRight size={14} className={iconClass} />;
    case "streak": return <Flame size={14} className={iconClass} />;
    default: return <CheckCircle size={14} className={iconClass} />;
  }
}

const RANK_COLORS = [
  "from-amber-400 to-yellow-500",     // #1 gold
  "from-zinc-300 to-zinc-400",        // #2 silver
  "from-orange-400 to-amber-500",     // #3 bronze
  "from-blue-400 to-blue-500",        // #4
  "from-purple-400 to-purple-500",    // #5
];

export default function CommunityPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden border-b-4 border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-emerald-500/5" />
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 neo-brutal-border rounded-full font-black text-sm uppercase tracking-widest mb-6">
              <Users size={14} /> Join the Community
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">COMMUNITY</h1>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              Learn together, grow together. See what fellow Aralify learners are building, discuss ideas, and celebrate wins.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {communityStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 bg-background neo-brutal-border rounded-xl"
              >
                <div className={cn("p-2.5 rounded-xl", stat.bg)}>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <div>
                  <div className="font-black text-xl">{stat.value}</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Left: Activity Feed */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">ACTIVITY FEED</h2>
                  <div className="flex items-center gap-2 text-sm font-bold text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </div>
                </div>

                <div className="space-y-3">
                  {activityFeed.map((item, i) => {
                    const style = TYPE_STYLES[item.type] || TYPE_STYLES.lesson;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ x: 4 }}
                        className={cn(
                          "flex items-center gap-4 p-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl transition-shadow hover:neo-brutal-shadow group",
                          "border-l-4",
                          style.border
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full neo-brutal-border shrink-0" loading="lazy" />
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", style.iconBg)}>
                          <ActivityIcon type={item.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-sm">{item.user}</span>
                            <span className="text-sm font-medium text-muted-foreground">{item.action}</span>
                          </div>
                          <div className="text-sm font-bold text-primary truncate">{item.target}</div>
                        </div>
                        <div className="text-right shrink-0">
                          {item.xp > 0 && (
                            <span className="inline-flex items-center gap-1 text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              <Zap size={10} /> +{item.xp} XP
                            </span>
                          )}
                          <div className="text-xs text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
                            <Clock size={10} /> {item.time}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Discussions */}
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">TRENDING DISCUSSIONS</h2>
                <div className="space-y-3">
                  {discussions.map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ x: 4 }}
                      className="p-5 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl group cursor-pointer transition-shadow hover:neo-brutal-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${d.tagColor}`}>
                              {d.tag}
                            </span>
                            <TrendingUp size={12} className="text-primary" />
                          </div>
                          <h3 className="font-black text-base group-hover:text-primary transition-colors">{d.title}</h3>
                          <span className="text-xs font-medium text-muted-foreground">by @{d.author}</span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-xs font-bold flex items-center gap-1 text-blue-500">
                            <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                              <MessageSquare size={11} />
                            </div>
                            {d.replies}
                          </span>
                          <span className="text-xs font-bold flex items-center gap-1 text-rose-500">
                            <div className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center">
                              <Heart size={11} />
                            </div>
                            {d.likes}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6">
              {/* Top Contributors */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-6">
                <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                    <Trophy size={14} className="text-amber-500" />
                  </div>
                  Top Contributors
                </h3>
                <div className="space-y-2">
                  {topContributors.map((user, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white bg-gradient-to-br shrink-0",
                        RANK_COLORS[i] || RANK_COLORS[3]
                      )}>
                        {i + 1}
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full neo-brutal-border" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-sm truncate">{user.name}</div>
                        <div className="text-[10px] font-bold text-primary">{user.xp.toLocaleString()} XP</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-5 h-5 rounded-md bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center">
                          <Flame size={10} className="text-orange-500" />
                        </div>
                        <span className="text-xs font-bold text-orange-500">{user.streak}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 space-y-3">
                <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles size={14} className="text-primary" />
                  </div>
                  Quick Actions
                </h3>
                <NeoButton variant="primary" className="w-full justify-center gap-2">
                  <MessageSquare size={16} /> Start a Discussion
                </NeoButton>
                <NeoButton variant="outline" className="w-full justify-center gap-2">
                  <Share2 size={16} /> Share Your Code
                </NeoButton>
                <NeoButton variant="outline" className="w-full justify-center gap-2">
                  <Users size={16} /> Find Study Buddies
                </NeoButton>
              </div>

              {/* Community Guidelines */}
              <div className="relative overflow-hidden neo-brutal-border neo-brutal-shadow-sm rounded-2xl p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
                <div className="relative">
                  <h3 className="font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                      <CheckCircle size={14} className="text-emerald-500" />
                    </div>
                    Community Guidelines
                  </h3>
                  <ul className="space-y-2.5 text-sm font-medium text-muted-foreground">
                    {[
                      { rule: "Be respectful and supportive", color: "text-emerald-500" },
                      { rule: "No spam or self-promotion", color: "text-blue-500" },
                      { rule: "Help others before asking", color: "text-purple-500" },
                      { rule: "Use code blocks in discussions", color: "text-amber-500" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className={cn("mt-0.5 shrink-0", item.color)} />
                        {item.rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
