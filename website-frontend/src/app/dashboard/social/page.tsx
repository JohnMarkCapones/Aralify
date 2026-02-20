"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Zap, Flame, UserPlus, UserMinus, Heart, BarChart3, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { useFollowers, useFollowing, useFollow, useUnfollow } from "@/hooks/api";
import type { SocialUser } from "@/lib/api";

type Tab = "following" | "followers";

const AVATAR_GRADIENTS = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-pink-400",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-amber-400",
  "from-rose-500 to-pink-400",
  "from-indigo-500 to-blue-400",
  "from-fuchsia-500 to-purple-400",
  "from-teal-500 to-emerald-400",
];

function getLevelColor(level: number): string {
  if (level <= 10) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400";
  if (level <= 20) return "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400";
  if (level <= 30) return "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400";
  return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400";
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function SocialPage() {
  const [tab, setTab] = useState<Tab>("following");

  const { data: followingData, isLoading: loadingFollowing } = useFollowing({ limit: 50 });
  const { data: followersData, isLoading: loadingFollowers } = useFollowers({ limit: 50 });
  const followMutation = useFollow();
  const unfollowMutation = useUnfollow();

  const isLoading = loadingFollowing || loadingFollowers;

  const following = followingData?.users ?? [];
  const followers = followersData?.users ?? [];
  const mutuals = following.filter((f) =>
    followers.some((fl) => fl.id === f.id)
  );

  const displayed = tab === "following" ? following : followers;

  const toggleFollow = (user: SocialUser) => {
    if (user.isFollowing) {
      unfollowMutation.mutate(user.id);
    } else {
      followMutation.mutate(user.id);
    }
  };

  const stats = [
    { icon: UserPlus, label: "Following", value: followingData?.total ?? following.length, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-950/40" },
    { icon: Users, label: "Followers", value: followersData?.total ?? followers.length, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-950/40" },
    { icon: Heart, label: "Mutuals", value: mutuals.length, color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-950/40" },
  ];

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
        title="Social"
        description={`${following.length} following · ${followers.length} followers`}
        actions={
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
            {(["following", "followers"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                  tab === t ? "bg-background card-elevated text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />

      {/* Stats banner */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/40 shadow-sm"
          >
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", stat.bg)}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayed.map((friend, i) => {
          const gradientIdx = friend.id.charCodeAt(friend.id.length - 1) % AVATAR_GRADIENTS.length;
          return (
            <motion.div
              key={friend.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden"
            >
              {/* Subtle top gradient strip */}
              <div className={cn("h-1 bg-gradient-to-r", AVATAR_GRADIENTS[gradientIdx])} />

              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Gradient avatar */}
                  <div className="relative shrink-0">
                    <div className={cn(
                      "w-11 h-11 rounded-full bg-gradient-to-br flex items-center justify-center text-sm font-bold text-white",
                      AVATAR_GRADIENTS[gradientIdx]
                    )}>
                      {friend.displayName.charAt(0)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate">{friend.displayName}</p>
                      {/* Level badge with tier color */}
                      <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                        getLevelColor(friend.level)
                      )}>
                        Lv.{friend.level}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">@{friend.username}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                          <Zap size={10} className="text-primary" />
                        </div>
                        <span className="font-medium">{friend.xp.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <div className="w-5 h-5 rounded-md bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center">
                          <Flame size={10} className="text-orange-500" />
                        </div>
                        <span className="font-medium">{friend.streak}d</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => toggleFollow(friend)}
                    disabled={followMutation.isPending || unfollowMutation.isPending}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      friend.isFollowing
                        ? "border border-border/50 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 hover:border-red-200"
                        : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-md"
                    )}
                  >
                    {friend.isFollowing ? (
                      <>
                        <UserMinus size={12} />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus size={12} />
                        Follow
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">
            {tab === "following" ? "You're not following anyone yet" : "No followers yet"}
          </p>
        </div>
      )}
    </div>
  );
}
