import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { HintTargetType, XpSource, Difficulty } from '@prisma/client';
import { LessonsRepository } from '../lessons.repository';
import { XpService } from '../../gamification/services';
import {
  QUIZ_XP_BY_DIFFICULTY,
  FIRST_ATTEMPT_MULTIPLIER,
  DEFAULT_QUIZ_XP,
} from '../constants';

@Injectable()
export class QuizService {
  private readonly logger = new Logger(QuizService.name);

  constructor(
    private readonly lessonsRepository: LessonsRepository,
    private readonly xpService: XpService,
  ) {}

  /**
   * Submit an answer to a quiz question with attempt tracking and variable XP
   */
  async submitQuizAnswer(
    lessonId: string,
    quizId: string,
    userId: string,
    answer: string,
    timeSpentSeconds?: number,
  ) {
    // Verify lesson exists
    const lesson = await this.lessonsRepository.findById(lessonId);
    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    // Verify quiz exists and belongs to lesson
    const quiz = await this.lessonsRepository.getQuizById(quizId);
    if (!quiz || quiz.lessonId !== lessonId) {
      throw new NotFoundException('Quiz not found in this lesson');
    }

    // Get current attempt count
    const attemptCount = await this.lessonsRepository.getQuizAttemptCount(
      userId,
      quizId,
    );
    const attemptNumber = attemptCount + 1;

    // Check if user already answered correctly
    const alreadyCorrect = await this.lessonsRepository.hasCorrectAnswer(
      userId,
      quizId,
    );

    // Check if answer is correct
    const isCorrect = quiz.correctAnswer === answer;

    // Calculate XP
    let xpAwarded = 0;
    let firstAttemptBonus = false;

    if (isCorrect && !alreadyCorrect) {
      // Determine difficulty (quiz difficulty or fall back to lesson difficulty)
      const difficulty = quiz.difficulty || lesson.difficulty;
      const baseXp = QUIZ_XP_BY_DIFFICULTY[difficulty] || DEFAULT_QUIZ_XP;

      // Apply first-attempt bonus
      if (attemptNumber === 1) {
        xpAwarded = Math.round(baseXp * FIRST_ATTEMPT_MULTIPLIER);
        firstAttemptBonus = true;
      } else {
        xpAwarded = baseXp;
      }

      // Award XP
      try {
        await this.xpService.awardXp(
          userId,
          xpAwarded,
          XpSource.QUIZ_COMPLETE,
          quizId,
          `Quiz correct: ${quiz.question.substring(0, 50)}`,
        );
      } catch (error) {
        this.logger.error(`Quiz XP award failed for user ${userId}: ${error}`);
        // Don't fail the submission if XP award fails
      }
    }

    // Record the answer
    await this.lessonsRepository.createQuizAnswer({
      userId,
      quizId,
      answer,
      isCorrect,
      attemptNumber,
      xpAwarded,
      timeSpentSeconds,
    });

    return {
      correct: isCorrect,
      explanation: quiz.explanation,
      xpAwarded,
      attemptNumber,
      alreadyCorrect,
      firstAttemptBonus,
    };
  }

  /**
   * Get quiz results for a lesson
   */
  async getQuizResults(lessonId: string, userId: string) {
    // Verify lesson exists
    const lesson = await this.lessonsRepository.findById(lessonId);
    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    const { quizzes, answersByQuiz } =
      await this.lessonsRepository.getQuizResultsForLesson(userId, lessonId);

    let correctCount = 0;
    let totalXpEarned = 0;

    const results = quizzes.map((quiz) => {
      const answers = answersByQuiz.get(quiz.id) || [];
      const hasCorrect = answers.some((a) => a.isCorrect);
      const latestAnswer = answers[0];
      const xpEarned = answers.reduce((sum, a) => sum + a.xpAwarded, 0);

      if (hasCorrect) correctCount++;
      totalXpEarned += xpEarned;

      return {
        quizId: quiz.id,
        question: quiz.question,
        isCorrect: hasCorrect,
        userAnswer: latestAnswer?.answer || '',
        correctAnswer: quiz.correctAnswer,
        xpAwarded: xpEarned,
        attempts: answers.length,
      };
    });

    const scorePercentage =
      quizzes.length > 0
        ? Math.round((correctCount / quizzes.length) * 100)
        : 0;

    return {
      lessonId,
      scorePercentage,
      correctCount,
      totalQuizzes: quizzes.length,
      totalXpEarned,
      results,
    };
  }

