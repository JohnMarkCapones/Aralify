"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, CheckCircle, XCircle } from "lucide-react";

const QUESTIONS = [
  {
    question: "What comes next in the pattern: 2, 6, 12, 20, ?",
    options: ["28", "30", "24", "32"],
    correct: 1, // 30
  },
  {
    question: "If all Bloops are Razzles, and some Razzles are Lazzles, then:",
    options: [
      "All Bloops are Lazzles",
      "Some Bloops might be Lazzles",
      "No Bloops are Lazzles",
      "All Lazzles are Bloops",
    ],
    correct: 1,
  },
  {
    question: "A function takes input 3 and outputs 7, takes 5 and outputs 11. What does it output for 8?",
    options: ["15", "17", "16", "19"],
    correct: 1, // 2x + 1
  },
];

interface Props {
  score: number;
  setScore: (v: number) => void;
}

export function AnalyticalStep({ score, setScore }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(QUESTIONS.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIndex: number, optIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIndex;
    setAnswers(newAnswers);

    // Auto-submit when all answered
    const allAnswered = newAnswers.every((a) => a !== null);
    if (allAnswered) {
      setSubmitted(true);
      const correctCount = newAnswers.filter(
        (a, i) => a === QUESTIONS[i].correct
      ).length;
      const calculatedScore = Math.round((correctCount / QUESTIONS.length) * 100);
      setScore(calculatedScore);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-2xl neo-brutal-border mb-4">
          <Brain size={28} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-2">
          QUICK BRAIN TEASER
        </h2>
        <p className="text-muted-foreground font-medium">
          {submitted
            ? `You scored ${score}%! This helps us match you to the right path.`
            : "3 quick puzzles — don't overthink it!"}
        </p>
      </motion.div>

      <div className="space-y-6">
        {QUESTIONS.map((q, qi) => (
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + qi * 0.1 }}
            className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-5"
          >
            <p className="font-bold text-sm mb-3">
              <span className="text-primary mr-2">Q{qi + 1}.</span>
              {q.question}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((opt, oi) => {
                const isSelected = answers[qi] === oi;
                const isCorrect = submitted && oi === q.correct;
                const isWrong = submitted && isSelected && oi !== q.correct;

                return (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(qi, oi)}
                    disabled={submitted}
                    className={`
                      relative p-3 rounded-xl text-sm font-bold text-left transition-all border-2
                      ${isCorrect
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                        : isWrong
                          ? "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400"
                          : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                      }
                    `}
                  >
                    {opt}
                    {isCorrect && (
                      <CheckCircle size={14} className="absolute top-2 right-2 text-emerald-500" />
                    )}
                    {isWrong && (
                      <XCircle size={14} className="absolute top-2 right-2 text-red-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
