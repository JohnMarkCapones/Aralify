"use client";

import { motion } from "framer-motion";

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
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Master Every Stack</h2>
          <p className="text-xl font-bold opacity-70 uppercase tracking-widest">Industry-standard languages at your fingertips</p>
        </div>

        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={{ left: -1200, right: 0 }}
            className="flex gap-6 w-max py-8 px-4"
          >
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                whileHover={{ y: -15, rotate: i % 2 === 0 ? 2 : -2, scale: 1.05 }}
                className="w-48 p-8 neo-brutal-border neo-brutal-shadow flex flex-col items-center justify-center gap-4 bg-background group rounded-3xl shrink-0"
              >
                <div className="p-4 rounded-2xl border-2 border-black group-hover:bg-primary transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lang.icon} alt={lang.name} className="w-12 h-12" />
                </div>
                <span className="font-black text-lg">{lang.name}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block">
            <div className="w-10 h-10 neo-brutal-border bg-white flex items-center justify-center">←</div>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block">
            <div className="w-10 h-10 neo-brutal-border bg-white flex items-center justify-center">→</div>
          </div>
        </div>
      </div>
    </section>
  );
}
