"use client";

import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { Check, X, ArrowRight, Star, Quote } from "lucide-react";
import Link from "next/link";

const platforms = ["Aralify", "Codecademy", "freeCodeCamp", "Mimo"];

const features = [
  { name: "Free tier available", values: [true, true, true, true] },
  { name: "Difficulty tiers per lesson", values: [true, false, false, false] },
  { name: "XP multipliers", values: [true, false, false, false] },
  { name: "Real code execution", values: [true, true, true, true] },
  { name: "Gamification (XP, streaks)", values: [true, true, false, true] },
  { name: "Leaderboards", values: [true, false, false, true] },
  { name: "Daily challenges", values: [true, false, false, true] },
  { name: "Certificates", values: [true, true, true, false] },
  { name: "Mobile app", values: [true, true, false, true] },
  { name: "Offline mode", values: [true, false, false, true] },
  { name: "Filipino language support", values: [true, false, false, false] },
  { name: "Community features", values: [true, true, true, false] },
  { name: "Team/classroom plans", values: [true, true, false, false] },
  { name: "Open source curriculum", values: [false, false, true, false] },
];

export default function ComparePage() {
  return (
    <PageShell>
      {/* Header */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
          >
            COMPARE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-medium text-muted-foreground max-w-2xl mx-auto"
          >
            See how Aralify stacks up against other coding platforms.
          </motion.p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-4 border-border">
                  <th className="text-left py-4 px-4 font-black uppercase text-sm tracking-wider w-1/3">Feature</th>
                  {platforms.map((platform, i) => (
                    <th
                      key={platform}
                      className={`text-center py-4 px-4 font-black uppercase text-sm tracking-wider ${
                        i === 0 ? 'bg-primary/5' : ''
                      }`}
                    >
                      <span className={i === 0 ? 'text-primary' : ''}>{platform}</span>
                      {i === 0 && (
                        <div className="flex justify-center mt-1">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} size={10} className="fill-primary text-primary" />
                          ))}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, fi) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: fi * 0.03 }}
                    className="border-b-2 border-border"
                  >
                    <td className="py-4 px-4 font-bold text-sm">{feature.name}</td>
                    {feature.values.map((val, vi) => (
                      <td
                        key={vi}
                        className={`text-center py-4 px-4 ${vi === 0 ? 'bg-primary/5' : ''}`}
                      >
                        {val ? (
                          <Check size={18} className="mx-auto text-green-500" />
                        ) : (
                          <X size={18} className="mx-auto text-muted-foreground/30" />
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-card border-y-4 border-border">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Quote size={32} className="mx-auto text-primary/30 mb-4" />
          <blockquote className="text-xl font-bold leading-relaxed mb-6">
            &quot;I tried Codecademy and freeCodeCamp before Aralify. The difficulty tiers and XP system made all the difference — I actually stick with it because it feels like a game.&quot;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=MariaS"
              alt="Maria Santos"
              className="w-10 h-10 rounded-full neo-brutal-border"
              loading="lazy"
            />
            <div className="text-left">
              <div className="font-black text-sm">Maria Santos</div>
              <div className="text-xs font-bold text-muted-foreground">Computer Science Student, UP Diliman</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">READY TO START?</h2>
          <p className="text-lg font-medium text-muted-foreground mb-8">
            Join thousands of learners on Aralify — for free.
          </p>
          <Link href="/signup">
            <NeoButton variant="primary" size="lg" className="text-lg h-14 px-10">
              GET STARTED FREE <ArrowRight size={18} className="ml-2" />
            </NeoButton>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
