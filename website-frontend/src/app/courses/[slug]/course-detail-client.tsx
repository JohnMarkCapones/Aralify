"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { CardTilt } from "@/components/effects/CardTilt";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import type { Course, SyllabusModule, SyllabusLesson } from "@/lib/data/courses";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Clock,
  Code,
  FileText,
  Gamepad2,
  GraduationCap,
  HelpCircle,
  Layers,
  Play,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CourseHeroVisual } from "./course-hero-visual";

// ─── Topic type icon mapper ─────────────────────────────────────────────────
function TopicTypeIcon({ type }: { type: string }) {
  switch (type) {
    case "video":
      return <Play size={12} className="fill-current" />;
    case "reading":
      return <FileText size={12} />;
    case "exercise":
      return <Code size={12} />;
    case "quiz":
      return <HelpCircle size={12} />;
    case "project":
      return <Layers size={12} />;
    default:
      return <FileText size={12} />;
  }
}

function topicTypeLabel(type: string) {
  const map: Record<string, string> = {
    video: "Video",
    reading: "Reading",
    exercise: "Exercise",
    quiz: "Quiz",
    project: "Project",
  };
  return map[type] || type;
}

function topicTypeColor(type: string) {
  const map: Record<string, string> = {
    video: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40",
    reading: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/40",
    exercise: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/40",
    quiz: "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/40",
    project: "text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/40",
  };
  return map[type] || "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/40";
}

// ─── Level 3: Topic row (innermost) ─────────────────────────────────────────
function TopicRow({
  topic,
  index,
}: {
  topic: { title: string; duration: string; type: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors group/topic"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-transform group-hover/topic:scale-110",
            topicTypeColor(topic.type)
          )}
        >
          <TopicTypeIcon type={topic.type} />
        </div>
        <span className="text-sm font-medium">{topic.title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full hidden sm:inline-block",
            topicTypeColor(topic.type)
          )}
        >
          {topicTypeLabel(topic.type)}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {topic.duration}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Level 2: Lesson accordion (middle) ─────────────────────────────────────
