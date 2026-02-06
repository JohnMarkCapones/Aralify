"use client";

import { motion } from "framer-motion";

export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren: delay } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.span>
  );
}

export function LetterReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const letters = text.split("");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.02, delayChildren: delay } },
      }}
      className={className}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { y: 20, opacity: 0, rotateX: 90 },
            visible: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.4, ease: "easeOut" } },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
