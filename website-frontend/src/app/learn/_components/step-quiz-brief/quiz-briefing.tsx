"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Timer,
  Flame,
  Scissors,
  Snowflake,
  ShieldCheck,
  Lightbulb,
  Zap,
  Clock,
  SkipForward,
  Swords,
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { getDefaultPowerups, QUIZ_SCORING } from "@/lib/data/lesson-flow";

interface QuizBriefingProps {
  questionCount: number;
  onBegin: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const iconMap = {
  Scissors,
  Snowflake,
  ShieldCheck,
  Lightbulb,
  Zap,
  Clock,
  SkipForward,
} as const;

const powerupColors: Record<string, string> = {
  eliminate: "border-violet-500/30 bg-violet-50/30 dark:bg-violet-950/10",
  freeze: "border-cyan-500/30 bg-cyan-50/30 dark:bg-cyan-950/10",
  shield: "border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/10",
  hint: "border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/10",
  double_xp: "border-primary/30 bg-primary/5 dark:bg-primary/10",
  extra_time: "border-sky-500/30 bg-sky-50/30 dark:bg-sky-950/10",
  skip: "border-rose-500/30 bg-rose-50/30 dark:bg-rose-950/10",
};

const powerupIconColors: Record<string, string> = {
  eliminate: "text-violet-500",
  freeze: "text-cyan-500",
  shield: "text-emerald-500",
  hint: "text-amber-500",
  double_xp: "text-primary",
  extra_time: "text-sky-500",
  skip: "text-rose-500",
};

export function QuizBriefing({ questionCount, onBegin }: QuizBriefingProps) {
  const powerups = getDefaultPowerups();

  return (
    <div className="flex-1 flex items-center justify-center py-6 px-2">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-4xl mx-auto space-y-6"
      >
        {/* Header — centered */}
        <motion.div variants={item} className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <Swords size={14} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Quiz Time
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Get Ready!
          </h2>
          <p className="text-sm text-muted-foreground">
            {questionCount} questions ahead
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT — Game rules */}
          <motion.div variants={item} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              How it works
            </p>

            {/* Hearts */}
            <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-red-500/20 bg-red-50/20 dark:bg-red-950/10">
              <div className="shrink-0 flex gap-0.5 pt-0.5">
                {Array.from({ length: QUIZ_SCORING.MAX_HEARTS }).map(
                  (_, i) => (
                    <Heart
                      key={i}
                      size={18}
                      className="fill-red-500 text-red-500"
                    />
                  )
                )}
              </div>
              <div>
                <p className="text-sm font-bold">
                  {QUIZ_SCORING.MAX_HEARTS} Lives
                </p>
                <p className="text-xs text-muted-foreground">
                  Each wrong answer costs 1 heart. Lose all hearts and
                  the quiz ends — but you can review your mistakes and
                  retry.
                </p>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-amber-500/20 bg-amber-50/20 dark:bg-amber-950/10">
              <Timer size={22} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Timed Questions</p>
                <p className="text-xs text-muted-foreground">
                  Each question has a countdown timer. The faster you
                  answer correctly, the more speed bonus XP you earn.
                </p>
              </div>
            </div>

            {/* Combo */}
            <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-orange-500/20 bg-orange-50/20 dark:bg-orange-950/10">
              <Flame size={22} className="text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Combo Streak</p>
                <p className="text-xs text-muted-foreground">
                  Chain correct answers to build a combo multiplier.
                  Each consecutive correct answer increases your bonus
                  XP. Miss one and the streak resets.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Power-ups */}
          <motion.div variants={item} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Power-ups
              </p>
              {powerups.length > 3 && (
                <p className="text-[10px] text-muted-foreground/50">
                  Scroll for more ({powerups.length} total)
                </p>
              )}
            </div>

            <div className="max-h-[280px] overflow-y-auto pr-1 space-y-3 scrollbar-thin">
            {powerups.map((powerup) => {
              const Icon = iconMap[powerup.icon as keyof typeof iconMap];
              const cardColor = powerupColors[powerup.type] || "";
              const iconColor =
                powerupIconColors[powerup.type] || "text-primary";

              return (
                <motion.div
                  key={powerup.type}
                  variants={item}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 ${cardColor}`}
                >
                  {/* Icon + uses badge */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border/30 flex items-center justify-center">
                      {Icon && <Icon size={24} className={iconColor} />}
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {powerup.uses}
                    </span>
                  </div>

                  {/* Label + description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold">{powerup.label}</p>
                      <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                        {powerup.uses} {powerup.uses === 1 ? "use" : "uses"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {getPowerupDetail(powerup.type)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
            </div>
          </motion.div>
        </div>

        {/* CTA — centered */}
        <motion.div variants={item} className="text-center pt-2">
          <NeoButton size="lg" onClick={onBegin} className="min-w-[200px]">
            Begin Quiz
          </NeoButton>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Expanded descriptions for the briefing screen */
function getPowerupDetail(type: string): string {
  switch (type) {
    case "eliminate":
      return "Removes 2 wrong answers from a multiple-choice question, giving you a 50/50 shot. Only works on multiple-choice questions.";
    case "freeze":
      return "Pauses the question timer completely, giving you unlimited time to think through your answer carefully.";
    case "shield":
      return "Protects you from losing a heart on your next wrong answer. Use it when you're unsure — your streak still resets though.";
    case "hint":
      return "Reveals a helpful hint about the question. Great when you're stuck but doesn't give away the answer directly.";
    case "double_xp":
      return "Activates a 2x multiplier on your next correct answer's base XP. Use it when you're confident you know the answer.";
    case "extra_time":
      return "Adds 15 extra seconds to the current question timer. Perfect for tricky reorder or fill-in-the-blank questions.";
    case "skip":
      return "Skips the current question entirely without losing a heart or gaining XP. Save it for questions you truly don't know.";
    default:
      return "";
  }
}
