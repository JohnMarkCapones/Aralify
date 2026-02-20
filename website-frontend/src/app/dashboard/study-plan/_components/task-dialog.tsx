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
import type { PlannerTask } from "./use-planner-store";
import { getTodayStr } from "./use-planner-store";

const CATEGORIES: { value: PlannerTask["category"]; label: string }[] = [
  { value: "lesson", label: "Lesson" },
  { value: "review", label: "Review" },
  { value: "challenge", label: "Challenge" },
  { value: "practice", label: "Practice" },
  { value: "other", label: "Other" },
];

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: {
    title: string;
    estimatedMins: number;
    date: string;
    time?: string;
    category: PlannerTask["category"];
  }) => void;
  editingTask?: PlannerTask | null;
}

export function TaskDialog({ open, onOpenChange, onSave, editingTask }: TaskDialogProps) {
  const [title, setTitle] = useState("");
  const [estimatedMins, setEstimatedMins] = useState(30);
  const [date, setDate] = useState(getTodayStr());
  const [time, setTime] = useState("");
  const [category, setCategory] = useState<PlannerTask["category"]>("lesson");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setEstimatedMins(editingTask.estimatedMins);
      setDate(editingTask.date);
      setTime(editingTask.time || "");
      setCategory(editingTask.category);
    } else {
      setTitle("");
      setEstimatedMins(30);
      setDate(getTodayStr());
      setTime("");
      setCategory("lesson");
    }
  }, [editingTask, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      estimatedMins,
      date,
      time: time || undefined,
      category,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">
            {editingTask ? "Edit Task" : "Add Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete Python Basics Lesson 3"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="task-mins">Est. Minutes</Label>
              <Input
                id="task-mins"
                type="number"
                min={5}
                max={480}
                value={estimatedMins}
                onChange={(e) => setEstimatedMins(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-date">Date</Label>
              <Input
                id="task-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-time">Time (optional)</Label>
            <Input
              id="task-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {editingTask ? "Update" : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
