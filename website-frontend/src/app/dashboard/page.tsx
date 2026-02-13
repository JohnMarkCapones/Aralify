"use client";

import { CharacterZone } from "./_components/character-zone";
import { QuestBoard } from "./_components/quest-board";
import { DailyChallengeBanner } from "./_components/daily-challenge-banner";
import { QuestsMissions } from "./_components/quests-missions";
import { LobbyActionCards } from "./_components/lobby-action-cards";
import { ActivityTicker } from "./_components/activity-ticker";
import {
  mockUserProfile as user,
  mockEnrolledCourses,
  mockDailyChallenge,
  mockQuests,
  mockActivities,
} from "@/lib/data/dashboard";

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      {/* Zone 1: Character Zone */}
      <CharacterZone user={user} />

      {/* Zone 2: Quest Board */}
      <QuestBoard courses={mockEnrolledCourses} user={user} />

      {/* Zone 3: Daily Challenge Banner */}
      <DailyChallengeBanner challenge={mockDailyChallenge} />

      {/* Zone 4: Quests & Missions */}
      <QuestsMissions quests={mockQuests} />

      {/* Zone 5: Lobby Action Cards */}
      <LobbyActionCards user={user} />

      {/* Zone 6: Activity Ticker */}
      <ActivityTicker activities={mockActivities} />
    </div>
  );
}
