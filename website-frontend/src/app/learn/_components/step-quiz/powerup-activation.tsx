"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Snowflake,
  ShieldCheck,
  Lightbulb,
  Zap,
  Clock,
  SkipForward,
} from "lucide-react";
import type { PowerupType } from "@/lib/data/lesson-flow";

interface PowerupActivationProps {
  activePowerup: PowerupType | null;
  onComplete: () => void;
}

function useParticles<T>(count: number, factory: (i: number) => T, key: unknown): T[] {
  return useMemo(() => Array.from({ length: count }, (_, i) => factory(i)), [key]); // eslint-disable-line react-hooks/exhaustive-deps
}

// ─── Shared: Screen-shake wrapper ────────────────────────────────────────────

function ScreenShake({ children, intensity = 4 }: { children: React.ReactNode; intensity?: number }) {
  return (
    <motion.div
      animate={{
        x: [0, -intensity, intensity, -intensity * 0.6, intensity * 0.6, 0],
        y: [0, intensity * 0.5, -intensity * 0.5, intensity * 0.3, 0],
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[60] pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

// ─── Shared: Label that bursts in at the bottom ──────────────────────────────

function PowerupLabel({ text, color }: { text: string; color: string }) {
  return (
    <motion.div
      initial={{ scale: 0, y: 60, opacity: 0 }}
      animate={{ scale: [0, 1.3, 1], y: [60, 80, 75], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.4, delay: 0.15, times: [0, 0.2, 0.4, 1] }}
      className="absolute text-2xl font-display font-black uppercase tracking-widest"
      style={{
        color,
        textShadow: `0 0 30px ${color}60, 0 0 60px ${color}30, 0 2px 4px rgba(0,0,0,0.3)`,
        letterSpacing: "0.15em",
      }}
    >
      {text}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. ELIMINATE (50/50)
// ═══════════════════════════════════════════════════════════════════════════════

function EliminateAnimation({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 1800); return () => clearTimeout(t); }, [onDone]);

  const sparks = useParticles(28, (i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 400,
    rotation: Math.random() * 720,
    size: 2 + Math.random() * 6,
    delay: 0.1 + Math.random() * 0.4,
  }), "eliminate");

  return (
    <ScreenShake intensity={6}>
      <div className="fixed inset-0 flex items-center justify-center pb-[30vh]">
        {/* Big violet flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.25, 0.08, 0] }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-violet-500"
        />

        {/* Vignette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(139,92,246,0.3) 100%)" }}
        />

        {/* 4 slash lines crossing at different angles */}
        {[-30, 30, -15, 15].map((angle, i) => (
          <motion.div
            key={i}
            initial={{ x: i % 2 === 0 ? "-120%" : "120%", opacity: 0 }}
            animate={{ x: i % 2 === 0 ? "120%" : "-120%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
            className="absolute w-[200%] h-1.5 bg-gradient-to-r from-transparent via-violet-300 to-transparent"
            style={{ transform: `rotate(${angle}deg)`, filter: "blur(0.5px)" }}
          />
        ))}

        {/* Thicker main X slash */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1.2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute w-[180%] h-2 bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-[-25deg]"
          style={{ filter: "blur(1px)" }}
        />
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1.2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute w-[180%] h-2 bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-[25deg]"
          style={{ filter: "blur(1px)" }}
        />

        {/* Center icon — big */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: [0, 1.4, 1.1], rotate: [-180, 20, 0] }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="relative"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0], scale: [1, 1.6, 2] }}
            transition={{ duration: 1 }}
            className="absolute inset-0 blur-2xl bg-violet-500/50 rounded-full"
            style={{ width: 80, height: 80, marginLeft: -10, marginTop: -10 }}
          />
          <div className="relative p-4 rounded-full bg-violet-500/20 border-2 border-violet-400/60 backdrop-blur-sm">
            <Scissors size={40} className="text-violet-300 drop-shadow-[0_0_15px_rgba(167,139,250,0.7)]" />
          </div>
        </motion.div>

        {/* Expanding shockwave rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}`}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: [0, 8 + i * 3], opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: "easeOut" }}
            className="absolute w-16 h-16 rounded-full border-2 border-violet-400/40"
          />
        ))}

        {/* Massive spark explosion */}
        {sparks.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], x: s.x, y: s.y, opacity: [1, 0.8, 0], rotate: s.rotation }}
            transition={{ duration: 0.8, delay: s.delay, ease: "easeOut" }}
            className="absolute rounded-full bg-violet-300"
            style={{ width: s.size, height: s.size, boxShadow: "0 0 6px rgba(167,139,250,0.6)" }}
          />
        ))}

        <PowerupLabel text="50/50" color="#a78bfa" />
      </div>
    </ScreenShake>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. FREEZE
