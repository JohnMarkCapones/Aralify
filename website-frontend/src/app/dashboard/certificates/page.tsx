"use client";

import { GraduationCap, Download, Share2, BookOpen } from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { mockCertificates } from "@/lib/data/dashboard";

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates"
        description={`${mockCertificates.length} certificate${mockCertificates.length !== 1 ? "s" : ""} earned`}
      />

      {mockCertificates.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {mockCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden"
            >
              {/* Gradient header */}
              <div
                className="h-24 flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}40)` }}
              >
                <GraduationCap size={32} style={{ color: cert.color }} className="opacity-60" />
                <div
                  className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/30"
                  style={{ color: cert.color }}
                >
                  Grade: {cert.grade}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-sm font-semibold mb-1">{cert.courseName}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Issued {new Date(cert.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] text-muted-foreground">{cert.xpTotal.toLocaleString()} XP earned</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors">
                    <Download size={14} />
                    Download
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2 border border-border/50 rounded-lg text-xs font-medium hover:bg-muted transition-colors">
                    <Share2 size={14} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-background rounded-xl border border-border/50 shadow-sm">
          <GraduationCap size={48} className="mx-auto mb-4 text-muted-foreground/30" />
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
