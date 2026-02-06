"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, CheckCircle, RefreshCcw, Eye, Server, KeyRound, Fingerprint, ShieldAlert, Wifi } from "lucide-react";
import { useState, useEffect } from "react";

const securityFeatures = [
  {
    icon: <Lock size={24} />,
    title: "End-to-End Encryption",
    desc: "AES-256 encryption for all data at rest. TLS 1.3 for every connection.",
    stat: "AES-256",
    statLabel: "Encryption",
    color: "bg-emerald-500",
  },
  {
    icon: <Fingerprint size={24} />,
    title: "Secure Authentication",
    desc: "OAuth 2.0, JWT tokens, and optional MFA to protect your account.",
    stat: "OAuth 2.0",
    statLabel: "Auth Standard",
    color: "bg-sky-500",
  },
  {
    icon: <Server size={24} />,
    title: "99.9% Uptime",
    desc: "Redundant infrastructure with automated failover. Your progress is always available.",
    stat: "99.9%",
    statLabel: "Uptime SLA",
    color: "bg-violet-500",
  },
  {
    icon: <RefreshCcw size={24} />,
    title: "Daily Backups",
    desc: "Automated daily backups with point-in-time recovery. Nothing is ever lost.",
    stat: "24h",
    statLabel: "Backup Cycle",
    color: "bg-amber-500",
  },
  {
    icon: <Eye size={24} />,
    title: "Privacy First",
    desc: "We never sell your data. Granular privacy controls let you decide what's visible.",
    stat: "Zero",
    statLabel: "Data Sold",
    color: "bg-rose-500",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Sandboxed Execution",
    desc: "Your code runs in isolated Judge0 containers. No access to other users or systems.",
    stat: "Isolated",
    statLabel: "Containers",
    color: "bg-teal-500",
  },
];

const terminalLines = [
  { type: "input", text: "$ aralify security --status" },
  { type: "output", text: "Checking security systems..." },
  { type: "success", text: "✓ TLS 1.3 connection established" },
  { type: "success", text: "✓ JWT token validated (exp: 24h)" },
  { type: "success", text: "✓ Code sandbox initialized (isolated)" },
  { type: "success", text: "✓ Database encrypted (AES-256)" },
  { type: "success", text: "✓ Backup verified (last: 2h ago)" },
  { type: "output", text: "" },
  { type: "highlight", text: "All systems operational. 0 threats detected." },
];

function SecurityTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const delay = visibleLines === 0 ? 400 : visibleLines === 1 ? 800 : 300;
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  return (
    <div className="font-mono text-sm space-y-1.5">
      <AnimatePresence>
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={
              line.type === "input"
                ? "text-white font-bold"
                : line.type === "success"
                  ? "text-emerald-400 pl-2"
                  : line.type === "highlight"
                    ? "text-accent font-bold pt-1"
                    : "text-white/50 pl-2"
            }
          >
            {line.text}
          </motion.div>
        ))}
      </AnimatePresence>
      {visibleLines < terminalLines.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-2.5 h-4 bg-white ml-2"
        />
      )}
    </div>
  );
}

function SecurityStatusBar() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {[
        { label: "Encryption", status: "Active" },
        { label: "Firewall", status: "Active" },
        { label: "Auth", status: "Active" },
        { label: "Backups", status: "Active" },
      ].map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-emerald-400"
          />
          <span className="text-xs font-bold text-white/70">
            {item.label}: <span className="text-emerald-400">{item.status}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function SecuritySection() {
  return (
    <section className="py-32 bg-foreground text-background overflow-hidden relative noise-overlay">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-5 py-2 neo-brutal-border-white rounded-full mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShieldAlert size={16} />
            </motion.div>
            <span className="font-display font-black text-sm uppercase tracking-widest">Zero Breaches Since Launch</span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white">
            SECURE BY<br />DEFAULT
          </h2>
          <p className="text-lg font-medium text-white/60 max-w-2xl mx-auto">
            Your code, your progress, your data — locked down with enterprise-grade security so you can focus on learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
          {/* Left: Security terminal mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Terminal window */}
            <div className="bg-[#0d1117] neo-brutal-border-white rounded-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-auto text-white/40 font-mono text-xs flex items-center gap-2">
                  <Wifi size={12} /> security-monitor
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-6 min-h-[280px]">
                <SecurityTerminal />
              </div>

              {/* Status bar */}
              <div className="px-6 py-3 border-t border-white/10 bg-white/5">
                <SecurityStatusBar />
              </div>
            </div>

            {/* Security metrics row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "0", label: "Breaches", color: "text-emerald-400" },
                { value: "100%", label: "Encrypted", color: "text-sky-400" },
                { value: "<50ms", label: "Auth Speed", color: "text-violet-400" },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/5 neo-brutal-border-white rounded-xl p-4 text-center"
                >
                  <div className={`text-2xl font-black ${metric.color}`}>{metric.value}</div>
                  <div className="text-xs font-bold text-white/40 uppercase tracking-wider">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: "6px 6px 0px 0px rgba(255,255,255,0.2)" }}
                className="p-5 bg-white/5 backdrop-blur-sm neo-brutal-border-white rounded-2xl group cursor-default transition-all relative overflow-hidden"
              >
                {/* Accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${feature.color}`} />

                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 bg-white/10 rounded-xl group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-white/30 uppercase">{feature.statLabel}</div>
                    <div className={`text-sm font-black ${
                      feature.color === "bg-emerald-500" ? "text-emerald-400" :
                      feature.color === "bg-sky-500" ? "text-sky-400" :
                      feature.color === "bg-violet-500" ? "text-violet-400" :
                      feature.color === "bg-amber-500" ? "text-amber-400" :
                      feature.color === "bg-rose-500" ? "text-rose-400" :
                      "text-teal-400"
                    }`}>{feature.stat}</div>
                  </div>
                </div>

                <h3 className="text-base font-black uppercase mb-1 text-white">{feature.title}</h3>
                <p className="text-sm font-medium text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6 px-8 bg-white/5 neo-brutal-border-white rounded-2xl">
            {[
              { icon: <KeyRound size={18} />, label: "TLS 1.3" },
              { icon: <Lock size={18} />, label: "AES-256" },
              { icon: <ShieldCheck size={18} />, label: "SOC 2 Aligned" },
              { icon: <Fingerprint size={18} />, label: "OAuth 2.0" },
              { icon: <Server size={18} />, label: "Isolated Sandboxes" },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors cursor-default"
              >
                {badge.icon}
                <span className="text-sm font-black uppercase tracking-wider">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