// ═══════════════════════════════════════════════════════════════════════════════

function FreezeAnimation({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, [onDone]);

  const snowflakes = useParticles(50, (i) => ({
    id: i,
    startX: Math.random() * 100,
    size: 8 + Math.random() * 20,
    delay: Math.random() * 1,
    duration: 1.5 + Math.random() * 1.2,
    drift: (Math.random() - 0.5) * 100,
    opacity: 0.3 + Math.random() * 0.7,
    rotation: Math.random() * 360,
  }), "freeze");

  const iceCrystals = useParticles(16, (i) => ({
    id: i,
    angle: (i / 16) * 360,
    radius: 80 + Math.random() * 120,
    delay: 0.1 + i * 0.03,
    size: 4 + Math.random() * 8,
  }), "freeze-crystals");

  return (
    <ScreenShake intensity={3}>
      <div className="fixed inset-0 overflow-hidden">
        {/* Deep icy overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.12, 0.06] }}
          transition={{ duration: 1.8, times: [0, 0.2, 0.5, 1] }}
          className="absolute inset-0 bg-cyan-400"
        />

        {/* Heavy frost vignette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.5, 0] }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 25%, rgba(165,220,255,0.35) 70%, rgba(100,200,255,0.5) 100%)",
          }}
        />

        {/* Frost creep from edges */}
        {["top", "bottom", "left", "right"].map((edge) => (
          <motion.div
            key={edge}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.5, 0.2], scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute"
            style={{
              [edge]: 0,
              width: edge === "left" || edge === "right" ? "15%" : "100%",
              height: edge === "top" || edge === "bottom" ? "15%" : "100%",
              background: edge === "top" ? "linear-gradient(to bottom, rgba(186,230,253,0.4), transparent)" :
                edge === "bottom" ? "linear-gradient(to top, rgba(186,230,253,0.4), transparent)" :
                edge === "left" ? "linear-gradient(to right, rgba(186,230,253,0.4), transparent)" :
                "linear-gradient(to left, rgba(186,230,253,0.4), transparent)",
              filter: "blur(4px)",
            }}
          />
        ))}

        {/* Center icon — massive */}
        <div className="absolute inset-0 flex items-center justify-center pb-[30vh]">
          <motion.div
            initial={{ scale: 0, rotate: 270 }}
            animate={{ scale: [0, 1.4, 1.1], rotate: [270, -30, 0] }}
            transition={{ duration: 0.7, ease: "backOut" }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.2, repeat: 1 }}
              className="absolute inset-[-20px] blur-3xl bg-cyan-400/40 rounded-full"
            />
            <div className="relative p-4 rounded-full bg-cyan-500/15 border-2 border-cyan-300/50 backdrop-blur-md">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, ease: "linear" }}
              >
                <Snowflake size={44} className="text-cyan-300 drop-shadow-[0_0_20px_rgba(103,232,249,0.8)]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Expanding frost rings */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`frost-ring-${i}`}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: [0, 10 + i * 3], opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 + i * 0.15 }}
              className="absolute w-14 h-14 rounded-full border-2 border-cyan-300/30"
            />
          ))}
        </div>

        {/* Ice crystal particles bursting outward */}
        {iceCrystals.map((c) => (
          <motion.div
            key={`crystal-${c.id}`}
            className="absolute left-1/2 top-1/2"
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos((c.angle * Math.PI) / 180) * c.radius,
              y: Math.sin((c.angle * Math.PI) / 180) * c.radius,
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 1, delay: c.delay, ease: "easeOut" }}
          >
            <div
              className="bg-cyan-300/60 rotate-45 rounded-sm"
              style={{
                width: c.size,
                height: c.size,
                boxShadow: "0 0 8px rgba(103,232,249,0.5)",
              }}
            />
          </motion.div>
        ))}

        {/* Heavy snowfall */}
        {snowflakes.map((s) => (
          <motion.div
            key={s.id}
            initial={{ y: -30, x: `${s.startX}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: "115vh",
              x: `calc(${s.startX}vw + ${s.drift}px)`,
              opacity: [0, s.opacity, s.opacity, 0],
              rotate: s.rotation + 360,
            }}
            transition={{ duration: s.duration, delay: s.delay, ease: "linear" }}
            className="absolute"
          >
            <Snowflake
              size={s.size}
              className="text-cyan-200/70"
              style={{ filter: `blur(${s.size > 18 ? 0 : 1}px) drop-shadow(0 0 4px rgba(186,230,253,0.5))` }}
            />
          </motion.div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center pb-[30vh]">
          <PowerupLabel text="FREEZE" color="#67e8f9" />
        </div>
      </div>
    </ScreenShake>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. SHIELD
// ═══════════════════════════════════════════════════════════════════════════════

function ShieldAnimation({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, [onDone]);

  const hexParticles = useParticles(20, (i) => ({
    id: i,
    x: (Math.random() - 0.5) * 500,
    y: -(80 + Math.random() * 250),
    delay: 0.3 + i * 0.04,
    size: 4 + Math.random() * 10,
    rotation: Math.random() * 90,
  }), "shield");

  return (
    <ScreenShake intensity={5}>
      <div className="fixed inset-0 flex items-center justify-center pb-[30vh]">
        {/* Emerald flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.05, 0] }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-emerald-500"
        />

        {/* Protective dome vignette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.2, 0] }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at center, rgba(52,211,153,0.15) 0%, rgba(16,185,129,0.25) 50%, transparent 70%)" }}
        />

        {/* 6 expanding protective rings */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`ring-${i}`}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: [0, 7 + i * 2], opacity: 0 }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
            className="absolute w-16 h-16 rounded-full"
            style={{ border: `${i < 2 ? 3 : 2}px solid rgba(52,211,153,${0.5 - i * 0.07})` }}
          />
        ))}

        {/* Giant shield icon */}
        <motion.div
          initial={{ scale: 0, y: 60 }}
          animate={{ scale: [0, 1.5, 1.2], y: [60, -20, 0] }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="relative"
        >
          {/* Massive glow */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.5, 0.3], scale: [1, 1.4, 1.1, 1] }}
            transition={{ duration: 1.4, repeat: 1 }}
            className="absolute inset-[-25px] blur-3xl bg-emerald-400/40 rounded-full"
          />
          {/* Secondary inner glow */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: 2 }}
            className="absolute inset-[-10px] blur-xl bg-emerald-300/30 rounded-full"
          />
          <div className="relative p-5 rounded-full bg-emerald-500/15 border-2 border-emerald-400/50 backdrop-blur-sm">
            <ShieldCheck size={48} className="text-emerald-300 drop-shadow-[0_0_25px_rgba(52,211,153,0.8)]" />
          </div>
        </motion.div>

        {/* Hex particles floating upward */}
        {hexParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: 0, opacity: 0, x: (Math.random() - 0.5) * 120, scale: 0 }}
            animate={{
              y: p.y,
              opacity: [0, 0.7, 0],
              x: p.x,
              scale: [0, 1.2, 0],
              rotate: p.rotation,
            }}
            transition={{ duration: 1.3, delay: p.delay, ease: "easeOut" }}
            className="absolute rounded-sm rotate-45"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: `rgba(52,211,153,${0.3 + Math.random() * 0.4})`,
              boxShadow: "0 0 8px rgba(52,211,153,0.4)",
            }}
          />
        ))}

        {/* Energy lines radiating outward */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`energy-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.04 }}
            className="absolute w-0.5 h-32 bg-gradient-to-b from-emerald-400/50 to-transparent origin-bottom"
            style={{ transform: `rotate(${(i / 12) * 360}deg)`, transformOrigin: "center bottom" }}
          />
        ))}

        <PowerupLabel text="SHIELD" color="#34d399" />
      </div>
    </ScreenShake>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. HINT
