"use client";

import { motion } from "framer-motion";

type Orb = {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
};

const defaultOrbs: Orb[] = [
  { color: "bg-primary/20", size: 300, x: "10%", y: "20%", delay: 0, duration: 15 },
  { color: "bg-secondary/15", size: 250, x: "70%", y: "60%", delay: 2, duration: 18 },
  { color: "bg-accent/10", size: 200, x: "40%", y: "80%", delay: 4, duration: 12 },
];

export function GradientOrbs({
  orbs = defaultOrbs,
  className = "",
}: {
  orbs?: Orb[];
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
          className={`absolute ${orb.color} rounded-full blur-[100px]`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
        />
      ))}
    </div>
  );
}
