"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent, type MotionValue } from "framer-motion";

interface ScrollProgress {
  scrollYProgress: MotionValue<number>;
  isScrolled: boolean;
}

export function useScrollProgress(): ScrollProgress {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 50px threshold — on most pages this is a tiny scroll
    const scrollY = latest * document.documentElement.scrollHeight;
    setIsScrolled(scrollY > 50);
  });

  return { scrollYProgress, isScrolled };
}