// ═══════════════════════════════════════════════════════════════════════════════

function HintAnimation({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 1800); return () => clearTimeout(t); }, [onDone]);

  const sparkles = useParticles(24, (i) => ({
    id: i,
    x: (Math.random() - 0.5) * 500,
    y: (Math.random() - 0.5) * 400,
    size: 2 + Math.random() * 5,
    delay: 0.15 + Math.random() * 0.5,
    twinkleDelay: Math.random() * 0.3,
  }), "hint");

  return (
    <ScreenShake intensity={2}>
      <div className="fixed inset-0 flex items-center justify-center pb-[30vh]">
        {/* Warm golden flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.08, 0] }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-amber-400"
        />

        {/* Golden radial glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.2, 0] }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at center, rgba(251,191,36,0.25) 0%, transparent 60%)" }}
        />

        {/* 16 light rays radiating from center */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1.2, 0.4], opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.2, delay: 0.1 + i * 0.02, ease: "easeOut" }}
            className="absolute origin-bottom"
            style={{
              width: i % 2 === 0 ? 3 : 2,
              height: i % 2 === 0 ? 200 : 140,
              background: `linear-gradient(to top, rgba(251,191,36,${i % 2 === 0 ? 0.5 : 0.3}), transparent)`,
              transform: `rotate(${(i / 16) * 360}deg)`,
              transformOrigin: "center bottom",
              filter: "blur(1px)",
            }}
          />
        ))}

        {/* Expanding light rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`light-ring-${i}`}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: [0, 8 + i * 3], opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: "easeOut" }}
            className="absolute w-16 h-16 rounded-full border-2 border-amber-300/30"
          />
        ))}

        {/* Giant lightbulb icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1.1] }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="relative"
        >
          {/* Huge pulsing glow */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.6, 1, 0.3], scale: [1, 1.4, 1.1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: 1 }}
            className="absolute inset-[-25px] blur-3xl bg-amber-400/50 rounded-full"
          />
          <div className="relative p-4 rounded-full bg-amber-500/15 border-2 border-amber-400/50 backdrop-blur-sm">
            <Lightbulb size={44} className="text-amber-300 drop-shadow-[0_0_25px_rgba(251,191,36,0.8)]" />
          </div>
        </motion.div>

        {/* Sparkle stars */}
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0.5, 1.5, 0],
              x: s.x,
              y: s.y,
              opacity: [0, 1, 0.5, 1, 0],
            }}
            transition={{ duration: 1.2, delay: s.delay }}
            className="absolute"
          >
            {/* 4-point star shape */}
            <div
              className="bg-amber-300 rounded-full"
              style={{
                width: s.size,
                height: s.size,
                boxShadow: `0 0 ${s.size * 2}px rgba(251,191,36,0.6), 0 0 ${s.size * 4}px rgba(251,191,36,0.3)`,
              }}
            />
          </motion.div>
        ))}

        <PowerupLabel text="HINT" color="#fbbf24" />
      </div>
    </ScreenShake>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. DOUBLE XP
