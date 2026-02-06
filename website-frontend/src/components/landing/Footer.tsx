import Link from "next/link";
import { Code2, Github, Twitter, Youtube, Instagram, ArrowRight } from "lucide-react";

const footerLinks = [
  {
    title: "PLATFORM",
    color: "text-primary",
    links: ["Courses", "Challenges", "Community", "Leaderboard"],
  },
  {
    title: "RESOURCES",
    color: "text-secondary",
    links: ["Code Playground", "API Docs", "Open Source", "Dev Blog"],
  },
  {
    title: "LEGAL",
    color: "text-accent",
    links: ["Privacy Policy", "Terms of Service", "Security", "Cookie Settings"],
  },
];

const socials = [
  { icon: <Github size={20} />, label: "GitHub", color: "hover:bg-[#333]" },
  { icon: <Twitter size={20} />, label: "Twitter", color: "hover:bg-[#1DA1F2]" },
  { icon: <Youtube size={20} />, label: "YouTube", color: "hover:bg-[#FF0000]" },
  { icon: <Instagram size={20} />, label: "Instagram", color: "hover:bg-[#E1306C]" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-24 border-t-4 border-border relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="text-4xl font-display font-black tracking-tighter uppercase flex items-center gap-3 group">
              <div className="bg-primary p-2.5 neo-brutal-border-white">
                <Code2 size={32} className="text-white" />
              </div>
              <span>ARAL<span className="text-primary">IFY</span></span>
            </Link>
            <p className="text-xl font-medium opacity-60 max-w-md leading-relaxed">
              Learn to code at your own pace with interactive lessons, real code execution, and a supportive community.
            </p>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-12 h-12 bg-background text-foreground neo-brutal-border-white flex items-center justify-center rounded-xl transition-all hover:-translate-y-1 ${social.color} hover:text-white`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title} className="space-y-6">
              <h3 className={`text-lg font-black ${col.color} uppercase tracking-widest`}>{col.title}</h3>
              <ul className="space-y-3 text-lg font-medium opacity-60">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:opacity-100 flex items-center gap-2 group transition-opacity">
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t-2 border-background/10 gap-6">
          <div className="opacity-40 font-bold text-lg">&copy; 2026 ARALIFY. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="opacity-60 font-bold uppercase tracking-widest text-sm">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
