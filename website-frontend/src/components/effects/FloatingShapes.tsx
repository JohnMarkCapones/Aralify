"use client";

import { motion } from "framer-motion";

type Shape = {
  type: "circle" | "square" | "triangle" | "ring" | "cross" | "diamond";
  size: number;
  x: string;
  y: string;
  color: string;
  delay: number;
  duration: number;
  rotate?: number;
};

const defaultShapes: Shape[] = [
  { type: "circle", size: 40, x: "5%", y: "15%", color: "bg-primary", delay: 0, duration: 8 },
  { type: "square", size: 30, x: "85%", y: "20%", color: "bg-secondary", delay: 1, duration: 10, rotate: 45 },
  { type: "ring", size: 60, x: "90%", y: "70%", color: "border-primary", delay: 2, duration: 12 },
  { type: "triangle", size: 35, x: "10%", y: "75%", color: "border-secondary", delay: 0.5, duration: 9 },
  { type: "cross", size: 24, x: "50%", y: "10%", color: "bg-accent", delay: 1.5, duration: 11 },
  { type: "diamond", size: 28, x: "70%", y: "85%", color: "bg-muted", delay: 3, duration: 7 },
  { type: "circle", size: 20, x: "30%", y: "5%", color: "bg-primary", delay: 2, duration: 13 },
  { type: "square", size: 18, x: "65%", y: "40%", color: "bg-accent", delay: 0, duration: 8 },
];

function ShapeElement({ shape }: { shape: Shape }) {
  const baseClasses = "absolute opacity-[0.07] pointer-events-none";

  switch (shape.type) {
    case "circle":
      return <div className={`${baseClasses} ${shape.color} rounded-full`} style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y }} />;
    case "square":
      return <div className={`${baseClasses} ${shape.color} rounded-lg`} style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y, transform: `rotate(${shape.rotate || 0}deg)` }} />;
    case "ring":
      return <div className={`${baseClasses} ${shape.color} rounded-full border-4`} style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y, background: "transparent" }} />;
    case "triangle":
      return (
        <div className={`${baseClasses}`} style={{ left: shape.x, top: shape.y, width: 0, height: 0, borderLeft: `${shape.size / 2}px solid transparent`, borderRight: `${shape.size / 2}px solid transparent`, borderBottom: `${shape.size}px solid currentColor` }}>
          <span className="text-primary" />
        </div>
      );
    case "cross":
      return (
        <div className={`${baseClasses}`} style={{ left: shape.x, top: shape.y, width: shape.size, height: shape.size }}>
          <div className={`absolute top-1/2 left-0 w-full h-1 ${shape.color} -translate-y-1/2 rounded-full`} />
          <div className={`absolute left-1/2 top-0 h-full w-1 ${shape.color} -translate-x-1/2 rounded-full`} />
        </div>
      );
    case "diamond":
      return <div className={`${baseClasses} ${shape.color} rotate-45 rounded-sm`} style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y }} />;
    default:
      return null;
  }
}

export function FloatingShapes({
  shapes = defaultShapes,
  className = "",
}: {
  shapes?: Shape[];
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            rotate: [0, shape.rotate || 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
        >
          <ShapeElement shape={{ ...shape, x: "0", y: "0" }} />
        </motion.div>
      ))}
    </div>
  );
}