  /**
   * Get hints for a quiz with unlock status
   */
  async getQuizHints(lessonId: string, quizId: string, userId: string) {
    // Verify lesson exists
    const lesson = await this.lessonsRepository.findById(lessonId);
    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    // Verify quiz exists and belongs to lesson
    const quiz = await this.lessonsRepository.getQuizById(quizId);
    if (!quiz || quiz.lessonId !== lessonId) {
      throw new NotFoundException('Quiz not found in this lesson');
    }

    const hints = (quiz.hints as string[]) || [];

    // Get unlocked hints
    const unlocks = await this.lessonsRepository.getHintUnlocks(
      userId,
      HintTargetType.QUIZ,
      quizId,
    );
    const unlockedIndices = new Set(unlocks.map((u) => u.hintIndex));

    // First hint is always free
    unlockedIndices.add(0);

    const formattedHints = hints.map((hint, index) => ({
      index,
      content: unlockedIndices.has(index) ? hint : undefined,
      isUnlocked: unlockedIndices.has(index),
    }));

    return {
      lessonId,
      quizId,
      hints: formattedHints,
      totalHints: hints.length,
      unlockedCount: Math.min(unlockedIndices.size, hints.length),
    };
  }

  /**
   * Unlock a quiz hint
   */
  async unlockQuizHint(
    lessonId: string,
    quizId: string,
    userId: string,
    hintIndex: number,
  ) {
    // Verify lesson exists
    const lesson = await this.lessonsRepository.findById(lessonId);
    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    // Verify quiz exists and belongs to lesson
    const quiz = await this.lessonsRepository.getQuizById(quizId);
    if (!quiz || quiz.lessonId !== lessonId) {
      throw new NotFoundException('Quiz not found in this lesson');
    }

    const hints = (quiz.hints as string[]) || [];

    // Validate hint index
    if (hintIndex < 0 || hintIndex >= hints.length) {
      throw new BadRequestException('Invalid hint index');
    }

    // First hint is always free
    if (hintIndex === 0) {
      return {
        success: true,
        hint: {
          index: 0,
          content: hints[0],
          isUnlocked: true,
        },
        unlockedCount: 1,
        totalHints: hints.length,
      };
    }

    // Check if already unlocked
    const alreadyUnlocked = await this.lessonsRepository.hasHintUnlock(
      userId,
      HintTargetType.QUIZ,
      quizId,
      hintIndex,
    );

    if (alreadyUnlocked) {
      const unlockedCount = await this.lessonsRepository.getHintUnlockCount(
        userId,
        HintTargetType.QUIZ,
        quizId,
      );

      return {
        success: true,
        hint: {
          index: hintIndex,
          content: hints[hintIndex],
          isUnlocked: true,
        },
        unlockedCount: unlockedCount + 1, // +1 for free first hint
        totalHints: hints.length,
      };
    }

    // Create unlock record
    await this.lessonsRepository.createHintUnlock({
      userId,
      targetType: HintTargetType.QUIZ,
      targetId: quizId,
      hintIndex,
    });

    const unlockedCount = await this.lessonsRepository.getHintUnlockCount(
      userId,
      HintTargetType.QUIZ,
      quizId,
    );

    return {
      success: true,
      hint: {
        index: hintIndex,
        content: hints[hintIndex],
        isUnlocked: true,
      },
      unlockedCount: unlockedCount + 1, // +1 for free first hint
      totalHints: hints.length,
    };
  }
}
