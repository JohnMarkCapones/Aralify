"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Github, Twitter, Youtube, Instagram, ArrowRight } from "lucide-react";
import { useRef } from "react";

export function Footer() {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const footerScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <footer ref={footerRef} className="bg-black text-white py-32 border-t-8 border-black relative overflow-hidden">
      <motion.div
        style={{ scale: footerScale }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-10">
            <Link href="/" className="text-6xl font-display font-black tracking-tighter uppercase flex items-center gap-4 group">
              <div className="bg-primary p-3 neo-brutal-border border-white">
                <Code2 size={48} className="text-white" />
              </div>
              <span>ARAL<span className="text-primary">IFY</span></span>
            </Link>
            <p className="text-2xl font-bold text-gray-400 max-w-md leading-relaxed">
              Breaking the grid. Mastering the code. Aralify is where elite engineering begins.
            </p>
            <div className="flex gap-6">
              {[
                { icon: <Github />, color: 'hover:bg-[#333]' },
                { icon: <Twitter />, color: 'hover:bg-[#1DA1F2]' },
                { icon: <Youtube />, color: 'hover:bg-[#FF0000]' },
                { icon: <Instagram />, color: 'hover:bg-[#E1306C]' }
              ].map((social, i) => (
                <a key={i} href="#" className={`w-16 h-16 bg-white text-black neo-brutal-border-white flex items-center justify-center rounded-2xl transition-all hover:-translate-y-2 hover:neo-brutal-shadow-blue ${social.color} hover:text-white`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-primary uppercase tracking-widest">ECOSYSTEM</h3>
            <ul className="space-y-4 text-xl font-bold text-gray-400">
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Courses</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Challenges</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Community</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Enterprise</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-secondary uppercase tracking-widest">RESOURCES</h3>
            <ul className="space-y-4 text-xl font-bold text-gray-400">
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Aralify IDE</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> API Docs</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Open Source</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Dev Blog</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-accent uppercase tracking-widest">LEGAL</h3>
            <ul className="space-y-4 text-xl font-bold text-gray-400">
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Terms of Service</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Security</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-2 group"><ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Cookie Settings</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-16 border-t-4 border-white/10 gap-8">
          <div className="text-gray-500 font-black text-xl">© 2026 ARALIFY. ENGINEERED WITH PASSION.</div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-64 -left-64 w-[600px] h-[600px] border-[40px] border-white/5 rounded-full pointer-events-none"
      />
    </footer>
  );
}
