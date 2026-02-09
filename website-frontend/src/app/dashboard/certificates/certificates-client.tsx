"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Award, Download, Share2, Code2, Settings, User, BookOpen,
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { LogoutButton } from "../logout-button";

const certificates = [
  {
    id: "cert-001",
    course: "HTML & CSS Foundations",
    date: "January 15, 2026",
    difficulty: "Beginner",
    color: "from-orange-500 to-red-500",
  },
];

export function CertificatesClient({ userEmail }: { userEmail: string }) {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      {/* Top bar */}
      <div className="border-b-3 border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-primary text-white rounded-lg neo-brutal-border">
              <Code2 size={18} />
            </div>
            <span className="font-display font-black text-xl uppercase tracking-tighter">Aralify</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <Link href="/settings" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Settings">
              <Settings size={18} />
            </Link>
            <Link href="/profile/me" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Profile">
              <User size={18} />
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Award size={28} /> CERTIFICATES
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Your earned certificates of completion.</p>
        </motion.div>

        {certificates.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden group"
              >
                {/* Certificate preview */}
                <div className={`bg-gradient-to-br ${cert.color} p-8 text-white relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative z-10 text-center space-y-2">
                    <Award size={32} className="mx-auto" />
                    <div className="font-display font-black text-xs uppercase tracking-[0.2em]">Certificate of Completion</div>
                    <div className="font-black text-lg">{cert.course}</div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-muted-foreground">{cert.date}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full neo-brutal-border bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                      {cert.difficulty}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <NeoButton variant="primary" size="sm" className="flex-1 rounded-xl">
                      <Download size={14} className="mr-1" /> Download
                    </NeoButton>
                    <NeoButton variant="outline" size="sm" className="rounded-xl">
                      <Share2 size={14} />
                    </NeoButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl"
          >
            <div className="mx-auto w-20 h-20 bg-muted rounded-2xl neo-brutal-border flex items-center justify-center mb-6">
              <Award size={36} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">NO CERTIFICATES YET</h2>
            <p className="text-muted-foreground font-medium mb-6">
              Complete a course to earn your first certificate.
            </p>
            <Link href="/courses">
              <NeoButton variant="primary" size="md">
                <BookOpen size={16} className="mr-2" /> BROWSE COURSES
              </NeoButton>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
