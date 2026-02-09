"use client";

import { motion } from "framer-motion";
import { SelectionCard } from "../components/selection-card";

const LANGUAGES = [
  { id: "python", name: "Python", emoji: "\u{1F40D}", tag: "Popular" },
  { id: "javascript", name: "JavaScript", emoji: "\u{1F7E8}", tag: "Popular" },
  { id: "typescript", name: "TypeScript", emoji: "\u{1F535}", tag: "Trending" },
  { id: "html-css", name: "HTML/CSS", emoji: "\u{1F3A8}", tag: "Popular" },
  { id: "java", name: "Java", emoji: "\u2615", tag: null },
  { id: "cpp", name: "C++", emoji: "\u2699\uFE0F", tag: null },
  { id: "go", name: "Go", emoji: "\u{1F439}", tag: "Trending" },
  { id: "rust", name: "Rust", emoji: "\u{1F980}", tag: "Trending" },
  { id: "sql", name: "SQL", emoji: "\u{1F5C3}\uFE0F", tag: null },
  { id: "react", name: "React", emoji: "\u269B\uFE0F", tag: "Popular" },
  { id: "nodejs", name: "Node.js", emoji: "\u{1F7E2}", tag: null },
  { id: "swift", name: "Swift", emoji: "\u{1F426}", tag: "New" },
];

interface LanguagesStepProps {
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
}

export function LanguagesStep({
  selectedLanguages,
  setSelectedLanguages,
}: LanguagesStepProps) {
  const toggleLanguage = (id: string) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== id));
    } else {
      setSelectedLanguages([...selectedLanguages, id]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-display font-bold uppercase text-center mb-2"
      >
        WHAT DO YOU WANT TO LEARN?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8"
      >
        Select at least one (you can change these later)
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {LANGUAGES.map((lang, i) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
          >
            <SelectionCard
              selected={selectedLanguages.includes(lang.id)}
              onClick={() => toggleLanguage(lang.id)}
              className="h-full"
            >
              <div className="flex flex-col items-center gap-2 py-2">
                <span className="text-3xl">{lang.emoji}</span>
                <span className="font-display font-bold text-sm uppercase">
                  {lang.name}
                </span>
                {lang.tag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">
                    {lang.tag}
                  </span>
                )}
              </div>
            </SelectionCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
