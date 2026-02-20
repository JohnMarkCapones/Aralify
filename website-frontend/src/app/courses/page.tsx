"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { courses as mockCourses, allTopics, allDifficulties } from "@/lib/data/courses";
import { useCourses } from "@/hooks/api";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, Star, ArrowRight, X, Loader2 } from "lucide-react";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const { data: apiCourses, isLoading, isError } = useCourses();

  // Use API courses if available, fall back to mock data
  const courses = apiCourses ?? mockCourses;

  // Derive unique topics and difficulties from actual data
  const topics = useMemo(() => {
    if (apiCourses) {
      const set = new Set<string>();
      apiCourses.forEach((c) => c.topics?.forEach((t) => set.add(t)));
      return Array.from(set).sort();
    }
    return allTopics;
  }, [apiCourses]);

  const difficulties = useMemo(() => {
    if (apiCourses) {
      const set = new Set<string>();
      apiCourses.forEach((c) => set.add(c.difficulty));
      return Array.from(set);
    }
    return allDifficulties;
  }, [apiCourses]);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        !search ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        ("language" in course &&
          (course as { language: string }).language
            .toLowerCase()
            .includes(search.toLowerCase()));
      const matchesTopic =
        !selectedTopic ||
        ("topics" in course &&
          (course as { topics: string[] }).topics.includes(selectedTopic));
      const matchesDifficulty =
        !selectedDifficulty || course.difficulty === selectedDifficulty;
      return matchesSearch && matchesTopic && matchesDifficulty;
    });
  }, [courses, search, selectedTopic, selectedDifficulty]);

  const hasFilters = search || selectedTopic || selectedDifficulty;

  return (
    <PageShell>
      {/* Header */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">ALL COURSES</h1>
          <p className="text-lg font-medium text-muted-foreground max-w-2xl">
            {courses.length} structured courses with Easy, Medium, and Hard difficulty tiers. Start for free.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 neo-brutal-border neo-brutal-shadow-sm rounded-xl bg-card font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(selectedDifficulty === d ? null : d)}
                  className={`px-4 py-2 neo-brutal-border rounded-full font-black text-sm uppercase transition-colors ${
                    selectedDifficulty === d ? "bg-primary text-white" : "bg-card hover:bg-primary/10"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Topic pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                className={`px-3 py-1.5 border-2 border-border rounded-full font-bold text-xs uppercase transition-colors ${
                  selectedTopic === topic ? "bg-secondary text-white border-secondary" : "bg-card hover:bg-secondary/10"
                }`}
              >
                {topic}
              </button>
            ))}
            {hasFilters && (
              <button
                onClick={() => { setSearch(""); setSelectedTopic(null); setSelectedDifficulty(null); }}
                className="px-3 py-1.5 border-2 border-destructive text-destructive rounded-full font-bold text-xs uppercase flex items-center gap-1"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          )}

          {/* Results */}
          {!isLoading && (
            <>
              <p className="text-sm font-bold text-muted-foreground mb-6">
                {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((course, i) => (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/courses/${course.slug}`}
                      className="block bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform"
                    >
                      <div className={`${course.color} h-2`} />
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={course.icon} alt={course.language} className="w-10 h-10" loading="lazy" />
                          <div>
                            <h3 className="font-black text-base leading-tight">{course.title}</h3>
                            <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border inline-block mt-0.5 ${
                              course.difficulty === "Beginner" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" :
                              course.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" :
                              "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                            }`}>
                              {course.difficulty}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-muted-foreground leading-relaxed line-clamp-2">{course.description}</p>

                        <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                          <span className="flex items-center gap-1"><BookOpen size={12} /> {course.lessons}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {course.hours}h</span>
                          <span className="flex items-center gap-1"><Star size={12} className="fill-accent text-accent" /> {course.rating}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t-2 border-border">
                          <span className="text-xs font-bold text-muted-foreground">{course.students.toLocaleString()} learners</span>
                          <span className="text-xs font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                            VIEW <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">:(</div>
                  <h3 className="text-2xl font-black mb-2">NO COURSES FOUND</h3>
                  <p className="text-muted-foreground font-medium">Try adjusting your search or filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
