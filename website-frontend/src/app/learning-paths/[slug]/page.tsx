"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { learningPaths } from "@/lib/data/learning-paths";
import {
  ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle, Star, Zap,
  Globe, Terminal, BarChart3, Smartphone, Cloud,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={32} />,
  Terminal: <Terminal size={32} />,
  BarChart3: <BarChart3 size={32} />,
  Smartphone: <Smartphone size={32} />,
  Cloud: <Cloud size={32} />,
};

export default function LearningPathDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const path = learningPaths.find((p) => p.slug === slug);

  if (!path) {
    return (
      <PageShell>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">PATH NOT FOUND</h1>
          <p className="text-muted-foreground font-medium mb-6">This learning path doesn&apos;t exist.</p>
          <Link href="/learning-paths">
            <NeoButton variant="primary" size="md">
              <ArrowLeft size={16} className="mr-2" /> BACK TO PATHS
            </NeoButton>
          </Link>
        </div>
      </PageShell>
    );
  }

  const totalLessons = path.courses.reduce((sum, c) => sum + c.lessons, 0);

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-16 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <Link href="/learning-paths" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={14} /> All Learning Paths
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className={`${path.color} p-4 rounded-2xl neo-brutal-border text-white shrink-0`}>
              {iconMap[path.icon] || <BookOpen size={32} />}
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
              >
                {path.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-medium text-muted-foreground mt-2 max-w-2xl"
              >
                {path.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main: Roadmap */}
          <div className="flex-1">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">COURSE ROADMAP</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-6">
                {path.courses.map((course, i) => (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-4 top-5 w-5 h-5 rounded-full neo-brutal-border z-10 ${
                      i === 0 ? 'bg-primary' : 'bg-card'
                    }`}>
                      {i === 0 && <div className="absolute inset-1 rounded-full bg-white" />}
                    </div>

                    <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 hover:neo-brutal-shadow-lg transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-black text-primary uppercase">Course {i + 1}</span>
                          </div>
                          <h3 className="text-xl font-black">{course.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-xs font-bold text-muted-foreground">
                            <span className="flex items-center gap-1"><BookOpen size={12} /> {course.lessons} lessons</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {course.hours}h</span>
                          </div>
                        </div>
                        <Link href={`/courses/${course.slug}`}>
                          <NeoButton variant="outline" size="sm" className="shrink-0">
                            VIEW <ArrowRight size={12} className="ml-1" />
                          </NeoButton>
                        </Link>
                      </div>

                      {course.milestone && (
                        <div className="mt-4 flex items-center gap-2 p-3 bg-primary/5 rounded-xl neo-brutal-border">
                          <Star size={14} className="text-primary shrink-0" />
                          <span className="text-xs font-black text-primary uppercase">Milestone: {course.milestone}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
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
              <h3 className="font-black uppercase tracking-tight mb-4">Path Stats</h3>
              <div className="space-y-4">
                {[
                  { label: "Courses", value: path.courseCount.toString(), icon: <BookOpen size={16} className="text-primary" /> },
                  { label: "Total Lessons", value: totalLessons.toString(), icon: <CheckCircle size={16} className="text-green-500" /> },
                  { label: "Estimated Time", value: `${path.estimatedHours}h`, icon: <Clock size={16} className="text-purple-500" /> },
                  { label: "Difficulty", value: path.difficulty, icon: <Zap size={16} className="text-orange-500" /> },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                      {stat.icon} {stat.label}
                    </span>
                    <span className="font-black text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>

              {path.prerequisites.length > 0 && (
                <div className="mt-6 pt-4 border-t-2 border-border">
                  <h4 className="font-black uppercase text-xs tracking-wider mb-2">Prerequisites</h4>
                  <ul className="space-y-1">
                    {path.prerequisites.map((prereq) => (
                      <li key={prereq} className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <span className="text-primary">•</span> {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link href="/signup" className="block mt-6">
                <NeoButton variant="primary" size="lg" className="w-full text-base">
                  START THIS PATH <ArrowRight size={16} className="ml-2" />
                </NeoButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
