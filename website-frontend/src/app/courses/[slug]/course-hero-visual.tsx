"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

// ─── Code snippets per language ──────────────────────────────────────────────

type Token = { text: string; color: string };
type CodeLine = Token[];

const CODE_SNIPPETS: Record<string, { lines: CodeLine[]; fileName: string }> = {
  "HTML/CSS": {
    fileName: "index.html",
    lines: [
      [
        { text: "<", color: "#9CA3AF" },
        { text: "div", color: "#F472B6" },
        { text: " class", color: "#93C5FD" },
        { text: "=", color: "#9CA3AF" },
        { text: '"card"', color: "#86EFAC" },
        { text: ">", color: "#9CA3AF" },
      ],
      [
        { text: "  <", color: "#9CA3AF" },
        { text: "h1", color: "#F472B6" },
        { text: ">", color: "#9CA3AF" },
        { text: "Hello World", color: "#FDE68A" },
        { text: "</", color: "#9CA3AF" },
        { text: "h1", color: "#F472B6" },
        { text: ">", color: "#9CA3AF" },
      ],
      [
        { text: "  <", color: "#9CA3AF" },
        { text: "p", color: "#F472B6" },
        { text: " class", color: "#93C5FD" },
        { text: "=", color: "#9CA3AF" },
        { text: '"subtitle"', color: "#86EFAC" },
        { text: ">", color: "#9CA3AF" },
      ],
      [
        { text: "    Welcome to Aralify", color: "#FDE68A" },
      ],
      [
        { text: "  </", color: "#9CA3AF" },
        { text: "p", color: "#F472B6" },
        { text: ">", color: "#9CA3AF" },
      ],
      [
        { text: "</", color: "#9CA3AF" },
        { text: "div", color: "#F472B6" },
        { text: ">", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "<", color: "#9CA3AF" },
        { text: "style", color: "#F472B6" },
        { text: ">", color: "#9CA3AF" },
      ],
      [
        { text: ".card", color: "#93C5FD" },
        { text: " {", color: "#9CA3AF" },
      ],
      [
        { text: "  padding", color: "#C4B5FD" },
        { text: ": ", color: "#9CA3AF" },
        { text: "2rem", color: "#FCA5A5" },
        { text: ";", color: "#9CA3AF" },
      ],
      [
        { text: "  border-radius", color: "#C4B5FD" },
        { text: ": ", color: "#9CA3AF" },
        { text: "12px", color: "#FCA5A5" },
        { text: ";", color: "#9CA3AF" },
      ],
      [
        { text: "  background", color: "#C4B5FD" },
        { text: ": ", color: "#9CA3AF" },
        { text: "#1e1e2e", color: "#FCA5A5" },
        { text: ";", color: "#9CA3AF" },
      ],
      [
        { text: "}", color: "#9CA3AF" },
      ],
      [
        { text: "</", color: "#9CA3AF" },
        { text: "style", color: "#F472B6" },
        { text: ">", color: "#9CA3AF" },
      ],
    ],
  },
  Python: {
    fileName: "main.py",
    lines: [
      [
        { text: "def ", color: "#C4B5FD" },
        { text: "greet", color: "#93C5FD" },
        { text: "(name):", color: "#9CA3AF" },
      ],
      [
        { text: '    return ', color: "#C4B5FD" },
        { text: 'f"Hello, ', color: "#86EFAC" },
        { text: "{name}", color: "#FCA5A5" },
        { text: '!"', color: "#86EFAC" },
      ],
      [],
      [
        { text: "students ", color: "#F472B6" },
        { text: "= [", color: "#9CA3AF" },
        { text: '"Maria"', color: "#86EFAC" },
        { text: ", ", color: "#9CA3AF" },
        { text: '"Carlos"', color: "#86EFAC" },
        { text: "]", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "for ", color: "#C4B5FD" },
        { text: "s ", color: "#F472B6" },
        { text: "in ", color: "#C4B5FD" },
        { text: "students:", color: "#F472B6" },
      ],
      [
        { text: "    print", color: "#93C5FD" },
        { text: "(greet(s))", color: "#9CA3AF" },
      ],
    ],
  },
  JavaScript: {
    fileName: "app.js",
    lines: [
      [
        { text: "const ", color: "#C4B5FD" },
        { text: "courses ", color: "#F472B6" },
        { text: "= ", color: "#9CA3AF" },
        { text: "await ", color: "#C4B5FD" },
        { text: "fetch", color: "#93C5FD" },
        { text: "(", color: "#9CA3AF" },
      ],
      [
        { text: '  "/api/courses"', color: "#86EFAC" },
      ],
      [
        { text: ");", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "const ", color: "#C4B5FD" },
        { text: "data ", color: "#F472B6" },
        { text: "= ", color: "#9CA3AF" },
        { text: "await ", color: "#C4B5FD" },
        { text: "courses", color: "#F472B6" },
        { text: ".json();", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "data", color: "#F472B6" },
        { text: ".forEach", color: "#93C5FD" },
        { text: "((", color: "#9CA3AF" },
        { text: "course", color: "#FCA5A5" },
        { text: ") ", color: "#9CA3AF" },
        { text: "=> ", color: "#C4B5FD" },
        { text: "{", color: "#9CA3AF" },
      ],
      [
        { text: "  console", color: "#F472B6" },
        { text: ".log", color: "#93C5FD" },
        { text: "(", color: "#9CA3AF" },
        { text: "`\u{1F4DA} ${", color: "#86EFAC" },
        { text: "course.title", color: "#FCA5A5" },
        { text: "}`", color: "#86EFAC" },
        { text: ");", color: "#9CA3AF" },
      ],
      [
        { text: "});", color: "#9CA3AF" },
      ],
    ],
  },
  React: {
    fileName: "App.tsx",
    lines: [
      [
        { text: "export default ", color: "#C4B5FD" },
        { text: "function ", color: "#C4B5FD" },
        { text: "App", color: "#93C5FD" },
        { text: "() {", color: "#9CA3AF" },
      ],
      [
        { text: "  const ", color: "#C4B5FD" },
        { text: "[count, setCount]", color: "#F472B6" },
        { text: " = ", color: "#9CA3AF" },
        { text: "useState", color: "#93C5FD" },
        { text: "(0);", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "  return ", color: "#C4B5FD" },
        { text: "(", color: "#9CA3AF" },
      ],
      [
        { text: "    <", color: "#9CA3AF" },
        { text: "button", color: "#F472B6" },
        { text: " onClick", color: "#93C5FD" },
        { text: "={", color: "#9CA3AF" },
        { text: "() => ", color: "#C4B5FD" },
      ],
      [
        { text: "      setCount", color: "#93C5FD" },
        { text: "(count + 1)", color: "#9CA3AF" },
        { text: "}", color: "#9CA3AF" },
      ],
      [
        { text: "    >", color: "#9CA3AF" },
      ],
      [
        { text: "      Clicked ", color: "#FDE68A" },
        { text: "{count}", color: "#FCA5A5" },
        { text: " times", color: "#FDE68A" },
      ],
      [
        { text: "    </", color: "#9CA3AF" },
        { text: "button", color: "#F472B6" },
        { text: ">", color: "#9CA3AF" },
      ],
      [
        { text: "  );", color: "#9CA3AF" },
      ],
      [
        { text: "}", color: "#9CA3AF" },
      ],
    ],
  },
  TypeScript: {
    fileName: "types.ts",
    lines: [
      [
        { text: "interface ", color: "#C4B5FD" },
        { text: "Course ", color: "#93C5FD" },
        { text: "{", color: "#9CA3AF" },
      ],
      [
        { text: "  title", color: "#F472B6" },
        { text: ": ", color: "#9CA3AF" },
        { text: "string", color: "#86EFAC" },
        { text: ";", color: "#9CA3AF" },
      ],
      [
        { text: "  lessons", color: "#F472B6" },
        { text: ": ", color: "#9CA3AF" },
        { text: "number", color: "#86EFAC" },
        { text: ";", color: "#9CA3AF" },
      ],
      [
        { text: "  difficulty", color: "#F472B6" },
        { text: ": ", color: "#9CA3AF" },
        { text: '"easy"', color: "#86EFAC" },
        { text: " | ", color: "#9CA3AF" },
        { text: '"hard"', color: "#86EFAC" },
        { text: ";", color: "#9CA3AF" },
      ],
      [
        { text: "}", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "const ", color: "#C4B5FD" },
        { text: "courses", color: "#F472B6" },
        { text: ": Course[] = ", color: "#9CA3AF" },
        { text: "await ", color: "#C4B5FD" },
      ],
      [
        { text: "  fetchCourses", color: "#93C5FD" },
        { text: "();", color: "#9CA3AF" },
      ],
    ],
  },
  "Node.js": {
    fileName: "server.ts",
    lines: [
      [
        { text: "import ", color: "#C4B5FD" },
        { text: "express ", color: "#F472B6" },
        { text: "from ", color: "#C4B5FD" },
        { text: '"express"', color: "#86EFAC" },
        { text: ";", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "const ", color: "#C4B5FD" },
        { text: "app ", color: "#F472B6" },
        { text: "= ", color: "#9CA3AF" },
        { text: "express", color: "#93C5FD" },
        { text: "();", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "app", color: "#F472B6" },
        { text: ".get", color: "#93C5FD" },
        { text: "(", color: "#9CA3AF" },
        { text: '"/api"', color: "#86EFAC" },
        { text: ", (req, res)", color: "#9CA3AF" },
        { text: " => ", color: "#C4B5FD" },
        { text: "{", color: "#9CA3AF" },
      ],
      [
        { text: "  res", color: "#F472B6" },
        { text: ".json", color: "#93C5FD" },
        { text: "({ ", color: "#9CA3AF" },
        { text: "status", color: "#F472B6" },
        { text: ": ", color: "#9CA3AF" },
        { text: '"ok"', color: "#86EFAC" },
        { text: " });", color: "#9CA3AF" },
      ],
      [
        { text: "});", color: "#9CA3AF" },
      ],
    ],
  },
  SQL: {
    fileName: "query.sql",
    lines: [
      [
        { text: "SELECT ", color: "#C4B5FD" },
        { text: "u.name, ", color: "#F472B6" },
        { text: "COUNT", color: "#93C5FD" },
        { text: "(*)", color: "#9CA3AF" },
      ],
      [
        { text: "FROM ", color: "#C4B5FD" },
        { text: "users ", color: "#F472B6" },
        { text: "u", color: "#9CA3AF" },
      ],
      [
        { text: "JOIN ", color: "#C4B5FD" },
        { text: "progress ", color: "#F472B6" },
        { text: "p", color: "#9CA3AF" },
      ],
      [
        { text: "  ON ", color: "#C4B5FD" },
        { text: "u.id ", color: "#F472B6" },
        { text: "= ", color: "#9CA3AF" },
        { text: "p.user_id", color: "#F472B6" },
      ],
      [
        { text: "WHERE ", color: "#C4B5FD" },
        { text: "p.completed ", color: "#F472B6" },
        { text: "= ", color: "#9CA3AF" },
        { text: "true", color: "#86EFAC" },
      ],
      [
        { text: "GROUP BY ", color: "#C4B5FD" },
        { text: "u.name", color: "#F472B6" },
      ],
      [
        { text: "ORDER BY ", color: "#C4B5FD" },
        { text: "COUNT", color: "#93C5FD" },
        { text: "(*) ", color: "#9CA3AF" },
        { text: "DESC", color: "#C4B5FD" },
        { text: ";", color: "#9CA3AF" },
      ],
    ],
  },
  Git: {
    fileName: "terminal",
    lines: [
      [
        { text: "$ ", color: "#86EFAC" },
        { text: "git checkout -b ", color: "#93C5FD" },
        { text: "feature/auth", color: "#FDE68A" },
      ],
      [
        { text: "Switched to new branch", color: "#9CA3AF" },
      ],
      [],
      [
        { text: "$ ", color: "#86EFAC" },
        { text: "git add ", color: "#93C5FD" },
        { text: "src/auth.ts", color: "#FDE68A" },
      ],
      [],
      [
        { text: "$ ", color: "#86EFAC" },
        { text: "git commit -m ", color: "#93C5FD" },
        { text: '"feat: add login"', color: "#86EFAC" },
      ],
      [
        { text: "[feature/auth a1b2c3d]", color: "#C4B5FD" },
      ],
      [
        { text: " 1 file changed, 42 insertions", color: "#86EFAC" },
      ],
    ],
  },
};