function LessonAccordion({
  lesson,
  lessonIndex,
}: {
  lesson: SyllabusLesson;
  lessonIndex: number;
}) {
  const [open, setOpen] = useState(false);
  const hasTpcs = lesson.topics && lesson.topics.length > 0;

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <motion.button
        type="button"
        onClick={() => hasTpcs && setOpen(!open)}
        whileTap={hasTpcs ? { scale: 0.995 } : undefined}
        className={cn(
          "w-full flex items-center justify-between py-3 px-3 text-left rounded-lg transition-colors",
          hasTpcs
            ? "hover:bg-muted/40 cursor-pointer"
            : "cursor-default"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 bg-primary/10 text-primary font-black text-[10px] flex items-center justify-center rounded-md neo-brutal-border flex-shrink-0">
            {lessonIndex + 1}
          </span>
          <span className="font-bold text-sm">{lesson.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {hasTpcs && (
            <span className="text-[10px] text-muted-foreground font-mono">
              {lesson.topics!.length} items
            </span>
          )}
          {hasTpcs && (
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} className="text-muted-foreground" />
            </motion.div>
          )}
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && hasTpcs && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-6 pr-2 pb-3 space-y-0.5">
              {lesson.topics!.map((topic, ti) => (
                <TopicRow key={ti} topic={topic} index={ti} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Level 1: Module accordion (outermost) ──────────────────────────────────
function ModuleAccordion({
  module,
  moduleIndex,
  isOpen,
  onToggle,
}: {
  module: SyllabusModule;
  moduleIndex: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasLessons = module.lessonList && module.lessonList.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: moduleIndex * 0.06 }}
      className={cn(
        "bg-card neo-brutal-border rounded-xl overflow-hidden transition-shadow",
        isOpen ? "neo-brutal-shadow-lg" : "neo-brutal-shadow-sm"
      )}
    >
      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.995 }}
        className="w-full flex items-center justify-between p-5 text-left group"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              backgroundColor: isOpen
                ? "hsl(var(--primary))"
                : "hsl(var(--primary) / 0.1)",
              color: isOpen ? "white" : "hsl(var(--primary))",
            }}
            transition={{ duration: 0.2 }}
            className="w-10 h-10 font-black text-sm flex items-center justify-center rounded-lg neo-brutal-border flex-shrink-0"
          >
            {String(moduleIndex + 1).padStart(2, "0")}
          </motion.div>
          <div>
            <h3 className="font-black text-base leading-tight">
              {module.title}
            </h3>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs font-medium text-muted-foreground">
                {module.lessons} lessons
              </span>
              {module.description && (
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  &middot; {module.description.slice(0, 50)}
                  {module.description.length > 50 ? "..." : ""}
                </span>
              )}
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown
            size={20}
            className={cn(
              "transition-colors",
              isOpen
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary"
            )}
          />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {module.description && (
              <p className="px-5 pb-3 text-sm text-muted-foreground font-medium">
                {module.description}
              </p>
            )}
            <div className="px-5 pb-5">
              <div className="bg-muted/30 rounded-xl neo-brutal-border overflow-hidden">
                {hasLessons ? (
                  module.lessonList!.map((lesson, li) => (
                    <LessonAccordion
                      key={li}
                      lesson={lesson}
                      lessonIndex={li}
                    />
                  ))
                ) : (
                  // Fallback: simple lesson count display
                  <div className="p-4 text-sm text-muted-foreground font-medium">
                    {module.lessons} lessons in this module
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Star rating ────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={cn(
            i < Math.round(rating)
              ? "fill-accent text-accent"
              : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export function CourseDetailClient({ course }: { course: Course }) {
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [expandAll, setExpandAll] = useState(false);

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
    setExpandAll(false);
  };

  const handleExpandAll = () => {
    setExpandAll(!expandAll);
    setOpenModule(null);
  };

  // Calculate total topics
  const totalTopics = course.syllabus.reduce((acc, mod) => {
    if (!mod.lessonList) return acc + mod.lessons;
    return (
      acc +
      mod.lessonList.reduce(
        (a, l) => a + (l.topics?.length || 0),
        0
      )
    );
  }, 0);

  return (
    <PageShell>
      {/* ─── Hero Banner ──────────────────────────────────────────── */}
      <section className={`${course.color} py-16 border-b-4 border-border relative overflow-hidden`}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-white/80 font-bold mb-6 hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />{" "}
              All Courses
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Course info */}
            <div>
              <div className="flex items-start gap-5 mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.icon}
                    alt={course.language}
                    className="w-16 h-16 bg-white p-2.5 rounded-2xl neo-brutal-border"
                  />
                </motion.div>
                <div className="text-white flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 mb-2"
                  >
                    <span
                      className={`text-xs font-black uppercase px-3 py-1 rounded-full neo-brutal-border bg-white ${
                        course.difficulty === "Beginner"
                          ? "text-green-800"
                          : course.difficulty === "Intermediate"
                            ? "text-yellow-800"
                            : "text-red-800"
                      }`}
                    >
                      {course.difficulty}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-white" />
                      <span className="text-sm font-black">{course.rating}</span>
                    </div>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter"
                  >
                    {course.title}
                  </motion.h1>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-lg font-medium text-white/80 mt-2 max-w-xl"
              >
                {course.description}
              </motion.p>

              {/* Stats pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-3 mt-6"
              >
                {[
                  {
                    icon: <BookOpen size={16} />,
                    label: `${course.lessons} Lessons`,
                  },
                  { icon: <Clock size={16} />, label: `${course.hours} Hours` },
                  {
                    icon: <Users size={16} />,
                    label: `${course.students.toLocaleString()} Learners`,
                  },
                  { icon: <Zap size={16} />, label: "1x / 2x / 3x XP" },
                  {
                    icon: <Trophy size={16} />,
                    label: "Certificate",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-center gap-2 font-bold text-sm bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full"
                  >
                    {stat.icon} {stat.label}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: 3D floating code preview */}
            <div className="hidden lg:block">
              <CourseHeroVisual language={course.language} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-16">
              {/* ── About ──────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
                  ABOUT THIS COURSE
                </h2>
                <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                  {course.longDescription}
                </p>
              </motion.div>

              {/* ── What You'll Learn ──────────────────────────────── */}
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">
                    WHAT YOU&apos;LL LEARN
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.learningOutcomes.map((outcome, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="w-6 h-6 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 neo-brutal-border group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors"
                        >
                          <CheckCircle size={14} />
                        </motion.div>
                        <span className="text-sm font-medium">{outcome}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Course Stats Bar ───────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  {
                    value: course.syllabus.length,
                    label: "Modules",
                    icon: <Layers size={20} />,
                    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
                  },
                  {
                    value: course.lessons,
                    label: "Lessons",
                    icon: <BookOpen size={20} />,
                    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
                  },
                  {
                    value: totalTopics,
                    label: "Activities",
                    icon: <Target size={20} />,
                    color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
                  },
                  {
                    value: course.hours,
                    label: "Hours",
                    icon: <Clock size={20} />,
                    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
                  },
                ].map((stat, i) => (
                  <CardTilt key={i} intensity={5}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl p-4 text-center"
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2",
                          stat.color
                        )}
                      >
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-black">
                        <AnimatedCounter target={stat.value} />
                      </div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  </CardTilt>
                ))}
              </motion.div>

              {/* ── Syllabus (3-level accordion) ───────────────────── */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">
                    SYLLABUS
                  </h2>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExpandAll}
                    className="text-xs font-bold uppercase tracking-wider text-primary hover:underline px-3 py-1.5 rounded-full neo-brutal-border bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    {expandAll ? "Collapse All" : "Expand All"}
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {course.syllabus.map((module, i) => (
                    <ModuleAccordion
                      key={i}
                      module={module}
                      moduleIndex={i}
                      isOpen={expandAll || openModule === i}
                      onToggle={() => toggleModule(i)}
                    />
                  ))}
                </div>
              </div>

              {/* ── Difficulty Tiers ───────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">
                  DIFFICULTY TIERS
                </h2>
                <p className="text-sm font-medium text-muted-foreground mb-6">
                  Every lesson comes in three difficulty tiers. Pick the one that
                  fits your skill level and earn more XP for harder challenges.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      tier: "EASY",
                      xp: "1x",
                      xpAmount: 100,
                      desc: "Core concepts, guided examples, straightforward challenges.",
                      color: "border-l-green-500 bg-green-50 dark:bg-green-950/30",
                      iconColor: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
                    },
                    {
                      tier: "MEDIUM",
                      xp: "2x",
                      xpAmount: 200,
                      desc: "Less hand-holding, real-world scenarios, multi-step problems.",
                      color: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
                      iconColor: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
                    },
                    {
                      tier: "HARD",
                      xp: "3x",
                      xpAmount: 300,
                      desc: "Production-level challenges, edge cases, performance constraints.",
                      color: "border-l-red-500 bg-red-50 dark:bg-red-950/30",
                      iconColor: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
                    },
                  ].map((t, i) => (
                    <CardTilt key={t.tier} intensity={6}>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-5 rounded-xl neo-brutal-border border-l-4 ${t.color} h-full`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-black text-lg">{t.tier}</span>
                          <div
                            className={cn(
                              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-black",
                              t.iconColor
                            )}
                          >
                            <Zap size={12} />
                            {t.xp} XP
                          </div>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">
                          {t.desc}
                        </p>
                        <div className="text-xs font-mono text-muted-foreground">
                          ~<AnimatedCounter target={t.xpAmount} /> per lesson
                        </div>
                      </motion.div>
                    </CardTilt>
                  ))}
                </div>
              </motion.div>

              {/* ── Instructor ─────────────────────────────────────── */}
              {course.instructor && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">
                    YOUR INSTRUCTOR
                  </h2>
                  <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6">
                    <div className="flex items-start gap-5">
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-20 h-20 rounded-xl neo-brutal-border bg-muted/50"
                        />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-black text-xl">
                          {course.instructor.name}
                        </h3>
                        <p className="text-sm font-bold text-primary">
                          {course.instructor.title}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-2 leading-relaxed">
                          {course.instructor.bio}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                            <BookOpen size={12} />{" "}
                            {course.instructor.courses} courses
                          </span>
                          <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                            <Users size={12} />{" "}
                            {course.instructor.students.toLocaleString()}{" "}
                            students
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Reviews ────────────────────────────────────────── */}
              {course.reviews && course.reviews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">
                      REVIEWS
                    </h2>
                    <div className="flex items-center gap-2">
                      <StarRating rating={course.rating} />
                      <span className="font-black text-lg">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {course.reviews.map((review, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ x: 4 }}
                        className="bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl p-5 transition-shadow hover:neo-brutal-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-10 h-10 rounded-full neo-brutal-border bg-muted/50"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-black text-sm">
                                {review.name}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium">
                                {review.date}
                              </span>
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* ─── Sidebar ────────────────────────────────────────── */}
            <div className="space-y-6">
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-6 space-y-5 sticky top-28"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      bounce: 0.5,
                      delay: 0.5,
                    }}
                    className="text-4xl font-black"
                  >
                    FREE
                  </motion.div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Included in Hobbyist plan
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-ring" />
                  <NeoButton
                    size="lg"
                    variant="primary"
                    className="w-full text-lg h-14 group relative"
                  >
                    START COURSE{" "}
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  </NeoButton>
                </div>

                <div className="space-y-3 pt-4 border-t-2 border-border">
                  <h4 className="font-black text-sm uppercase">
                    What you&apos;ll get:
                  </h4>
                  {[
                    `${course.lessons} interactive lessons`,
                    "Easy, Medium & Hard tiers",
                    "Real code execution",
                    "XP rewards & badges",
                    "Certificate on completion",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground group/item"
                    >
                      <motion.div whileHover={{ scale: 1.3, rotate: 10 }}>
                        <CheckCircle
                          size={14}
                          className="text-green-600 shrink-0 group-hover/item:text-green-500 transition-colors"
                        />
                      </motion.div>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Course Progress Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
              >
                <h4 className="font-black text-sm uppercase mb-4">
                  COURSE AT A GLANCE
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      Skill Level
                    </span>
                    <span className="font-black text-xs px-2 py-0.5 rounded-full neo-brutal-border bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                      {course.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      Modules
                    </span>
                    <span className="font-black">
                      {course.syllabus.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      Total Lessons
                    </span>
                    <span className="font-black">{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      Duration
                    </span>
                    <span className="font-black">{course.hours} hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      Language
                    </span>
                    <span className="font-black">{course.language}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      Certificate
                    </span>
                    <span className="font-black text-green-600 flex items-center gap-1">
                      <GraduationCap size={14} /> Yes
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      Max XP
                    </span>
                    <span className="font-black text-primary flex items-center gap-1">
                      <Zap size={14} />{" "}
                      <AnimatedCounter
                        target={course.lessons * 300}
                        suffix=" XP"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Prerequisites */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
              >
                <h4 className="font-black text-sm uppercase mb-3">
                  PREREQUISITES
                </h4>
                <ul className="space-y-2">
                  {course.prerequisites.map((p) => (
                    <li
                      key={p}
                      className="text-sm font-medium text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">-</span> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Topics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6"
              >
                <h4 className="font-black text-sm uppercase mb-3">TOPICS</h4>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 + i * 0.04 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full neo-brutal-border cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Share / Gamification teaser */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-primary/5 neo-brutal-border neo-brutal-shadow-sm rounded-2xl p-6 text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="inline-block mb-2"
                >
                  <Gamepad2 size={32} className="text-primary" />
                </motion.div>
                <h4 className="font-black text-sm uppercase mb-1">
                  EARN WHILE YOU LEARN
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  Complete lessons to earn XP, unlock badges, and climb the
                  leaderboard. Harder tiers = more XP!
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
