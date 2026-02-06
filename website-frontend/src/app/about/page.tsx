"use client";

import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { Code2, Heart, Globe, Users, Zap, Target, BookOpen, Trophy } from "lucide-react";

const team = [
  { name: "John Mark Capones", role: "Founder & Lead Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnMark", bio: "Full-stack developer passionate about making coding education accessible to every Filipino learner." },
  { name: "Dev Team", role: "Engineering", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevTeam", bio: "A growing team of developers building the future of interactive programming education." },
];

const milestones = [
  { date: "2025 Q3", event: "Idea born -- interactive coding platform with difficulty tiers", icon: <Target size={20} /> },
  { date: "2025 Q4", event: "Backend API built with NestJS, Prisma, and Judge0 integration", icon: <Code2 size={20} /> },
  { date: "2026 Q1", event: "Website frontend launched with neo-brutalist design", icon: <Zap size={20} /> },
  { date: "2026 Q2", event: "Open beta launch with first 8 courses", icon: <BookOpen size={20} /> },
  { date: "2026 Q3", event: "Mobile app release (iOS & Android)", icon: <Globe size={20} /> },
  { date: "2026 Q4", event: "Filipino language support & 50+ courses", icon: <Trophy size={20} /> },
];

const values = [
  { icon: <Heart size={28} />, title: "Learn by Doing", desc: "We believe you learn to code by writing code -- not by watching videos. Every lesson has hands-on challenges." },
  { icon: <Users size={28} />, title: "Accessible to All", desc: "Free tier forever. No paywalls on learning. Difficulty tiers mean everyone can start where they're comfortable." },
  { icon: <Globe size={28} />, title: "Built for Filipinos", desc: "While open to everyone, we're building with Filipino learners in mind -- including future Tagalog language support." },
  { icon: <Zap size={28} />, title: "Gamification Works", desc: "XP, streaks, badges, and leaderboards aren't gimmicks. They're proven motivational tools backed by learning science." },
];

export default function AboutPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">ABOUT ARALIFY</h1>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              &quot;Aral&quot; means &quot;to learn&quot; in Filipino. Aralify is an interactive programming education platform that makes learning to code accessible, engaging, and effective for everyone -- especially Filipino learners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">OUR MISSION</h2>
              <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                We&apos;re building the platform we wish existed when we started learning to code. One that doesn&apos;t just show you answers -- it challenges you to think, write real code, and grow at your own pace.
              </p>
              <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                Our unique difficulty tier system (Easy, Medium, Hard) with XP multipliers means beginners aren&apos;t overwhelmed and advanced learners aren&apos;t bored. Everyone gets the right level of challenge.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl p-10 text-center space-y-4"
            >
              <div className="text-6xl font-black text-primary">2,500+</div>
              <div className="font-black uppercase text-lg">LEARNERS ENROLLED</div>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-border">
                <div>
                  <div className="text-3xl font-black">8</div>
                  <div className="text-sm font-bold text-muted-foreground">Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-black">50+</div>
                  <div className="text-sm font-bold text-muted-foreground">Languages</div>
                </div>
                <div>
                  <div className="text-3xl font-black">3</div>
                  <div className="text-sm font-bold text-muted-foreground">Difficulty Tiers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card border-y-4 border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-12">WHAT WE BELIEVE</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-background neo-brutal-border neo-brutal-shadow rounded-2xl space-y-3"
              >
                <div className="p-3 bg-primary/10 text-primary w-fit rounded-xl">{v.icon}</div>
                <h3 className="font-black text-lg uppercase">{v.title}</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-12">OUR JOURNEY</h2>
          <div className="max-w-2xl mx-auto space-y-0">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 relative"
              >
                {/* Line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary text-white neo-brutal-border rounded-full flex items-center justify-center shrink-0 z-10">
                    {m.icon}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 h-full bg-border flex-1" />}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="text-sm font-black text-primary uppercase tracking-widest">{m.date}</div>
                  <p className="font-bold text-lg mt-1">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-primary/5 border-t-4 border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-12">THE TEAM</h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl p-6 text-center space-y-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full neo-brutal-border mx-auto" loading="lazy" />
                <div>
                  <h3 className="font-black text-xl">{member.name}</h3>
                  <p className="text-sm font-bold text-primary uppercase">{member.role}</p>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
