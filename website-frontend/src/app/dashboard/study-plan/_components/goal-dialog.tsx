"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PlannerGoal } from "./use-planner-store";

const GOAL_CATEGORIES: { value: PlannerGoal["category"]; label: string; unit: string }[] = [
  { value: "lessons", label: "Lessons", unit: "lessons" },
  { value: "time", label: "Study Time", unit: "minutes" },
  { value: "challenges", label: "Challenges", unit: "challenges" },
  { value: "xp", label: "XP", unit: "XP" },
];

const PRESETS = [
  { title: "Complete 5 lessons", target: 5, category: "lessons" as const, unit: "lessons" },
  { title: "Study 120 minutes", target: 120, category: "time" as const, unit: "minutes" },
  { title: "Solve 3 challenges", target: 3, category: "challenges" as const, unit: "challenges" },
  { title: "Earn 500 XP", target: 500, category: "xp" as const, unit: "XP" },
];

interface GoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (goal: {
    title: string;
    target: number;
    unit: string;
    category: PlannerGoal["category"];
  }) => void;
  editingGoal?: PlannerGoal | null;
}

export function GoalDialog({ open, onOpenChange, onSave, editingGoal }: GoalDialogProps) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(5);
  const [category, setCategory] = useState<PlannerGoal["category"]>("lessons");
  const [unit, setUnit] = useState("lessons");

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setTarget(editingGoal.target);
      setCategory(editingGoal.category);
      setUnit(editingGoal.unit);
    } else {
      setTitle("");
      setTarget(5);
      setCategory("lessons");
      setUnit("lessons");
    }
  }, [editingGoal, open]);

  const handlePreset = (preset: (typeof PRESETS)[number]) => {
    setTitle(preset.title);
    setTarget(preset.target);
    setCategory(preset.category);
    setUnit(preset.unit);
  };

  const handleCategoryChange = (cat: PlannerGoal["category"]) => {
    setCategory(cat);
    const matched = GOAL_CATEGORIES.find((c) => c.value === cat);
    if (matched) setUnit(matched.unit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || target <= 0) return;
    onSave({ title: title.trim(), target, unit, category });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">
            {editingGoal ? "Edit Goal" : "Add Weekly Goal"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Presets */}
          {!editingGoal && (
            <div className="space-y-2">
              <Label>Quick presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handlePreset(preset)}
                    className={cn(
                      "text-left px-3 py-2 rounded-lg border text-xs font-medium transition-colors",
                      title === preset.title
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border/50 hover:border-border text-muted-foreground"
                    )}
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="goal-title">Title</Label>
            <Input
              id="goal-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete 5 lessons this week"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="goal-target">Target</Label>
              <Input
                id="goal-target"
                type="number"
                min={1}
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-1.5">
                {GOAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryChange(cat.value)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors",
                      category === cat.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border/50 hover:border-border"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || target <= 0}>
              {editingGoal ? "Update" : "Add Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
