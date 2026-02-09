"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DailyChallenge } from "@/lib/data/dashboard";

interface DailyChallengeBannerProps {
  challenge: DailyChallenge;
}

const difficultyLabel: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function DailyChallengeBanner({ challenge }: DailyChallengeBannerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const reset = new Date(challenge.resetsAt);
      const diff = reset.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("00:00");
        return;
      }

      const hours = Math.floor(diff / 3_600_000);
      const mins = Math.floor((diff % 3_600_000) / 60_000);
      setTimeLeft(`${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60_000);
    return () => clearInterval(interval);
  }, [challenge.resetsAt]);

  const totalXp = challenge.xpReward * challenge.multiplier;

  return (
    <section
      className={cn(
        "rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 p-6",
        challenge.completed && "opacity-60"
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Left: info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-primary shrink-0" />
            <span className="text-xs font-medium text-primary">
              Daily Challenge
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-1">{challenge.title}</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-muted/50 font-medium">
              {difficultyLabel[challenge.difficulty]}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-muted/50 font-medium">
              {challenge.language}
            </span>
            <span className="font-bold text-primary">
              {challenge.xpReward} XP x{challenge.multiplier} = {totalXp} XP
            </span>
          </div>
        </div>

        {/* Right: timer + CTA */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={14} />
            <span className="font-mono text-sm font-bold">{timeLeft}</span>
          </div>

          {challenge.completed ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 text-sm font-medium">
              <Check size={16} className="text-green-500" />
              <span>Completed</span>
            </div>
          ) : (
            <Link
              href="/dashboard/daily-challenge"
              className="bg-primary text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Start Challenge
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
