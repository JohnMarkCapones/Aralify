"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartCrack,
  RotateCcw,
  ChevronRight,
  XCircle,
  CheckCircle2,
  X,
  Volume2,
  VolumeX,
  Target,
  BookOpen,
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { sounds } from "@/lib/sounds";
import { QuizHud } from "./quiz-hud";
import { PowerupPanel } from "./powerup-panel";
import { PowerupActivationOverlay } from "./powerup-activation";
import { QuizAiChat } from "./quiz-ai-chat";
import { QuestionMultipleChoice } from "./question-multiple-choice";
import { QuestionTrueFalse } from "./question-true-false";
import { QuestionFillBlank } from "./question-fill-blank";
import { QuestionReorder } from "./question-reorder";
import type { QuizQuestion, PowerupType } from "@/lib/data/lesson-flow";
import {
  getDefaultPowerups,
  QUIZ_SCORING,
  TIMER_DURATIONS,
} from "@/lib/data/lesson-flow";

/** Countdown durations */
const COUNTDOWN_CORRECT = 10;
const COUNTDOWN_WRONG = 30;
const COUNTDOWN_AUTO_SKIP = 3;

interface QuizContainerProps {
  questions: QuizQuestion[];
  lessonTitle?: string;
  language?: string;
  onComplete: (score: number, stats: QuizStats) => void;
  onExit?: () => void;
  onReviewTheory?: () => void;
}

export interface QuizStats {
  heartsRemaining: number;
  maxHearts: number;
  maxCombo: number;
  totalXp: number;
  speedBonusXp: number;
  comboBonusXp: number;
  heartsBonusXp: number;
  perfectLesson: boolean;
}

interface QuestionResult {
  question: QuizQuestion;
  correct: boolean;
}

interface XpBreakdown {
  base: number;
  speed: number;
  combo: number;
}

