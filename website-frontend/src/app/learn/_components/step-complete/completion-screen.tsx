"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Home,
  CheckCircle2,
  Code2,
  Brain,
  Heart,
  Zap,
  Timer,
  Trophy,
  Flame,
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { XpBurst } from "./xp-burst";
import { StreakBadge } from "./streak-badge";
import { LessonTransition } from "./lesson-transition";
import type { LessonCompletionStats } from "@/lib/data/lesson-flow";
import { mockLessonFlowData } from "@/lib/data/lesson-flow";

interface CompletionScreenProps {
  stats: LessonCompletionStats;
  lessonTitle: string;
  courseId: string;
  nextLessonId: string | null;
  lessonOrder?: number;
}

export function CompletionScreen({
  stats,
  lessonTitle,
  courseId,
  nextLessonId,
  lessonOrder = 1,
}: CompletionScreenProps) {
  const router = useRouter();
  const [showTransition, setShowTransition] = useState(false);

  const nextLesson = nextLessonId ? mockLessonFlowData[nextLessonId] : null;

  const handleNextLesson = useCallback(() => {
    setShowTransition(true);
  }, []);

  const handleNavigate = useCallback(() => {
    if (nextLessonId) {
      router.push(`/learn/${nextLessonId}?courseId=${courseId}`);
    }
  }, [nextLessonId, courseId, router]);
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 py-8">
      {/* Celebration header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {stats.perfectLesson && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="mb-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-950/40 border-2 border-amber-300 dark:border-amber-700"
          >
            <Trophy size={16} className="text-amber-500" />
            <span className="text-sm font-display font-bold text-amber-600 dark:text-amber-400">
              PERFECT LESSON!
            </span>
          </motion.div>
        )}
        <h2 className="text-2xl sm:text-3xl font-display font-bold">
          Lesson Complete!
        </h2>
        <p className="text-muted-foreground mt-1">{lessonTitle}</p>
      </motion.div>

      {/* XP Burst */}
      <XpBurst xp={stats.xpEarned} multiplier={stats.xpMultiplier} />

      {/* Main stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-3 gap-3 w-full max-w-sm"
      >
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border/30 bg-card">
          <Brain size={20} className="text-primary" />
          <span className="text-lg font-display font-bold">
            {stats.quizScore}/{stats.quizTotal}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Quiz
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border/30 bg-card">
          <Code2 size={20} className="text-emerald-500" />
          <span className="text-lg font-display font-bold">
            {stats.testsPassed}/{stats.testsTotal}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Tests
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border/30 bg-card">
          <Heart size={20} className="fill-red-500 text-red-500" />
          <span className="text-lg font-display font-bold">
            {stats.heartsRemaining}/{stats.maxHearts}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Hearts
          </span>
        </div>
      </motion.div>

      {/* XP Bonus breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="w-full max-w-sm space-y-1.5"
      >
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center mb-2">
          XP Breakdown
        </p>

        <BonusRow
          icon={<Zap size={14} className="text-primary" />}
          label="Speed Bonus"
          value={`+${stats.speedBonusXp}`}
          delay={1.3}
        />
        <BonusRow
          icon={<Flame size={14} className="text-orange-500" />}
          label={`Max Combo: ${stats.maxCombo}x`}
          value={`+${stats.comboBonusXp}`}
          delay={1.4}
        />
        <BonusRow
          icon={<Heart size={14} className="fill-red-500 text-red-500" />}
          label={`Hearts Saved: ${stats.heartsRemaining}`}
          value={`+${stats.heartsBonusXp}`}
          delay={1.5}
        />
        {stats.perfectLesson && (
          <BonusRow
            icon={<Trophy size={14} className="text-amber-500" />}
            label="Perfect Lesson!"
            value="+100"
            highlight
            delay={1.6}
          />
        )}
        <BonusRow
          icon={<CheckCircle2 size={14} className="text-emerald-500" />}
          label={`Difficulty: ${stats.difficulty} (${stats.xpMultiplier}x)`}
          value={`×${stats.xpMultiplier}`}
          delay={1.7}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex items-center justify-between pt-2 border-t border-border/30"
        >
          <span className="text-xs font-display font-bold uppercase tracking-wider">
            Total XP
          </span>
          <span className="text-lg font-display font-bold text-primary">
            +{stats.xpEarned}
          </span>
        </motion.div>
      </motion.div>

      {/* Streak badge */}
      <StreakBadge streak={stats.streak} />

      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="flex flex-col sm:flex-row items-center gap-3 pt-2"
      >
        <Link href={`/dashboard/courses/${courseId}`}>
          <NeoButton variant="outline" size="sm">
            <Home size={14} className="mr-2" />
            Back to Course
          </NeoButton>
        </Link>

        {nextLessonId && (
          <NeoButton variant="primary" size="md" onClick={handleNextLesson}>
            Next Lesson
            <ArrowRight size={16} className="ml-2" />
          </NeoButton>
        )}
      </motion.div>

      {/* Lesson transition overlay */}
      <AnimatePresence>
        {showTransition && nextLesson && (
          <LessonTransition
            completedLessonOrder={lessonOrder}
            nextLessonTitle={nextLesson.title}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function BonusRow({
  icon,
  label,
  value,
  highlight = false,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${
        highlight
          ? "bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30"
          : "bg-muted/20"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-muted-foreground">{label}</span>
      </div>
      <span className={`font-bold ${highlight ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
        {value} XP
      </span>
    </motion.div>
  );
}
