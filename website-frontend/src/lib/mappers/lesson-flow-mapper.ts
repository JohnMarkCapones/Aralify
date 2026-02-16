import type { LessonDetail } from "@/lib/api";
import type { LessonFlowData, QuizQuestion } from "@/lib/data/lesson-flow";

/**
 * Maps the API LessonDetail response into the LessonFlowData shape
 * that the lesson flow components (intro, theory, quiz, code, complete) expect.
 */
export function mapLessonDetailToFlowData(lesson: LessonDetail): LessonFlowData {
  const content = lesson.content || { theoryCards: [], quizQuestions: [] };

  // Map quiz questions from API content format to component format
  const quizQuestions: QuizQuestion[] = (content.quizQuestions || []).map((q) => {
    switch (q.type) {
      case "multiple_choice":
        return {
          type: "multiple_choice" as const,
          id: q.id,
          question: q.question,
          options: q.options || [],
          correctIndex: q.correctIndex ?? 0,
          explanation: q.explanation,
          hint: q.hint,
        };
      case "true_false":
        return {
          type: "true_false" as const,
          id: q.id,
          question: q.question,
          correctAnswer: q.correctAnswer === true || q.correctAnswer === "true",
          explanation: q.explanation,
          hint: q.hint,
        };
      case "fill_blank":
        return {
          type: "fill_blank" as const,
          id: q.id,
          question: q.question,
          codeTemplate: q.codeTemplate || "",
          correctAnswer: String(q.correctAnswer || ""),
          explanation: q.explanation,
          hint: q.hint,
        };
      case "reorder":
        return {
          type: "reorder" as const,
          id: q.id,
          question: q.question,
          lines: q.lines || [],
          correctOrder: q.correctOrder || [],
          explanation: q.explanation,
          hint: q.hint,
        };
      default:
        // Fallback to multiple choice
        return {
          type: "multiple_choice" as const,
          id: q.id,
          question: q.question,
          options: q.options || [],
          correctIndex: q.correctIndex ?? 0,
          explanation: q.explanation,
          hint: q.hint,
        };
    }
  });

  // Map tiers
  const tiers = (lesson.tiers || []).map((t) => ({
    difficulty: t.difficulty as "easy" | "medium" | "hard",
    xpMultiplier: t.xpMultiplier,
    starterCode: t.starterCode,
    description: t.description,
  }));

  // Ensure at least default tiers exist
  if (tiers.length === 0) {
    tiers.push(
      { difficulty: "easy", xpMultiplier: 1, starterCode: "# Write your code here\n", description: "Easy mode" },
      { difficulty: "medium", xpMultiplier: 2, starterCode: "# Write your code here\n", description: "Medium mode" },
      { difficulty: "hard", xpMultiplier: 3, starterCode: "# Write your code here\n", description: "Hard mode" },
    );
  }

  // Map test cases
  const testCases = (lesson.testCases || []).map((tc) => ({
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    description: tc.description || "",
    passed: false,
  }));

  return {
    id: lesson.id,
    title: lesson.title,
    courseId: lesson.courseSlug,
    courseTitle: lesson.courseTitle,
    language: lesson.language,
    order: lesson.orderIndex,
    xpReward: lesson.xpReward,
    theoryCards: content.theoryCards || [],
    quizQuestions,
    tiers,
    testCases,
    hints: lesson.hints || [],
    prevLessonId: lesson.previousLesson?.id || null,
    nextLessonId: lesson.nextLesson?.id || null,
  };
}
