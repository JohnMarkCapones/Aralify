"use client";

import { CheckCircle, Clock, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlannerTask } from "./use-planner-store";
import { useState, useRef, useEffect } from "react";

const CATEGORY_COLORS: Record<PlannerTask["category"], string> = {
  lesson: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  review: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  challenge: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  practice: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

interface TaskItemProps {
  task: PlannerTask;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
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
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-colors group",
        task.isCompleted
          ? "border-emerald-200 dark:border-emerald-800/30 bg-emerald-50/50 dark:bg-emerald-950/10"
          : "border-border/30 hover:border-border"
      )}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={cn(
          "shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
          task.isCompleted
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-border hover:border-primary"
        )}
      >
        {task.isCompleted && <CheckCircle size={12} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium truncate",
            task.isCompleted && "line-through opacity-60"
          )}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={cn(
              "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
              CATEGORY_COLORS[task.category]
            )}
          >
            {task.category}
          </span>
          {task.time && (
            <span className="text-[10px] text-muted-foreground">
              {task.time}
            </span>
          )}
        </div>
      </div>

      {/* Estimated time */}
      <span className="text-xs text-muted-foreground shrink-0 flex items-center gap-1">
        <Clock size={10} />
        {task.estimatedMins}m
      </span>

      {/* Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="shrink-0 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
        >
          <MoreHorizontal size={14} className="text-muted-foreground" />
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
  );
}
