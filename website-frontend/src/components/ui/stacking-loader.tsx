"use client";

import { motion } from "framer-motion";

interface StackingLoaderProps {
  text?: string;
}

const BRICK_COLORS = [
  "bg-primary",
  "bg-primary/80",
  "bg-primary/60",
  "bg-sky-400",
  "bg-sky-400/80",
];

const STACK_ORDER = [
  // row 0 (bottom): 3 bricks
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  // row 1: 2 bricks
  { row: 1, col: 0.5 },
  { row: 1, col: 1.5 },
  // row 2 (top): 1 brick
  { row: 2, col: 1 },
];

export function StackingLoader({ text = "Building..." }: StackingLoaderProps) {
  const brickW = 32;
  const brickH = 16;
  const gapX = 4;
  const gapY = 4;

  const totalW = 3 * brickW + 2 * gapX;
  const totalH = 3 * brickH + 2 * gapY;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div
        className="relative"
        style={{ width: totalW, height: totalH }}
      >
        {STACK_ORDER.map((brick, i) => {
          const x = brick.col * (brickW + gapX);
          const y = totalH - (brick.row + 1) * (brickH + gapY);

          return (
            <motion.div
              key={i}
              className={`absolute rounded-[3px] border-2 border-foreground/80 ${BRICK_COLORS[i % BRICK_COLORS.length]}`}
              style={{
                width: brickW,
                height: brickH,
                left: x,
                top: y,
              }}
              initial={{ opacity: 0, y: -30, scale: 0.5 }}
              animate={{
                opacity: [0, 1, 1, 1, 0],
                y: [-30, 0, 0, 0, 0],
                scale: [0.5, 1, 1, 1, 0.8],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
                times: [0, 0.15, 0.5, 0.8, 1],
              }}
            />
          );
        })}
      </div>

      <span className="font-mono text-xs font-bold text-muted-foreground tracking-widest uppercase">
        {text}
      </span>
    </div>
  );
}
