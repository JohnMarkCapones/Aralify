"use client";

import { motion } from "framer-motion";
import { Clock, BookOpen, ArrowRight, Star } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import Link from "next/link";
import { GridPattern, FloatingShapes } from "@/components/effects";

const courses = [
  {
    slug: "python-fundamentals",
    title: "Python Fundamentals",
    description: "Learn Python from scratch -- variables, loops, functions, and your first real project.",
    language: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    lessons: 24,
    hours: 12,
    difficulty: "Beginner",
    color: "bg-[#3776AB]",
    rating: 4.8,
    students: 1240,
  },
  {
    slug: "javascript-essentials",
    title: "JavaScript Essentials",
    description: "Master JavaScript fundamentals -- DOM manipulation, async/await, and modern ES6+ features.",
    language: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    lessons: 32,
    hours: 16,
    difficulty: "Beginner",
    color: "bg-[#F7DF1E]",
    rating: 4.9,
    students: 980,
  },
  {
    slug: "react-from-zero",
    title: "React From Zero",
    description: "Build modern UIs with React -- components, hooks, state management, and real-world apps.",
    language: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    lessons: 28,
    hours: 18,
    difficulty: "Intermediate",
    color: "bg-[#61DAFB]",
    rating: 4.7,
    students: 760,
  },
  {
    slug: "typescript-mastery",
    title: "TypeScript Mastery",
    description: "Level up your JavaScript with types -- generics, utility types, and type-safe patterns.",
    language: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    lessons: 20,
    hours: 10,
    difficulty: "Intermediate",
    color: "bg-[#3178C6]",
    rating: 4.6,
    students: 540,
  },
  {
    slug: "node-backend",
    title: "Node.js Backend",
    description: "Build REST APIs with Node.js, Express, and databases. Deploy your first backend.",
    language: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    lessons: 26,
    hours: 14,
    difficulty: "Intermediate",
    color: "bg-[#339933]",
    rating: 4.8,
    students: 620,
  },
  {
    slug: "html-css-foundations",
    title: "HTML & CSS Foundations",
    description: "Build beautiful websites from scratch -- responsive layouts, Flexbox, Grid, and animations.",
    language: "HTML/CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    lessons: 18,
    hours: 8,
    difficulty: "Beginner",
    color: "bg-[#E34F26]",
    rating: 4.9,
    students: 1580,
  },
];

export function CoursePreview() {
  return (
    <section className="py-32 bg-card relative overflow-hidden">
      <GridPattern />
      <FloatingShapes shapes={[
        { type: "circle", size: 25, x: "5%", y: "10%", color: "bg-primary", delay: 0, duration: 10 },
        { type: "square", size: 20, x: "92%", y: "20%", color: "bg-secondary", delay: 1, duration: 12, rotate: 45 },
        { type: "diamond", size: 22, x: "88%", y: "85%", color: "bg-accent", delay: 2, duration: 9 },
        { type: "cross", size: 18, x: "8%", y: "80%", color: "bg-primary", delay: 1.5, duration: 11 },
      ]} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">POPULAR COURSES</h2>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
            Structured courses with real code challenges. Start for free, upgrade when ready.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courses.map((course, i) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-background neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden group"
            >
              {/* Color banner */}
              <div className={`${course.color} h-3`} />

              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={course.icon} alt={course.language} className="w-10 h-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" loading="lazy" />
                    <div>
                      <h3 className="font-black text-lg leading-tight">{course.title}</h3>
                      <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border mt-1 inline-block ${
                        course.difficulty === "Beginner" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
                      }`}>
                        {course.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{course.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} /> {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {course.hours}h
                  </span>
                  <span className="flex items-center gap-1 text-accent-foreground">
                    <Star size={14} className="fill-accent text-accent" /> {course.rating}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t-2 border-border">
                  <span className="text-sm font-bold text-muted-foreground">{course.students.toLocaleString()} learners</span>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-sm font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    START <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/courses">
            <NeoButton size="lg" variant="outline" className="text-lg h-14 px-10 group">
              BROWSE ALL COURSES <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </NeoButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
