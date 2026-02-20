"use client";

import { PageHeader } from "../_components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlannerTab } from "./_components/planner-tab";
import { PathfinderTab } from "./_components/pathfinder-tab";
import { CalendarCheck, Compass } from "lucide-react";

export default function StudyPlanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Study Plan"
        description="Set goals and track your weekly progress"
      />

      <Tabs defaultValue="planner">
        <TabsList className="w-full">
          <TabsTrigger value="planner" className="gap-1.5">
            <CalendarCheck size={14} />
            My Planner
          </TabsTrigger>
          <TabsTrigger value="pathfinder" className="gap-1.5">
            <Compass size={14} />
            PathFinder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planner" className="mt-4">
          <PlannerTab />
        </TabsContent>

        <TabsContent value="pathfinder" className="mt-4">
          <PathfinderTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