// Flatten all tokens in a snippet into a single string for typing
function flattenSnippet(lines: CodeLine[]): { chars: { char: string; color: string; lineIdx: number; charIdx: number }[]; totalChars: number } {
  const chars: { char: string; color: string; lineIdx: number; charIdx: number }[] = [];
  let globalCharIdx = 0;

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (line.length === 0) {
      chars.push({ char: "\n", color: "#9CA3AF", lineIdx: li, charIdx: globalCharIdx });
      globalCharIdx++;
    } else {
      for (const token of line) {
        for (const ch of token.text) {
          chars.push({ char: ch, color: token.color, lineIdx: li, charIdx: globalCharIdx });
          globalCharIdx++;
        }
      }
      chars.push({ char: "\n", color: "#9CA3AF", lineIdx: li, charIdx: globalCharIdx });
      globalCharIdx++;
    }
  }

  return { chars, totalChars: globalCharIdx };
}

// ─── Typing animation hook ───────────────────────────────────────────────────

function useTypingAnimation(lines: CodeLine[], speed = 35) {
  const { chars, totalChars } = flattenSnippet(lines);
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setVisibleCount(0);
    setDone(false);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= totalChars) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [totalChars, speed]);

  // Build visible lines
  const visibleChars = chars.slice(0, visibleCount);
  const renderedLines: { tokens: { char: string; color: string }[] }[] = [];

  let currentLine: { char: string; color: string }[] = [];
  for (const ch of visibleChars) {
    if (ch.char === "\n") {
      renderedLines.push({ tokens: [...currentLine] });
      currentLine = [];
    } else {
      currentLine.push({ char: ch.char, color: ch.color });
    }
  }
  if (currentLine.length > 0) {
    renderedLines.push({ tokens: currentLine });
  }

  return { renderedLines, done, cursorLine: renderedLines.length - 1 };
}

