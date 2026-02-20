"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
}

interface QuizAiChatProps {
  language: string;
  lessonTitle: string;
  questionIndex: number;
  totalQuestions: number;
  combo: number;
  lastAnswerCorrect: boolean | null;
  hearts: number;
}

function getTip(index: number, language: string): string {
  const tips: Record<string, string[]> = {
    python: [
      "Python uses indentation instead of braces — keep your blocks consistent!",
      "print() can take multiple arguments separated by commas.",
      "Single quotes and double quotes work the same for strings.",
      "Python is case-sensitive — 'Print' and 'print' are different.",
      "Comments start with #. Explain why, not what.",
      "Variables don't need type declarations — just assign a value.",
    ],
    javascript: [
      "Use === for strict equality — == can cause unexpected coercion.",
      "console.log() is your best friend for debugging.",
      "Arrays are zero-indexed — first element is at index 0.",
      "Prefer const, then let. Avoid var.",
      "Arrow functions (() => {}) don't create their own 'this'.",
      "null is intentional absence, undefined means not yet assigned.",
    ],
  };
  const langTips = tips[language.toLowerCase()] || tips.python;
  return langTips[index % langTips.length];
}

function getEncouragement(index: number): string {
  const msgs = [
    "Correct! You've got this.",
    "Great job! Keep it up.",
    "Spot on! Making progress.",
    "Excellent! It's clicking.",
    "Perfect! Solid fundamentals.",
    "Well done! Keep going.",
  ];
  return msgs[index % msgs.length];
}

function getReaction(qi: number, correct: boolean, combo: number, hearts: number): string {
  if (correct) {
    if (combo >= 5) return `${combo}x combo! You're crushing it! 🔥`;
    if (combo >= 3) return `${combo}x streak! Keep that combo alive.`;
    return getEncouragement(qi);
  }
  if (hearts <= 2) return `Careful — ${hearts} heart${hearts === 1 ? "" : "s"} left. Take your time.`;
  return "No worries! Read the explanation — understanding why matters most.";
}

export function QuizAiChat(props: QuizAiChatProps) {
  const { language, lessonTitle, questionIndex, combo, lastAnswerCorrect, hearts } = props;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const queuedIds = useRef<Set<string>>(new Set());
  const lang = language.charAt(0).toUpperCase() + language.slice(1);

  const addMessages = useCallback((msgs: ChatMessage[]) => {
    const newMsgs = msgs.filter((m) => !queuedIds.current.has(m.id));
    if (newMsgs.length === 0) return;

    newMsgs.forEach((m) => queuedIds.current.add(m.id));

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, ...newMsgs]);
    }, 600);
  }, []);

  // Init
  useEffect(() => {
    const intro: ChatMessage = {
      id: "intro",
      text: `Hey! I'm your ${lang} study buddy for "${lessonTitle}". Good luck!`,
    };
    queuedIds.current.add(intro.id);
    setMessages([intro]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tips on question change
  useEffect(() => {
    if (questionIndex < 1) return;
    addMessages([{ id: `tip-${questionIndex}`, text: getTip(questionIndex, language) }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  // Reactions on answer
  useEffect(() => {
    if (lastAnswerCorrect === null) return;
    addMessages([{
      id: `react-${questionIndex}`,
      text: getReaction(questionIndex, lastAnswerCorrect, combo, hearts),
    }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAnswerCorrect, questionIndex]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full max-h-[500px] rounded-xl border border-border/20 bg-muted/10 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/10 bg-primary/5 shrink-0">
        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot size={12} className="text-primary" />
        </div>
        <span className="text-[11px] font-bold">Arali</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <Sparkles size={10} className="text-primary/40 ml-auto" />
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-2 min-h-0"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={10} className="text-primary" />
              </div>
              <p className="text-xs leading-relaxed text-foreground/80">
                {msg.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot size={10} className="text-primary" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-muted/30">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
