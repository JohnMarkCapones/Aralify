"use client";

import { motion } from "framer-motion";
import { BookOpen, HelpCircle, Code2 } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import type { LessonFlowData } from "@/lib/data/lesson-flow";

interface LessonIntroProps {
  lesson: LessonFlowData;
  onStart: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function LessonIntro({ lesson, onStart }: LessonIntroProps) {
  const minXp = lesson.xpReward * lesson.tiers[0].xpMultiplier;
  const maxXp =
    lesson.xpReward * lesson.tiers[lesson.tiers.length - 1].xpMultiplier;

  return (
    <div className="flex-1 flex items-center justify-center py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-md mx-auto space-y-6 text-center"
      >
        {/* Lesson badge */}
        <motion.div variants={item}>
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border-2 border-primary/30 rounded-full">
            Lesson {lesson.order} of 6
          </span>
        </motion.div>

        {/* Title & course */}
        <motion.div variants={item} className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            {lesson.title}
          </h1>
          <p className="text-sm text-muted-foreground">{lesson.courseTitle}</p>
        </motion.div>

        {/* Language tag */}
        <motion.div variants={item}>
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground rounded-md border border-border/30">
            {lesson.language}
          </span>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={item}
          className="grid grid-cols-3 gap-3"
        >
          <StatCard
            icon={<BookOpen size={22} />}
            value={lesson.theoryCards.length}
            label="Theory"
          />
          <StatCard
            icon={<HelpCircle size={22} />}
            value={lesson.quizQuestions.length}
            label="Quiz"
          />
          <StatCard
            icon={<Code2 size={22} />}
            value={lesson.tiers.length}
            label="Tiers"
          />
        </motion.div>

        {/* XP range */}
        <motion.div variants={item}>
          <p className="text-sm font-semibold text-muted-foreground">
            XP Reward
          </p>
          <p className="text-lg font-display font-bold text-primary">
            {minXp} &ndash; {maxXp} XP
          </p>
        </motion.div>

        {/* Description preview */}
        <motion.div variants={item}>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 px-2">
            {lesson.theoryCards[0]?.content.slice(0, 160)}...
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={item}>
          <NeoButton size="lg" onClick={onStart} className="w-full max-w-xs mx-auto">
            Start Lesson
          </NeoButton>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 border-border/30 bg-card">
      <span className="text-primary">{icon}</span>
      <span className="text-lg font-display font-bold">{value}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
