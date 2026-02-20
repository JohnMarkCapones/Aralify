"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NeoButton } from "@/components/ui/neo-button";
import {
  type LearningPath,
  type CourseDetail,
  type RoadmapPhase,
  getCoursesInPhases,
} from "@/lib/data/learning-paths";
import {
  ArrowRight,
  BookOpen,
  Clock,
  ChevronDown,
  Star,
  Wrench,
  FolderGit2,
  Hash,
  Trophy,
  Flag,
  Sparkles,
  Lightbulb,
  Globe2,
  Flame,
  BookMarked,
  Layers,
  Calendar,
  Target,
} from "lucide-react";

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "bg-emerald-100 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400" },
  Intermediate: { bg: "bg-amber-100 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400" },
  Advanced: { bg: "bg-red-100 dark:bg-red-950/30", text: "text-red-700 dark:text-red-400" },
};

// ─── Phase Header ──────────────────────────────────────────────────

function PhaseHeader({
  phase,
  index,
  totalPhases,
  colorHex,
  courseCount,
  totalHours,
}: {
  phase: RoadmapPhase;
  index: number;
  totalPhases: number;
  colorHex: string;
  courseCount: number;
  totalHours: number;
}) {
  const phaseIcons = [Flag, Sparkles, Star, Trophy, Target];
  const Icon = phaseIcons[index % phaseIcons.length] || Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Connector from previous phase */}
      {index > 0 && (
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: colorHex, opacity: 0.3 }}
            />
            <svg width="20" height="12" viewBox="0 0 20 12">
              <path d="M10 12 L0 0 L20 0 Z" fill={colorHex} opacity={0.4} />
            </svg>
          </div>
        </div>
      )}

      <div
        className="relative neo-brutal-border rounded-2xl p-5 md:p-6 overflow-hidden"
        style={{ backgroundColor: colorHex + "10" }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: colorHex }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div
            className="w-12 h-12 rounded-xl neo-brutal-border flex items-center justify-center text-white shrink-0"
            style={{ backgroundColor: colorHex }}
          >
            <Icon size={22} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: colorHex }}
              >
                Phase {index + 1} of {totalPhases}
              </span>
              {phase.estimatedWeeks && (
                <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                  <Calendar size={10} /> ~{phase.estimatedWeeks} weeks
                </span>
              )}
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
              {phase.label}
            </h3>
            <p className="text-sm font-medium text-muted-foreground mt-0.5">
              {phase.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground sm:shrink-0">
            <span className="flex items-center gap-1">
              <BookOpen size={12} /> {courseCount}{" "}
              {courseCount === 1 ? "course" : "courses"}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {totalHours}h
            </span>
          </div>
        </div>

        <div className="mt-4 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ backgroundColor: colorHex, width: "0%", opacity: 0.6 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Course Node (expandable card) ──────────────────────────────────

function CourseNode({
  course,
  index,
  globalIndex,
  colorHex,
  isLast,
}: {
  course: CourseDetail;
  index: number;
  globalIndex: number;
  colorHex: string;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const diffColors = DIFFICULTY_COLORS[course.difficulty] || DIFFICULTY_COLORS.Beginner;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative"
    >
      {/* Vertical connector line */}
      <div className="absolute left-6 top-0 bottom-0 flex flex-col items-center pointer-events-none">
        <div
          className="w-0.5 flex-1"
          style={{ backgroundColor: colorHex, opacity: 0.25 }}
        />
        {!isLast && (
          <div
            className="w-0.5 flex-1"
            style={{ backgroundColor: colorHex, opacity: 0.25 }}
          />
        )}
      </div>

      <div className="relative pl-16">
        {/* Timeline dot */}
        <div
          className="absolute left-[14px] top-6 w-6 h-6 rounded-full neo-brutal-border z-10 flex items-center justify-center text-white text-[10px] font-black"
          style={{ backgroundColor: colorHex }}
        >
          {globalIndex + 1}
        </div>

        {/* Card */}
        <div
          className="bg-card neo-brutal-border rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer group"
          style={{
            boxShadow: expanded
              ? `6px 6px 0px 0px ${colorHex}40`
              : "5px 5px 0px 0px hsl(var(--border))",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="h-1" style={{ backgroundColor: colorHex }} />

          <div className="p-5 md:p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className="text-[10px] font-black uppercase tracking-wider"
                    style={{ color: colorHex }}
                  >
                    Course {globalIndex + 1}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${diffColors.bg} ${diffColors.text}`}
                  >
                    {course.difficulty}
                  </span>
                  {course.milestone && (
                    <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Trophy size={8} /> Milestone
                    </span>
                  )}
                </div>
                <h4 className="text-lg md:text-xl font-black leading-tight">
                  {course.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {course.description}
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                    <BookOpen size={12} /> {course.lessons} lessons
                  </span>
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                    <Clock size={12} /> {course.hours}h
                  </span>
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                    <Hash size={12} /> {course.topics.length} topics
                  </span>
                  {course.modules && (
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                      <Layers size={12} /> {course.modules.length} modules
                    </span>
                  )}
                </div>
              </div>

              <button
                className="shrink-0 w-8 h-8 rounded-lg neo-brutal-border flex items-center justify-center hover:bg-muted transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Expanded content */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 mt-5 border-t-2 border-border space-y-5">
                    {/* Long description */}
                    {course.longDescription && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {course.longDescription}
                      </p>
                    )}

                    {/* Modules breakdown */}
                    {course.modules && course.modules.length > 0 && (
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                          <Layers size={12} /> Course Modules
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {course.modules.map((mod, mi) => (
                            <div
                              key={mod.title}
                              className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/30 neo-brutal-border"
                            >
                              <span
                                className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black text-white shrink-0"
                                style={{ backgroundColor: colorHex }}
                              >
                                {mi + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-bold truncate block">
                                  {mod.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-muted-foreground shrink-0">
                                {mod.lessons}L
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Topics */}
                    {course.topics.length > 0 && (
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Hash size={12} /> Topics Covered
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {course.topics.map((topic) => (
                            <span
                              key={topic}
                              className="text-[11px] font-bold px-2.5 py-1 rounded-lg neo-brutal-border bg-muted/50"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Concepts */}
                    {course.keyConceptss.length > 0 && (
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Lightbulb size={12} /> Key Concepts
                        </h5>
                        <ul className="space-y-1.5">
                          {course.keyConceptss.map((concept) => (
                            <li
                              key={concept}
                              className="text-xs font-medium text-muted-foreground flex items-start gap-2"
                            >
                              <Lightbulb
                                size={10}
                                className="shrink-0 mt-0.5"
                                style={{ color: colorHex }}
                              />
                              {concept}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tools */}
                    {course.tools.length > 0 && (
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Wrench size={12} /> Tools & Technologies
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {course.tools.map((tool) => (
                            <span
                              key={tool}
                              className="text-[11px] font-bold px-2.5 py-1 rounded-lg text-white"
                              style={{ backgroundColor: colorHex }}
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Real-World Applications */}
                    {course.realWorldApps.length > 0 && (
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Globe2 size={12} /> Real-World Applications
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {course.realWorldApps.map((app) => (
                            <span
                              key={app}
                              className="text-[11px] font-bold px-2.5 py-1 rounded-lg neo-brutal-border"
                              style={{
                                backgroundColor: colorHex + "08",
                                color: colorHex,
                              }}
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Project */}
                    {course.project && (
                      <div
                        className="p-4 rounded-xl neo-brutal-border"
                        style={{ backgroundColor: colorHex + "08" }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: colorHex + "20" }}
                          >
                            <FolderGit2
                              size={16}
                              style={{ color: colorHex }}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                              Hands-On Project
                            </span>
                            <p className="text-sm font-black mt-0.5">
                              {course.project}
                            </p>
                            {course.projectDescription && (
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {course.projectDescription}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Milestone */}
                    {course.milestone && (
                      <div className="p-3 rounded-xl neo-brutal-border bg-amber-50 dark:bg-amber-950/20 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                          <Trophy
                            size={14}
                            className="text-amber-600 dark:text-amber-400"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                            Milestone Achievement
                          </span>
                          <p className="text-sm font-bold">
                            {course.milestone}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Bonus Challenges */}
                    {course.bonusChallenges && course.bonusChallenges.length > 0 && (
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Flame size={12} /> Bonus Challenges
                        </h5>
                        <ul className="space-y-1.5">
                          {course.bonusChallenges.map((challenge) => (
                            <li
                              key={challenge}
                              className="text-xs font-medium text-muted-foreground flex items-start gap-2"
                            >
                              <Flame
                                size={10}
                                className="text-orange-500 shrink-0 mt-0.5"
                              />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Resources */}
                    {course.resources && course.resources.length > 0 && (
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                          <BookMarked size={12} /> Recommended Resources
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {course.resources.map((resource) => (
                            <span
                              key={resource}
                              className="text-[11px] font-bold px-2.5 py-1 rounded-lg neo-brutal-border bg-muted/30"
                            >
                              {resource}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-2">
                      <Link href={`/courses/${course.slug}`}>
                        <NeoButton
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          START COURSE{" "}
                          <ArrowRight size={12} className="ml-1" />
                        </NeoButton>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Milestone Divider ──────────────────────────────────────────────

function MilestoneDivider({
  text,
  colorHex,
}: {
  text: string;
  colorHex: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative pl-16"
    >
      <div className="absolute left-6 top-0 bottom-0 flex flex-col items-center pointer-events-none">
        <div
          className="w-0.5 flex-1"
          style={{ backgroundColor: colorHex, opacity: 0.25 }}
        />
      </div>

      <div
        className="absolute left-[11px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10"
        style={{ backgroundColor: colorHex + "20" }}
      >
        <Star size={14} style={{ color: colorHex }} fill={colorHex} />
      </div>

      <div
        className="py-3 px-4 rounded-xl text-sm font-bold flex items-center gap-2"
        style={{ color: colorHex }}
      >
        <span className="text-xs uppercase tracking-wider">{text}</span>
      </div>
    </motion.div>
  );
}

// ─── Finish Line ────────────────────────────────────────────────────

function FinishLine({ colorHex, title }: { colorHex: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-16 mt-2"
    >
      <div
        className="absolute left-[11px] top-5 w-8 h-8 rounded-full neo-brutal-border flex items-center justify-center z-10"
        style={{ backgroundColor: colorHex }}
      >
        <Trophy size={14} className="text-white" />
      </div>

      <div
        className="neo-brutal-border rounded-2xl p-5 md:p-6"
        style={{
          background: `linear-gradient(135deg, ${colorHex}15, ${colorHex}05)`,
          boxShadow: `5px 5px 0px 0px ${colorHex}30`,
        }}
      >
        <span
          className="text-xs font-black uppercase tracking-widest"
          style={{ color: colorHex }}
        >
          PATH COMPLETE
        </span>
        <h4 className="text-lg font-black mt-0.5">
          {title} Mastery Achieved
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          You&apos;re ready to build real-world projects and land your first
          role. Keep practicing and building!
        </p>
      </div>
    </motion.div>
  );
}

// ─── Tech Stack Overview ────────────────────────────────────────────

function TechStackOverview({
  techStack,
  colorHex,
}: {
  techStack: string[];
  colorHex: string;
}) {
  if (techStack.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-5 md:p-6"
    >
      <h3 className="text-sm font-black uppercase tracking-wider mb-3 flex items-center gap-2">
        <Wrench size={14} /> Tech Stack You&apos;ll Master
      </h3>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-bold px-3 py-1.5 rounded-lg neo-brutal-border hover:-translate-y-0.5 transition-transform cursor-default"
            style={{
              backgroundColor: colorHex + "10",
              borderColor: colorHex + "30",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Interactive Roadmap ───────────────────────────────────────

export function InteractiveRoadmap({ path }: { path: LearningPath }) {
  const phases = getCoursesInPhases(path);
  let globalCourseIndex = 0;

  const totalTopics = path.courses.reduce((sum, c) => sum + c.topics.length, 0);
  const totalProjects = path.courses.filter((c) => c.project).length;
  const totalModules = path.courses.reduce(
    (sum, c) => sum + (c.modules?.length || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Roadmap header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          LEARNING ROADMAP
        </h2>
        <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <BookOpen size={12} /> {path.courseCount} courses
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {path.estimatedHours}h
          </span>
          <span className="flex items-center gap-1">
            <Hash size={12} /> {totalTopics} topics
          </span>
          <span className="flex items-center gap-1">
            <FolderGit2 size={12} /> {totalProjects} projects
          </span>
          {totalModules > 0 && (
            <span className="flex items-center gap-1">
              <Layers size={12} /> {totalModules} modules
            </span>
          )}
        </div>
      </div>

      {/* Tech stack overview */}
      {path.techStack && path.techStack.length > 0 && (
        <TechStackOverview techStack={path.techStack} colorHex={path.colorHex} />
      )}

      {/* Phases */}
      {phases.map((phase, phaseIndex) => {
        const phaseHours = phase.courses.reduce((sum, c) => sum + c.hours, 0);
        const startIndex = globalCourseIndex;

        const phaseContent = (
          <div key={phase.name} className="space-y-4">
            <PhaseHeader
              phase={phase}
              index={phaseIndex}
              totalPhases={phases.length}
              colorHex={path.colorHex}
              courseCount={phase.courses.length}
              totalHours={phaseHours}
            />

            <div className="space-y-4">
              {phase.courses.map((course, courseIndex) => {
                const currentGlobalIndex = startIndex + courseIndex;
                const isLastInPhase = courseIndex === phase.courses.length - 1;
                const isLastOverall =
                  phaseIndex === phases.length - 1 && isLastInPhase;

                return (
                  <CourseNode
                    key={course.slug}
                    course={course}
                    index={courseIndex}
                    globalIndex={currentGlobalIndex}
                    colorHex={path.colorHex}
                    isLast={isLastOverall}
                  />
                );
              })}

              {phaseIndex < phases.length - 1 && (
                <MilestoneDivider
                  text={`${phase.label} Complete — Next: ${phases[phaseIndex + 1].label}`}
                  colorHex={path.colorHex}
                />
              )}
            </div>
          </div>
        );

        globalCourseIndex += phase.courses.length;
        return phaseContent;
      })}

      {/* Finish line */}
      <FinishLine colorHex={path.colorHex} title={path.title} />
    </div>
  );
}
