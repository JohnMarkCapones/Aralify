"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { motion } from "framer-motion";
import {
  Bell,
  Trophy,
  Flame,
  Zap,
  Users,
  MessageSquare,
  Star,
  BookOpen,
  CheckCircle,
  Clock,
  Settings,
  Trash2,
  Check,
  Filter,
} from "lucide-react";

type NotificationType = "achievement" | "streak" | "social" | "course" | "challenge" | "system";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: 1, type: "achievement", title: "New Badge Earned!", message: "You earned the 'Speed Demon' badge for solving a challenge in under 2 minutes.", time: "2 min ago", read: false },
  { id: 2, type: "streak", title: "Streak Reminder 🔥", message: "You haven't practiced today! Complete a lesson to keep your 12-day streak alive.", time: "1 hour ago", read: false },
  { id: 3, type: "social", title: "New Follower", message: "PixelQueen started following you.", time: "3 hours ago", read: false },
  { id: 4, type: "course", title: "Course Updated", message: "Python Fundamentals has 2 new lessons: 'Decorators' and 'Context Managers'.", time: "5 hours ago", read: true },
  { id: 5, type: "challenge", title: "Weekly Challenge Results", message: "You ranked #23 in last week's Algorithm Speed Run! +750 XP earned.", time: "1 day ago", read: true },
  { id: 6, type: "social", title: "Comment Reply", message: "CodeCrusher replied to your discussion: 'Best way to learn recursion?'", time: "1 day ago", read: true },
  { id: 7, type: "achievement", title: "Milestone Reached!", message: "You've completed 50 lessons total. +1,000 XP bonus awarded!", time: "2 days ago", read: true },
  { id: 8, type: "system", title: "Platform Update", message: "We've added Go and Rust to the Code Playground. Try them out!", time: "3 days ago", read: true },
  { id: 9, type: "streak", title: "30-Day Streak Approaching!", message: "You're at 12 days. Keep going for 18 more to hit the 30-day milestone!", time: "3 days ago", read: true },
  { id: 10, type: "course", title: "Certificate Ready", message: "Your JavaScript Essentials certificate is ready to download and share.", time: "5 days ago", read: true },
];

const typeIcon: Record<NotificationType, React.ReactNode> = {
  achievement: <Trophy size={18} className="text-accent" />,
  streak: <Flame size={18} className="text-orange-500" />,
  social: <Users size={18} className="text-secondary" />,
  course: <BookOpen size={18} className="text-primary" />,
  challenge: <Zap size={18} className="text-green-500" />,
  system: <Bell size={18} className="text-muted-foreground" />,
};

const typeColor: Record<NotificationType, string> = {
  achievement: "bg-accent/10 border-l-accent",
  streak: "bg-orange-100/50 dark:bg-orange-900/20 border-l-orange-500",
  social: "bg-secondary/10 border-l-secondary",
  course: "bg-primary/10 border-l-primary",
  challenge: "bg-green-100/50 dark:bg-green-900/20 border-l-green-500",
  system: "bg-muted/30 border-l-muted-foreground",
};

const filterOptions: { label: string; value: NotificationType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Achievements", value: "achievement" },
  { label: "Streaks", value: "streak" },
  { label: "Social", value: "social" },
  { label: "Courses", value: "course" },
  { label: "Challenges", value: "challenge" },
  { label: "System", value: "system" },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<NotificationType | "all">("all");
  const [readState, setReadState] = useState<Record<number, boolean>>(
    Object.fromEntries(notifications.map((n) => [n.id, n.read]))
  );

  const filtered = notifications.filter((n) => filter === "all" || n.type === filter);
  const unreadCount = notifications.filter((n) => !readState[n.id]).length;

  const markAllRead = () => {
    const updated: Record<number, boolean> = {};
    notifications.forEach((n) => { updated[n.id] = true; });
    setReadState(updated);
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">NOTIFICATIONS</h1>
              {unreadCount > 0 && (
                <span className="bg-destructive text-white font-black text-sm px-3 py-1 neo-brutal-border rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              Stay updated on your achievements, streak reminders, community activity, and platform news.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Actions bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-3 py-1.5 neo-brutal-border rounded-full font-black text-xs uppercase transition-colors ${
                    filter === f.value
                      ? "bg-primary text-white"
                      : "bg-card hover:bg-primary/5"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <NeoButton variant="outline" size="sm" className="gap-1" onClick={markAllRead}>
                  <Check size={12} /> Mark All Read
                </NeoButton>
              )}
            </div>
          </div>

          {/* Notification list */}
          <div className="space-y-3">
            {filtered.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setReadState((prev) => ({ ...prev, [notif.id]: true }))}
                className={`p-5 neo-brutal-border rounded-xl border-l-4 cursor-pointer transition-all hover:neo-brutal-shadow-sm ${
                  typeColor[notif.type]
                } ${!readState[notif.id] ? "neo-brutal-shadow-sm" : "opacity-75 hover:opacity-100"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-card neo-brutal-border rounded-lg shrink-0">
                    {typeIcon[notif.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-black text-sm ${!readState[notif.id] ? "" : "text-muted-foreground"}`}>
                        {notif.title}
                      </h3>
                      {!readState[notif.id] && (
                        <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{notif.message}</p>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground shrink-0 flex items-center gap-1">
                    <Clock size={10} /> {notif.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Bell size={48} className="text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-2">NO NOTIFICATIONS</h3>
              <p className="text-muted-foreground font-medium">No notifications match this filter.</p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
