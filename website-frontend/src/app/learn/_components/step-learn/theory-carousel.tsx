"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { TheoryCard } from "./theory-card";
import { LessonAiChat } from "./lesson-ai-chat";
import type { TheoryCard as TheoryCardType } from "@/lib/data/lesson-flow";

interface TheoryCarouselProps {
  cards: TheoryCardType[];
  onComplete: () => void;
  language?: string;
  lessonTitle?: string;
}

export function TheoryCarousel({
  cards,
  onComplete,
  language = "python",
  lessonTitle = "Lesson",
}: TheoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === cards.length - 1;

  const goNext = useCallback(() => {
    if (isLast) {
      onComplete();
      return;
    }
    setDirection(1);
    setCurrentIndex((prev) => prev + 1);
  }, [isLast, onComplete]);

  const goPrev = useCallback(() => {
    if (isFirst) return;
    setDirection(-1);
    setCurrentIndex((prev) => prev - 1);
  }, [isFirst]);

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 items-stretch mx-auto w-full">
      {/* AI Chat sidebar — left on desktop, bottom on mobile */}
      <div className="hidden lg:flex w-[220px] shrink-0">
        <LessonAiChat
          language={language}
          lessonTitle={lessonTitle}
          cardIndex={currentIndex}
          totalCards={cards.length}
          cardTitle={cards[currentIndex].title}
        />
      </div>

      {/* Main content — center */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-w-0">
        {/* Card area */}
        <div className="w-full max-w-lg min-h-[400px] flex items-center justify-center relative">
          <AnimatePresence mode="wait" custom={direction}>
            <TheoryCard
              key={cards[currentIndex].id}
              card={cards[currentIndex]}
              direction={direction}
            />
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-primary scale-125"
                  : i < currentIndex
                  ? "bg-primary/40"
                  : "bg-muted-foreground/20"
              }`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          {!isFirst && (
            <NeoButton
              variant="outline"
              size="sm"
              onClick={goPrev}
            >
              <ChevronLeft size={16} className="mr-1" />
              Back
            </NeoButton>
          )}

          <NeoButton
            variant="primary"
            size="md"
            onClick={goNext}
          >
            {isLast ? (
              <>
                Continue to Quiz
                <ArrowRight size={16} className="ml-2" />
              </>
            ) : (
              <>
                Next
                <ChevronRight size={16} className="ml-1" />
              </>
            )}
          </NeoButton>
        </div>
      </div>

      {/* Mobile AI chat — below content */}
      <div className="lg:hidden h-[160px]">
        <LessonAiChat
          language={language}
          lessonTitle={lessonTitle}
          cardIndex={currentIndex}
          totalCards={cards.length}
          cardTitle={cards[currentIndex].title}
        />
      </div>
    </div>
  );
}
