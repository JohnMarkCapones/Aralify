"use client";

import React from "react";
import { motion } from "framer-motion";

export function NeoToggle({
  enabled,
  onToggle,
  label,
  description,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm">{label}</p>
        {description && (
          <p className="text-xs font-medium text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full neo-brutal-border transition-colors duration-200 ${
          enabled ? "bg-primary" : "bg-muted"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`inline-block h-5 w-5 rounded-full neo-brutal-border bg-white shadow-sm ${
            enabled ? "ml-7" : "ml-1"
          }`}
        />
      </button>
    </div>
  );
}

export function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden"
    >
      <div className="flex items-center gap-3 px-6 py-4 border-b-3 border-border bg-muted/30">
        <div className="p-2 bg-primary/10 rounded-xl">{icon}</div>
        <h2 className="font-display font-black text-lg uppercase tracking-tight">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}
