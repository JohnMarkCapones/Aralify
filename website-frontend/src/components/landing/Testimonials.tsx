"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "Sr. Engineer @ Netflix", text: "Aralify's 3D systems made complex architectural patterns click for me. Best investment in my career.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { name: "Marcus Thorne", role: "CTO @ Bloom", text: "We use Aralify to onboard our junior devs. The interactive terminal is light-years ahead of video tutorials.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
  { name: "Leila Vane", role: "Fullstack Dev", text: "The community challenges are addictive. I've learned more in 3 months here than 2 years in college.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leila" },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-20 uppercase tracking-tighter italic">Voice of the Network</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-10 bg-white neo-brutal-border neo-brutal-shadow rounded-3xl relative"
            >
              <Quote className="absolute -top-6 -left-6 text-primary w-12 h-12 p-2 bg-black rounded-xl border-2 border-white" />
              <p className="text-xl font-bold italic mb-8 leading-relaxed">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-4 border-t-2 border-black pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-black" />
                <div>
                  <div className="font-black text-lg">{t.name}</div>
                  <div className="font-bold text-primary text-sm uppercase">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
