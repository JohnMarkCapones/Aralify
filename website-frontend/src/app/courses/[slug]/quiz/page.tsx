"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NeoButton } from "@/components/ui/neo-button";
import { Zap, Clock, X, ArrowRight, CheckCircle, XCircle, Code2, Trophy } from "lucide-react";
import Link from "next/link";

const quizQuestions = [
  {
    question: "What is the correct way to declare a variable in Python?",
    type: "choice" as const,
    options: ["var x = 10", "let x = 10", "x = 10", "int x = 10"],
    correct: 2,
  },
  {
    question: "Which of the following is a valid Python list?",
    type: "choice" as const,
    options: ["{1, 2, 3}", "(1, 2, 3)", "[1, 2, 3]", "<1, 2, 3>"],
    correct: 2,
  },
  {
    question: "What will the following code output?",
    type: "code" as const,
    code: `for i in range(3):\n    print(i, end=" ")`,
    options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2 3 4"],
    correct: 1,
  },
  {
    question: "Which keyword is used to define a function in Python?",
    type: "choice" as const,
    options: ["function", "func", "def", "define"],
    correct: 2,
  },
  {
    question: "What does this code return?",
    type: "code" as const,
    code: `def greet(name="World"):\n    return f"Hello, {name}!"\n\nprint(greet())`,
    options: ['Hello, name!', 'Hello, World!', 'Hello, !', 'Error'],
    correct: 1,
  },
];

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft] = useState(300); // 5 minutes

  const current = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

  const handleSelect = (optionIndex: number) => {
    setSelected(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(answers[currentIndex + 1]);
    } else {
      setShowResults(true);
    }
  };

  const score = answers.reduce<number>((acc, answer, i) => {
    return acc + (answer === quizQuestions[i].correct ? 1 : 0);
  }, 0);

  const xpEarned = score * 50;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background font-body text-foreground flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="mx-auto w-24 h-24 bg-primary text-white rounded-2xl neo-brutal-border neo-brutal-shadow flex items-center justify-center"
          >
            <Trophy size={48} />
          </motion.div>

          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">QUIZ COMPLETE!</h1>
            <p className="text-muted-foreground font-medium">Here&apos;s how you did.</p>
          </div>

          <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-8 space-y-6">
            <div className="text-6xl font-black text-primary">{score}/{quizQuestions.length}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 rounded-xl neo-brutal-border">
                <div className="text-2xl font-black text-green-600">{score}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase">Correct</div>
              </div>
              <div className="p-4 bg-destructive/10 rounded-xl neo-brutal-border">
                <div className="text-2xl font-black text-destructive">{quizQuestions.length - score}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase">Wrong</div>
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl neo-brutal-border">
              <div className="flex items-center justify-center gap-2">
                <Zap size={24} className="text-primary" />
                <span className="text-3xl font-black text-primary">+{xpEarned} XP</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href={`/courses/${slug}`}>
              <NeoButton variant="primary" size="lg" className="w-full text-lg">
                BACK TO COURSE <ArrowRight size={18} className="ml-2" />
              </NeoButton>
            </Link>
            <NeoButton
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => {
                setShowResults(false);
                setCurrentIndex(0);
                setSelected(null);
                setAnswers(Array(quizQuestions.length).fill(null));
              }}
            >
              RETRY QUIZ
            </NeoButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      {/* Top bar */}
      <div className="border-b-3 border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/courses/${slug}`)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
            <span className="font-black text-sm uppercase tracking-wider">
              Question {currentIndex + 1} of {quizQuestions.length}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <Clock size={16} />
            <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-muted">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-snug">
                {current.question}
              </h2>

              {current.type === 'code' && current.code && (
                <div className="mt-4 bg-[#0d1117] neo-brutal-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="ml-2 text-[10px] font-mono text-white/40">
                      <Code2 size={10} className="inline mr-1" /> snippet.py
                    </span>
                  </div>
                  <pre className="font-mono text-sm text-white/80 whitespace-pre-wrap">{current.code}</pre>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {current.options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-5 neo-brutal-border rounded-xl font-bold text-base transition-all cursor-pointer ${
                    selected === i
                      ? 'bg-primary text-white neo-brutal-shadow-sm'
                      : 'bg-card hover:bg-primary/5'
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg neo-brutal-border mr-3 text-sm font-black shrink-0 bg-background text-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            <NeoButton
              variant="primary"
              size="lg"
              className="w-full text-lg"
              disabled={selected === null}
              onClick={handleNext}
            >
              {currentIndex === quizQuestions.length - 1 ? 'FINISH QUIZ' : 'NEXT QUESTION'}
              <ArrowRight size={18} className="ml-2" />
            </NeoButton>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
