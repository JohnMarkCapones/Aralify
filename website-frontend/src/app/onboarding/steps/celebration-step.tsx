"use client";

import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { FloatingShapes } from "@/components/effects/FloatingShapes";
import { LetterReveal } from "@/components/effects/TextReveal";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

const celebrationShapes = [
  { type: "circle" as const, size: 30, x: "10%", y: "20%", color: "bg-yellow-400", delay: 0, duration: 6 },
  { type: "square" as const, size: 20, x: "80%", y: "15%", color: "bg-pink-400", delay: 0.5, duration: 8, rotate: 45 },
  { type: "diamond" as const, size: 25, x: "90%", y: "60%", color: "bg-green-400", delay: 1, duration: 7 },
  { type: "circle" as const, size: 15, x: "5%", y: "70%", color: "bg-blue-400", delay: 1.5, duration: 9 },
  { type: "cross" as const, size: 20, x: "50%", y: "5%", color: "bg-purple-400", delay: 0.3, duration: 10 },
  { type: "ring" as const, size: 40, x: "70%", y: "80%", color: "border-yellow-400", delay: 2, duration: 11 },
  { type: "square" as const, size: 18, x: "30%", y: "85%", color: "bg-orange-400", delay: 0.8, duration: 7, rotate: 30 },
  { type: "circle" as const, size: 22, x: "60%", y: "30%", color: "bg-cyan-400", delay: 1.2, duration: 8 },
];

const RECOMMENDED_COURSES = [
  { title: "Python for Beginners", icon: "\u{1F40D}", lessons: 24, difficulty: "Easy" },
  { title: "Web Dev Fundamentals", icon: "\u{1F310}", lessons: 32, difficulty: "Easy" },
  { title: "JavaScript Essentials", icon: "\u{1F7E8}", lessons: 28, difficulty: "Medium" },
];

interface CelebrationStepProps {
  onFinish: () => void;
  isSubmitting: boolean;
}

export function CelebrationStep({ onFinish, isSubmitting }: CelebrationStepProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <FloatingShapes shapes={celebrationShapes} className="opacity-100" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="w-20 h-20 bg-accent rounded-2xl neo-brutal-border neo-brutal-shadow-lg flex items-center justify-center mb-6"
      >
        <Award className="w-10 h-10 text-accent-foreground" />
      </motion.div>

      <h1 className="text-4xl sm:text-5xl font-display font-bold uppercase mb-4">
        <LetterReveal text="YOU'RE ALL SET!" delay={0.3} />
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="flex items-center gap-2 mb-2"
      >
        <span className="text-2xl font-display font-bold text-primary">+</span>
        <AnimatedCounter
          target={100}
          suffix=" XP"
          className="text-2xl font-display font-bold text-primary"
          duration={1.5}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-muted-foreground mb-4"
      >
        Welcome bonus earned!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full neo-brutal-border mb-8"
      >
        <Award className="w-4 h-4 text-accent-foreground" />
        <span className="text-sm font-bold uppercase tracking-wider">
          Onboarding Complete
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="w-full max-w-2xl mb-8"
      >
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Recommended for you
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RECOMMENDED_COURSES.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1 }}
              className="p-4 bg-card rounded-xl neo-brutal-border neo-brutal-shadow"
            >
              <span className="text-2xl">{course.icon}</span>
              <h4 className="font-display font-bold text-sm mt-2">
                {course.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {course.lessons} lessons &middot; {course.difficulty}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <NeoButton
          size="lg"
          onClick={onFinish}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              SAVING...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              GO TO DASHBOARD
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </NeoButton>
      </motion.div>
    </div>
  );
}
