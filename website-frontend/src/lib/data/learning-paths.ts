export type LearningPath = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  courseCount: number;
  estimatedHours: number;
  difficulty: string;
  color: string;
  courses: {
    title: string;
    slug: string;
    lessons: number;
    hours: number;
    milestone?: string;
  }[];
  prerequisites: string[];
};

export const learningPaths: LearningPath[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description: "From HTML basics to full-stack applications. Learn to build modern, responsive websites and web apps from scratch.",
    icon: "Globe",
    courseCount: 6,
    estimatedHours: 120,
    difficulty: "Beginner → Advanced",
    color: "bg-blue-500",
    courses: [
      { title: "HTML & CSS Foundations", slug: "html-css-foundations", lessons: 20, hours: 15, milestone: "Build your first webpage" },
      { title: "JavaScript Essentials", slug: "javascript-essentials", lessons: 32, hours: 25 },
      { title: "React From Zero", slug: "react-from-zero", lessons: 28, hours: 22, milestone: "Build a React SPA" },
      { title: "TypeScript Mastery", slug: "typescript-mastery", lessons: 20, hours: 18 },
      { title: "Node.js Backend", slug: "node-backend", lessons: 26, hours: 22, milestone: "Build a REST API" },
      { title: "Full-Stack Project", slug: "fullstack-project", lessons: 15, hours: 18, milestone: "Deploy your first full-stack app" },
    ],
    prerequisites: [],
  },
  {
    slug: "python-programming",
    title: "Python Programming",
    description: "Master Python from fundamentals to advanced topics. Perfect for data science, automation, and backend development.",
    icon: "Terminal",
    courseCount: 5,
    estimatedHours: 95,
    difficulty: "Beginner → Advanced",
    color: "bg-[#3776AB]",
    courses: [
      { title: "Python Fundamentals", slug: "python-fundamentals", lessons: 24, hours: 20, milestone: "Write your first script" },
      { title: "Python Data Structures", slug: "python-data-structures", lessons: 18, hours: 15 },
      { title: "Python OOP", slug: "python-oop", lessons: 16, hours: 14, milestone: "Build a class hierarchy" },
      { title: "Python Web with Flask", slug: "python-flask", lessons: 22, hours: 20 },
      { title: "Python Advanced Patterns", slug: "python-advanced", lessons: 20, hours: 26, milestone: "Build a production app" },
    ],
    prerequisites: [],
  },
  {
    slug: "data-science",
    title: "Data Science",
    description: "Learn data analysis, visualization, and machine learning with Python. Transform raw data into actionable insights.",
    icon: "BarChart3",
    courseCount: 5,
    estimatedHours: 110,
    difficulty: "Intermediate → Advanced",
    color: "bg-emerald-500",
    courses: [
      { title: "Python for Data Science", slug: "python-data-science", lessons: 20, hours: 18 },
      { title: "Data Analysis with Pandas", slug: "pandas-analysis", lessons: 24, hours: 22, milestone: "Analyze a real dataset" },
      { title: "Data Visualization", slug: "data-visualization", lessons: 18, hours: 16 },
      { title: "Intro to Machine Learning", slug: "intro-ml", lessons: 22, hours: 28, milestone: "Train your first model" },
      { title: "ML Project: End to End", slug: "ml-project", lessons: 16, hours: 26, milestone: "Deploy a ML model" },
    ],
    prerequisites: ["Python Fundamentals"],
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    description: "Build cross-platform mobile apps with React Native and Expo. Ship to iOS and Android from a single codebase.",
    icon: "Smartphone",
    courseCount: 4,
    estimatedHours: 80,
    difficulty: "Intermediate → Advanced",
    color: "bg-purple-500",
    courses: [
      { title: "React Native Basics", slug: "react-native-basics", lessons: 22, hours: 18, milestone: "Build your first mobile app" },
      { title: "Navigation & State", slug: "rn-navigation-state", lessons: 18, hours: 16 },
      { title: "Native APIs & Animations", slug: "rn-native-apis", lessons: 20, hours: 22, milestone: "Use camera and location" },
      { title: "App Store Deployment", slug: "rn-deployment", lessons: 12, hours: 24, milestone: "Publish to App Store" },
    ],
    prerequisites: ["JavaScript Essentials", "React From Zero"],
  },
  {
    slug: "devops",
    title: "DevOps & Cloud",
    description: "Learn CI/CD, containerization, cloud deployment, and infrastructure as code. Keep your apps running smoothly.",
    icon: "Cloud",
    courseCount: 4,
    estimatedHours: 75,
    difficulty: "Intermediate → Advanced",
    color: "bg-orange-500",
    courses: [
      { title: "Git & GitHub Mastery", slug: "git-mastery", lessons: 16, hours: 12 },
      { title: "Docker Essentials", slug: "docker-essentials", lessons: 18, hours: 16, milestone: "Containerize an app" },
      { title: "CI/CD Pipelines", slug: "cicd-pipelines", lessons: 14, hours: 18, milestone: "Set up automated deployment" },
      { title: "Cloud Deployment", slug: "cloud-deployment", lessons: 20, hours: 29, milestone: "Deploy to production" },
    ],
    prerequisites: ["Node.js Backend or Python Web with Flask"],
  },
];
