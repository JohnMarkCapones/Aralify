import {
  BookOpen,
  Code2,
  Terminal,
  Layers,
  Database,
  Zap,
  Trophy,
  Users,
  MessageSquare,
  Sparkles,
  GraduationCap,
  Gamepad2,
  Globe,
  Flame,
  Target,
  Compass,
  Presentation,
  type LucideIcon,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────

export interface NavMenuItem {
  name: string;
  desc: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
}

export interface NavMenuColumn {
  title: string;
  accent: string;
  items: NavMenuItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

export interface NavFeaturedCard {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  gradient: string;
  icon: LucideIcon;
}

export interface NavCTABar {
  text: string;
  linkLabel: string;
  href: string;
  icon: LucideIcon;
}

export interface MegaMenuData {
  name: string;
  featured: NavFeaturedCard;
  columns: NavMenuColumn[];
  cta: NavCTABar;
}

export interface SimpleNavLink {
  href: string;
  label: string;
}

// ── Simple Links ─────────────────────────────────────────────────

export const simpleNavLinks: SimpleNavLink[] = [
  { href: "/blog", label: "BLOG" },
  { href: "/pricing", label: "PRICING" },
];

// ── Mega Menus ───────────────────────────────────────────────────

export const megaMenus: MegaMenuData[] = [
  {
    name: "LEARN",
    featured: {
      title: "Start Your Coding Journey",
      description:
        "From zero to developer — structured paths with real projects and mentorship.",
      ctaLabel: "Start Free",
      ctaHref: "/courses",
      gradient: "from-primary to-secondary",
      icon: GraduationCap,
    },
    columns: [
      {
        title: "POPULAR COURSES",
        accent: "bg-primary",
        viewAllHref: "/courses",
        viewAllLabel: "View All Courses",
        items: [
          {
            name: "Frontend Development",
            desc: "HTML, CSS, React, Next.js",
            icon: Layers,
            href: "/courses/frontend",
          },
          {
            name: "Backend Development",
            desc: "Node.js, APIs, Databases",
            icon: Database,
            href: "/courses/backend",
          },
          {
            name: "Fullstack Journey",
            desc: "The complete learning path",
            icon: Globe,
            href: "/courses/fullstack",
          },
        ],
      },
      {
        title: "LEARNING PATHS",
        accent: "bg-secondary",
        viewAllHref: "/learning-paths",
        viewAllLabel: "All Paths",
        items: [
          {
            name: "AI & Machine Learning",
            desc: "Python, TensorFlow basics",
            icon: Zap,
            href: "/learning-paths/ai-ml",
          },
          {
            name: "Mobile Development",
            desc: "React Native, Expo",
            icon: Gamepad2,
            href: "/learning-paths/mobile",
          },
          {
            name: "DevOps & Cloud",
            desc: "AWS, Docker, CI/CD",
            icon: Terminal,
            href: "/learning-paths/devops",
          },
        ],
      },
      {
        title: "GET STARTED",
        accent: "bg-accent",
        items: [
          {
            name: "Beginner Bootcamp",
            desc: "Perfect for first-timers",
            icon: BookOpen,
            href: "/courses/beginner-bootcamp",
            badge: "FREE",
          },
          {
            name: "Placement Quiz",
            desc: "Find your skill level",
            icon: Compass,
            href: "/pathfinder",
          },
        ],
      },
    ],
    cta: {
      text: "Not sure where to start?",
      linkLabel: "Take our 2-minute PathFinder quiz",
      href: "/pathfinder",
      icon: Compass,
    },
  },
  {
    name: "PRACTICE",
    featured: {
      title: "Code Playground",
      description:
        "Write, run, and share code in 30+ languages — right in your browser.",
      ctaLabel: "Open Playground",
      ctaHref: "/playground",
      gradient: "from-secondary to-primary",
      icon: Terminal,
    },
    columns: [
      {
        title: "CHALLENGES",
        accent: "bg-primary",
        viewAllHref: "/challenges",
        viewAllLabel: "All Challenges",
        items: [
          {
            name: "Daily Challenge",
            desc: "New problem every day",
            icon: Flame,
            href: "/challenges/daily",
            badge: "HOT",
          },
          {
            name: "Algorithm Arena",
            desc: "Data structures & algos",
            icon: Target,
            href: "/challenges/algorithms",
          },
          {
            name: "Project Challenges",
            desc: "Build real-world apps",
            icon: Code2,
            href: "/challenges/projects",
          },
        ],
      },
      {
        title: "TOOLS",
        accent: "bg-secondary",
        items: [
          {
            name: "Code Playground",
            desc: "Write & run code in-browser",
            icon: Terminal,
            href: "/playground",
          },
          {
            name: "API Sandbox",
            desc: "Test APIs in real-time",
            icon: Database,
            href: "/playground/api",
          },
          {
            name: "Snippet Library",
            desc: "Save & share code snippets",
            icon: Layers,
            href: "/snippets",
            badge: "NEW",
          },
        ],
      },
    ],
    cta: {
      text: "Daily Challenge Streaks —",
      linkLabel: "earn 3x XP for 7-day streaks!",
      href: "/challenges/daily",
      icon: Flame,
    },
  },
  {
    name: "COMMUNITY",
    featured: {
      title: "Join the Community",
      description:
        "Connect with 12,400+ learners. Share projects, get feedback, and grow together.",
      ctaLabel: "Explore Community",
      ctaHref: "/community",
      gradient: "from-accent/90 to-primary",
      icon: Users,
    },
    columns: [
      {
        title: "CONNECT",
        accent: "bg-primary",
        items: [
          {
            name: "Discussion Forum",
            desc: "Ask questions, share tips",
            icon: MessageSquare,
            href: "/community/forum",
          },
          {
            name: "Leaderboard",
            desc: "Top learners this week",
            icon: Trophy,
            href: "/leaderboard",
          },
          {
            name: "Study Groups",
            desc: "Learn with peers",
            icon: Users,
            href: "/community/groups",
          },
        ],
      },
      {
        title: "SHOWCASE",
        accent: "bg-secondary",
        viewAllHref: "/showcase",
        viewAllLabel: "View Showcase",
        items: [
          {
            name: "Project Gallery",
            desc: "Learner-built projects",
            icon: Sparkles,
            href: "/showcase",
          },
          {
            name: "Success Stories",
            desc: "Career transformations",
            icon: Presentation,
            href: "/showcase/stories",
          },
        ],
      },
    ],
    cta: {
      text: "Join 12,400+ learners in the",
      linkLabel: "Aralify community",
      href: "/community",
      icon: Users,
    },
  },
];
