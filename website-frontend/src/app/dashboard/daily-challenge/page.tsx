"use client";

import { useState, useEffect } from "react";
import { Target, Clock, Zap, Trophy, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { StatCard } from "../_components/stat-card";
import { mockDailyChallenge, mockChallengeHistory, mockUserProfile } from "@/lib/data/dashboard";

export default function DailyChallengePage() {
  const challenge = mockDailyChallenge;
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function updateTimer() {
      const now = new Date();
      const reset = new Date(challenge.resetsAt);
      const diff = reset.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("Resetting...");
        return;
      }
      const hours = Math.floor(diff / 3_600_000);
      const mins = Math.floor((diff % 3_600_000) / 60_000);
      setTimeLeft(`${hours}h ${mins}m`);
    }
    updateTimer();
    const interval = setInterval(updateTimer, 60_000);
    return () => clearInterval(interval);
  }, [challenge.resetsAt]);

  const completedCount = mockChallengeHistory.filter((c) => c.completed).length;
  const totalXp = mockChallengeHistory.reduce((sum, c) => sum + c.xpEarned, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Daily Challenge"
        description="Solve a new coding challenge every day"
        actions={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} />
            <span className="font-medium">Resets in {timeLeft}</span>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Target size={16} />} label="Streak" value={`${mockUserProfile.streak} days`} />
        <StatCard icon={<Trophy size={16} />} label="Completed" value={completedCount} subtitle={`of ${mockChallengeHistory.length} challenges`} />
        <StatCard icon={<Zap size={16} />} label="Total XP" value={totalXp} />
        <StatCard icon={<Zap size={16} />} label="Multiplier" value={`${challenge.multiplier}x`} subtitle="Streak bonus" />
      </div>

      {/* Today's Challenge */}
      <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Today&apos;s Challenge</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Solve to earn XP and keep your streak</p>
          </div>
          <span className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full",
            challenge.difficulty === "easy" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
            challenge.difficulty === "medium" && "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
            challenge.difficulty === "hard" && "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
          )}>
            {challenge.difficulty}
          </span>
        </div>
        <div className="p-5">
          <h2 className="text-lg font-semibold mb-2">{challenge.title}</h2>
          <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>

          <div className="flex flex-wrap gap-4 mb-5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-medium">Language:</span> {challenge.language}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{challenge.timeLimit} min</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Zap size={12} className="text-primary" />
              <span className="font-medium text-primary">{challenge.xpReward} XP</span>
              <span className="text-muted-foreground">x{challenge.multiplier} multiplier = {challenge.xpReward * challenge.multiplier} XP</span>
            </div>
          </div>

          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Start Challenge
          </button>
        </div>
      </div>

      {/* Streak Multiplier Info */}
      <div className="bg-background rounded-xl border border-border/50 p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Streak Multiplier</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { days: "1-6 days", multi: "1x", active: mockUserProfile.streak < 7 },
            { days: "7-13 days", multi: "2x", active: mockUserProfile.streak >= 7 && mockUserProfile.streak < 14 },
            { days: "14+ days", multi: "3x", active: mockUserProfile.streak >= 14 },
          ].map((tier) => (
            <div
              key={tier.days}
              className={cn(
                "rounded-lg border p-3 text-center",
                tier.active
                  ? "border-primary bg-primary/5"
                  : "border-border/30 opacity-50"
              )}
            >
              <p className="text-lg font-semibold">{tier.multi}</p>
              <p className="text-[10px] text-muted-foreground">{tier.days}</p>
              {tier.active && <p className="text-[10px] text-primary font-medium mt-1">Active</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Challenge History */}
      <div className="bg-background rounded-xl border border-border/50 shadow-sm">
        <div className="px-5 py-4 border-b border-border/30">
          <h3 className="text-sm font-semibold">Recent Challenges</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Challenge</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Difficulty</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Language</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2.5">Time</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2.5">XP</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-5 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockChallengeHistory.map((entry) => (
                <tr key={entry.id} className="border-b border-border/20 last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-2.5 font-medium">{entry.title}</td>
                  <td className="px-4 py-2.5">
                    <span className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full capitalize",
                      entry.difficulty === "easy" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
                      entry.difficulty === "medium" && "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
                      entry.difficulty === "hard" && "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
                    )}>
                      {entry.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{entry.language}</td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{entry.timeTaken} min</td>
                  <td className="px-4 py-2.5 text-right font-medium">{entry.xpEarned > 0 ? `+${entry.xpEarned}` : "—"}</td>
                  <td className="px-5 py-2.5 text-center">
                    {entry.completed ? (
                      <CheckCircle size={16} className="text-emerald-500 inline" />
                    ) : (
                      <XCircle size={16} className="text-red-400 inline" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
