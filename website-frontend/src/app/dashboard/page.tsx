"use client";

import { CharacterZone } from "./_components/character-zone";
import { QuestBoard } from "./_components/quest-board";
import { DailyChallengeBanner } from "./_components/daily-challenge-banner";
import { QuestsMissions } from "./_components/quests-missions";
import { LobbyActionCards } from "./_components/lobby-action-cards";
import { ActivityTicker } from "./_components/activity-ticker";
import {
  mockUserProfile,
  mockEnrolledCourses,
  mockDailyChallenge,
  mockQuests,
  mockActivities,
} from "@/lib/data/dashboard";
import type { DashboardUserProfile, EnrolledCourse } from "@/lib/data/dashboard";
import {
  useUserProfile,
  useUserStats,
  useUserCourses,
  useGamificationProfile,
} from "@/hooks/api";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted/60 rounded-2xl neo-brutal-border ${className}`}
    />
  );
}

export default function DashboardHomePage() {
  const { data: userProfile, isLoading: loadingProfile } = useUserProfile();
  const { data: userStats, isLoading: loadingStats } = useUserStats();
  const { data: gamification, isLoading: loadingGamification } =
    useGamificationProfile();
  const { data: userCourses, isLoading: loadingCourses } = useUserCourses();

  const isLoading =
    loadingProfile || loadingStats || loadingGamification || loadingCourses;

  // Map API data to DashboardUserProfile or fall back to mock
  const user: DashboardUserProfile = userProfile
    ? {
        id: userProfile.id,
        username: userProfile.username,
        displayName: userProfile.displayName || userProfile.username,
        email: userProfile.email,
        avatarUrl: userProfile.avatarUrl,
        level: gamification?.level ?? userProfile.level,
        xp: gamification?.xpTotal ?? userProfile.xpTotal,
        xpToNextLevel: gamification?.xpToNextLevel ?? 1000,
        streak: gamification?.streak ?? userProfile.streakCurrent,
        longestStreak: gamification?.longestStreak ?? 0,
        rank: userStats?.rank ?? gamification?.rank ?? 0,
        totalUsers: userStats?.totalUsers ?? 0,
        dailyGoal: 30,
        dailyProgress: 0,
        coursesEnrolled: userStats?.coursesEnrolled ?? 0,
        coursesCompleted: userStats?.coursesCompleted ?? 0,
        lessonsCompleted: userStats?.lessonsCompleted ?? 0,
        challengesCompleted: userStats?.challengesCompleted ?? 0,
        achievementsUnlocked: userStats?.achievementsUnlocked ?? 0,
        badgesEarned: userStats?.badgesEarned ?? 0,
        joinedAt: userProfile.joinedAt,
        equippedBadgeIds: [],
        followingCount: 0,
        followersCount: 0,
      }
    : mockUserProfile;

  // Map API courses to EnrolledCourse[] or fall back to mock
  const courses: EnrolledCourse[] =
    userCourses?.map((c) => ({
      id: c.courseId,
      title: c.title,
      slug: c.slug,
      description: c.description,
      icon: c.icon,
      color: c.color,
      progress: c.progress,
      totalLessons: c.totalLessons,
      completedLessons: c.completedLessons,
      currentLesson: c.currentLesson,
      xpEarned: c.xpEarned,
      lastStudied: c.lastStudied,
      status: c.status,
      difficulty: c.difficulty as "beginner" | "intermediate" | "advanced",
    })) ?? mockEnrolledCourses;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
        <Skeleton className="h-32" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Zone 1: Character Zone */}
      <CharacterZone user={user} />

      {/* Zone 2: Quest Board */}
      <QuestBoard courses={courses} user={user} />

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
