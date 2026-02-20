"use client";

import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Code2,
  Compass,
  Flame,
  Globe,
  GraduationCap,
  Layers,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const learningPaths = [
  {
    title: "Full-Stack Web Developer",
    description: "From HTML basics to deploying full-stack apps. The complete web development journey.",
    courses: 5,
    hours: 68,
    difficulty: "Beginner → Advanced",
    icon: <Globe size={28} />,
    color: "bg-primary",
    tags: ["HTML/CSS", "JavaScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Python Data Science",
    description: "Learn Python, data analysis, visualization, and machine learning fundamentals.",
    courses: 4,
    hours: 52,
    difficulty: "Beginner → Intermediate",
    icon: <Target size={28} />,
    color: "bg-green-500",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib"],
  },
  {
    title: "Mobile App Developer",
    description: "Build cross-platform mobile apps with React Native and TypeScript.",
    courses: 3,
    hours: 40,
    difficulty: "Intermediate",
    icon: <Rocket size={28} />,
    color: "bg-secondary",
    tags: ["TypeScript", "React Native", "Expo"],
  },
];

const trendingCourses = [
  { title: "Python Fundamentals", students: 1240, rating: 4.8, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", slug: "python-fundamentals", color: "bg-[#3776AB]", trend: "+23%" },
  { title: "JavaScript Essentials", students: 980, rating: 4.9, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", slug: "javascript-essentials", color: "bg-[#F7DF1E]", trend: "+18%" },
  { title: "React From Zero", students: 760, rating: 4.7, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", slug: "react-from-zero", color: "bg-[#61DAFB]", trend: "+31%" },
  { title: "TypeScript Mastery", students: 540, rating: 4.6, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", slug: "typescript-mastery", color: "bg-[#3178C6]", trend: "+15%" },
];

const recommended = [
  { title: "Node.js Backend", reason: "Based on your JavaScript progress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", slug: "node-backend", match: "92%" },
  { title: "TypeScript Mastery", reason: "Popular with JS learners", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", slug: "typescript-mastery", match: "87%" },
  { title: "React From Zero", reason: "Next step in your journey", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", slug: "react-from-zero", match: "85%" },
];

const categories = [
  { name: "Web Development", count: 12, icon: <Globe size={20} />, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" },
  { name: "Data Science", count: 6, icon: <Target size={20} />, color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400" },
  { name: "Mobile Dev", count: 4, icon: <Rocket size={20} />, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400" },
  { name: "DevOps", count: 3, icon: <Layers size={20} />, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400" },
  { name: "Algorithms", count: 5, icon: <Code2 size={20} />, color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" },
  { name: "Databases", count: 4, icon: <GraduationCap size={20} />, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400" },
];

export default function ExplorePage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 neo-brutal-border rounded-full font-black text-sm uppercase tracking-widest mb-6">
              <Compass size={14} /> Discover
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">EXPLORE</h1>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              Discover learning paths, trending courses, and personalized recommendations based on your progress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-4 py-2.5 neo-brutal-border rounded-xl bg-background hover:bg-primary/5 transition-colors"
              >
                <div className={`p-1.5 rounded-lg ${cat.color}`}>{cat.icon}</div>
                <span className="font-black text-sm">{cat.name}</span>
                <span className="text-xs font-bold text-muted-foreground">({cat.count})</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">LEARNING PATHS</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
            {learningPaths.map((path, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden group"
              >
                <div className={`${path.color} p-6 text-white`}>
                  <div className="bg-white/20 w-fit p-3 rounded-xl mb-4">{path.icon}</div>
                  <h3 className="text-xl font-black uppercase tracking-tight">{path.title}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">{path.description}</p>
                  <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                    <span className="flex items-center gap-1"><BookOpen size={12} /> {path.courses} courses</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {path.hours}h</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {path.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="text-xs font-black text-muted-foreground uppercase">{path.difficulty}</div>
                  <NeoButton variant="outline" size="sm" className="w-full gap-2">
                    View Path <ArrowRight size={12} />
                  </NeoButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 bg-card border-y-4 border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={24} className="text-primary" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">TRENDING NOW</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
            {trendingCourses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/courses/${course.slug}`} className="block bg-background neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden group">
                  <div className={`${course.color} h-2`} />
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={course.icon} alt={course.title} className="w-10 h-10" loading="lazy" />
                      <span className="text-xs font-black text-green-600 dark:text-green-400 flex items-center gap-1">
                        <TrendingUp size={10} /> {course.trend}
                      </span>
                    </div>
                    <h3 className="font-black text-base">{course.title}</h3>
                    <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                      <span className="flex items-center gap-1"><Users size={10} /> {course.students.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Star size={10} className="fill-accent text-accent" /> {course.rating}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended For You */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Zap size={24} className="text-accent" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">RECOMMENDED FOR YOU</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            {recommended.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/courses/${rec.slug}`} className="block bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 space-y-4 group">
                  <div className="flex items-center justify-between">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rec.icon} alt={rec.title} className="w-12 h-12" loading="lazy" />
                    <span className="text-xs font-black text-primary bg-primary/10 px-2 py-1 rounded-full">{rec.match} match</span>
                  </div>
                  <h3 className="font-black text-lg">{rec.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{rec.reason}</p>
                  <span className="text-sm font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    START <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
