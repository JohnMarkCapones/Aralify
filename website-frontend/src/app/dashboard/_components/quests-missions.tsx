"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuestMission } from "@/lib/data/dashboard";

interface QuestsMissionsProps {
  quests: QuestMission[];
}

export function QuestsMissions({ quests }: QuestsMissionsProps) {
  const [tab, setTab] = useState<"daily" | "weekly">("daily");
  const filtered = quests.filter((q) => q.type === tab);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Quests & Missions</h3>
        <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
          {(["daily", "weekly"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "text-[11px] font-semibold px-3 py-1 rounded-md transition-colors capitalize",
                tab === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((quest, i) => {
          const percent = Math.round(
            (quest.progress / quest.maxProgress) * 100
          );

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl card-elevated bg-background transition-shadow hover:card-elevated-hover",
                quest.completed && "opacity-60"
              )}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-lg shrink-0">
                {quest.icon}
              </div>

              {/* Info + progress bar */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold truncate">{quest.title}</p>
                  {quest.completed && (
                    <span className="shrink-0 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground mb-1.5">
                  {quest.description}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        quest.completed
                          ? "bg-green-500"
                          : "bg-gradient-to-r from-primary to-secondary"
                      )}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground shrink-0">
                    {quest.progress}/{quest.maxProgress}
                  </span>
                </div>
              </div>

              {/* XP reward */}
              <div className="flex flex-col items-end shrink-0">
                <span className="text-xs font-bold text-primary">
                  +{quest.xpReward} XP
                </span>
                <ChevronRight
                  size={14}
                  className="text-muted-foreground/20 mt-1"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
