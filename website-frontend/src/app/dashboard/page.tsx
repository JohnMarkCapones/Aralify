"use client";

import { CharacterZone } from "./_components/character-zone";
import { QuestBoard } from "./_components/quest-board";
import { DailyChallengeBanner } from "./_components/daily-challenge-banner";
import { LobbyActionCards } from "./_components/lobby-action-cards";
import { ActivityTicker } from "./_components/activity-ticker";
import {
  mockUserProfile as user,
  mockEnrolledCourses,
  mockDailyChallenge,
  mockActivities,
} from "@/lib/data/dashboard";

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      {/* Zone 1: Character Zone */}
      <CharacterZone user={user} />

      {/* Zone 2: Quest Board */}
      <QuestBoard courses={mockEnrolledCourses} />

      {/* Zone 3: Daily Challenge Banner */}
      <DailyChallengeBanner challenge={mockDailyChallenge} />

      {/* Zone 4: Lobby Action Cards */}
      <LobbyActionCards user={user} />

      {/* Zone 5: Activity Ticker */}
      <ActivityTicker activities={mockActivities} />
    </div>
  );
}
