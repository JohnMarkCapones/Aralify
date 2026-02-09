"use client";

import { useState } from "react";
import {
  Settings, Award, Medal, Plus, Trash2, Edit3,
  Globe, Wrench, Zap, Lock,
} from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { StatusBadge } from "../_components/status-badge";
import { DataTable, type Column } from "../_components/data-table";
import { ConfirmDialog } from "../_components/confirm-dialog";
import { cn } from "@/lib/utils";
import {
  mockAchievements,
  mockBadges,
  type AdminAchievement,
} from "@/lib/data/admin";

const RARITY_COLORS: Record<string, string> = {
  COMMON: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  RARE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  EPIC: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  LEGENDARY: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "achievements" | "badges">("general");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createAchievementOpen, setCreateAchievementOpen] = useState(false);
  const [createBadgeOpen, setCreateBadgeOpen] = useState(false);

  const inputCls = "w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";
  const labelCls = "text-xs font-medium text-muted-foreground mb-1.5 block";

  const achievementColumns: Column<AdminAchievement>[] = [
    {
      key: "achievement",
      header: "Achievement",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
            <Award size={16} className="text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{row.title}</p>
            <p className="text-[10px] text-muted-foreground">{row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      className: "hidden sm:table-cell",
      render: (row) => <StatusBadge status={row.category} />,
    },
    {
      key: "xp",
      header: "XP",
      render: (row) => (
        <span className="text-sm font-medium text-primary">{row.xpReward}</span>
      ),
    },
    {
      key: "criteria",
      header: "Criteria",
      className: "hidden lg:table-cell",
      render: (row) => (
        <span className="text-xs font-mono text-muted-foreground">{row.criteria}</span>
      ),
    },
    {
      key: "secret",
      header: "Secret",
      className: "hidden md:table-cell",
      render: (row) => row.isSecret ? (
        <Lock size={14} className="text-yellow-500" />
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
      ),
    },
    {
      key: "unlocked",
      header: "Unlocked",
      className: "hidden md:table-cell",
      render: (row) => (
        <span className="text-xs font-medium text-muted-foreground">
          {row.unlockedByCount.toLocaleString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-20",
      render: () => (
        <div className="flex gap-1 justify-end">
          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Edit">
            <Edit3 size={14} />
          </button>
          <button
            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500"
            title="Delete"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  const tabs = [
    { id: "general" as const, label: "General", icon: <Settings size={14} /> },
    { id: "achievements" as const, label: "Achievements", icon: <Award size={14} /> },
    { id: "badges" as const, label: "Badges", icon: <Medal size={14} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="System configuration and game elements" />

      {/* Tabs */}
      <div className="border-b border-border/50">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
              <Globe size={16} className="text-primary" /> Platform
            </h3>
            <div className="grid gap-4">
              <div>
                <label className={labelCls}>Platform Name</label>
                <input defaultValue="Aralify" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea
                  defaultValue="Interactive programming education platform"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
              </div>
              <div>
                <label className={labelCls}>Default Language</label>
                <select className={cn(inputCls, "w-40 font-medium")}>
                  <option value="en">English</option>
                  <option value="fil">Filipino</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
              <Wrench size={16} className="text-orange-500" /> System
            </h3>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">When enabled, only admins can access the platform</p>
              </div>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  maintenanceMode ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm",
                    maintenanceMode ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>

          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
              <Zap size={16} className="text-yellow-500" /> Gamification
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Max Daily XP</label>
                <input type="number" defaultValue={1000} className={cn(inputCls, "w-32")} />
              </div>
              <div>
                <label className={labelCls}>Streak Freeze Limit</label>
                <input type="number" defaultValue={3} className={cn(inputCls, "w-32")} />
              </div>
            </div>
          </div>

          <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Save Settings
          </button>
        </div>
      )}

      {/* Achievements */}
      {activeTab === "achievements" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setCreateAchievementOpen(true)}
              className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5"
            >
              <Plus size={14} /> Create Achievement
            </button>
          </div>

          <DataTable
            columns={achievementColumns}
            data={mockAchievements}
            pageSize={10}
            searchable
            searchPlaceholder="Search achievements..."
            emptyMessage="No achievements found."
          />
        </div>
      )}

      {/* Badges */}
      {activeTab === "badges" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setCreateBadgeOpen(true)}
              className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5"
            >
              <Plus size={14} /> Create Badge
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-background rounded-xl border border-border/50 shadow-sm p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Medal size={20} className="text-primary" />
                  </div>
                  <span className={cn(
                    "inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium",
                    RARITY_COLORS[badge.rarity] || RARITY_COLORS.COMMON
                  )}>
                    {badge.rarity}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">{badge.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{badge.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="text-[10px] text-muted-foreground">
                    {badge.awardedCount.toLocaleString()} awarded
                  </span>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-muted rounded-lg transition-colors" title="Edit">
                      <Edit3 size={12} />
                    </button>
                    <button
                      className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500"
                      title="Delete"
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Achievement Dialog */}
      <ConfirmDialog
        open={createAchievementOpen}
        onOpenChange={setCreateAchievementOpen}
        title="Create Achievement"
        description="Add a new achievement to the platform."
        onConfirm={() => setCreateAchievementOpen(false)}
        confirmText="Create"
      >
        <div className="grid gap-3">
          <input placeholder="Title" className={inputCls} />
          <input placeholder="Description" className={inputCls} />
          <input placeholder="Icon URL" className={inputCls} />
          <div className="grid grid-cols-2 gap-3">
            <select className={cn(inputCls, "font-medium")}>
              <option value="">Category</option>
              <option>LEARNING</option>
              <option>SOCIAL</option>
              <option>STREAK</option>
              <option>MASTERY</option>
              <option>SPECIAL</option>
            </select>
            <input type="number" placeholder="XP Reward" className={inputCls} />
          </div>
          <textarea
            placeholder="Criteria (JSON)"
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
            <span className="text-sm font-medium">Secret achievement</span>
          </label>
        </div>
      </ConfirmDialog>

      {/* Create Badge Dialog */}
      <ConfirmDialog
        open={createBadgeOpen}
        onOpenChange={setCreateBadgeOpen}
        title="Create Badge"
        description="Add a new badge to the platform."
        onConfirm={() => setCreateBadgeOpen(false)}
        confirmText="Create"
      >
        <div className="grid gap-3">
          <input placeholder="Title" className={inputCls} />
          <input placeholder="Description" className={inputCls} />
          <input placeholder="Icon URL" className={inputCls} />
          <select className={cn(inputCls, "font-medium")}>
            <option value="">Rarity</option>
            <option>COMMON</option>
            <option>RARE</option>
            <option>EPIC</option>
            <option>LEGENDARY</option>
          </select>
        </div>
      </ConfirmDialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Item"
        description="This will permanently remove this item. This cannot be undone."
        onConfirm={() => setDeleteDialogOpen(false)}
        destructive
        confirmText="Delete"
        requireConfirmation="DELETE"
      />
    </div>
  );
}
