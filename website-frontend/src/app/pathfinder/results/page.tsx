"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  ArrowRight,
  BarChart3,
  TrendingUp,
  Clock,
  Users,
  Brain,
  Target,
  Compass,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Rocket,
  CheckCircle,
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { PageShell } from "@/components/layout/PageShell";
import {
  careerPathApi,
  type AssessmentResponse,
  type PathRecommendation,
  type ScoreBreakdown,
} from "@/lib/api";

const SCORE_LABELS: Record<keyof ScoreBreakdown, { label: string; Icon: typeof Target }> = {
  interestAlignment: { label: "Interest Match", Icon: Target },
  goalAlignment: { label: "Goal Alignment", Icon: Compass },
  dreamProjectAlignment: { label: "Dream Project", Icon: Rocket },
  personalityFit: { label: "Personality Fit", Icon: Sparkles },
  skillGap: { label: "Skill Fit", Icon: Brain },
  timeViability: { label: "Time Viability", Icon: Clock },
  marketDemand: { label: "Market Demand", Icon: TrendingUp },
  communityPopularity: { label: "Community", Icon: Users },
  cognitiveMatch: { label: "Cognitive Match", Icon: Brain },
};

const RANK_COLORS = [
  "from-amber-400 to-yellow-500",
  "from-slate-300 to-gray-400",
  "from-orange-400 to-amber-600",
];

const RANK_LABELS = ["BEST MATCH", "GREAT FIT", "STRONG OPTION"];

