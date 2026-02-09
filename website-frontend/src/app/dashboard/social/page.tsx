"use client";

import { useState } from "react";
import { Users, Zap, Flame, UserPlus, UserMinus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { mockFriends } from "@/lib/data/dashboard";

type Tab = "following" | "followers" | "discover";

export default function SocialPage() {
  const [tab, setTab] = useState<Tab>("following");
  const [followState, setFollowState] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    mockFriends.forEach((f) => { state[f.id] = f.isFollowing; });
    return state;
  });

  const following = mockFriends.filter((f) => followState[f.id]);
  const followers = mockFriends.filter((f) => f.isFollowedBy);
  const discover = mockFriends.filter((f) => !followState[f.id] && !f.isFollowedBy);

  const displayed = tab === "following" ? following : tab === "followers" ? followers : discover;

  const toggleFollow = (id: string) => {
    setFollowState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Social"
        description={`${following.length} following · ${followers.length} followers`}
        actions={
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
            {(["following", "followers", "discover"] as const).map((t) => (
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayed.map((friend) => (
          <div
            key={friend.id}
            className="bg-background rounded-xl border border-border/50 shadow-sm p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                {friend.displayName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{friend.displayName}</p>
                <p className="text-[10px] text-muted-foreground">@{friend.username}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Zap size={10} className="text-primary" />
                    <span>{friend.xp.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Flame size={10} className="text-orange-500" />
                    <span>{friend.streak}d</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Lv.{friend.level}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => toggleFollow(friend.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  followState[friend.id]
                    ? "border border-border/50 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 hover:border-red-200"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {followState[friend.id] ? (
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
              <button className="px-3 py-1.5 border border-border/50 rounded-lg text-xs font-medium hover:bg-muted transition-colors">
                Compare
              </button>
            </div>
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">
            {tab === "following" ? "You're not following anyone yet" : tab === "followers" ? "No followers yet" : "No suggestions available"}
          </p>
        </div>
      )}
    </div>
  );
}
