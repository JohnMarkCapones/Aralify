"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Medal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { useBadges } from "@/hooks/api";
import type { BadgeItem } from "@/lib/api";

type Rarity = "all" | string;

const RARITY_FILTERS: { value: Rarity; label: string }[] = [
  { value: "all", label: "All" },
  { value: "common", label: "Common" },
  { value: "rare", label: "Rare" },
  { value: "epic", label: "Epic" },
  { value: "legendary", label: "Legendary" },
];

const RARITY_RING: Record<string, string> = {
  common: "ring-zinc-300 dark:ring-zinc-600",
  rare: "ring-blue-400 dark:ring-blue-500",
  epic: "ring-purple-400 dark:ring-purple-500",
  legendary: "ring-amber-400 dark:ring-amber-500",
};

const RARITY_DOT: Record<string, string> = {
  common: "bg-zinc-400",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
};

const badgeVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: "easeOut" as const },
  }),
};

export default function BadgesPage() {
  const [rarity, setRarity] = useState<Rarity>("all");
  const { data: badges, isLoading } = useBadges();

  const allBadges = badges ?? [];
  const filtered = rarity === "all" ? allBadges : allBadges.filter((b) => b.rarity === rarity);
  const earnedCount = allBadges.filter((b) => b.earned).length;

  // Rarity distribution
  const rarityDist = ["common", "rare", "epic", "legendary"].map((r) => ({
    rarity: r,
    total: allBadges.filter((b) => b.rarity === r).length,
    earned: allBadges.filter((b) => b.rarity === r && b.earned).length,
  }));

  // Next badge
  const nextBadge = allBadges.find((b) => !b.earned);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Badges"
        description={`${earnedCount} of ${allBadges.length} earned`}
        actions={
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
            {RARITY_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setRarity(f.value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  rarity === f.value ? "bg-background card-elevated text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      />

      {/* Rarity distribution */}
      <div className="bg-background rounded-xl border border-border/50 p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Rarity Distribution</h3>
        <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-muted/50 mb-3">
          {rarityDist.map((r) => (
            <div
              key={r.rarity}
              className={cn("h-full transition-all", RARITY_DOT[r.rarity])}
              style={{ width: `${(r.earned / allBadges.length) * 100}%` }}
              title={`${r.rarity}: ${r.earned}/${r.total}`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          {rarityDist.map((r) => (
            <div key={r.rarity} className="flex items-center gap-1.5 text-[10px]">
              <div className={cn("w-2 h-2 rounded-full", RARITY_DOT[r.rarity])} />
              <span className="text-muted-foreground capitalize">{r.rarity}:</span>
              <span className="font-medium">{r.earned}/{r.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Badge */}
      {nextBadge && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-5">
          <span className="text-xs font-medium text-primary mb-2 block">Next Badge to Earn</span>
          <div className="flex items-center gap-4">
            <span className="text-3xl">{nextBadge.icon}</span>
            <div>
              <h3 className="text-sm font-semibold">{nextBadge.name}</h3>
              <p className="text-xs text-muted-foreground">{nextBadge.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {filtered.map((badge, i) => (
          <motion.div
            key={badge.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={badgeVariants}
            whileHover={{ rotateY: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ perspective: 800 }}
          >
            <div
              className={cn(
                "bg-background rounded-xl border border-border/50 p-4 shadow-sm text-center transition-all",
                badge.earned && `ring-2 ${RARITY_RING[badge.rarity]}`,
                !badge.earned && "opacity-50"
              )}
            >
              <span className={cn("text-3xl block mb-2", !badge.earned && "grayscale")}>{badge.icon}</span>
              <h4 className="text-xs font-semibold mb-0.5">{badge.name}</h4>
              <p className="text-[10px] text-muted-foreground mb-2">{badge.description}</p>

              <span className={cn(
                "text-[9px] font-medium px-1.5 py-0.5 rounded-full capitalize inline-block",
                badge.rarity === "common" && "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
                badge.rarity === "rare" && "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
                badge.rarity === "epic" && "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
                badge.rarity === "legendary" && "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
              )}>
                {badge.rarity}
              </span>

              {badge.earned && badge.earnedAt && (
                <p className="text-[9px] text-muted-foreground mt-2">
                  {new Date(badge.earnedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              )}
              {!badge.earned && (
                <p className="text-[9px] text-muted-foreground mt-2 italic">{badge.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Medal size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No badges in this rarity</p>
        </div>
      )}
    </div>
  );
}
