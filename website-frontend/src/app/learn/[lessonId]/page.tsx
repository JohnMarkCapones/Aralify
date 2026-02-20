"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { LessonProgressBar } from "../_components/lesson-progress-bar";
import { LessonIntro } from "../_components/step-intro/lesson-intro";
import { TheoryCarousel } from "../_components/step-learn/theory-carousel";
import { QuizBriefing } from "../_components/step-quiz-brief/quiz-briefing";
import { QuizContainer, type QuizStats } from "../_components/step-quiz/quiz-container";
import { CodeStep } from "../_components/step-code/code-step";
import { CompletionScreen } from "../_components/step-complete/completion-screen";
import {
  mockLessonFlowData,
  type LessonFlowData,
  type LessonStep,
  type LessonCompletionStats,
} from "@/lib/data/lesson-flow";
import { lessonsApi } from "@/lib/api";
import { mapLessonDetailToFlowData } from "@/lib/mappers/lesson-flow-mapper";

function LessonPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  const courseId = searchParams.get("courseId") || "";

  const [lesson, setLesson] = useState<LessonFlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<LessonStep>("intro");
  const [quizScore, setQuizScore] = useState(0);
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [codeTestsPassed, setCodeTestsPassed] = useState(0);

  // Fetch lesson from API, fall back to mock data
  useEffect(() => {
    let cancelled = false;

    async function fetchLesson() {
      setLoading(true);
      try {
        const data = await lessonsApi.findById(lessonId);
        if (!cancelled) {
          setLesson(mapLessonDetailToFlowData(data));
        }
      } catch {
        // Fallback to mock data for development
        if (!cancelled) {
          const mockLesson = mockLessonFlowData[lessonId];
          setLesson(mockLesson || null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLesson();
    return () => { cancelled = true; };
  }, [lessonId]);

  const handleIntroComplete = useCallback(() => {
    setCurrentStep("learn");
  }, []);

  const handleLearnComplete = useCallback(() => {
    setCurrentStep("quiz-brief");
  }, []);

  const handleQuizBriefComplete = useCallback(() => {
    setCurrentStep("quiz");
  }, []);

  const handleQuizComplete = useCallback((score: number, stats: QuizStats) => {
    setQuizScore(score);
    setQuizStats(stats);
    setCurrentStep("code");
  }, []);

  const handleCodeComplete = useCallback(
    (testsPassed: number, selectedDifficulty: "easy" | "medium" | "hard") => {
      setCodeTestsPassed(testsPassed);
      setDifficulty(selectedDifficulty);
      setCurrentStep("complete");
    },
    []
  );

  // Exit quiz -> go back to courses page
  const handleQuizExit = useCallback(() => {
    router.push(`/dashboard/courses`);
  }, [router]);

  // Review theory from game-over -> go back to learn step
  const handleReviewTheory = useCallback(() => {
    setCurrentStep("learn");
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-lg font-display font-bold">Lesson not found</p>
          <p className="text-sm text-muted-foreground">
            The lesson &quot;{lessonId}&quot; doesn&apos;t exist yet.
          </p>
        </div>
      </div>
    );
  }

  const tier = lesson.tiers.find((t) => t.difficulty === difficulty) || lesson.tiers[0];
  const completionStats: LessonCompletionStats = {
    xpEarned: quizStats ? quizStats.totalXp * tier.xpMultiplier : lesson.xpReward * tier.xpMultiplier,
    quizScore,
    quizTotal: lesson.quizQuestions.length,
    testsPassed: codeTestsPassed,
    testsTotal: lesson.testCases.length,
    streak: 3,
    difficulty,
    xpMultiplier: tier.xpMultiplier,
    heartsRemaining: quizStats?.heartsRemaining ?? 5,
    maxHearts: quizStats?.maxHearts ?? 5,
    maxCombo: quizStats?.maxCombo ?? 0,
    speedBonusXp: quizStats?.speedBonusXp ?? 0,
    comboBonusXp: quizStats?.comboBonusXp ?? 0,
    heartsBonusXp: quizStats?.heartsBonusXp ?? 0,
    perfectLesson: quizStats?.perfectLesson ?? false,
  };

  return (
    <div className="flex-1 flex flex-col">
      <LessonProgressBar currentStep={currentStep} />

      <div className={`flex-1 flex flex-col mx-auto w-full px-4 pb-8 ${
        currentStep === "quiz" || currentStep === "learn"
          ? "max-w-5xl"
          : "max-w-4xl"
      }`}>
        {currentStep === "intro" && (
          <LessonIntro lesson={lesson} onStart={handleIntroComplete} />
        )}

        {currentStep === "learn" && (
          <TheoryCarousel
            cards={lesson.theoryCards}
            onComplete={handleLearnComplete}
            language={lesson.language}
            lessonTitle={lesson.title}
          />
        )}

        {currentStep === "quiz-brief" && (
          <QuizBriefing
            questionCount={lesson.quizQuestions.length}
            onBegin={handleQuizBriefComplete}
          />
        )}

        {currentStep === "quiz" && (
          <QuizContainer
            questions={lesson.quizQuestions}
            lessonTitle={lesson.title}
            language={lesson.language}
            onComplete={handleQuizComplete}
            onExit={handleQuizExit}
            onReviewTheory={handleReviewTheory}
          />
        )}

        {currentStep === "code" && (
          <CodeStep
            lesson={lesson}
            onComplete={handleCodeComplete}
          />
        )}

        {currentStep === "complete" && (
          <CompletionScreen
            stats={completionStats}
            lessonTitle={lesson.title}
            courseId={courseId || lesson.courseId}
            nextLessonId={lesson.nextLessonId}
            lessonOrder={lesson.order}
          />
        )}
      </div>
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading lesson...</div>
        </div>
      }
    >
      <LessonPageContent />
    </Suspense>
  );
}
