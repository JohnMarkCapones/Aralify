"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const AVATAR_PRESETS = [
  "felix", "aneka", "jade", "bob",
  "mia", "leo", "zoe", "max",
  "aria", "kai", "luna", "nova",
];

interface PersonalizationStepProps {
  displayName: string;
  setDisplayName: (name: string) => void;
  avatarPreset: string;
  setAvatarPreset: (preset: string) => void;
}

export function PersonalizationStep({
  displayName,
  setDisplayName,
  avatarPreset,
  setAvatarPreset,
}: PersonalizationStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-display font-bold uppercase text-center mb-8"
      >
        WHO ARE YOU?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <label className="block text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Display Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          maxLength={50}
          placeholder="What should we call you?"
          className="w-full h-14 px-4 text-lg bg-card neo-brutal-border neo-brutal-shadow rounded-xl font-display focus:outline-none focus:neo-brutal-shadow-lg transition-all placeholder:text-muted-foreground/50"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Pick an Avatar
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {AVATAR_PRESETS.map((preset, i) => (
            <motion.button
              key={preset}
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAvatarPreset(preset)}
              className={cn(
                "relative aspect-square rounded-xl neo-brutal-border overflow-hidden transition-all",
                avatarPreset === preset
                  ? "ring-4 ring-primary neo-brutal-shadow-lg"
                  : "neo-brutal-shadow hover:neo-brutal-shadow-lg"
              )}
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${preset}`}
                alt={preset}
                className="w-full h-full bg-muted/50"
              />
              {avatarPreset === preset && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-6 h-6 bg-primary rounded-full neo-brutal-border flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
