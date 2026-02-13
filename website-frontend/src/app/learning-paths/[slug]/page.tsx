"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { InteractiveRoadmap } from "@/components/roadmap/InteractiveRoadmap";
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
  Briefcase,
  DollarSign,
  GraduationCap,
  ChevronDown,
  FolderGit2,
  MessageCircleQuestion,
  Layers,
  Compass,
  BarChart,
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

  // ─── Static fallback view (with Interactive Roadmap) ──────────────

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
  const totalTopics = staticPath.courses.reduce(
    (sum, c) => sum + c.topics.length,
    0
  );
  const totalProjects = staticPath.courses.filter((c) => c.project).length;

  const relatedPathData = staticPath.relatedPaths
    ? learningPaths.filter((p) => staticPath.relatedPaths?.includes(p.slug))
    : [];

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

              {/* Quick stats pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-2 mt-4"
              >
                <span className="text-xs font-bold bg-card neo-brutal-border px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <BookOpen size={12} /> {staticPath.courseCount} Courses
                </span>
                <span className="text-xs font-bold bg-card neo-brutal-border px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Clock size={12} /> {staticPath.estimatedHours}h
                </span>
                <span className="text-xs font-bold bg-card neo-brutal-border px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Zap size={12} /> {staticPath.difficulty}
                </span>
                <span className="text-xs font-bold bg-card neo-brutal-border px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <GraduationCap size={12} /> {totalLessons} Lessons
                </span>
                <span className="text-xs font-bold bg-card neo-brutal-border px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <FolderGit2 size={12} /> {totalProjects} Projects
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Long description */}
      {staticPath.longDescription && (
        <section className="border-b-2 border-border">
          <div className="container mx-auto px-4 py-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-4xl"
            >
              {staticPath.longDescription}
            </motion.p>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main: Interactive Roadmap */}
          <div className="flex-1 min-w-0">
            <InteractiveRoadmap path={staticPath} />

            {/* FAQ Section */}
            {staticPath.faqs && staticPath.faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                  <MessageCircleQuestion size={22} /> FREQUENTLY ASKED QUESTIONS
                </h2>
                <div className="space-y-3">
                  {staticPath.faqs.map((faq) => (
                    <FAQItem key={faq.question} question={faq.question} answer={faq.answer} colorHex={staticPath.colorHex} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Paths */}
            {relatedPathData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                  <Compass size={22} /> RELATED PATHS
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedPathData.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/learning-paths/${rp.slug}`}
                      className="block bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-5 hover:-translate-y-1 transition-transform"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`${rp.color} p-2 rounded-xl neo-brutal-border text-white`}
                        >
                          {iconMap[rp.icon] || <BookOpen size={20} />}
                        </div>
                        <div>
                          <h4 className="font-black text-sm">{rp.title}</h4>
                          <span className="text-[10px] font-bold text-muted-foreground">
                            {rp.courseCount} courses &middot; {rp.estimatedHours}h
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {rp.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-6">
            {/* Path Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 lg:sticky lg:top-28"
            >
              <h3 className="font-black uppercase tracking-tight mb-4">
                Path Stats
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Courses",
                    value: staticPath.courseCount.toString(),
                    icon: <BookOpen size={16} className="text-primary" />,
                  },
                  {
                    label: "Total Lessons",
                    value: totalLessons.toString(),
                    icon: <CheckCircle size={16} className="text-green-500" />,
                  },
                  {
                    label: "Topics Covered",
                    value: totalTopics.toString(),
                    icon: <Star size={16} className="text-yellow-500" />,
                  },
                  {
                    label: "Projects",
                    value: totalProjects.toString(),
                    icon: <FolderGit2 size={16} className="text-indigo-500" />,
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
                  ...(staticPath.industryDemand
                    ? [{
                        label: "Industry Demand",
                        value: staticPath.industryDemand,
                        icon: <TrendingUp size={16} className="text-rose-500" />,
                      }]
                    : []),
                  ...(staticPath.communitySize
                    ? [{
                        label: "Community",
                        value: staticPath.communitySize,
                        icon: <Users size={16} className="text-sky-500" />,
                      }]
                    : []),
                  ...(staticPath.completionRate
                    ? [{
                        label: "Completion Rate",
                        value: staticPath.completionRate,
                        icon: <BarChart size={16} className="text-emerald-500" />,
                      }]
                    : []),
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

              {/* What You'll Achieve */}
              {staticPath.outcomes.length > 0 && (
                <div className="mt-6 pt-4 border-t-2 border-border">
                  <h4 className="font-black uppercase text-xs tracking-wider mb-3">
                    What You&apos;ll Achieve
                  </h4>
                  <ul className="space-y-2">
                    {staticPath.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="text-sm font-medium text-muted-foreground flex items-start gap-2"
                      >
                        <CheckCircle
                          size={12}
                          className="text-emerald-500 shrink-0 mt-0.5"
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Career Roles */}
              {staticPath.careerRoles.length > 0 && (
                <div className="mt-6 pt-4 border-t-2 border-border">
                  <h4 className="font-black uppercase text-xs tracking-wider mb-3 flex items-center gap-1.5">
                    <Briefcase size={12} /> Career Roles
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {staticPath.careerRoles.map((role) => (
                      <span
                        key={role}
                        className="text-xs font-bold px-2.5 py-1 rounded-lg neo-brutal-border bg-muted/50"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <DollarSign size={14} className="text-emerald-500" />
                    <span className="font-bold text-muted-foreground">
                      Avg. Salary:
                    </span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      {staticPath.averageSalary}
                    </span>
                  </div>
                </div>
              )}

              {/* Prerequisites */}
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

/* ─── FAQ Item Component (Static view) ─────────────────────────────── */

function FAQItem({
  question,
  answer,
  colorHex,
}: {
  question: string;
  answer: string;
  colorHex: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card neo-brutal-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="font-bold text-sm pr-4">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={16} style={{ color: colorHex }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <div
                className="w-8 h-0.5 rounded-full mb-2"
                style={{ backgroundColor: colorHex }}
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
