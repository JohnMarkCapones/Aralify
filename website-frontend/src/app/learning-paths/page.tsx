"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { careerPathApi, type CareerPathListItem } from "@/lib/api";
import { learningPaths } from "@/lib/data/learning-paths";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Globe,
  Terminal,
  BarChart3,
  Smartphone,
  Cloud,
  Users,
  TrendingUp,
  Compass,
  Loader2,
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={28} />,
  Terminal: <Terminal size={28} />,
  BarChart3: <BarChart3 size={28} />,
  Smartphone: <Smartphone size={28} />,
  Cloud: <Cloud size={28} />,
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

export default function LearningPathsPage() {
  const [apiPaths, setApiPaths] = useState<CareerPathListItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    careerPathApi
      .getAll()
      .then((data) => setApiPaths(data))
      .catch(() => setApiPaths(null))
      .finally(() => setLoading(false));
  }, []);

  const useApi = apiPaths && apiPaths.length > 0;

  return (
    <PageShell>
      {/* Header */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
          >
            LEARNING PATHS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-medium text-muted-foreground max-w-2xl"
          >
            Structured roadmaps to take you from beginner to job-ready. Pick a
            path and start building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <Link href="/pathfinder">
              <NeoButton variant="primary" size="sm">
                <Compass className="w-4 h-4 mr-2" />
                NOT SURE? TAKE THE QUIZ
              </NeoButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : useApi ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiPaths.map((path, i) => {
                const color =
                  path.color || COLOR_MAP[path.industry] || "bg-primary";
                const iconKey = ICON_MAP_BY_INDUSTRY[path.industry] || "Globe";

                return (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={`/learning-paths/${path.slug}`}
                      className="block bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform h-full"
                    >
                      <div className={`${color} h-2`} />
                      <div className="p-6 space-y-4 flex flex-col h-full">
                        <div className="flex items-center gap-3">
                          <div
                            className={`${color} p-3 rounded-xl neo-brutal-border text-white`}
                          >
                            {iconMap[iconKey] || <BookOpen size={28} />}
                          </div>
                          <div>
                            <h3 className="font-black text-xl leading-tight">
                              {path.title}
                            </h3>
                            <span className="text-xs font-bold text-muted-foreground capitalize">
                              {path.industry.replace(/-/g, " ")}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-muted-foreground leading-relaxed flex-1">
                          {path.shortDescription || path.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen size={12} /> {path.totalNodes} skills
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {path.estimatedHours}h
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} /> {path.enrollmentCount}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t-2 border-border">
                          <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                            <TrendingUp size={12} /> Demand:{" "}
                            {(path.marketDemand * 10).toFixed(0)}/10
                          </span>
                          <span className="text-xs font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                            VIEW PATH <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path, i) => (
                <motion.div
                  key={path.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/learning-paths/${path.slug}`}
                    className="block bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform h-full"
                  >
                    <div className={`${path.color} h-2`} />
                    <div className="p-6 space-y-4 flex flex-col h-full">
                      <div className="flex items-center gap-3">
                        <div
                          className={`${path.color} p-3 rounded-xl neo-brutal-border text-white`}
                        >
                          {iconMap[path.icon] || <BookOpen size={28} />}
                        </div>
                        <div>
                          <h3 className="font-black text-xl leading-tight">
                            {path.title}
                          </h3>
                          <span className="text-xs font-bold text-muted-foreground">
                            {path.difficulty}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm font-medium text-muted-foreground leading-relaxed flex-1">
                        {path.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} /> {path.courseCount} courses
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {path.estimatedHours}h
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t-2 border-border">
                        <span className="text-xs font-bold text-muted-foreground">
                          {path.courseCount} courses
                        </span>
                        <span className="text-xs font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          VIEW PATH <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
