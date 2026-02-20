"use client";

import { CharacterZone } from "./_components/character-zone";
import { QuestBoard } from "./_components/quest-board";
import { DailyChallengeBanner } from "./_components/daily-challenge-banner";
import { QuestsMissions } from "./_components/quests-missions";
import { LobbyActionCards } from "./_components/lobby-action-cards";
import { ActivityTicker } from "./_components/activity-ticker";
import type {
  DashboardUserProfile,
  EnrolledCourse,
  ActivityItem,
} from "@/lib/data/dashboard";
import {
  useUserProfile,
  useUserStats,
  useUserCourses,
  useGamificationProfile,
  useActivityFeed,
  useStreak,
  useDailyChallenge,
} from "@/hooks/api";

// Map activity type from backend to frontend icon
function activityTypeToIcon(type: string): string {
  const map: Record<string, string> = {
    lesson_completed: "book-open",
    achievement_unlocked: "trophy",
    level_up: "arrow-up",
    badge_earned: "award",
    streak_milestone: "flame",
    course_started: "play",
    course_completed: "graduation-cap",
    challenge_completed: "code",
  };
  return map[type] || "activity";
}

// Map activity type from backend to frontend type
function activityTypeToFrontend(
  type: string
): ActivityItem["type"] {
  const map: Record<string, ActivityItem["type"]> = {
    lesson_completed: "lesson",
    achievement_unlocked: "achievement",
    badge_earned: "badge",
    streak_milestone: "streak",
    challenge_completed: "challenge",
    course_started: "lesson",
    course_completed: "achievement",
    level_up: "xp",
  };
  return map[type] || "lesson";
}

export default function DashboardHomePage() {
  const { data: userProfile } = useUserProfile();
  const { data: userStats } = useUserStats();
  const { data: gamification } = useGamificationProfile();
  const { data: userCourses } = useUserCourses();
  const { data: feedData } = useActivityFeed({ limit: 10 });
  const { data: dailyData } = useDailyChallenge();
  const { data: streakInfo } = useStreak();

  // Map API data to DashboardUserProfile
  const user: DashboardUserProfile = {
    id: userProfile?.id ?? "",
    username: userProfile?.username ?? "learner",
    displayName: userProfile?.displayName || userProfile?.username || "Learner",
    email: userProfile?.email ?? "",
    avatarUrl: userProfile?.avatarUrl ?? null,
    level: gamification?.xp?.level ?? userProfile?.level ?? 1,
    xp: gamification?.xp?.total ?? userProfile?.xpTotal ?? 0,
    xpToNextLevel: gamification?.xp?.progress?.nextLevelXp ?? 1000,
    streak: gamification?.streak?.current ?? userProfile?.streakCurrent ?? 0,
    longestStreak: gamification?.streak?.longest ?? 0,
    rank: 0,
    totalUsers: 0,
    dailyGoal: 30,
    dailyProgress: 0,
    coursesEnrolled: userStats?.coursesStarted ?? 0,
    coursesCompleted: userStats?.coursesCompleted ?? 0,
    lessonsCompleted: userStats?.lessonsCompleted ?? 0,
    challengesCompleted: 0,
    achievementsUnlocked: userStats?.achievementsEarned ?? 0,
    badgesEarned: userStats?.badgesEarned ?? 0,
    joinedAt: userProfile?.createdAt ?? new Date().toISOString(),
    equippedBadgeIds: [],
    followingCount: 0,
    followersCount: 0,
  };

  // Map API courses to EnrolledCourse[]
  const courses: EnrolledCourse[] = (userCourses ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    description: c.description,
    icon: c.iconUrl ?? "",
    color: c.color ?? "#3b82f6",
    progress: c.completionPercentage,
    totalLessons: 0,
    completedLessons: 0,
    currentLesson: "",
    xpEarned: c.totalXpEarned,
    lastStudied: c.lastActivityAt ?? c.startedAt,
    status: c.completedAt ? "completed" : ("in_progress" as const),
    difficulty: "beginner" as const,
  }));

  // Map API activity feed to ActivityItem[]
  const activities: ActivityItem[] = (feedData?.activities ?? []).map((a) => ({
    id: a.id,
    type: activityTypeToFrontend(a.type),
    title: (a.data?.title as string) || a.type.replace(/_/g, " "),
    description:
      (a.data?.description as string) ||
      `${a.displayName} ${a.type.replace(/_/g, " ")}`,
    xp: (a.data?.xp as number) || null,
    timestamp: a.createdAt,
    icon: activityTypeToIcon(a.type),
    relatedUrl: a.data?.url as string | undefined,
  }));

  // Map daily challenge from API
  const dailyChallenge = dailyData ? {
    id: dailyData.id,
    title: dailyData.title,
    description: dailyData.description,
    difficulty: dailyData.difficulty as "easy" | "medium" | "hard",
    language: dailyData.language,
    xpReward: dailyData.xpReward,
    multiplier: dailyData.multiplier,
    timeLimit: dailyData.timeLimit,
    completed: dailyData.completed,
    resetsAt: dailyData.resetsAt,
  } : null;

  return (
    <div className="space-y-8">
      {/* Zone 1: Character Zone */}
      <CharacterZone user={user} />

      {/* Zone 2: Quest Board */}
      <QuestBoard courses={courses} user={user} />

      {/* Zone 3: Daily Challenge Banner */}
      {dailyChallenge && <DailyChallengeBanner challenge={dailyChallenge} />}

      {/* Zone 4: Quests & Missions */}
      <QuestsMissions quests={[]} />

      {/* Zone 5: Lobby Action Cards */}
      <LobbyActionCards user={user} />

      {/* Zone 6: Activity Ticker */}
      <ActivityTicker activities={activities} />
    </div>
  );
}
