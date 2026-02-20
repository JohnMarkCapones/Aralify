"use client";

import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { motion } from "framer-motion";
import { Award, Calendar, CheckCircle, Code2, Download, ExternalLink, GraduationCap, Share2, Shield, Star } from "lucide-react";

const certificate = {
  id: "CERT-ARL-2026-00847",
  learnerName: "Juan Dela Cruz",
  courseTitle: "Python Fundamentals",
  courseIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  completionDate: "February 5, 2026",
  totalXp: 7200,
  difficulty: "All Tiers Completed",
  lessonsCompleted: 24,
  hoursSpent: 14,
  grade: "Distinction",
  verified: true,
  instructor: "Dr. Maria Santos",
};

export default function CertificatePage() {
  return (
    <PageShell>
      {/* Verification Header */}
      <section className="py-8 bg-green-500 text-white border-b-4 border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <Shield size={20} />
            <span className="font-black text-sm uppercase tracking-widest">Verified Certificate</span>
            <CheckCircle size={16} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Certificate Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-3xl overflow-hidden">
              {/* Certificate header band */}
              <div className="bg-gradient-to-r from-primary via-secondary to-primary h-3" />

              <div className="p-8 md:p-12 space-y-8">
                {/* Logo + Title */}
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="bg-primary p-2 neo-brutal-border rounded-lg">
                      <Code2 size={24} className="text-white" />
                    </div>
                    <span className="text-2xl font-display font-black tracking-tighter uppercase">
                      ARAL<span className="text-primary">IFY</span>
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">Certificate of Completion</h2>
                    <div className="w-24 h-0.5 bg-primary mx-auto" />
                  </div>
                </div>

                {/* Recipient */}
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">This certifies that</p>
                  <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{certificate.learnerName}</h1>
                  <p className="text-sm font-medium text-muted-foreground">has successfully completed</p>
                </div>

                {/* Course */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-4 bg-primary/5 neo-brutal-border neo-brutal-shadow-sm rounded-2xl px-8 py-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={certificate.courseIcon} alt="" className="w-12 h-12" />
                    <div className="text-left">
                      <h3 className="text-2xl font-black uppercase tracking-tight">{certificate.courseTitle}</h3>
                      <p className="text-sm font-bold text-muted-foreground">{certificate.difficulty}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Grade", value: certificate.grade, icon: <Star size={16} className="text-accent" /> },
                    { label: "Lessons", value: String(certificate.lessonsCompleted), icon: <GraduationCap size={16} className="text-primary" /> },
                    { label: "Hours", value: `${certificate.hoursSpent}h`, icon: <Calendar size={16} className="text-secondary" /> },
                    { label: "Total XP", value: certificate.totalXp.toLocaleString(), icon: <Award size={16} className="text-primary" /> },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-3 bg-muted/30 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">{stat.icon}</div>
                      <div className="font-black text-lg">{stat.value}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t-2 border-border gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-xs font-bold text-muted-foreground">Issued on</p>
                    <p className="font-black text-sm">{certificate.completionDate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-muted-foreground">Instructor</p>
                    <p className="font-black text-sm">{certificate.instructor}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-xs font-bold text-muted-foreground">Certificate ID</p>
                    <p className="font-mono font-bold text-xs text-primary">{certificate.id}</p>
                  </div>
                </div>
              </div>

              {/* Bottom band */}
              <div className="bg-gradient-to-r from-primary via-secondary to-primary h-3" />
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto mt-8 flex flex-wrap justify-center gap-3"
          >
            <NeoButton variant="primary" className="gap-2">
              <Download size={16} /> Download PDF
            </NeoButton>
            <NeoButton variant="outline" className="gap-2">
              <Share2 size={16} /> Share on LinkedIn
            </NeoButton>
            <NeoButton variant="outline" className="gap-2">
              <ExternalLink size={16} /> Share Link
            </NeoButton>
          </motion.div>

          {/* Verification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-lg mx-auto mt-10 text-center"
          >
            <div className="bg-green-100/50 dark:bg-green-900/20 neo-brutal-border rounded-xl p-4 flex items-center gap-3 justify-center">
              <Shield size={18} className="text-green-600 dark:text-green-400" />
              <div className="text-left">
                <div className="font-black text-sm text-green-800 dark:text-green-300">Certificate Verified</div>
                <div className="text-xs font-medium text-green-600 dark:text-green-400">
                  This certificate is authentic and was issued by Aralify on {certificate.completionDate}.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
