"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Heart } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
}

interface LessonAiChatProps {
  language: string;
  lessonTitle: string;
  cardIndex: number;
  totalCards: number;
  cardTitle: string;
}

function getCardComment(index: number, cardTitle: string, language: string): string {
  const comments = [
    `"${cardTitle}" — this is a key concept. Pay attention to the code example!`,
    `Nice progress! "${cardTitle}" builds on what you just learned.`,
    `Getting into the good stuff now. "${cardTitle}" comes up a lot in real ${language} code.`,
    `"${cardTitle}" — try to picture how you'd use this in your own project.`,
    `This one's important! Understanding "${cardTitle}" will make the quiz much easier.`,
    `Almost there! "${cardTitle}" ties everything together.`,
  ];
  return comments[index % comments.length];
}

export function LessonAiChat(props: LessonAiChatProps) {
  const { language, lessonTitle, cardIndex, totalCards, cardTitle } = props;
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
    const initial: ChatMessage[] = [
      { id: "intro", text: `Hi! Let's learn ${lang} together. I'll be here while you go through "${lessonTitle}".` },
      { id: "start-tip", text: `Take your time reading each card — no timer here. ${totalCards} cards to go.` },
    ];
    initial.forEach((m) => queuedIds.current.add(m.id));
    setMessages(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React to card changes
  useEffect(() => {
    if (cardIndex < 1) return;

    const toAdd: ChatMessage[] = [
      { id: `card-${cardIndex}`, text: getCardComment(cardIndex, cardTitle, language) },
    ];

    if (cardIndex === totalCards - 1) {
      toAdd.push({
        id: "last-card-notice",
        text: "Last card! Next up is the quiz — make sure you're solid on each concept.",
      });
    }

    addMessages(toAdd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIndex]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full max-h-[500px] rounded-xl border border-border/20 bg-muted/5 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/10 bg-primary/5 shrink-0">
        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot size={11} className="text-primary" />
        </div>
        <span className="text-[11px] font-bold">Arali</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <div className="ml-auto flex items-center gap-1">
          <Heart size={9} className="text-pink-400 fill-pink-400" />
          <span className="text-[9px] text-muted-foreground">Study mode</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5 min-h-0"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
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

      <div className="px-3 py-1.5 border-t border-border/10 flex items-center justify-center shrink-0">
        <p className="text-[9px] text-muted-foreground/40 flex items-center gap-1">
          <Sparkles size={8} />
          Arali watches your progress
        </p>
      </div>
    </div>
  );
}
