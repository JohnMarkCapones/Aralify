export type LessonTopic = {
  title: string;
  duration: string; // e.g. "3 min"
  type: "video" | "reading" | "exercise" | "quiz" | "project";
};

export type SyllabusLesson = {
  title: string;
  topics?: LessonTopic[];
};

export type SyllabusModule = {
  title: string;
  lessons: number;
  description?: string;
  lessonList?: SyllabusLesson[];
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  language: string;
  icon: string;
  lessons: number;
  hours: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
  rating: number;
  students: number;
  topics: string[];
  prerequisites: string[];
  syllabus: SyllabusModule[];
  learningOutcomes?: string[];
  instructor?: {
    name: string;
    avatar: string;
    title: string;
    bio: string;
    courses: number;
    students: number;
  };
  reviews?: {
    name: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
};

export const courses: Course[] = [
  {
    slug: "python-fundamentals",
    title: "Python Fundamentals",
    description: "Learn Python from scratch -- variables, loops, functions, and your first real project.",
    longDescription: "Start your coding journey with Python, the world's most popular beginner language. This course takes you from zero to building real programs, covering variables, data types, control flow, functions, file handling, and object-oriented programming basics. Every lesson has Easy, Medium, and Hard tiers so you can learn at your own pace.",
    language: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    lessons: 24,
    hours: 12,
    difficulty: "Beginner",
    color: "bg-[#3776AB]",
    rating: 4.8,
    students: 1240,
    topics: ["Python", "Beginner", "Backend"],
    prerequisites: ["No prior coding experience needed"],
    syllabus: [
      { title: "Getting Started with Python", lessons: 4 },
      { title: "Variables & Data Types", lessons: 4 },
      { title: "Control Flow", lessons: 4 },
      { title: "Functions & Modules", lessons: 4 },
      { title: "File Handling & Errors", lessons: 4 },
      { title: "Final Project: Build a CLI App", lessons: 4 },
    ],
  },
  {
    slug: "javascript-essentials",
    title: "JavaScript Essentials",
    description: "Master JavaScript fundamentals -- DOM manipulation, async/await, and modern ES6+ features.",
    longDescription: "JavaScript is the language of the web. This course covers everything from variables and functions to DOM manipulation, event handling, async programming with Promises and async/await, and modern ES6+ features like destructuring, arrow functions, and modules. You'll build interactive web pages and understand how JavaScript powers the modern web.",
    language: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    lessons: 32,
    hours: 16,
    difficulty: "Beginner",
    color: "bg-[#F7DF1E]",
    rating: 4.9,
    students: 980,
    topics: ["JavaScript", "Beginner", "Frontend"],
    prerequisites: ["Basic HTML & CSS knowledge helpful"],
    syllabus: [
      { title: "JavaScript Basics", lessons: 5 },
      { title: "Functions & Scope", lessons: 5 },
      { title: "Arrays & Objects", lessons: 5 },
      { title: "DOM Manipulation", lessons: 5 },
      { title: "Async JavaScript", lessons: 6 },
      { title: "Final Project: Interactive Web App", lessons: 6 },
    ],
  },
  {
    slug: "react-from-zero",
    title: "React From Zero",
    description: "Build modern UIs with React -- components, hooks, state management, and real-world apps.",
    longDescription: "Learn React, the most popular UI library. This course covers JSX, components, props, state, hooks (useState, useEffect, useContext, useRef), routing with React Router, API integration, and state management patterns. You'll build multiple projects including a todo app, a weather dashboard, and a full blog application.",
    language: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    lessons: 28,
    hours: 18,
    difficulty: "Intermediate",
    color: "bg-[#61DAFB]",
    rating: 4.7,
    students: 760,
    topics: ["React", "Intermediate", "Frontend"],
    prerequisites: ["JavaScript Essentials or equivalent", "HTML & CSS basics"],
    syllabus: [
      { title: "React Fundamentals & JSX", lessons: 5 },
      { title: "Components & Props", lessons: 4 },
      { title: "State & Hooks", lessons: 5 },
      { title: "Side Effects & API Calls", lessons: 5 },
      { title: "Routing & Navigation", lessons: 4 },
      { title: "Final Project: Full Blog App", lessons: 5 },
    ],
  },
  {
    slug: "typescript-mastery",
    title: "TypeScript Mastery",
    description: "Level up your JavaScript with types -- generics, utility types, and type-safe patterns.",
    longDescription: "TypeScript adds type safety to JavaScript and is now required for most professional development roles. This course covers type annotations, interfaces, generics, utility types, type narrowing, discriminated unions, and real-world patterns for typing React components, API responses, and Node.js backends.",
    language: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    lessons: 20,
    hours: 10,
    difficulty: "Intermediate",
    color: "bg-[#3178C6]",
    rating: 4.6,
    students: 540,
    topics: ["TypeScript", "Intermediate", "Frontend", "Backend"],
    prerequisites: ["JavaScript Essentials or equivalent"],
    syllabus: [
      { title: "TypeScript Basics & Setup", lessons: 3 },
      { title: "Types, Interfaces & Enums", lessons: 4 },
      { title: "Generics & Utility Types", lessons: 4 },
      { title: "Advanced Patterns", lessons: 4 },
      { title: "TypeScript with React & Node", lessons: 5 },
    ],
  },
  {
    slug: "node-backend",
    title: "Node.js Backend",
    description: "Build REST APIs with Node.js, Express, and databases. Deploy your first backend.",
    longDescription: "Learn server-side development with Node.js. This course covers HTTP fundamentals, Express.js routing, middleware, REST API design, database integration with PostgreSQL and Prisma, authentication with JWT, error handling, and deployment. You'll build a complete API from scratch and deploy it to the cloud.",
    language: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    lessons: 26,
    hours: 14,
    difficulty: "Intermediate",
    color: "bg-[#339933]",
    rating: 4.8,
    students: 620,
    topics: ["Node.js", "Intermediate", "Backend"],
    prerequisites: ["JavaScript Essentials or equivalent"],
    syllabus: [
      { title: "Node.js & HTTP Basics", lessons: 4 },
      { title: "Express.js & Routing", lessons: 5 },
      { title: "Database & Prisma", lessons: 5 },
      { title: "Authentication & Security", lessons: 4 },
      { title: "Testing & Error Handling", lessons: 4 },
      { title: "Final Project: Deploy a REST API", lessons: 4 },
    ],
  },
  {
    slug: "html-css-foundations",
    title: "HTML & CSS Foundations",
    description: "Build beautiful websites from scratch -- responsive layouts, Flexbox, Grid, and animations.",
    longDescription: "The foundation of every website. This course covers semantic HTML, CSS selectors, the box model, Flexbox, CSS Grid, responsive design with media queries, transitions, animations, and modern CSS features. You'll build multiple responsive web pages and a complete portfolio site.",
    language: "HTML/CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    lessons: 18,
    hours: 8,
    difficulty: "Beginner",
    color: "bg-[#E34F26]",
    rating: 4.9,
    students: 1580,
    topics: ["HTML", "CSS", "Beginner", "Frontend"],
    prerequisites: ["No prior experience needed"],
    learningOutcomes: [
      "Build complete web pages from scratch using semantic HTML5",
      "Style any layout with CSS Flexbox and CSS Grid",
      "Create fully responsive designs that work on all devices",
      "Add smooth transitions and keyframe animations",
      "Understand the CSS cascade, specificity, and inheritance",
      "Deploy a professional portfolio site to the web",
    ],
    instructor: {
      name: "Maria Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      title: "Senior Frontend Engineer",
      bio: "Maria has 8 years of experience building accessible, beautiful web interfaces. She has taught over 5,000 students and previously worked at Vercel and Shopify.",
      courses: 4,
      students: 5200,
    },
    reviews: [
      { name: "Carlos R.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos", rating: 5, date: "2 weeks ago", comment: "Best HTML/CSS course I've ever taken. The difficulty tiers are genius -- I started on Easy and now I'm doing Hard challenges!" },
      { name: "Aiko T.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aiko", rating: 5, date: "1 month ago", comment: "The portfolio project at the end was amazing. I actually used it as my real portfolio for job applications." },
      { name: "Jame P.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james", rating: 4, date: "1 month ago", comment: "Great content and the code execution sandbox is really helpful. Would love even more CSS Grid exercises." },
    ],
    syllabus: [
      {
        title: "HTML Structure & Semantics",
        lessons: 3,
        description: "Learn the building blocks of every web page -- tags, elements, attributes, and semantic structure.",
        lessonList: [
          {
            title: "Your First Web Page",
            topics: [
              { title: "What is HTML?", duration: "3 min", type: "reading" },
              { title: "Setting up your editor", duration: "5 min", type: "video" },
              { title: "Hello World page", duration: "8 min", type: "exercise" },
              { title: "Knowledge check", duration: "3 min", type: "quiz" },
            ],
          },
          {
            title: "Tags, Elements & Attributes",
            topics: [
              { title: "Anatomy of an HTML element", duration: "4 min", type: "reading" },
              { title: "Common attributes (id, class, href)", duration: "6 min", type: "video" },
              { title: "Build a structured page", duration: "10 min", type: "exercise" },
              { title: "Attribute quiz", duration: "3 min", type: "quiz" },
            ],
          },
          {
            title: "Semantic HTML5",
            topics: [
              { title: "Why semantics matter", duration: "4 min", type: "reading" },
              { title: "header, nav, main, section, footer", duration: "7 min", type: "video" },
              { title: "Refactor a page with semantic tags", duration: "10 min", type: "exercise" },
              { title: "Accessibility check", duration: "4 min", type: "quiz" },
            ],
          },
        ],
      },
      {
        title: "CSS Basics & Selectors",
        lessons: 3,
        description: "Master CSS selectors, the box model, colors, typography, and how styles cascade.",
        lessonList: [
          {
            title: "Linking CSS & First Styles",
            topics: [
              { title: "Inline, internal, external CSS", duration: "4 min", type: "reading" },
              { title: "Colors, fonts, and text styling", duration: "6 min", type: "video" },
              { title: "Style a blog post", duration: "10 min", type: "exercise" },
              { title: "CSS basics quiz", duration: "3 min", type: "quiz" },
            ],
          },
          {
            title: "Selectors & Specificity",
            topics: [
              { title: "Element, class, ID selectors", duration: "5 min", type: "reading" },
              { title: "Combinators and pseudo-classes", duration: "7 min", type: "video" },
              { title: "Specificity calculator challenge", duration: "10 min", type: "exercise" },
              { title: "Selector battle quiz", duration: "4 min", type: "quiz" },
            ],
          },
          {
            title: "The Box Model",
            topics: [
              { title: "Content, padding, border, margin", duration: "5 min", type: "reading" },
              { title: "box-sizing: border-box", duration: "4 min", type: "video" },
              { title: "Box model debugging challenge", duration: "12 min", type: "exercise" },
              { title: "Box model quiz", duration: "3 min", type: "quiz" },
            ],
          },
        ],
      },
      {
        title: "Flexbox & Layout",
        lessons: 3,
        description: "Tame complex layouts with Flexbox -- alignment, distribution, wrapping, and real patterns.",
        lessonList: [
          {
            title: "Flexbox Fundamentals",
            topics: [
              { title: "display: flex and axes", duration: "5 min", type: "reading" },
              { title: "justify-content & align-items", duration: "7 min", type: "video" },
              { title: "Build a navbar", duration: "12 min", type: "exercise" },
              { title: "Flex direction quiz", duration: "3 min", type: "quiz" },
            ],
          },
          {
            title: "Flex Wrapping & Ordering",
            topics: [
              { title: "flex-wrap and gap", duration: "4 min", type: "reading" },
              { title: "flex-grow, flex-shrink, flex-basis", duration: "8 min", type: "video" },
              { title: "Card layout challenge", duration: "12 min", type: "exercise" },
              { title: "Flex properties quiz", duration: "3 min", type: "quiz" },
            ],
          },
          {
            title: "Real Flexbox Patterns",
            topics: [
              { title: "Common layout patterns", duration: "5 min", type: "reading" },
              { title: "Holy grail layout walkthrough", duration: "8 min", type: "video" },
              { title: "Build a pricing page", duration: "15 min", type: "exercise" },
              { title: "Layout patterns quiz", duration: "3 min", type: "quiz" },
            ],
          },
        ],
      },
      {
        title: "CSS Grid",
        lessons: 3,
        description: "Two-dimensional layouts made easy -- grid templates, areas, auto-fit, and responsive grids.",
        lessonList: [
          {
            title: "Grid Fundamentals",
            topics: [
              { title: "display: grid and grid lines", duration: "5 min", type: "reading" },
              { title: "grid-template-columns/rows", duration: "7 min", type: "video" },
              { title: "Photo gallery grid", duration: "12 min", type: "exercise" },
              { title: "Grid basics quiz", duration: "3 min", type: "quiz" },
            ],
          },
          {
            title: "Grid Areas & Placement",
            topics: [
              { title: "grid-area and named lines", duration: "5 min", type: "reading" },
              { title: "Complex page layout", duration: "8 min", type: "video" },
              { title: "Dashboard layout challenge", duration: "14 min", type: "exercise" },
              { title: "Grid placement quiz", duration: "3 min", type: "quiz" },
            ],
          },
          {
            title: "Auto-fit & Responsive Grid",
            topics: [
              { title: "auto-fit, auto-fill, minmax()", duration: "5 min", type: "reading" },
              { title: "Responsive grid without media queries", duration: "6 min", type: "video" },
              { title: "Build a responsive portfolio grid", duration: "14 min", type: "exercise" },
              { title: "Responsive grid quiz", duration: "3 min", type: "quiz" },
            ],
          },
        ],
      },
      {
        title: "Responsive Design",
        lessons: 3,
        description: "Make your sites look great on any device -- media queries, mobile-first, and fluid typography.",
        lessonList: [
          {
            title: "Media Queries & Breakpoints",
            topics: [
              { title: "Viewport meta and media queries", duration: "5 min", type: "reading" },
              { title: "Mobile-first approach", duration: "7 min", type: "video" },
              { title: "Make a page responsive", duration: "12 min", type: "exercise" },
              { title: "Breakpoints quiz", duration: "3 min", type: "quiz" },
            ],
          },
          {
            title: "Fluid Typography & Units",
            topics: [
              { title: "rem, em, vw, vh, clamp()", duration: "5 min", type: "reading" },
              { title: "Fluid type scale walkthrough", duration: "6 min", type: "video" },
              { title: "Fluid typography challenge", duration: "10 min", type: "exercise" },
              { title: "CSS units quiz", duration: "3 min", type: "quiz" },
            ],
          },
          {
            title: "Images & Modern Responsive",
            topics: [
              { title: "Responsive images and srcset", duration: "5 min", type: "reading" },
              { title: "Container queries and :has()", duration: "7 min", type: "video" },
              { title: "Responsive landing page challenge", duration: "15 min", type: "exercise" },
              { title: "Responsive design quiz", duration: "4 min", type: "quiz" },
            ],
          },
        ],
      },
      {
        title: "Final Project: Portfolio Site",
        lessons: 3,
        description: "Bring it all together -- build and deploy a complete, responsive portfolio website.",
        lessonList: [
          {
            title: "Planning & Structure",
            topics: [
              { title: "Design wireframe walkthrough", duration: "5 min", type: "reading" },
              { title: "Setting up the project", duration: "6 min", type: "video" },
              { title: "Build the HTML skeleton", duration: "15 min", type: "exercise" },
            ],
          },
          {
            title: "Styling & Animations",
            topics: [
              { title: "Transitions & keyframes", duration: "6 min", type: "reading" },
              { title: "Scroll animations with CSS", duration: "8 min", type: "video" },
              { title: "Style the complete portfolio", duration: "20 min", type: "project" },
            ],
          },
          {
            title: "Polish & Deploy",
            topics: [
              { title: "Performance and accessibility audit", duration: "5 min", type: "reading" },
              { title: "Deploy to Vercel/Netlify", duration: "6 min", type: "video" },
              { title: "Final polish and submission", duration: "15 min", type: "project" },
              { title: "Course completion quiz", duration: "5 min", type: "quiz" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sql-databases",
    title: "SQL & Databases",
    description: "Master relational databases -- queries, joins, indexes, and database design patterns.",
    longDescription: "Every application needs a database. This course covers SQL fundamentals, table design, relationships, JOINs, subqueries, aggregate functions, indexing, transactions, and database design best practices using PostgreSQL. You'll design and query real databases for web applications.",
    language: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    lessons: 22,
    hours: 11,
    difficulty: "Beginner",
    color: "bg-[#4169E1]",
    rating: 4.7,
    students: 430,
    topics: ["SQL", "Beginner", "Backend"],
    prerequisites: ["No prior experience needed"],
    syllabus: [
      { title: "Database Fundamentals", lessons: 4 },
      { title: "CRUD Operations", lessons: 4 },
      { title: "JOINs & Relationships", lessons: 4 },
      { title: "Advanced Queries", lessons: 4 },
      { title: "Indexing & Performance", lessons: 3 },
      { title: "Final Project: Design a Schema", lessons: 3 },
    ],
  },
  {
    slug: "git-version-control",
    title: "Git & Version Control",
    description: "Learn Git from basics to advanced -- branching, merging, rebasing, and team workflows.",
    longDescription: "Git is essential for every developer. This course covers repository basics, staging, committing, branching, merging, rebasing, resolving conflicts, remote repositories, pull requests, and professional Git workflows. You'll practice with real collaborative scenarios.",
    language: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    lessons: 16,
    hours: 6,
    difficulty: "Beginner",
    color: "bg-[#F05032]",
    rating: 4.8,
    students: 890,
    topics: ["Git", "Beginner", "DevOps"],
    prerequisites: ["Basic command line knowledge helpful"],
    syllabus: [
      { title: "Git Basics & Setup", lessons: 3 },
      { title: "Branching & Merging", lessons: 4 },
      { title: "Remote Repositories", lessons: 3 },
      { title: "Advanced Git", lessons: 3 },
      { title: "Team Workflows & PRs", lessons: 3 },
    ],
  },
];

export const allTopics = [...new Set(courses.flatMap(c => c.topics))].sort();
export const allDifficulties = ["Beginner", "Intermediate", "Advanced"] as const;
