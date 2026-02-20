"use client";

import { motion } from "framer-motion";
import { GraduationCap, Download, Share2, BookOpen, Award, Zap, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/page-header";
import { mockCertificates } from "@/lib/data/dashboard";
import { useCertificates } from "@/hooks/api";

// Lower rank = better grade. Used for finding the best grade across certificates.
const GRADE_RANK: Record<string, number> = {
  "A+": 1, A: 2, "A-": 3,
  "B+": 4, B: 5, "B-": 6,
  "C+": 7, C: 8,
};

const GRADE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  "A+": { bg: "bg-amber-100 dark:bg-amber-950/40", text: "text-amber-600 dark:text-amber-400", label: "Gold" },
  A: { bg: "bg-amber-100 dark:bg-amber-950/40", text: "text-amber-600 dark:text-amber-400", label: "Gold" },
  "A-": { bg: "bg-amber-100 dark:bg-amber-950/40", text: "text-amber-600 dark:text-amber-400", label: "Gold" },
  "B+": { bg: "bg-zinc-100 dark:bg-zinc-800", text: "text-zinc-500 dark:text-zinc-400", label: "Silver" },
  B: { bg: "bg-zinc-100 dark:bg-zinc-800", text: "text-zinc-500 dark:text-zinc-400", label: "Silver" },
  "B-": { bg: "bg-zinc-100 dark:bg-zinc-800", text: "text-zinc-500 dark:text-zinc-400", label: "Silver" },
  "C+": { bg: "bg-orange-100 dark:bg-orange-950/40", text: "text-orange-600 dark:text-orange-400", label: "Bronze" },
  C: { bg: "bg-orange-100 dark:bg-orange-950/40", text: "text-orange-600 dark:text-orange-400", label: "Bronze" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

function isGoldGrade(grade: string): boolean {
  return grade.startsWith("A");
}

export default function CertificatesPage() {
  const { data: apiCertificates, isLoading } = useCertificates();

  // Map API data to the shape the UI expects, or fall back to mock data
  const certificates = apiCertificates && apiCertificates.length > 0
    ? apiCertificates.map((c) => ({
        id: c.id,
        courseName: c.courseTitle,
        courseSlug: c.courseSlug,
        issuedAt: c.completedAt,
        grade: c.grade,
        xpTotal: c.totalXpEarned,
        downloadUrl: c.downloadUrl,
        color: c.color || "#3b82f6",
      }))
    : (!isLoading ? mockCertificates : []);

  const totalXp = certificates.reduce((sum, c) => sum + c.xpTotal, 0);
  const bestGrade = certificates.length > 0
    ? certificates.reduce((best, c) =>
        (GRADE_RANK[c.grade] ?? 99) < (GRADE_RANK[best] ?? 99) ? c.grade : best,
        certificates[0].grade,
      )
    : "-";

  const stats = [
    { icon: GraduationCap, label: "Certificates", value: certificates.length, color: "text-primary", bg: "bg-primary/10" },
    { icon: Zap, label: "Total XP", value: totalXp.toLocaleString(), color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-950/40" },
    { icon: Award, label: "Best Grade", value: bestGrade, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-950/40" },
    { icon: Star, label: "Gold Grades", value: certificates.filter((c) => isGoldGrade(c.grade)).length, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-950/40" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Certificates" description="Loading..." />
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates"
        description={`${certificates.length} certificate${certificates.length !== 1 ? "s" : ""} earned`}
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/40 shadow-sm"
          >
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", stat.bg)}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {certificates.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {certificates.map((cert, i) => {
            const gradeStyle = GRADE_STYLES[cert.grade] || GRADE_STYLES.C;
            const isGold = isGoldGrade(cert.grade);

            return (
              <motion.div
                key={cert.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className={cn(
                  "bg-background rounded-xl border shadow-sm overflow-hidden group",
                  isGold
                    ? "border-amber-300/50 dark:border-amber-500/20"
                    : "border-border/50"
                )}
              >
                {/* Richer gradient header with decorative pattern */}
                <div
                  className="h-28 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${cert.color}25, ${cert.color}50, ${cert.color}25)` }}
                >
                  {/* Decorative dot pattern */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle, ${cert.color} 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }} />

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <GraduationCap size={36} style={{ color: cert.color }} className="opacity-70 relative z-10" />

                  {/* Grade badge */}
                  <div className={cn(
                    "absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-xs",
                    gradeStyle.bg, gradeStyle.text
                  )}>
                    <Award size={12} />
                    {cert.grade}
                  </div>

                  {/* Sparkle on gold grades */}
                  {isGold && (
                    <div className="absolute top-3 left-3">
                      <Star size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-semibold mb-1">{cert.courseName}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Issued {new Date(cert.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      <Zap size={10} />
                      {cert.xpTotal.toLocaleString()} XP
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-white"
                      style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}cc)` }}
                    >
                      <Download size={14} />
                      Download
                    </button>
                    <button
                      className="flex items-center justify-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-medium hover:bg-muted transition-colors"
                      style={{ borderColor: cert.color + "40", color: cert.color }}
                    >
                      <Share2 size={14} />
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-background rounded-xl border border-border/50 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={32} className="text-primary/40" />
          </div>
          <h3 className="text-sm font-semibold mb-1">No certificates yet</h3>
          <p className="text-xs text-muted-foreground mb-4">Complete a course to earn your first certificate</p>
          <a
            href="/dashboard/courses"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            <BookOpen size={14} />
            Browse Courses
          </a>
        </div>
      )}
    </div>
  );
}
