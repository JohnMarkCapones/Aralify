"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { learningPaths } from "@/lib/data/learning-paths";
import {
  ArrowRight, BookOpen, Clock, Globe, Terminal, BarChart3, Smartphone, Cloud,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={28} />,
  Terminal: <Terminal size={28} />,
  BarChart3: <BarChart3 size={28} />,
  Smartphone: <Smartphone size={28} />,
  Cloud: <Cloud size={28} />,
};

export default function LearningPathsPage() {
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
            Structured roadmaps to take you from beginner to job-ready. Pick a path and start building.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
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
                      <div className={`${path.color} p-3 rounded-xl neo-brutal-border text-white`}>
                        {iconMap[path.icon] || <BookOpen size={28} />}
                      </div>
                      <div>
                        <h3 className="font-black text-xl leading-tight">{path.title}</h3>
                        <span className="text-xs font-bold text-muted-foreground">{path.difficulty}</span>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-muted-foreground leading-relaxed flex-1">
                      {path.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                      <span className="flex items-center gap-1"><BookOpen size={12} /> {path.courseCount} courses</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {path.estimatedHours}h</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t-2 border-border">
                      <span className="text-xs font-bold text-muted-foreground">{path.courseCount} courses</span>
                      <span className="text-xs font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        VIEW PATH <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