// ═══════════════════════════════════════════════════════════════════════════════

function DoubleXpAnimation({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, [onDone]);

  const electricParticles = useParticles(30, (i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 500,
    size: 2 + Math.random() * 6,
    delay: 0.1 + Math.random() * 0.4,
    angle: Math.random() * 360,
  }), "double_xp");

  return (
    <ScreenShake intensity={8}>
      <div className="fixed inset-0 flex items-center justify-center pb-[30vh]">
        {/* Double gold/white flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0, 0.2, 0] }}
          transition={{ duration: 0.8, times: [0, 0.15, 0.3, 0.45, 0.8] }}
          className="absolute inset-0 bg-yellow-400"
        />

        {/* Electric vignette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.3, 0] }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at center, rgba(250,204,21,0.2) 0%, rgba(234,179,8,0.3) 40%, transparent 70%)" }}
        />

        {/* 12 lightning bolt streaks radiating */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bolt-${i}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1.5, 0], opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.5, delay: 0.05 + i * 0.04 }}
            className="absolute h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
            style={{
              width: 250 + (i % 3) * 40,
              transform: `rotate(${(i / 12) * 360}deg)`,
              filter: "blur(0.5px)",
            }}
          />
        ))}

        {/* Expanding shockwaves */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`shock-${i}`}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: [0, 10 + i * 2], opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: "easeOut" }}
            className="absolute w-16 h-16 rounded-full border-2 border-yellow-400/40"
          />
        ))}

        {/* Giant Zap icon */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: [0, 1.6, 1.2], rotate: [-30, 15, 0] }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="relative"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="absolute inset-[-30px] blur-3xl bg-yellow-400/50 rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.3, repeat: 4 }}
            className="absolute inset-[-12px] blur-xl bg-yellow-300/40 rounded-full"
          />
          <div className="relative p-5 rounded-full bg-yellow-500/20 border-2 border-yellow-400/60 backdrop-blur-sm">
            <Zap size={48} className="text-yellow-300 fill-yellow-400/40 drop-shadow-[0_0_30px_rgba(250,204,21,0.9)]" />
          </div>
        </motion.div>

        {/* "2x XP!" text — huge burst */}
        <motion.div
          initial={{ scale: 0, y: 30, opacity: 0 }}
          animate={{ scale: [0, 1.8, 1.4], y: [30, -80, -90], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, delay: 0.25, times: [0, 0.2, 0.5, 1] }}
          className="absolute text-5xl font-display font-black text-yellow-300"
          style={{ textShadow: "0 0 40px rgba(250,204,21,0.7), 0 0 80px rgba(250,204,21,0.4), 0 4px 6px rgba(0,0,0,0.3)" }}
        >
          2x XP!
        </motion.div>

        {/* Electric particle storm */}
        {electricParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 2, 0],
              x: p.x,
              y: p.y,
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
            className="absolute rounded-full bg-yellow-300"
            style={{
              width: p.size,
              height: p.size * 2.5,
              transform: `rotate(${p.angle}deg)`,
              boxShadow: "0 0 8px rgba(250,204,21,0.6)",
            }}
          />
        ))}
      </div>
    </ScreenShake>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. EXTRA TIME (+15s)
