"use client";

import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Globe,
  Heart,
  MapPin,
  Rocket,
  Star,
  Users,
  Zap,
  Coffee,
  GraduationCap,
  Clock,
} from "lucide-react";

const openPositions = [
  {
    title: "Senior Frontend Engineer",
    team: "Platform",
    location: "Remote (PH preferred)",
    type: "Full-time",
    tags: ["React", "TypeScript", "Next.js"],
    description: "Build the interactive learning experiences that make Aralify special. You'll own our code editor, gamification UI, and real-time features.",
  },
  {
    title: "Backend Engineer",
    team: "API",
    location: "Remote",
    type: "Full-time",
    tags: ["NestJS", "PostgreSQL", "Redis"],
    description: "Design and build the APIs powering code execution, gamification, and social features for thousands of learners.",
  },
  {
    title: "Mobile Developer",
    team: "Mobile",
    location: "Remote",
    type: "Full-time",
    tags: ["React Native", "Expo", "TypeScript"],
    description: "Build native iOS and Android apps with offline support. Help bring the Aralify experience to learners on the go.",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote (PH preferred)",
    type: "Full-time",
    tags: ["Figma", "Design Systems", "UX Research"],
    description: "Design intuitive, beautiful interfaces that make learning to code feel like play. Own our neo-brutalist design system.",
  },
  {
    title: "Content Creator — Courses",
    team: "Education",
    location: "Remote",
    type: "Contract",
    tags: ["Python", "JavaScript", "Curriculum Design"],
    description: "Write course content with difficulty tiers (Easy/Medium/Hard). Create exercises, quizzes, and projects for real-world learning.",
  },
  {
    title: "DevOps Engineer",
    team: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    tags: ["AWS", "Docker", "CI/CD"],
    description: "Keep our Judge0 code execution infrastructure fast, secure, and reliable. Scale systems for growing learner demand.",
  },
];

const perks = [
  { icon: <Globe size={24} />, title: "Fully Remote", desc: "Work from anywhere. We're a distributed team across the Philippines and beyond." },
  { icon: <Coffee size={24} />, title: "Flexible Hours", desc: "We care about output, not hours. Work when you're most productive." },
  { icon: <GraduationCap size={24} />, title: "Learning Budget", desc: "₱50,000/year for courses, conferences, books, or any learning resource." },
  { icon: <Heart size={24} />, title: "Health Coverage", desc: "Comprehensive HMO for you and one dependent. Mental health support included." },
  { icon: <Zap size={24} />, title: "Equipment Stipend", desc: "₱80,000 for your ideal setup — laptop, monitor, chair, whatever you need." },
  { icon: <Users size={24} />, title: "Team Retreats", desc: "Quarterly team meetups in different PH cities. Work hard, bond harder." },
];

const values = [
  { title: "Build for Learners", desc: "Every decision starts with: does this help someone learn to code?" },
  { title: "Ship Fast, Iterate", desc: "We prefer shipping 80% and learning from users over perfecting in isolation." },
  { title: "Open by Default", desc: "We share our learnings, open-source our tools, and communicate transparently." },
  { title: "Mastery Matters", desc: "We expect deep expertise and invest in your growth as an engineer." },
];

export default function CareersPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-1.5 neo-brutal-border rounded-full font-black text-sm uppercase tracking-widest mb-6">
              <Briefcase size={14} /> We&apos;re Hiring
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">CAREERS</h1>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              Join the team building the future of coding education in the Philippines. Remote-first, impact-driven, and growing fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card border-b-4 border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-10">HOW WE WORK</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 bg-background neo-brutal-border neo-brutal-shadow-sm rounded-xl"
              >
                <div className="w-8 h-8 bg-primary text-white neo-brutal-border rounded-lg flex items-center justify-center font-black text-sm mb-3">
                  {i + 1}
                </div>
                <h3 className="font-black text-base uppercase mb-1">{v.title}</h3>
                <p className="text-sm font-medium text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-10">PERKS & BENEFITS</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-card neo-brutal-border neo-brutal-shadow rounded-2xl space-y-3"
              >
                <div className="p-3 bg-primary/10 text-primary w-fit rounded-xl">{perk.icon}</div>
                <h3 className="font-black text-lg uppercase">{perk.title}</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-card border-y-4 border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">OPEN POSITIONS</h2>
          <p className="text-muted-foreground font-medium mb-10">{openPositions.length} open roles across our teams</p>
          <div className="space-y-4 max-w-4xl">
            {openPositions.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 4 }}
                className="p-6 bg-background neo-brutal-border neo-brutal-shadow-sm rounded-2xl group cursor-pointer transition-shadow hover:neo-brutal-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-black text-lg group-hover:text-primary transition-colors">{job.title}</h3>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">{job.team}</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-xs font-bold text-muted-foreground flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                      <span className="text-xs font-bold text-muted-foreground flex items-center gap-1"><Clock size={10} /> {job.type}</span>
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-muted rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <NeoButton variant="outline" size="sm" className="shrink-0 gap-1">
                    Apply <ArrowRight size={12} />
                  </NeoButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">DON&apos;T SEE YOUR ROLE?</h2>
          <p className="text-lg font-medium text-muted-foreground mb-8 max-w-xl mx-auto">
            We&apos;re always looking for talented people. Send us your resume and tell us how you&apos;d contribute to Aralify.
          </p>
          <NeoButton size="lg" variant="primary" className="text-xl h-16 px-12">
            SEND OPEN APPLICATION <ArrowRight size={18} className="ml-2" />
          </NeoButton>
        </div>
      </section>
    </PageShell>
  );
}
