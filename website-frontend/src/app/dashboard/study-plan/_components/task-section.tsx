"use client";

import { useState } from "react";
import { Plus, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskItem } from "./task-item";
import { TaskDialog } from "./task-dialog";
import type { PlannerTask } from "./use-planner-store";
import { getTodayStr } from "./use-planner-store";

interface TaskSectionProps {
  tasks: PlannerTask[];
  selectedDate: string;
  onAdd: (task: {
    title: string;
    estimatedMins: number;
    date: string;
    time?: string;
    category: PlannerTask["category"];
  }) => void;
  onUpdate: (id: string, updates: Partial<PlannerTask>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function TaskSection({
  tasks,
  selectedDate,
  onAdd,
  onUpdate,
  onDelete,
  onToggle,
}: TaskSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<PlannerTask | null>(null);

  const dateTasks = tasks
    .filter((t) => t.date === selectedDate)
    .sort((a, b) => {
      // Incomplete first, then by time, then by creation
      if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
      if (a.time && b.time) return a.time.localeCompare(b.time);
      if (a.time) return -1;
      if (b.time) return 1;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const completedCount = dateTasks.filter((t) => t.isCompleted).length;
  const remainingMins = dateTasks
    .filter((t) => !t.isCompleted)
    .reduce((sum, t) => sum + t.estimatedMins, 0);

  const isToday = selectedDate === getTodayStr();
  const dateLabel = isToday
    ? "Today"
    : new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

  const handleEdit = (task: PlannerTask) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSave = (taskData: {
    title: string;
    estimatedMins: number;
    date: string;
    time?: string;
    category: PlannerTask["category"];
  }) => {
    if (editingTask) {
      onUpdate(editingTask.id, taskData);
    } else {
      onAdd(taskData);
    }
    setEditingTask(null);
  };

  return (
    <div className="bg-background rounded-xl border border-border/50 shadow-sm">
      <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{dateLabel}&apos;s Tasks</h3>
          {dateTasks.length > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedCount}/{dateTasks.length} done
              {remainingMins > 0 && ` · ~${remainingMins} min remaining`}
            </p>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditingTask(null);
            setDialogOpen(true);
          }}
          className="h-7 text-xs gap-1"
        >
          <Plus size={14} /> Add
        </Button>
      </div>

      <div className="p-5">
        {dateTasks.length === 0 ? (
          <div className="text-center py-8">
            <CalendarCheck size={32} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              No tasks for {dateLabel.toLowerCase()}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Plan your first study session
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {dateTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => onToggle(task.id)}
                onEdit={() => handleEdit(task)}
                onDelete={() => onDelete(task.id)}
              />
            ))}
          </div>
        )}
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingTask(null);
        }}
        onSave={handleSave}
        editingTask={editingTask}
      />
    </div>
  );
}