// ─── Code Editor Component ───────────────────────────────────────────────────

function CodeEditor({
  language,
}: {
  language: string;
}) {
  const snippet = CODE_SNIPPETS[language] || CODE_SNIPPETS["JavaScript"];
  const { renderedLines, done, cursorLine } = useTypingAnimation(snippet.lines, 40);

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] rounded-b-xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-[#161b22] border-b border-white/5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0d1117] rounded-t-md border border-white/10 border-b-0 text-[10px] font-mono text-white/70">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                language === "HTML/CSS"
                  ? "#E34F26"
                  : language === "Python"
                    ? "#3776AB"
                    : language === "TypeScript"
                      ? "#3178C6"
                      : "#F7DF1E",
            }}
          />
          {snippet.fileName}
        </div>
      </div>

      {/* Code area */}
      <div className="flex-1 overflow-hidden p-3 font-mono text-[11px] leading-[1.6]">
        {renderedLines.map((line, li) => (
          <div key={li} className="flex">
            <span className="w-6 text-right mr-3 text-white/20 select-none flex-shrink-0">
              {li + 1}
            </span>
            <span className="flex-1 whitespace-pre">
              {line.tokens.map((t, ti) => (
                <span key={ti} style={{ color: t.color }}>
                  {t.char}
                </span>
              ))}
              {/* Blinking cursor at end of last line */}
              {li === cursorLine && (
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    times: [0, 0.5, 0.5, 1],
                  }}
                  className="inline-block w-[6px] h-[14px] bg-white/80 ml-px translate-y-[2px]"
                />
              )}
            </span>
          </div>
        ))}
        {/* Fill empty space */}
        {renderedLines.length < 14 &&
          Array.from({ length: 14 - renderedLines.length }).map((_, i) => (
            <div key={`empty-${i}`} className="flex">
              <span className="w-6 text-right mr-3 text-white/20 select-none flex-shrink-0">
                {renderedLines.length + i + 1}
              </span>
            </div>
          ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#161b22] border-t border-white/5 text-[9px] font-mono text-white/40">
        <div className="flex items-center gap-3">
          <span>{language}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-2">
          {done && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-400"
            >
              Ready
            </motion.span>
          )}
          <span>
            Ln {renderedLines.length}, Col{" "}
            {renderedLines.length > 0
              ? renderedLines[renderedLines.length - 1].tokens.length + 1
              : 1}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Hero Visual ────────────────────────────────────────────────────────

export function CourseHeroVisual({ language }: { language: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* Glow behind device */}
      <div className="absolute inset-4 bg-white/10 rounded-3xl blur-2xl" />

      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        {/* 3D tilt wrapper */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Laptop / Browser device frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Device shadow */}
            <div
              className="absolute inset-0 bg-black/20 rounded-xl"
              style={{ transform: "translateZ(-20px) translateY(10px)", filter: "blur(20px)" }}
            />

            {/* Browser window */}
            <div
              className="relative bg-[#1e1e2e] rounded-xl border-2 border-white/10 overflow-hidden"
              style={{ transform: "translateZ(20px)" }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border-b border-white/5">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5">
                  <motion.div
                    whileHover={{ scale: 1.4 }}
                    className="w-2.5 h-2.5 rounded-full bg-red-500"
                  />
                  <motion.div
                    whileHover={{ scale: 1.4 }}
                    className="w-2.5 h-2.5 rounded-full bg-yellow-500"
                  />
                  <motion.div
                    whileHover={{ scale: 1.4 }}
                    className="w-2.5 h-2.5 rounded-full bg-green-500"
                  />
                </div>

                {/* URL bar */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-1.5 px-3 py-0.5 bg-white/5 rounded-md text-[10px] font-mono text-white/40">
                    <svg
                      className="w-2.5 h-2.5 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    aralify.dev/learn
                  </div>
                </div>

                <div className="w-[38px]" />
              </div>

              {/* Code editor content */}
              <div className="h-[280px] sm:h-[300px]">
                <CodeEditor language={language} />
              </div>
            </div>

            {/* Laptop base / stand hint */}
            <div
              className="mx-auto mt-1 h-1 w-16 bg-white/10 rounded-full"
              style={{ transform: "translateZ(10px)" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
        className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/60 text-xs font-mono"
      >
        {"</>"}
      </motion.div>

      <motion.div
        animate={{ y: [0, 5, 0], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-1 -left-3 w-7 h-7 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/60 text-[10px] font-bold"
      >
        {"{;}"}
      </motion.div>

      <motion.div
        animate={{ y: [0, -4, 0], x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }}
        className="absolute top-1/2 -left-5 w-6 h-6 bg-white/5 rounded-md border border-white/10 flex items-center justify-center text-white/40 text-[9px] font-mono"
      >
        #
      </motion.div>
    </div>
  );
}
