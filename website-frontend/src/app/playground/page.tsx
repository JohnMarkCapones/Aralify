"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { motion } from "framer-motion";
import {
  Play,
  Terminal,
  Settings,
  Share2,
  Download,
  RotateCcw,
  Zap,
  Globe,
  Clock,
  Layers,
  ChevronDown,
  CheckCircle,
  Copy,
} from "lucide-react";

const languages = [
  { name: "Python", slug: "python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "bg-[#3776AB]" },
  { name: "JavaScript", slug: "javascript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "bg-[#F7DF1E]" },
  { name: "TypeScript", slug: "typescript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "bg-[#3178C6]" },
  { name: "Java", slug: "java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "bg-[#ED8B00]" },
  { name: "C++", slug: "cplusplus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "bg-[#00599C]" },
  { name: "Go", slug: "go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", color: "bg-[#00ADD8]" },
  { name: "Rust", slug: "rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", color: "bg-[#DEA584]" },
  { name: "Ruby", slug: "ruby", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg", color: "bg-[#CC342D]" },
  { name: "PHP", slug: "php", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "bg-[#777BB4]" },
  { name: "C#", slug: "csharp", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", color: "bg-[#239120]" },
  { name: "Swift", slug: "swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", color: "bg-[#FA7343]" },
  { name: "Kotlin", slug: "kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", color: "bg-[#7F52FF]" },
];

const codeSnippets: Record<string, { code: string; output: string }> = {
  python: {
    code: `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nfor i in range(10):\n    print(fibonacci(i), end=" ")`,
    output: "0 1 1 2 3 5 8 13 21 34",
  },
  javascript: {
    code: `const greet = (name) => {\n  return \`Hello, \${name}! 👋\`;\n};\n\nconsole.log(greet("World"));\nconsole.log(greet("Aralify"));`,
    output: 'Hello, World! 👋\nHello, Aralify! 👋',
  },
  typescript: {
    code: `interface User {\n  name: string;\n  xp: number;\n  streak: number;\n}\n\nconst user: User = {\n  name: "Juan",\n  xp: 2450,\n  streak: 12\n};\n\nconsole.log(\`\${user.name}: \${user.xp} XP\`);`,
    output: "Juan: 2450 XP",
  },
};

const features = [
  { icon: <Globe size={24} />, title: "50+ Languages", desc: "Python, JavaScript, TypeScript, Java, C++, Go, Rust, and many more with real execution.", color: "bg-primary/10 text-primary" },
  { icon: <Zap size={24} />, title: "Instant Output", desc: "Code runs in sandboxed Judge0 containers. See results in milliseconds.", color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400" },
  { icon: <Share2 size={24} />, title: "Save & Share", desc: "Save your snippets, share them with the community, and fork others' code.", color: "bg-secondary/10 text-secondary" },
  { icon: <Layers size={24} />, title: "Difficulty Modes", desc: "Easy, Medium, and Hard challenges with 1x, 2x, and 3x XP multipliers.", color: "bg-accent/30 text-accent-foreground" },
];

export default function PlaygroundPage() {
  const [selectedLang, setSelectedLang] = useState("python");
  const [showOutput, setShowOutput] = useState(false);

  const snippet = codeSnippets[selectedLang] || codeSnippets.python;
  const langInfo = languages.find((l) => l.slug === selectedLang) || languages[0];

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-20 bg-primary/5 border-b-4 border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 neo-brutal-border rounded-full font-black text-sm uppercase tracking-widest mb-6">
              <Terminal size={14} /> Interactive Sandbox
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">CODE PLAYGROUND</h1>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              Write, run, and experiment with code in 50+ programming languages. Zero setup — just pick a language and start coding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Language Selector */}
      <section className="py-12 border-b-4 border-border bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">Select Language</h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <motion.button
                key={lang.slug}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedLang(lang.slug); setShowOutput(false); }}
                className={`flex items-center gap-2.5 px-4 py-2.5 neo-brutal-border rounded-xl font-black text-sm transition-all ${
                  selectedLang === lang.slug
                    ? "bg-primary text-white neo-brutal-shadow-sm"
                    : "bg-background hover:bg-primary/5"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lang.icon} alt={lang.name} className="w-5 h-5" loading="lazy" />
                {lang.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Editor */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-card neo-brutal-border neo-brutal-shadow-lg rounded-2xl overflow-hidden">
              {/* Editor header */}
              <div className="bg-[hsl(222,47%,11%)] dark:bg-[hsl(222,47%,6%)] px-6 py-3 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-white/60 font-mono text-xs tracking-wider flex items-center gap-2">
                    <Terminal size={12} /> {langInfo.name} Playground
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-white/40 hover:text-white/80 transition-colors"><Settings size={14} /></button>
                  <button className="text-white/40 hover:text-white/80 transition-colors"><Copy size={14} /></button>
                  <button className="text-white/40 hover:text-white/80 transition-colors"><Download size={14} /></button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
                {/* Code panel */}
                <div className="bg-[#0d1117] p-6 min-h-[400px] font-mono text-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/30 text-xs uppercase tracking-widest">main.{selectedLang === "python" ? "py" : selectedLang === "typescript" ? "ts" : "js"}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowOutput(false)} className="text-white/30 hover:text-white/60 transition-colors">
                        <RotateCcw size={12} />
                      </button>
                    </div>
                  </div>
                  {snippet.code.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 text-right mr-4 text-white/20 select-none text-xs">{i + 1}</span>
                      <span className="text-green-300 whitespace-pre">{line}</span>
                    </div>
                  ))}
                  <div className="flex mt-2">
                    <span className="w-8 text-right mr-4 text-white/20 select-none text-xs">{snippet.code.split("\n").length + 1}</span>
                    <span className="inline-block w-2 h-4 bg-white/60 animate-pulse" />
                  </div>
                </div>

                {/* Output panel */}
                <div className="flex flex-col">
                  {/* Controls */}
                  <div className="p-4 border-b border-border bg-card flex items-center gap-3">
                    <NeoButton
                      variant="primary"
                      size="sm"
                      className="gap-2"
                      onClick={() => setShowOutput(true)}
                    >
                      <Play size={14} className="fill-white" /> RUN CODE
                    </NeoButton>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <Clock size={12} /> ~50ms
                      </span>
                    </div>
                  </div>

                  {/* Output */}
                  <div className="bg-[#0d1117] p-6 flex-1 min-h-[300px] font-mono text-sm">
                    <span className="text-white/30 text-xs uppercase tracking-widest block mb-4">Output</span>
                    {showOutput ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex items-center gap-2 mb-3 text-green-400">
                          <CheckCircle size={14} />
                          <span className="text-xs font-bold uppercase">Execution successful</span>
                        </div>
                        {snippet.output.split("\n").map((line, i) => (
                          <div key={i} className="text-white/80">{line}</div>
                        ))}
                        <div className="mt-4 pt-4 border-t border-white/10 text-white/30 text-xs">
                          Process exited with code 0 · Execution time: 47ms · Memory: 3.2 MB
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-white/20 text-xs">
                        Click &quot;RUN CODE&quot; to see output...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card border-y-4 border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-12">PLAYGROUND FEATURES</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-background neo-brutal-border neo-brutal-shadow rounded-2xl space-y-3"
              >
                <div className={`p-3 w-fit rounded-xl ${f.color}`}>{f.icon}</div>
                <h3 className="font-black text-lg uppercase">{f.title}</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">READY TO CODE?</h2>
          <p className="text-lg font-medium text-muted-foreground mb-8 max-w-xl mx-auto">
            No signup required. Pick a language, write your code, and hit run. It&apos;s that simple.
          </p>
          <NeoButton size="lg" variant="primary" className="text-xl h-16 px-12">
            START CODING NOW <Play size={18} className="ml-2 fill-white" />
          </NeoButton>
        </div>
      </section>
    </PageShell>
  );
}
