"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { FloatingShapes } from "@/components/effects/FloatingShapes";
import { TextReveal } from "@/components/effects/TextReveal";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <FloatingShapes />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="w-24 h-24 bg-primary rounded-2xl neo-brutal-border neo-brutal-shadow-lg flex items-center justify-center mb-8"
      >
        <Code2 className="w-12 h-12 text-primary-foreground" />
      </motion.div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold uppercase mb-4">
        <TextReveal text="WELCOME TO ARALIFY" />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-lg text-muted-foreground max-w-md mb-12"
      >
        Let&apos;s set up your learning journey in under 2 minutes
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-ring" />
        <NeoButton size="lg" onClick={onNext}>
          LET&apos;S GO
        </NeoButton>
      </motion.div>
    </div>
  );
}