export function QuizContainer({
  questions,
  lessonTitle = "Lesson",
  language = "python",
  onComplete,
  onExit,
  onReviewTheory,
}: QuizContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Active question list (may be filtered in Practice Mistakes mode)
  const [activeQuestions, setActiveQuestions] = useState(questions);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

  // Gamification state
  const [hearts, setHearts] = useState<number>(QUIZ_SCORING.MAX_HEARTS);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [speedBonusXp, setSpeedBonusXp] = useState(0);
  const [comboBonusXp, setComboBonusXp] = useState(0);
  const [powerups, setPowerups] = useState(getDefaultPowerups);
  const [gameOver, setGameOver] = useState(false);

  // Per-question powerup state
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [isTimerFrozen, setIsTimerFrozen] = useState(false);
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isDoubleXpActive, setIsDoubleXpActive] = useState(false);

  // Waiting-for-next state
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_CORRECT);
  const [countdownTotal, setCountdownTotal] = useState(COUNTDOWN_CORRECT);
  const [pendingGameOver, setPendingGameOver] = useState(false);

  // Track individual question results for failure review
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  // Track last answer for AI chat
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);

  // XP toast breakdown
  const [lastXpBreakdown, setLastXpBreakdown] = useState<XpBreakdown | null>(
    null
  );

  // Auto-skip toggle
  const [autoSkip, setAutoSkip] = useState(false);

  // Sound mute toggle
  const [muted, setMuted] = useState(false);

  // Exit confirmation dialog
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Powerup activation animation
  const [activatedPowerup, setActivatedPowerup] = useState<PowerupType | null>(null);

  // Portal target for header actions (X + sound buttons)
  const [headerActionsEl, setHeaderActionsEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setHeaderActionsEl(document.getElementById('learn-header-actions'));
  }, []);

  // Pending completion data (stored when last question is answered)
  const pendingComplete = useRef<{ score: number; stats: QuizStats } | null>(
    null
  );

  // Track when question started for speed bonus
  const questionStartTime = useRef(Date.now());

  const currentQuestion = activeQuestions[currentIndex];

  // Sync mute state with sound manager
  useEffect(() => {
    sounds.muted = muted;
  }, [muted]);

  const resetQuestionState = useCallback(() => {
    setIsShieldActive(false);
    setIsTimerFrozen(false);
    setEliminatedIndices([]);
    setShowHint(false);
    setTimedOut(false);
    setIsTimerActive(true);
    setIsDoubleXpActive(false);
    setWaitingForNext(false);
    setCountdown(COUNTDOWN_CORRECT);
    setLastXpBreakdown(null);
    questionStartTime.current = Date.now();
  }, []);

  // Countdown timer for "Next" button
  useEffect(() => {
    if (!waitingForNext) return;

    if (countdown <= 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingForNext, countdown]);

  // Keyboard shortcut: Enter/Space to advance when waiting
  useEffect(() => {
    if (!waitingForNext) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingForNext, pendingGameOver]);

  const handleNext = useCallback(() => {
    if (pendingGameOver) {
      sounds.gameOver();
      setGameOver(true);
      setWaitingForNext(false);
      return;
    }

    if (pendingComplete.current) {
      const { score: finalScore, stats } = pendingComplete.current;
      pendingComplete.current = null;
      setWaitingForNext(false);
      onComplete(finalScore, stats);
      return;
    }

    // Advance to next question
    setCurrentIndex((prev) => prev + 1);
    resetQuestionState();
  }, [pendingGameOver, onComplete, resetQuestionState]);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      setIsTimerActive(false);
      setLastAnswerCorrect(correct);

      // Record result
      setQuestionResults((prev) => [
        ...prev,
        { question: currentQuestion, correct },
      ]);

      // Calculate speed bonus
      const elapsed = (Date.now() - questionStartTime.current) / 1000;
      const maxTime = TIMER_DURATIONS[currentQuestion.type];
      const timeRatio = Math.max(0, 1 - elapsed / maxTime);
      const questionSpeedBonus = correct
        ? Math.round(timeRatio * QUIZ_SCORING.MAX_SPEED_BONUS)
        : 0;

      // Calculate combo bonus
      const newCombo = correct ? combo + 1 : 0;
      const questionComboBonus = correct
        ? newCombo * QUIZ_SCORING.COMBO_BONUS_PER_STREAK
        : 0;

      // Calculate total XP for this question (with double XP powerup)
      const xpMultiplier = isDoubleXpActive ? 2 : 1;
      const baseXp = correct ? QUIZ_SCORING.BASE_XP_PER_QUESTION * xpMultiplier : 0;
      const questionXp = baseXp + questionSpeedBonus + questionComboBonus;

      // Set XP toast
      if (correct) {
        setLastXpBreakdown({
          base: baseXp,
          speed: questionSpeedBonus,
          combo: questionComboBonus,
        });
      } else {
        setLastXpBreakdown(null);
      }

      // Play sound
      if (correct) {
        if (newCombo >= 3) {
          sounds.combo();
        } else {
          sounds.correct();
        }
      } else {
        sounds.wrong();
      }

      // Update state
      const newScore = correct ? score + 1 : score;
      if (correct) setScore(newScore);
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setTotalXp((prev) => prev + questionXp);
      setSpeedBonusXp((prev) => prev + questionSpeedBonus);
      setComboBonusXp((prev) => prev + questionComboBonus);

      // Heart logic
      let lostHeart = false;
      if (!correct) {
        if (isShieldActive) {
          setIsShieldActive(false);
        } else {
          const newHearts = hearts - 1;
          setHearts(newHearts);
          lostHeart = true;
          sounds.heartLoss();

          if (newHearts <= 0) {
            const dur = autoSkip ? COUNTDOWN_AUTO_SKIP : COUNTDOWN_WRONG;
            setPendingGameOver(true);
            setWaitingForNext(true);
            setCountdown(dur);
            setCountdownTotal(dur);
            return;
          }
        }
      }

      // Check if last question
      const isLast = currentIndex === activeQuestions.length - 1;
      if (isLast) {
        const finalScore = newScore;
        const heartsRemaining =
          correct || isShieldActive
            ? hearts
            : Math.max(hearts - (lostHeart ? 0 : 1), 0);
        const heartsBonusXpFinal =
          (correct || isShieldActive
            ? hearts
            : Math.max(hearts - 1, 0)) *
          QUIZ_SCORING.HEARTS_BONUS_PER_HEART;
        const finalMaxCombo = newCombo > maxCombo ? newCombo : maxCombo;
        const isPerfect =
          finalScore === activeQuestions.length &&
          heartsRemaining === QUIZ_SCORING.MAX_HEARTS;
        const perfectBonus = isPerfect
          ? QUIZ_SCORING.PERFECT_LESSON_BONUS
          : 0;

        pendingComplete.current = {
          score: finalScore,
          stats: {
            heartsRemaining:
              correct || isShieldActive
                ? hearts
                : Math.max(hearts - 1, 0),
            maxHearts: QUIZ_SCORING.MAX_HEARTS,
            maxCombo: finalMaxCombo,
            totalXp:
              totalXp + questionXp + heartsBonusXpFinal + perfectBonus,
            speedBonusXp: speedBonusXp + questionSpeedBonus,
            comboBonusXp: comboBonusXp + questionComboBonus,
            heartsBonusXp: heartsBonusXpFinal,
            perfectLesson: isPerfect,
          },
        };
      }

      // Adaptive countdown: shorter for correct, longer for wrong
      const countdownDuration = autoSkip
        ? COUNTDOWN_AUTO_SKIP
        : correct
        ? COUNTDOWN_CORRECT
        : COUNTDOWN_WRONG;

      setWaitingForNext(true);
      setCountdown(countdownDuration);
      setCountdownTotal(countdownDuration);
    },
    [
      currentIndex,
      activeQuestions,
      score,
      hearts,
      combo,
      maxCombo,
      totalXp,
      speedBonusXp,
      comboBonusXp,
      isShieldActive,
      isDoubleXpActive,
      currentQuestion,
      onComplete,
      resetQuestionState,
      autoSkip,
    ]
  );

  const handleTimeUp = useCallback(() => {
    if (!timedOut) {
      setTimedOut(true);
      setIsTimerActive(false);
    }
  }, [timedOut]);

  const handleUsePowerup = useCallback(
    (type: PowerupType) => {
      setPowerups((prev) =>
        prev.map((p) =>
          p.type === type && p.uses > 0 ? { ...p, uses: p.uses - 1 } : p
        )
      );

      // Trigger activation animation
      setActivatedPowerup(type);

      switch (type) {
        case "eliminate": {
          if (currentQuestion.type === "multiple_choice") {
            const wrongIndices = currentQuestion.options
              .map((_, i) => i)
              .filter((i) => i !== currentQuestion.correctIndex);
            const shuffled = wrongIndices.sort(() => Math.random() - 0.5);
            setEliminatedIndices(shuffled.slice(0, 2));
          }
          break;
        }
        case "freeze":
          setIsTimerFrozen(true);
          break;
        case "shield":
          setIsShieldActive(true);
          break;
        case "hint":
          setShowHint(true);
          break;
        case "double_xp":
          setIsDoubleXpActive(true);
          break;
        case "extra_time":
          // Add 15 seconds — handled by triggering a timer extension
          // We signal this by temporarily unfreezing and the timer component handles extension
          setIsTimerFrozen(false);
          break;
        case "skip":
          // Skip without losing a heart — record as correct-ish (no XP, no heart loss)
          setIsTimerActive(false);
          setLastAnswerCorrect(null);
          setQuestionResults((prev) => [
            ...prev,
            { question: currentQuestion, correct: true },
          ]);
          // Don't add XP, just advance
          const isLast = currentIndex === activeQuestions.length - 1;
          if (isLast && pendingComplete.current === null) {
            const heartsRemaining = hearts;
            const heartsBonusXpFinal = hearts * QUIZ_SCORING.HEARTS_BONUS_PER_HEART;
            const finalMaxCombo = combo > maxCombo ? combo : maxCombo;
            const isPerfect = false; // skipping means not perfect

            pendingComplete.current = {
              score,
              stats: {
                heartsRemaining,
                maxHearts: QUIZ_SCORING.MAX_HEARTS,
                maxCombo: finalMaxCombo,
                totalXp: totalXp + heartsBonusXpFinal,
                speedBonusXp,
                comboBonusXp,
                heartsBonusXp: heartsBonusXpFinal,
                perfectLesson: isPerfect,
              },
            };
          }
          setWaitingForNext(true);
          setCountdown(autoSkip ? COUNTDOWN_AUTO_SKIP : COUNTDOWN_CORRECT);
          setCountdownTotal(autoSkip ? COUNTDOWN_AUTO_SKIP : COUNTDOWN_CORRECT);
          break;
      }
    },
    [currentQuestion, currentIndex, activeQuestions, hearts, combo, maxCombo, score, totalXp, speedBonusXp, comboBonusXp, autoSkip]
  );

  const resetQuiz = useCallback(
    (questionList: QuizQuestion[]) => {
      setActiveQuestions(questionList);
      setCurrentIndex(0);
      setScore(0);
      setHearts(QUIZ_SCORING.MAX_HEARTS);
      setCombo(0);
      setMaxCombo(0);
      setTotalXp(0);
      setSpeedBonusXp(0);
      setComboBonusXp(0);
      setPowerups(getDefaultPowerups());
      setGameOver(false);
      setPendingGameOver(false);
      setQuestionResults([]);
      setLastXpBreakdown(null);
      setLastAnswerCorrect(null);
      pendingComplete.current = null;
      resetQuestionState();
    },
    [resetQuestionState]
  );

  const handleRestart = useCallback(() => {
    setIsPracticeMode(false);
    resetQuiz(questions);
  }, [questions, resetQuiz]);

  const handlePracticeMistakes = useCallback(() => {
    const wrongQuestions = questionResults
      .filter((r) => !r.correct)
      .map((r) => r.question);
    if (wrongQuestions.length === 0) return;
    setIsPracticeMode(true);
    resetQuiz(wrongQuestions);
  }, [questionResults, resetQuiz]);

  // ─── Game Over Screen ──────────────────────────────────────────────────────
  if (gameOver) {
    const wrongResults = questionResults.filter((r) => !r.correct);

    return (
      <div className="flex-1 flex flex-col items-center gap-6 py-8 overflow-y-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <HeartCrack size={64} className="text-red-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h2 className="text-2xl font-display font-bold">Out of Hearts!</h2>
          <p className="text-sm text-muted-foreground">
            You got {score}/{activeQuestions.length} correct. Review your
            mistakes below, then try again!
          </p>
        </motion.div>

        {/* Wrong answers review */}
        {wrongResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-lg space-y-3 px-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground text-center">
              Questions to review ({wrongResults.length})
            </h3>
            {wrongResults.map((result) => (
              <div
                key={result.question.id}
                className="rounded-xl border-2 border-red-500/30 bg-red-50/30 dark:bg-red-950/10 p-4 space-y-2"
              >
                <div className="flex items-start gap-2">
                  <XCircle
                    size={16}
                    className="text-red-500 shrink-0 mt-0.5"
                  />
                  <p className="text-sm font-semibold">
                    {result.question.question}
                  </p>
                </div>
                <div className="flex items-start gap-2 pl-6">
                  <CheckCircle2
                    size={14}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    {getCorrectAnswerText(result.question)}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground pl-6">
                  {result.question.explanation}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          {wrongResults.length > 0 && (
            <NeoButton
              variant="accent"
              size="md"
              onClick={handlePracticeMistakes}
            >
              <Target size={16} className="mr-2" />
              Practice Mistakes ({wrongResults.length})
            </NeoButton>
          )}

          <NeoButton variant="primary" size="md" onClick={handleRestart}>
            <RotateCcw size={16} className="mr-2" />
            Retry All
          </NeoButton>

          {onReviewTheory && (
            <NeoButton
              variant="muted"
              size="md"
              onClick={onReviewTheory}
            >
              <BookOpen size={16} className="mr-2" />
              Review Theory
            </NeoButton>
          )}
        </motion.div>
      </div>
    );
  }

  // ─── Quiz UI — Two-column layout ─────────────────────────────────────────

  const renderQuestion = (q: QuizQuestion) => {
    const commonProps = { showHint, timedOut, combo };
    switch (q.type) {
      case "multiple_choice":
        return (
          <QuestionMultipleChoice
            key={q.id}
            question={q}
            onAnswer={handleAnswer}
            eliminatedIndices={eliminatedIndices}
            {...commonProps}
          />
        );
      case "true_false":
        return (
          <QuestionTrueFalse
            key={q.id}
            question={q}
            onAnswer={handleAnswer}
            {...commonProps}
          />
        );
      case "fill_blank":
        return (
          <QuestionFillBlank
            key={q.id}
            question={q}
            onAnswer={handleAnswer}
            {...commonProps}
          />
        );
      case "reorder":
        return (
          <QuestionReorder
            key={q.id}
            question={q}
            onAnswer={handleAnswer}
            {...commonProps}
          />
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4">

      {/* Practice mode badge */}
      {isPracticeMode && (
        <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs font-bold uppercase tracking-wider text-accent-foreground self-center">
          Practice Mode — {activeQuestions.length} questions
        </div>
      )}

      {/* 3-column layout: AI Chat | Question | Powerups */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[220px_1fr_180px] gap-4 lg:gap-6 mx-auto w-full">
        {/* LEFT — AI Chat (desktop) */}
        <div className="hidden lg:flex min-h-0 max-h-[calc(100vh-200px)] overflow-hidden">
          <QuizAiChat
            language={language}
            lessonTitle={lessonTitle}
            questionIndex={currentIndex}
            totalQuestions={activeQuestions.length}
            combo={combo}
            lastAnswerCorrect={lastAnswerCorrect}
            hearts={hearts}
          />
        </div>

        {/* CENTER — HUD + Question + Countdown */}
        <div className="flex flex-col gap-3 min-w-0">
          {/* HUD */}
          <QuizHud
            hearts={hearts}
            maxHearts={QUIZ_SCORING.MAX_HEARTS}
            combo={combo}
            questionIndex={currentIndex}
            totalQuestions={activeQuestions.length}
            currentQuestionType={currentQuestion.type}
            onTimeUp={handleTimeUp}
            isTimerPaused={isTimerFrozen}
            isTimerActive={isTimerActive}
            totalXp={totalXp}
          />

          {/* Question area */}
          <div className="flex-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {renderQuestion(currentQuestion)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* XP Toast */}
          <AnimatePresence>
            {waitingForNext && lastXpBreakdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 text-sm font-bold"
              >
                <span className="text-primary">
                  +{lastXpBreakdown.base} XP
                  {isDoubleXpActive && (
                    <span className="text-[10px] ml-1 text-yellow-500">(2x!)</span>
                  )}
                </span>
                {lastXpBreakdown.speed > 0 && (
                  <span className="text-amber-500 text-xs">
                    +{lastXpBreakdown.speed} Speed
                  </span>
                )}
                {lastXpBreakdown.combo > 0 && (
                  <span className="text-orange-500 text-xs">
                    +{lastXpBreakdown.combo} Combo
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Countdown bar + Next button */}
          <AnimatePresence>
            {waitingForNext && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full space-y-3 pb-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {pendingGameOver
                        ? "Results in"
                        : pendingComplete.current
                        ? "Finishing in"
                        : "Next question in"}
                    </span>
                    <span className="font-mono font-bold">{countdown}s</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted/50 border border-border/20 overflow-hidden">
                    <motion.div
                      key={`bar-${currentIndex}-${countdownTotal}`}
                      className="h-full rounded-full bg-primary/60"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{
                        duration: countdownTotal,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoSkip}
                      onChange={(e) => {
                        setAutoSkip(e.target.checked);
                        if (e.target.checked) {
                          setCountdown(COUNTDOWN_AUTO_SKIP);
                          setCountdownTotal(COUNTDOWN_AUTO_SKIP);
                        }
                      }}
                      className="rounded border-border accent-primary"
                    />
                    Don&apos;t wait
                  </label>

                  <NeoButton variant="primary" size="sm" onClick={handleNext}>
                    {pendingGameOver
                      ? "See Results"
                      : pendingComplete.current
                      ? "Finish Quiz"
                      : "Next"}
                    <ChevronRight size={16} className="ml-1" />
                  </NeoButton>
                </div>

                <p className="text-[10px] text-muted-foreground/50 text-center">
                  Press Enter or Space to continue
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — Powerups (desktop) */}
        <div className="hidden lg:flex lg:items-center">
          <PowerupPanel
            powerups={powerups}
            onUsePowerup={handleUsePowerup}
            disabled={!isTimerActive || waitingForNext}
          />
        </div>
      </div>

      {/* Mobile: AI Chat + Powerups stacked below */}
      <div className="lg:hidden space-y-3">
        <PowerupPanel
          powerups={powerups}
          onUsePowerup={handleUsePowerup}
          disabled={!isTimerActive || waitingForNext}
        />
        <div className="h-[150px]">
          <QuizAiChat
            language={language}
            lessonTitle={lessonTitle}
            questionIndex={currentIndex}
            totalQuestions={activeQuestions.length}
            combo={combo}
            lastAnswerCorrect={lastAnswerCorrect}
            hearts={hearts}
          />
        </div>
      </div>

      {/* Powerup activation animation overlay */}
      <PowerupActivationOverlay
        activePowerup={activatedPowerup}
        onComplete={() => setActivatedPowerup(null)}
      />

      {/* Header portal: Sound + Exit controls */}
      {headerActionsEl && createPortal(
        <>
          <button
            onClick={() => setMuted((prev) => !prev)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title={muted ? "Unmute sounds" : "Mute sounds"}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          {onExit && (
            <button
              onClick={() => setShowExitConfirm(true)}
              className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              title="Leave quiz"
            >
              <X size={18} />
            </button>
          )}
        </>,
        headerActionsEl
      )}

      {/* Exit confirmation dialog */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card p-6 rounded-xl border-2 border-border space-y-4 max-w-sm mx-4 neo-brutal-shadow"
            >
              <h3 className="font-display font-bold text-lg">Leave Quiz?</h3>
              <p className="text-sm text-muted-foreground">
                Your progress will be lost. You&apos;ll need to restart the quiz
                from the beginning.
              </p>
              <div className="flex gap-3 justify-end">
                <NeoButton
                  variant="muted"
                  size="sm"
                  onClick={() => setShowExitConfirm(false)}
                >
                  Stay
                </NeoButton>
                <NeoButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setShowExitConfirm(false);
                    onExit?.();
                  }}
                >
                  Leave
                </NeoButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Helper: extract the correct answer as readable text for the review screen */
function getCorrectAnswerText(q: QuizQuestion): string {
  switch (q.type) {
    case "multiple_choice":
      return q.options[q.correctIndex];
    case "true_false":
      return q.correctAnswer ? "True" : "False";
    case "fill_blank":
      return q.correctAnswer;
    case "reorder":
      return q.correctOrder.map((idx) => q.lines[idx]).join(" → ");
  }
}
