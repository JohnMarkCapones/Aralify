"use client";

import { useState } from "react";
import { Trophy, Flame, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { mockLeaderboard, mockUserProfile } from "@/lib/data/dashboard";

type Period = "weekly" | "monthly" | "all_time";

const MEDALS = ["", "bg-amber-400", "bg-zinc-300", "bg-amber-700"];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("weekly");

  const currentUser = mockLeaderboard.find((e) => e.isCurrentUser);
  const top3 = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  const percentile = ((1 - mockUserProfile.rank / mockUserProfile.totalUsers) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leaderboard"
        description="See where you stand among fellow learners"
        actions={
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
            {(["weekly", "monthly", "all_time"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                  period === p ? "bg-background card-elevated text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p === "all_time" ? "All Time" : p}
              </button>
            ))}
          </div>
        }
      />

      {/* User rank highlight */}
      {currentUser && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Your Rank</p>
              <p className="text-3xl font-semibold">#{currentUser.rank}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Top {percentile}%</p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-1.5 justify-end">
                <Zap size={14} className="text-primary" />
                <span className="text-sm font-medium">{currentUser.xp.toLocaleString()} XP</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <Flame size={14} className="text-orange-500" />
                <span className="text-sm font-medium">{currentUser.streak}-day streak</span>
              </div>
              <p className="text-xs text-muted-foreground">Level {currentUser.level}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3">
        {[top3[1], top3[0], top3[2]].map((entry, i) => {
          const podiumOrder = [2, 1, 3];
          const rank = podiumOrder[i];
          return (
            <div
              key={entry.id}
              className={cn(
                "bg-background rounded-xl border border-border/50 shadow-sm p-4 text-center",
                rank === 1 && "ring-2 ring-amber-400/50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold mx-auto mb-2",
                MEDALS[rank]
              )}>
                {rank}
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-2 text-sm font-semibold text-primary">
                {entry.displayName.charAt(0)}
              </div>
              <p className="text-xs font-semibold truncate">{entry.displayName}</p>
              <p className="text-[10px] text-muted-foreground">@{entry.username}</p>
              <div className="mt-2 flex items-center justify-center gap-1">
                <Zap size={10} className="text-primary" />
                <span className="text-xs font-medium">{entry.xp.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Level {entry.level}</p>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="bg-background rounded-xl border border-border/50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3 w-12">#</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">User</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Level</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">XP</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Streak</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((entry) => (
                <tr
                  key={entry.id}
                  className={cn(
                    "border-b border-border/20 last:border-b-0 transition-colors",
                    entry.isCurrentUser
                      ? "bg-primary/5 hover:bg-primary/10"
                      : "hover:bg-muted/20"
                  )}
                >
                  <td className="px-5 py-2.5 font-medium text-muted-foreground">{entry.rank}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
                        {entry.displayName.charAt(0)}
                      </div>
                      <div>
                        <p className={cn("text-sm font-medium", entry.isCurrentUser && "text-primary")}>
                          {entry.displayName}
                          {entry.isCurrentUser && <span className="text-[10px] ml-1.5">(You)</span>}
                        </p>
                        <p className="text-[10px] text-muted-foreground">@{entry.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{entry.level}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{entry.xp.toLocaleString()}</td>
                  <td className="px-5 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Flame size={12} className="text-orange-500" />
                      <span className="text-muted-foreground">{entry.streak}</span>
                    </div>
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
