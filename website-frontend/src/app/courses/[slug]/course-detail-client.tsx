"use client";

import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import type { Course } from "@/lib/data/courses";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock, Star, Users, Zap } from "lucide-react";
import Link from "next/link";

export function CourseDetailClient({ course }: { course: Course }) {
  return (
    <PageShell>
      {/* Hero Banner */}
      <section className={`${course.color} py-16 border-b-4 border-border`}>
        <div className="container mx-auto px-4">
          <Link href="/courses" className="inline-flex items-center gap-2 text-white/80 font-bold mb-6 hover:text-white transition-colors">
            <ArrowLeft size={16} /> All Courses
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={course.icon} alt={course.language} className="w-20 h-20 bg-white p-3 rounded-2xl neo-brutal-border" />
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-black uppercase px-3 py-1 rounded-full neo-brutal-border bg-white ${
                  course.difficulty === "Beginner" ? "text-green-800" :
                  course.difficulty === "Intermediate" ? "text-yellow-800" :
                  "text-red-800"
                }`}>
                  {course.difficulty}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">{course.title}</h1>
              <p className="text-lg font-medium opacity-80 mt-2 max-w-2xl">{course.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8 text-white">
            {[
              { icon: <BookOpen size={18} />, label: `${course.lessons} Lessons` },
              { icon: <Clock size={18} />, label: `${course.hours} Hours` },
              { icon: <Star size={18} className="fill-white" />, label: `${course.rating} Rating` },
              { icon: <Users size={18} />, label: `${course.students.toLocaleString()} Learners` },
              { icon: <Zap size={18} />, label: "1x / 2x / 3x XP" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 font-bold text-sm opacity-80">
                {stat.icon} {stat.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">ABOUT THIS COURSE</h2>
                <p className="text-lg font-medium text-muted-foreground leading-relaxed">{course.longDescription}</p>
              </div>

              {/* Syllabus */}
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">SYLLABUS</h2>
                <div className="space-y-3">
                  {course.syllabus.map((module, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between p-5 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl group hover:-translate-y-0.5 transition-transform"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 text-primary font-black text-sm flex items-center justify-center rounded-lg neo-brutal-border">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <h3 className="font-black text-base">{module.title}</h3>
                          <p className="text-sm font-medium text-muted-foreground">{module.lessons} lessons</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Difficulty Tiers Explanation */}
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">DIFFICULTY TIERS</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { tier: "EASY", xp: "1x XP", desc: "Core concepts, guided examples, straightforward challenges.", color: "bg-green-100 border-green-500" },
                    { tier: "MEDIUM", xp: "2x XP", desc: "Less hand-holding, real-world scenarios, multi-step problems.", color: "bg-yellow-100 border-yellow-500" },
                    { tier: "HARD", xp: "3x XP", desc: "Production-level challenges, edge cases, performance constraints.", color: "bg-red-100 border-red-500" },
                  ].map((t) => (
                    <div key={t.tier} className={`p-5 rounded-xl neo-brutal-border border-l-4 ${t.color}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-lg">{t.tier}</span>
                        <span className="text-sm font-black text-primary">{t.xp}</span>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-6 space-y-5 sticky top-28">
                <div className="text-center">
                  <div className="text-4xl font-black">FREE</div>
                  <p className="text-sm font-medium text-muted-foreground">Included in Hobbyist plan</p>
                </div>

                <NeoButton size="lg" variant="primary" className="w-full text-lg h-14 group">
                  START COURSE <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </NeoButton>

                <div className="space-y-3 pt-4 border-t-2 border-border">
                  <h4 className="font-black text-sm uppercase">What you&apos;ll get:</h4>
                  {[
                    `${course.lessons} interactive lessons`,
                    "Easy, Medium & Hard tiers",
                    "Real code execution",
                    "XP rewards & badges",
                    "Certificate on completion",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <CheckCircle size={14} className="text-green-600 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6">
                <h4 className="font-black text-sm uppercase mb-3">PREREQUISITES</h4>
                <ul className="space-y-2">
                  {course.prerequisites.map((p) => (
                    <li key={p} className="text-sm font-medium text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">-</span> {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Topics */}
              <div className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6">
                <h4 className="font-black text-sm uppercase mb-3">TOPICS</h4>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((t) => (
                    <span key={t} className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full neo-brutal-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
