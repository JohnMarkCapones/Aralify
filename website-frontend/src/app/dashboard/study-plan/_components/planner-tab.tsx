"use client";

import { useState } from "react";
import { usePlannerStore, getTodayStr } from "./use-planner-store";
import { TaskSection } from "./task-section";
import { CalendarSection } from "./calendar-section";
import { GoalSection } from "./goal-section";

export function PlannerTab() {
  const store = usePlannerStore();
  const [selectedDate, setSelectedDate] = useState(getTodayStr());

  if (!store.hydrated) {
    return (
      <div className="space-y-6">
        {/* Skeleton placeholders */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-background rounded-xl border border-border/50 h-32 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Weekly Calendar */}
      <CalendarSection
        tasks={store.tasks}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {/* Today's Tasks */}
      <TaskSection
        tasks={store.tasks}
        selectedDate={selectedDate}
        onAdd={store.addTask}
        onUpdate={store.updateTask}
        onDelete={store.deleteTask}
        onToggle={store.toggleTask}
      />

      {/* Weekly Goals */}
      <GoalSection
        goals={store.goals}
        onAdd={store.addGoal}
        onUpdate={store.updateGoal}
        onDelete={store.deleteGoal}
        onIncrement={store.incrementGoal}
      />
    </div>
  );
}