export default function PathfinderResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<AssessmentResponse | null>(null);
  const [expandedCard, setExpandedCard] = useState<number>(0);
  const [enrollingSlug, setEnrollingSlug] = useState<string | null>(null);
  const [enrolledSlugs, setEnrolledSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = sessionStorage.getItem("pathfinder-results");
    if (!stored) {
      router.replace("/pathfinder");
      return;
    }
    try {
      const parsed = JSON.parse(stored) as AssessmentResponse;
      setResults(parsed);
    } catch {
      router.replace("/pathfinder");
    }
  }, [router]);

  const handleEnroll = async (slug: string) => {
    setEnrollingSlug(slug);
    try {
      await careerPathApi.enroll(slug);
      setEnrolledSlugs((prev) => new Set(prev).add(slug));
    } catch {
      // If unauthenticated, redirect to signup
      router.push("/signup");
    } finally {
      setEnrollingSlug(null);
    }
  };

  if (!results) {
    return (
      <PageShell>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="font-bold text-muted-foreground">Loading your results...</p>
          </div>
        </div>
      </PageShell>
    );
  }

  const paths = results.recommendedPaths;

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-16 bg-primary/5 border-b-4 border-border overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-3xl neo-brutal-border neo-brutal-shadow mb-6"
          >
            <Trophy size={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-3"
          >
            YOUR RESULTS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-medium text-muted-foreground max-w-2xl"
          >
            We analyzed {results.totalPathsScored} career paths against your profile.
            Here are your top matches.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-6"
          >
            {[
              { label: "Paths Scored", value: results.totalPathsScored, Icon: BarChart3 },
              { label: "Difficulty Level", value: getDifficultyLabel(results.profile.difficultyScore), Icon: Brain },
              { label: "Top Match", value: `${paths[0]?.matchPercentage ?? 0}%`, Icon: Target },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 bg-card neo-brutal-border rounded-xl px-4 py-2"
              >
                <stat.Icon size={16} className="text-primary" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                    {stat.label}
                  </p>
                  <p className="font-black text-sm">{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recommended Paths */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {paths.map((path, i) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                <PathCard
                  path={path}
                  rank={i}
                  isExpanded={expandedCard === i}
                  onToggle={() =>
                    setExpandedCard(expandedCard === i ? -1 : i)
                  }
                  onEnroll={() => handleEnroll(path.slug)}
                  isEnrolling={enrollingSlug === path.slug}
                  isEnrolled={enrolledSlugs.has(path.slug)}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center space-y-4"
          >
            <p className="text-sm font-medium text-muted-foreground">
              Want to explore all available paths?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/learning-paths">
                <NeoButton variant="outline" size="md">
                  <BookOpen className="w-4 h-4 mr-2" /> BROWSE ALL PATHS
                </NeoButton>
              </Link>
              <Link href="/pathfinder">
                <NeoButton variant="muted" size="md">
                  <Compass className="w-4 h-4 mr-2" /> RETAKE QUIZ
                </NeoButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}

/* ─── Path Card Component ─────────────────────────────────────────── */

interface PathCardProps {
  path: PathRecommendation;
  rank: number;
  isExpanded: boolean;
  onToggle: () => void;
  onEnroll: () => void;
  isEnrolling: boolean;
  isEnrolled: boolean;
}

function PathCard({
  path,
  rank,
  isExpanded,
  onToggle,
  onEnroll,
  isEnrolling,
  isEnrolled,
}: PathCardProps) {
  const rankColor = RANK_COLORS[rank] || "from-primary/60 to-primary";
  const rankLabel = RANK_LABELS[rank] || `#${rank + 1} MATCH`;

  return (
    <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden">
      {/* Rank strip */}
      <div className={`bg-gradient-to-r ${rankColor} h-1.5`} />

      <div className="p-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Rank badge */}
          <div
            className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${rankColor} flex items-center justify-center neo-brutal-border text-white font-black text-xl`}
          >
            #{rank + 1}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {rankLabel}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                {path.industry}
              </span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">
              {path.title}
            </h3>
            <p className="text-sm text-muted-foreground font-medium mt-1 line-clamp-2">
              {path.description}
            </p>
          </div>

          {/* Match percentage circle */}
          <div className="shrink-0 self-center">
            <MatchCircle percentage={path.matchPercentage} size={80} />
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-3 mt-4">
          {[
            { label: "Est. Hours", value: path.estimatedHours.toString(), Icon: Clock },
            { label: "Market Demand", value: `${(path.marketDemand * 10).toFixed(0)}/10`, Icon: TrendingUp },
            { label: "Overall Score", value: path.score.toFixed(2), Icon: BarChart3 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5"
            >
              <stat.Icon size={12} className="text-muted-foreground" />
              <span className="text-xs font-bold">
                <span className="text-muted-foreground">{stat.label}: </span>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Expand/collapse toggle */}
        <button
          onClick={onToggle}
          className="flex items-center gap-2 mt-4 text-xs font-black uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? "HIDE BREAKDOWN" : "VIEW SCORE BREAKDOWN"}
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Expanded score breakdown */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t-2 border-border">
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">
                  SCORE BREAKDOWN
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    Object.entries(path.scoreBreakdown) as [
                      keyof ScoreBreakdown,
                      number,
                    ][]
                  ).map(([key, value]) => {
                    const meta = SCORE_LABELS[key];
                    if (!meta) return null;
                    return (
                      <ScoreBar
                        key={key}
                        label={meta.label}
                        Icon={meta.Icon}
                        value={value}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t-2 border-border">
          {isEnrolled ? (
            <NeoButton variant="accent" size="sm" disabled>
              <CheckCircle className="w-4 h-4 mr-2" /> ENROLLED
            </NeoButton>
          ) : (
            <NeoButton
              variant="primary"
              size="sm"
              onClick={onEnroll}
              disabled={isEnrolling}
            >
              {isEnrolling ? (
                "Enrolling..."
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" /> ENROLL NOW
                </>
              )}
            </NeoButton>
          )}
          <Link href={`/learning-paths/${path.slug}`}>
            <NeoButton variant="outline" size="sm">
              VIEW PATH <ArrowRight className="w-4 h-4 ml-1" />
            </NeoButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Match Circle ────────────────────────────────────────────────── */

function MatchCircle({
  percentage,
  size = 80,
}: {
  percentage: number;
  size?: number;
}) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={
            percentage >= 80
              ? "#10b981"
              : percentage >= 60
                ? "hsl(var(--primary))"
                : "#f59e0b"
          }
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black text-lg leading-none">{percentage}%</span>
        <span className="text-[8px] font-bold uppercase text-muted-foreground">
          match
        </span>
      </div>
    </div>
  );
}

/* ─── Score Bar ───────────────────────────────────────────────────── */

function ScoreBar({
  label,
  Icon,
  value,
}: {
  label: string;
  Icon: typeof Target;
  value: number;
}) {
  const percentage = Math.round(value * 100);
  return (
    <div className="flex items-center gap-3">
      <Icon size={14} className="text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold truncate">{label}</span>
          <span className="text-xs font-black text-primary">{percentage}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function getDifficultyLabel(score: number): string {
  if (score < 0.3) return "Beginner";
  if (score < 0.6) return "Intermediate";
  if (score < 0.85) return "Advanced";
  return "Expert";
}
