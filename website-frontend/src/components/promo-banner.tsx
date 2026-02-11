"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Heart, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "aralify-valentine-banner-dismissed";

export function PromoBanner() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Only show after mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  // Track banner height with ResizeObserver so --banner-h stays accurate
  // even during framer-motion height animation (initial: 0 → auto)
  useEffect(() => {
    if (!visible || !bannerRef.current) {
      document.documentElement.style.setProperty("--banner-h", "0px");
      return;
    }

    const el = bannerRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = Math.round(entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--banner-h", `${h}px`);
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty("--banner-h", "0px");
    };
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={bannerRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="sticky top-0 z-[101] overflow-hidden"
        >
          <div className="relative bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white">
            {/* Floating hearts background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
              {[
                { left: "5%", delay: 0, size: 12 },
                { left: "15%", delay: 1.2, size: 10 },
                { left: "28%", delay: 0.5, size: 8 },
                { left: "42%", delay: 1.8, size: 14 },
                { left: "58%", delay: 0.3, size: 10 },
                { left: "72%", delay: 1.5, size: 12 },
                { left: "85%", delay: 0.8, size: 9 },
                { left: "93%", delay: 2, size: 11 },
              ].map((h, i) => (
                <Heart
                  key={i}
                  size={h.size}
                  className="absolute text-white/10 fill-white/10 animate-float-heart"
                  style={{
                    left: h.left,
                    animationDelay: `${h.delay}s`,
                    bottom: "-20px",
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative flex items-center justify-center gap-x-3 gap-y-1 px-10 py-2.5 text-center flex-wrap">
              {/* Left hearts cluster */}
              <span className="hidden sm:flex items-center gap-0.5">
                <Heart size={14} className="fill-pink-300 text-pink-300 animate-pulse" />
                <Heart size={10} className="fill-pink-200 text-pink-200 animate-pulse" style={{ animationDelay: "0.2s" }} />
              </span>

              {/* Main text */}
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                Valentine&apos;s Code Sale
              </span>

              {/* Discount badge */}
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white font-black text-xs sm:text-sm px-2.5 py-0.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                <Sparkles size={12} className="animate-spin-slow" />
                50% OFF
              </span>

              {/* Sub text */}
              <span className="text-[11px] sm:text-xs font-medium text-pink-100">
                All Pro plans — use code
              </span>
              <code className="text-[11px] sm:text-xs font-bold bg-white/15 px-1.5 py-0.5 rounded font-mono tracking-wider">
                LOVESCODE
              </code>

              {/* CTA */}
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-white hover:text-pink-100 transition-colors underline underline-offset-2 decoration-white/40 hover:decoration-white/70"
              >
                Claim now <ArrowRight size={11} />
              </Link>

              {/* Right hearts */}
              <span className="hidden sm:flex items-center gap-0.5">
                <Heart size={10} className="fill-pink-200 text-pink-200 animate-pulse" style={{ animationDelay: "0.3s" }} />
                <Heart size={14} className="fill-pink-300 text-pink-300 animate-pulse" style={{ animationDelay: "0.1s" }} />
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/15 transition-colors text-white/70 hover:text-white"
              aria-label="Dismiss banner"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
