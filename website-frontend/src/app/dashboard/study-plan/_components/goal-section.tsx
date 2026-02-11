"use client";

import { useState } from "react";
import {
  Plus,
  BookOpen,
  Target,
  Flame,
  Clock,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GoalDialog } from "./goal-dialog";
import type { PlannerGoal } from "./use-planner-store";
import { useRef, useEffect } from "react";

const CATEGORY_ICONS: Record<PlannerGoal["category"], React.ReactNode> = {
  lessons: <BookOpen size={14} />,
  xp: <Target size={14} />,
  challenges: <Flame size={14} />,
  time: <Clock size={14} />,
};

interface GoalSectionProps {
  goals: PlannerGoal[];
  onAdd: (goal: {
    title: string;
    target: number;
    unit: string;
    category: PlannerGoal["category"];
  }) => void;
  onUpdate: (id: string, updates: Partial<PlannerGoal>) => void;
  onDelete: (id: string) => void;
  onIncrement: (id: string, amount?: number) => void;
}

export function GoalSection({
  goals,
  onAdd,
  onUpdate,
  onDelete,
  onIncrement,
}: GoalSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<PlannerGoal | null>(null);

  const handleEdit = (goal: PlannerGoal) => {
    setEditingGoal(goal);
    setDialogOpen(true);
  };

  const handleSave = (goalData: {
    title: string;
    target: number;
    unit: string;
    category: PlannerGoal["category"];
  }) => {
    if (editingGoal) {
      onUpdate(editingGoal.id, goalData);
    } else {
      onAdd(goalData);
    }
    setEditingGoal(null);
  };

  return (
    <div className="bg-background rounded-xl border border-border/50 shadow-sm">
      <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Weekly Goals</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track your progress for this week
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditingGoal(null);
            setDialogOpen(true);
          }}
          className="h-7 text-xs gap-1"
        >
          <Plus size={14} /> Add
        </Button>
      </div>

      <div className="p-5">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <Target size={32} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              No goals set
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Set your first weekly goal to stay on track
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <GoalItem
                key={goal.id}
                goal={goal}
                onEdit={() => handleEdit(goal)}
                onDelete={() => onDelete(goal.id)}
                onIncrement={(amount) => onIncrement(goal.id, amount)}
              />
            ))}
          </div>
        )}
      </div>

      <GoalDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingGoal(null);
        }}
        onSave={handleSave}
        editingGoal={editingGoal}
      />
    </div>
  );
}

/* ─── Goal Item ────────────────────────────────────────────────────── */

function GoalItem({
  goal,
  onEdit,
  onDelete,
  onIncrement,
}: {
  goal: PlannerGoal;
  onEdit: () => void;
  onDelete: () => void;
  onIncrement: (amount: number) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pct = Math.min((goal.current / goal.target) * 100, 100);
  const isComplete = goal.current >= goal.target;

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "text-muted-foreground",
              isComplete && "text-emerald-500"
            )}
          >
            {CATEGORY_ICONS[goal.category]}
          </div>
          <span className="text-sm font-medium">{goal.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-medium",
              isComplete ? "text-emerald-500" : "text-muted-foreground"
            )}
          >
            {goal.current}/{goal.target} {goal.unit}
          </span>

          {/* +1 button */}
          {!isComplete && (
            <button
              onClick={() => onIncrement(1)}
              className="h-5 px-1.5 text-[10px] font-bold rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100"
            >
              +1
            </button>
          )}

          {/* Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
            >
              <MoreHorizontal size={12} className="text-muted-foreground" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 z-10 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[120px]">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-muted transition-colors"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-destructive hover:bg-muted transition-colors"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isComplete ? "bg-emerald-500" : "bg-primary"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
