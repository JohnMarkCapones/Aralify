"use client";

import { motion } from "framer-motion";
import { FloatingShapes, DotPattern } from "@/components/effects";

const languages = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
  { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
  { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
  { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Ruby", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
];

export function LanguageSection() {
  return (
    <section className="py-24 bg-card overflow-hidden relative">
      <DotPattern />
      <FloatingShapes shapes={[
        { type: "circle", size: 20, x: "5%", y: "20%", color: "bg-primary", delay: 0, duration: 9 },
        { type: "square", size: 16, x: "93%", y: "30%", color: "bg-secondary", delay: 1, duration: 11, rotate: 45 },
        { type: "diamond", size: 18, x: "90%", y: "75%", color: "bg-accent", delay: 2, duration: 10 },
      ]} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-3">50+ Languages</h2>
          <p className="text-lg font-medium text-muted-foreground">Write real code in the languages that matter most.</p>
        </motion.div>

        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={{ left: -1200, right: 0 }}
            className="flex gap-5 w-max py-6 px-4"
          >
            {languages.map((lang) => (
              <motion.div
                key={lang.name}
                whileHover={{ y: -8 }}
                className="w-40 p-6 neo-brutal-border neo-brutal-shadow flex flex-col items-center justify-center gap-3 bg-background group rounded-2xl shrink-0 transition-shadow hover:neo-brutal-shadow-lg"
              >
                <div className="p-3 rounded-xl border-2 border-border group-hover:bg-primary/10 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lang.icon} alt={lang.name} className="w-10 h-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" loading="lazy" />
                </div>
                <span className="font-black text-sm">{lang.name}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block">
            <div className="w-8 h-8 neo-brutal-border bg-card flex items-center justify-center text-sm font-black rounded-lg">&larr;</div>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block">
            <div className="w-8 h-8 neo-brutal-border bg-card flex items-center justify-center text-sm font-black rounded-lg">&rarr;</div>
          </div>
        </div>
      </div>
    </section>
  );
}
