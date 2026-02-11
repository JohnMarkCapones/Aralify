"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { CardTilt } from "@/components/effects/CardTilt";
import { CodeSnippet } from "./code-snippet";
import type { TheoryCard as TheoryCardType } from "@/lib/data/lesson-flow";

interface TheoryCardProps {
  card: TheoryCardType;
  direction: number;
}

export function TheoryCard({ card, direction }: TheoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <CardTilt intensity={4} className="w-full">
        <div className="neo-brutal-border neo-brutal-shadow rounded-2xl bg-card p-6 sm:p-8 space-y-5">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-display font-bold">
            {card.title}
          </h2>

          {/* Content */}
          <div className="text-sm sm:text-base leading-relaxed text-muted-foreground space-y-2">
            {card.content.split("\n").map((paragraph, i) => (
              <p key={i} dangerouslySetInnerHTML={{
                __html: paragraph
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
                  .replace(/`(.*?)`/g, '<code class="text-xs bg-muted/60 px-1.5 py-0.5 rounded font-mono">$1</code>')
              }} />
            ))}
          </div>

          {/* Code example */}
          {card.codeExample && (
            <CodeSnippet code={card.codeExample} />
          )}

          {/* Tip callout */}
          {card.tip && (
            <div className="flex gap-3 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
              <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                {card.tip}
              </p>
            </div>
          )}
        </div>
      </CardTilt>
    </motion.div>
  );
}