// ═══════════════════════════════════════════════════════════════════════════════

function ExtraTimeAnimation({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, [onDone]);

  const orbitParticles = useParticles(24, (i) => ({
    id: i,
    angle: (i / 24) * 360,
    radius: 80 + Math.random() * 100,
    delay: i * 0.03,
    size: 3 + Math.random() * 6,
  }), "extra_time");

  const timeDigits = useParticles(8, (i) => ({
    id: i,
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 300,
    delay: 0.3 + Math.random() * 0.4,
    digit: ["1", "5", "+", "s", "1", "5", "+", "s"][i],
    size: 10 + Math.random() * 14,
  }), "time-digits");

  return (
    <ScreenShake intensity={3}>
      <div className="fixed inset-0 flex items-center justify-center pb-[30vh]">
        {/* Sky blue flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.18, 0.05, 0] }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-sky-400"
        />

        {/* Radial time glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.2, 0] }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at center, rgba(56,189,248,0.2) 0%, transparent 60%)" }}
        />

        {/* Giant clock icon spinning */}
        <motion.div
          initial={{ scale: 0, rotate: -360 }}
          animate={{ scale: [0, 1.4, 1.1], rotate: [-360, 30, 0] }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: [0, 720], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-[-25px] blur-3xl bg-sky-400/40 rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.6, repeat: 2 }}
            className="absolute inset-[-10px] blur-xl bg-sky-300/30 rounded-full"
          />
          <div className="relative p-4 rounded-full bg-sky-500/15 border-2 border-sky-400/50 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 720] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <Clock size={44} className="text-sky-300 drop-shadow-[0_0_25px_rgba(56,189,248,0.8)]" />
            </motion.div>
          </div>
        </motion.div>

        {/* "+15s" giant text */}
        <motion.div
          initial={{ scale: 0, y: 20, opacity: 0 }}
          animate={{ scale: [0, 1.6, 1.3], y: [20, -80, -90], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, delay: 0.3, times: [0, 0.2, 0.5, 1] }}
          className="absolute text-5xl font-display font-black text-sky-300"
          style={{ textShadow: "0 0 30px rgba(56,189,248,0.6), 0 0 60px rgba(56,189,248,0.3), 0 4px 6px rgba(0,0,0,0.3)" }}
        >
          +15s
        </motion.div>

        {/* Expanding time rings */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`time-ring-${i}`}
            initial={{ scale: 0, opacity: 0.5, rotate: 0 }}
            animate={{ scale: [0, 8 + i * 2], opacity: 0, rotate: i * 30 }}
            transition={{ duration: 1.2, delay: 0.15 + i * 0.1, ease: "easeOut" }}
            className="absolute w-14 h-14 rounded-full border-2 border-sky-400/30"
          />
        ))}

        {/* Orbiting time particles spiral */}
        {orbitParticles.map((p) => (
          <motion.div
            key={`orbit-${p.id}`}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
            }}
            animate={{
              x: [0, Math.cos((p.angle * Math.PI) / 180) * p.radius * 0.5, Math.cos((p.angle * Math.PI) / 180) * p.radius],
              y: [0, Math.sin((p.angle * Math.PI) / 180) * p.radius * 0.5, Math.sin((p.angle * Math.PI) / 180) * p.radius],
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 1.1, delay: 0.2 + p.delay, ease: "easeOut" }}
            className="absolute rounded-full bg-sky-300"
            style={{
              width: p.size,
              height: p.size,
              boxShadow: "0 0 6px rgba(56,189,248,0.5)",
            }}
          />
        ))}

        {/* Floating time digit fragments */}
        {timeDigits.map((d) => (
          <motion.div
            key={`digit-${d.id}`}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              y: d.y,
              x: d.x,
              scale: [0, 1, 0.5],
            }}
            transition={{ duration: 1.2, delay: d.delay }}
            className="absolute font-mono font-bold text-sky-400/40"
            style={{ fontSize: d.size }}
          >
            {d.digit}
          </motion.div>
        ))}
      </div>
    </ScreenShake>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. SKIP
