"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import {
  careerPathApi,
  type CareerPathDetail,
  type PathNodeDetail,
} from "@/lib/api";
import { learningPaths } from "@/lib/data/learning-paths";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Terminal,
  BarChart3,
  Smartphone,
  Cloud,
  TrendingUp,
  Users,
  Loader2,
  Rocket,
  Lock,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={32} />,
  Terminal: <Terminal size={32} />,
  BarChart3: <BarChart3 size={32} />,
  Smartphone: <Smartphone size={32} />,
  Cloud: <Cloud size={32} />,
};

const COLOR_MAP: Record<string, string> = {
  web: "bg-blue-500",
  backend: "bg-[#3776AB]",
  fullstack: "bg-indigo-500",
  mobile: "bg-purple-500",
  "data-science": "bg-emerald-500",
  devops: "bg-orange-500",
  "game-dev": "bg-red-500",
};

const ICON_MAP_BY_INDUSTRY: Record<string, string> = {
  web: "Globe",
  backend: "Terminal",
  fullstack: "Globe",
  mobile: "Smartphone",
  "data-science": "BarChart3",
  devops: "Cloud",
  "game-dev": "Smartphone",
};

export default function LearningPathDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [apiPath, setApiPath] = useState<CareerPathDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    careerPathApi
      .getBySlug(slug)
      .then((data) => setApiPath(data))
      .catch(() => setApiPath(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await careerPathApi.enroll(slug);
      setEnrolled(true);
    } catch {
      router.push("/signup");
    } finally {
      setEnrolling(false);
    }
  };

  // Static fallback
  const staticPath = learningPaths.find((p) => p.slug === slug);

  if (loading) {
    return (
      <PageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageShell>
    );
  }

  // ─── API-driven view ───────────────────────────────────────────────

  if (apiPath) {
    const color =
      apiPath.color || COLOR_MAP[apiPath.industry] || "bg-primary";
    const iconKey = ICON_MAP_BY_INDUSTRY[apiPath.industry] || "Globe";

    return (
      <PageShell>
        {/* Hero */}
        <section className="py-16 bg-primary/5 border-b-4 border-border">
          <div className="container mx-auto px-4">
            <Link
              href="/learning-paths"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={14} /> All Learning Paths
            </Link>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div
                className={`${color} p-4 rounded-2xl neo-brutal-border text-white shrink-0`}
              >
                {iconMap[iconKey] || <BookOpen size={32} />}
              </div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
                >
                  {apiPath.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg font-medium text-muted-foreground mt-2 max-w-2xl"
                >
                  {apiPath.description}
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main: Skill Roadmap */}
            <div className="flex-1">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">
                SKILL ROADMAP
              </h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-6">
                  {apiPath.nodes.map((node, i) => (
                    <SkillNode key={node.id} node={node} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 lg:sticky lg:top-28"
              >
                <h3 className="font-black uppercase tracking-tight mb-4">
                  Path Stats
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Skills",
                      value: apiPath.totalNodes.toString(),
                      icon: (
                        <BookOpen size={16} className="text-primary" />
                      ),
                    },
                    {
                      label: "Enrolled",
                      value: apiPath.enrollmentCount.toString(),
                      icon: <Users size={16} className="text-green-500" />,
                    },
                    {
                      label: "Estimated Time",
                      value: `${apiPath.estimatedHours}h`,
                      icon: <Clock size={16} className="text-purple-500" />,
                    },
                    {
                      label: "Market Demand",
                      value: `${(apiPath.marketDemand * 10).toFixed(0)}/10`,
                      icon: (
                        <TrendingUp size={16} className="text-orange-500" />
                      ),
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                        {stat.icon} {stat.label}
                      </span>
                      <span className="font-black text-sm">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {apiPath.outcomes && apiPath.outcomes.length > 0 && (
                  <div className="mt-6 pt-4 border-t-2 border-border">
                    <h4 className="font-black uppercase text-xs tracking-wider mb-2">
                      What You&apos;ll Achieve
                    </h4>
                    <ul className="space-y-1">
                      {apiPath.outcomes.map((outcome: string) => (
                        <li
                          key={outcome}
                          className="text-sm font-medium text-muted-foreground flex items-center gap-2"
                        >
                          <CheckCircle
                            size={12}
                            className="text-emerald-500 shrink-0"
                          />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6">
                  {enrolled ? (
                    <NeoButton
                      variant="accent"
                      size="lg"
                      className="w-full text-base"
                      disabled
                    >
                      <CheckCircle size={16} className="mr-2" /> ENROLLED
                    </NeoButton>
                  ) : (
                    <NeoButton
                      variant="primary"
                      size="lg"
                      className="w-full text-base"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? (
                        "Enrolling..."
                      ) : (
                        <>
                          <Rocket size={16} className="mr-2" /> ENROLL NOW
                        </>
                      )}
                    </NeoButton>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  // ─── Static fallback view ──────────────────────────────────────────

  if (!staticPath) {
    return (
      <PageShell>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
            PATH NOT FOUND
          </h1>
          <p className="text-muted-foreground font-medium mb-6">
            This learning path doesn&apos;t exist.
          </p>
          <Link href="/learning-paths">
            <NeoButton variant="primary" size="md">
              <ArrowLeft size={16} className="mr-2" /> BACK TO PATHS
            </NeoButton>
          </Link>
        </div>
      </PageShell>
    );
  }

  const totalLessons = staticPath.courses.reduce(
    (sum, c) => sum + c.lessons,
    0
  );

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-16 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <Link
            href="/learning-paths"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} /> All Learning Paths
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div
              className={`${staticPath.color} p-4 rounded-2xl neo-brutal-border text-white shrink-0`}
            >
              {iconMap[staticPath.icon] || <BookOpen size={32} />}
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
              >
                {staticPath.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-medium text-muted-foreground mt-2 max-w-2xl"
              >
                {staticPath.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">
              COURSE ROADMAP
            </h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-6">
                {staticPath.courses.map((course, i) => (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-16"
                  >
                    <div
                      className={`absolute left-4 top-5 w-5 h-5 rounded-full neo-brutal-border z-10 ${
                        i === 0 ? "bg-primary" : "bg-card"
                      }`}
                    >
                      {i === 0 && (
                        <div className="absolute inset-1 rounded-full bg-white" />
                      )}
                    </div>

                    <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 hover:neo-brutal-shadow-lg transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-black text-primary uppercase">
                              Course {i + 1}
                            </span>
                          </div>
                          <h3 className="text-xl font-black">{course.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-xs font-bold text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen size={12} /> {course.lessons} lessons
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} /> {course.hours}h
                            </span>
                          </div>
                        </div>
                        <Link href={`/courses/${course.slug}`}>
                          <NeoButton
                            variant="outline"
                            size="sm"
                            className="shrink-0"
                          >
                            VIEW <ArrowRight size={12} className="ml-1" />
                          </NeoButton>
                        </Link>
                      </div>

                      {course.milestone && (
                        <div className="mt-4 flex items-center gap-2 p-3 bg-primary/5 rounded-xl neo-brutal-border">
                          <Star size={14} className="text-primary shrink-0" />
                          <span className="text-xs font-black text-primary uppercase">
                            Milestone: {course.milestone}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-80 shrink-0 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 lg:sticky lg:top-28"
            >
              <h3 className="font-black uppercase tracking-tight mb-4">
                Path Stats
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Courses",
                    value: staticPath.courseCount.toString(),
                    icon: <BookOpen size={16} className="text-primary" />,
                  },
                  {
                    label: "Total Lessons",
                    value: totalLessons.toString(),
                    icon: (
                      <CheckCircle size={16} className="text-green-500" />
                    ),
                  },
                  {
                    label: "Estimated Time",
                    value: `${staticPath.estimatedHours}h`,
                    icon: <Clock size={16} className="text-purple-500" />,
                  },
                  {
                    label: "Difficulty",
                    value: staticPath.difficulty,
                    icon: <Zap size={16} className="text-orange-500" />,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                      {stat.icon} {stat.label}
                    </span>
                    <span className="font-black text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>

              {staticPath.prerequisites.length > 0 && (
                <div className="mt-6 pt-4 border-t-2 border-border">
                  <h4 className="font-black uppercase text-xs tracking-wider mb-2">
                    Prerequisites
                  </h4>
                  <ul className="space-y-1">
                    {staticPath.prerequisites.map((prereq) => (
                      <li
                        key={prereq}
                        className="text-sm font-medium text-muted-foreground flex items-center gap-2"
                      >
                        <span className="text-primary">&bull;</span> {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link href="/signup" className="block mt-6">
                <NeoButton
                  variant="primary"
                  size="lg"
                  className="w-full text-base"
                >
                  START THIS PATH{" "}
                  <ArrowRight size={16} className="ml-2" />
                </NeoButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* ─── Skill Node Component (API view) ─────────────────────────────── */

function SkillNode({ node, index }: { node: PathNodeDetail; index: number }) {
  const isCompleted = node.isCompleted;
  const hasPrereqs = node.prerequisiteIds.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="relative pl-16"
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-4 top-5 w-5 h-5 rounded-full neo-brutal-border z-10 ${
          isCompleted
            ? "bg-emerald-500"
            : index === 0
              ? "bg-primary"
              : "bg-card"
        }`}
      >
        {isCompleted && (
          <CheckCircle
            size={12}
            className="absolute inset-0.5 text-white"
          />
        )}
        {!isCompleted && index === 0 && (
          <div className="absolute inset-1 rounded-full bg-white" />
        )}
      </div>

      <div
        className={`bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 hover:neo-brutal-shadow-lg transition-shadow ${
          isCompleted ? "opacity-75" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black text-primary uppercase">
                Skill {index + 1}
              </span>
              {node.isRequired && (
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Required
                </span>
              )}
              {isCompleted && (
                <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 px-2 py-0.5 rounded-full">
                  Completed
                </span>
              )}
            </div>
            <h3 className="text-xl font-black">{node.skillName}</h3>
            {node.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {node.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-2 text-xs font-bold text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock size={12} /> {node.estimatedHours}h
              </span>
              {hasPrereqs && (
                <span className="flex items-center gap-1">
                  <Lock size={12} /> {node.prerequisiteIds.length} prereq
                  {node.prerequisiteIds.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {node.courseSlug && (
            <Link href={`/courses/${node.courseSlug}`}>
              <NeoButton variant="outline" size="sm" className="shrink-0">
                VIEW <ArrowRight size={12} className="ml-1" />
              </NeoButton>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
