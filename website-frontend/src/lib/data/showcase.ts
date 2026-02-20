export type ShowcaseProject = {
  slug: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  likes: number;
  gradient: string;
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "taskmaster-app",
    title: "TaskMaster Pro",
    author: "Maria Santos",
    description: "A full-stack task management app with drag-and-drop, real-time collaboration, and dark mode.",
    tags: ["React", "Node.js", "Socket.io"],
    likes: 234,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    slug: "weather-dashboard",
    title: "WeatherScope",
    author: "Carlos Reyes",
    description: "Beautiful weather dashboard with 7-day forecasts, location search, and animated weather icons.",
    tags: ["JavaScript", "API", "CSS"],
    likes: 189,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    slug: "budget-tracker",
    title: "PesoBudget",
    author: "Angela Cruz",
    description: "Personal finance tracker with expense categorization, charts, and monthly reports.",
    tags: ["Python", "Flask", "Chart.js"],
    likes: 312,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    slug: "code-snippet-manager",
    title: "SnipVault",
    author: "Diego Navarro",
    description: "A developer tool for organizing, searching, and sharing code snippets with syntax highlighting.",
    tags: ["TypeScript", "Next.js", "Prisma"],
    likes: 156,
    gradient: "from-orange-500 to-red-500",
  },
  {
    slug: "recipe-finder",
    title: "Lutong Pinoy",
    author: "Jasmine Dela Rosa",
    description: "Filipino recipe finder with ingredient search, nutrition info, and step-by-step cooking guides.",
    tags: ["React", "Tailwind", "Supabase"],
    likes: 278,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    slug: "fitness-tracker",
    title: "FitQuest",
    author: "Rafael Villanueva",
    description: "Gamified fitness tracker with workout plans, progress streaks, and achievement badges.",
    tags: ["React Native", "Expo", "Firebase"],
    likes: 203,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    slug: "chat-app",
    title: "KwentoPH",
    author: "Patricia Aquino",
    description: "Real-time chat application with group channels, file sharing, and message reactions.",
    tags: ["Socket.io", "Express", "MongoDB"],
    likes: 167,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    slug: "portfolio-generator",
    title: "DevFolio",
    author: "Mark Ignacio",
    description: "Auto-generate a developer portfolio from your GitHub profile with customizable themes.",
    tags: ["Next.js", "GitHub API", "Tailwind"],
    likes: 445,
    gradient: "from-slate-500 to-gray-700",
  },
];

export const showcaseTags = ["All", "React", "Python", "TypeScript", "Next.js", "Node.js", "JavaScript", "React Native"];