// ═══════════════════════════════════════════════════════════════════════════════

function SkipAnimation({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 1400); return () => clearTimeout(t); }, [onDone]);

  const trailParticles = useParticles(20, (i) => ({
    id: i,
    y: (Math.random() - 0.5) * 300,
    delay: Math.random() * 0.3,
    width: 40 + Math.random() * 120,
    top: 10 + Math.random() * 80,
    opacity: 0.2 + Math.random() * 0.5,
  }), "skip");

  return (
    <ScreenShake intensity={4}>
      <div className="fixed inset-0 flex items-center justify-center pb-[30vh] overflow-hidden">
        {/* Rose flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.05, 0] }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-rose-500"
        />

        {/* Motion blur vignette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(244,63,94,0.2) 0%, transparent 30%, transparent 70%, rgba(244,63,94,0.2) 100%)" }}
        />

        {/* 10 speed lines whooshing across */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`speed-${i}`}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, trailParticles[i % 20]?.opacity ?? 0.4, 0] }}
            transition={{ duration: 0.5 + (i % 3) * 0.1, delay: i * 0.04, ease: [0.2, 0, 0.8, 1] }}
            className="absolute bg-gradient-to-r from-transparent via-rose-400 to-transparent"
            style={{
              width: `${30 + (i % 4) * 15}%`,
              height: i % 3 === 0 ? 3 : 1.5,
              top: `${10 + i * 8}%`,
              filter: "blur(0.5px)",
            }}
          />
        ))}

        {/* Giant skip arrows — 5 stacked, whooshing in sequence */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`arrow-${i}`}
            initial={{ x: -400 - i * 60, opacity: 0, scale: 1 - i * 0.1 }}
            animate={{
              x: [-400 - i * 60, 0, 500 + i * 40],
              opacity: [0, 0.9 - i * 0.12, 0],
              scale: [1 - i * 0.1, 1.3 - i * 0.12, 1 - i * 0.1],
            }}
            transition={{ duration: 0.8, delay: i * 0.07, ease: [0.2, 0, 0.6, 1] }}
            className="absolute"
          >
            <SkipForward
              size={36 + i * 4}
              className="text-rose-400"
              style={{
                opacity: 1 - i * 0.15,
                filter: `drop-shadow(0 0 ${10 - i * 1.5}px rgba(244,63,94,0.6))`,
              }}
            />
          </motion.div>
        ))}

        {/* Trail particles */}
        {trailParticles.map((p) => (
          <motion.div
            key={`trail-${p.id}`}
            initial={{ x: "-10%", opacity: 0 }}
            animate={{ x: "120%", opacity: [0, p.opacity, 0] }}
            transition={{ duration: 0.6, delay: p.delay, ease: "easeIn" }}
            className="absolute bg-rose-400/40 rounded-full"
            style={{
              width: p.width,
              height: 2,
              top: `${p.top}%`,
            }}
          />
        ))}

        {/* "SKIP!" text whoosh */}
        <motion.div
          initial={{ x: -300, opacity: 0, scale: 0.5 }}
          animate={{ x: [-300, 0, 400], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.8] }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0, 0.6, 1] }}
          className="absolute text-4xl font-display font-black text-rose-300"
          style={{ textShadow: "0 0 30px rgba(244,63,94,0.6), 0 0 60px rgba(244,63,94,0.3)" }}
        >
          SKIP!
        </motion.div>
      </div>
    </ScreenShake>
  );
}

// ─── Main Overlay Component ──────────────────────────────────────────────────

const animationMap: Record<PowerupType, React.ComponentType<{ onDone: () => void }>> = {
  eliminate: EliminateAnimation,
  freeze: FreezeAnimation,
  shield: ShieldAnimation,
  hint: HintAnimation,
  double_xp: DoubleXpAnimation,
  extra_time: ExtraTimeAnimation,
  skip: SkipAnimation,
};

export function PowerupActivationOverlay({ activePowerup, onComplete }: PowerupActivationProps) {
  const [current, setCurrent] = useState<PowerupType | null>(null);

  useEffect(() => {
    if (activePowerup) {
      setCurrent(activePowerup);
    }
  }, [activePowerup]);

  const handleDone = () => {
    setCurrent(null);
    onComplete();
  };

  const AnimationComponent = current ? animationMap[current] : null;

  return (
    <AnimatePresence>
      {AnimationComponent && (
        <AnimationComponent onDone={handleDone} />
      )}
    </AnimatePresence>
  );
}
