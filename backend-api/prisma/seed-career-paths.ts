import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Career Path Knowledge Graph Seed Data
 *
 * 7 career paths with skill nodes, dependencies, and course mappings.
 * Nodes reference existing courses by slug (linked at seed time if they exist).
 */
const CAREER_PATHS = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    description:
      'Build beautiful, interactive web experiences. Master HTML, CSS, JavaScript, and modern frameworks to create responsive, accessible web applications.',
    shortDescription: 'Build interactive web UIs',
    industry: 'web',
    estimatedHours: 200,
    marketDemand: 90,
    salaryImpact: 75,
    analyticalReq: 40,
    color: '#3B82F6',
    outcomes: ['career_change', 'freelance', 'startup', 'portfolio'],
    tags: ['html', 'css', 'javascript', 'react', 'frontend', 'ui', 'responsive', 'web'],
    orderIndex: 0,
    nodes: [
      {
        skillName: 'HTML & CSS Fundamentals',
        description: 'Learn the building blocks of every website — structure with HTML and styling with CSS.',
        orderIndex: 0,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'html-css-basics',
        prerequisites: [],
      },
      {
        skillName: 'JavaScript Fundamentals',
        description: 'Add interactivity to web pages with JavaScript — variables, functions, DOM manipulation.',
        orderIndex: 1,
        isRequired: true,
        estimatedHours: 40,
        courseSlug: 'javascript-basics',
        prerequisites: ['HTML & CSS Fundamentals'],
      },
      {
        skillName: 'Responsive Web Design',
        description: 'Make websites that look great on any device using media queries, flexbox, and CSS grid.',
        orderIndex: 2,
        isRequired: true,
        estimatedHours: 20,
        courseSlug: 'responsive-design',
        prerequisites: ['HTML & CSS Fundamentals'],
      },
      {
        skillName: 'React Fundamentals',
        description: 'Build modern UIs with React — components, state, props, hooks, and the virtual DOM.',
        orderIndex: 3,
        isRequired: true,
        estimatedHours: 50,
        courseSlug: 'react-basics',
        prerequisites: ['JavaScript Fundamentals'],
      },
      {
        skillName: 'TypeScript',
        description: 'Add type safety to JavaScript for more reliable, maintainable code.',
        orderIndex: 4,
        isRequired: false,
        estimatedHours: 30,
        courseSlug: 'typescript-basics',
        prerequisites: ['JavaScript Fundamentals'],
      },
      {
        skillName: 'Next.js & Full Stack React',
        description: 'Server-side rendering, API routes, and production-grade React apps with Next.js.',
        orderIndex: 5,
        isRequired: false,
        estimatedHours: 30,
        courseSlug: 'nextjs-basics',
        prerequisites: ['React Fundamentals'],
      },
    ],
  },
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    description:
      'Power applications with server-side logic, APIs, and databases. Build scalable systems that handle data, authentication, and business logic.',
    shortDescription: 'Build APIs & server systems',
    industry: 'web',
    estimatedHours: 220,
    marketDemand: 88,
    salaryImpact: 80,
    analyticalReq: 60,
    color: '#10B981',
    outcomes: ['career_change', 'high_salary', 'job_ready'],
    tags: ['python', 'javascript', 'nodejs', 'sql', 'api', 'backend', 'database', 'server'],
    orderIndex: 1,
    nodes: [
      {
        skillName: 'Python Fundamentals',
        description: 'Learn Python from scratch — the most popular language for backend, data, and automation.',
        orderIndex: 0,
        isRequired: true,
        estimatedHours: 40,
        courseSlug: 'python-basics',
        prerequisites: [],
      },
      {
        skillName: 'SQL & Database Design',
        description: 'Master relational databases — queries, joins, indexing, and schema design.',
        orderIndex: 1,
        isRequired: true,
        estimatedHours: 35,
        courseSlug: 'sql-basics',
        prerequisites: [],
      },
      {
        skillName: 'REST API Design',
        description: 'Design and build RESTful APIs — HTTP methods, status codes, authentication.',
        orderIndex: 2,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'rest-api',
        prerequisites: ['Python Fundamentals'],
      },
      {
        skillName: 'Node.js & Express',
        description: 'Build server-side applications with Node.js and the Express framework.',
        orderIndex: 3,
        isRequired: false,
        estimatedHours: 40,
        courseSlug: 'nodejs-basics',
        prerequisites: ['REST API Design'],
      },
      {
        skillName: 'Authentication & Security',
        description: 'Implement user authentication, JWT tokens, OAuth, and security best practices.',
        orderIndex: 4,
        isRequired: true,
        estimatedHours: 25,
        courseSlug: 'auth-security',
        prerequisites: ['REST API Design'],
      },
      {
        skillName: 'Docker & Deployment',
        description: 'Containerize and deploy applications to production environments.',
        orderIndex: 5,
        isRequired: false,
        estimatedHours: 20,
        courseSlug: 'docker-basics',
        prerequisites: ['Node.js & Express'],
      },
    ],
  },
  {
    slug: 'fullstack-developer',
    title: 'Full Stack Developer',
    description:
      'Master both frontend and backend to build complete web applications from scratch. The most versatile web developer role.',
    shortDescription: 'Frontend + backend mastery',
    industry: 'web',
    estimatedHours: 350,
    marketDemand: 92,
    salaryImpact: 85,
    analyticalReq: 55,
    color: '#8B5CF6',
    outcomes: ['career_change', 'freelance', 'startup', 'full_stack', 'high_salary'],
    tags: ['html', 'css', 'javascript', 'react', 'nodejs', 'sql', 'fullstack', 'web'],
    orderIndex: 2,
    nodes: [
      {
        skillName: 'HTML & CSS Fundamentals',
        description: 'The foundation of all web development — structure and styling.',
        orderIndex: 0,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'html-css-basics',
        prerequisites: [],
      },
      {
        skillName: 'JavaScript Fundamentals',
        description: 'The language of the web — master JS for both frontend and backend.',
        orderIndex: 1,
        isRequired: true,
        estimatedHours: 40,
        courseSlug: 'javascript-basics',
        prerequisites: ['HTML & CSS Fundamentals'],
      },
      {
        skillName: 'React Fundamentals',
        description: 'Build modern, component-based UIs with React.',
        orderIndex: 2,
        isRequired: true,
        estimatedHours: 50,
        courseSlug: 'react-basics',
        prerequisites: ['JavaScript Fundamentals'],
      },
      {
        skillName: 'SQL & Database Design',
        description: 'Master data persistence with SQL databases.',
        orderIndex: 3,
        isRequired: true,
        estimatedHours: 35,
        courseSlug: 'sql-basics',
        prerequisites: [],
      },
      {
        skillName: 'Node.js & Express',
        description: 'Build APIs and server-side logic with Node.js.',
        orderIndex: 4,
        isRequired: true,
        estimatedHours: 40,
        courseSlug: 'nodejs-basics',
        prerequisites: ['JavaScript Fundamentals', 'SQL & Database Design'],
      },
      {
        skillName: 'TypeScript',
        description: 'Type-safe JavaScript for production codebases.',
        orderIndex: 5,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'typescript-basics',
        prerequisites: ['JavaScript Fundamentals'],
      },
      {
        skillName: 'Next.js Full Stack',
        description: 'Combine frontend and backend in one framework.',
        orderIndex: 6,
        isRequired: true,
        estimatedHours: 40,
        courseSlug: 'nextjs-basics',
        prerequisites: ['React Fundamentals', 'Node.js & Express'],
      },
      {
        skillName: 'Authentication & Security',
        description: 'Implement secure user flows and protect against common attacks.',
        orderIndex: 7,
        isRequired: true,
        estimatedHours: 25,
        courseSlug: 'auth-security',
        prerequisites: ['Node.js & Express'],
      },
      {
        skillName: 'Docker & Deployment',
        description: 'Ship your applications to production.',
        orderIndex: 8,
        isRequired: false,
        estimatedHours: 20,
        courseSlug: 'docker-basics',
        prerequisites: ['Next.js Full Stack'],
      },
    ],
  },
  {
    slug: 'mobile-developer',
    title: 'Mobile App Developer',
    description:
      'Build iOS and Android apps with a single codebase using React Native. Create beautiful, performant mobile experiences.',
    shortDescription: 'Build iOS & Android apps',
    industry: 'mobile',
    estimatedHours: 250,
    marketDemand: 82,
    salaryImpact: 78,
    analyticalReq: 50,
    color: '#F59E0B',
    outcomes: ['career_change', 'freelance', 'startup', 'portfolio'],
    tags: ['javascript', 'react-native', 'mobile', 'ios', 'android', 'react'],
    orderIndex: 3,
    nodes: [
      {
        skillName: 'JavaScript Fundamentals',
        description: 'Foundation language for React Native mobile development.',
        orderIndex: 0,
        isRequired: true,
        estimatedHours: 40,
        courseSlug: 'javascript-basics',
        prerequisites: [],
      },
      {
        skillName: 'React Fundamentals',
        description: 'React component model is the basis for React Native.',
        orderIndex: 1,
        isRequired: true,
        estimatedHours: 50,
        courseSlug: 'react-basics',
        prerequisites: ['JavaScript Fundamentals'],
      },
      {
        skillName: 'TypeScript',
        description: 'Type safety for mobile app development.',
        orderIndex: 2,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'typescript-basics',
        prerequisites: ['JavaScript Fundamentals'],
      },
      {
        skillName: 'React Native & Expo',
        description: 'Build cross-platform mobile apps with React Native and Expo.',
        orderIndex: 3,
        isRequired: true,
        estimatedHours: 60,
        courseSlug: 'react-native-basics',
        prerequisites: ['React Fundamentals', 'TypeScript'],
      },
      {
        skillName: 'Mobile UI/UX Patterns',
        description: 'Navigation, gestures, animations, and mobile-specific UX.',
        orderIndex: 4,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'mobile-ux',
        prerequisites: ['React Native & Expo'],
      },
      {
        skillName: 'REST APIs & Offline Storage',
        description: 'Connect to APIs and handle offline data in mobile apps.',
        orderIndex: 5,
        isRequired: true,
        estimatedHours: 25,
        courseSlug: 'mobile-api',
        prerequisites: ['React Native & Expo'],
      },
    ],
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    description:
      'Extract insights from data using Python, statistics, and machine learning. One of the highest-paid and most in-demand tech roles.',
    shortDescription: 'Analyze data & build ML models',
    industry: 'data_science',
    estimatedHours: 300,
    marketDemand: 85,
    salaryImpact: 90,
    analyticalReq: 85,
    color: '#EC4899',
    outcomes: ['career_change', 'high_salary', 'academic'],
    tags: ['python', 'statistics', 'pandas', 'sql', 'data', 'analysis', 'ml', 'visualization'],
    orderIndex: 4,
    nodes: [
      {
        skillName: 'Python Fundamentals',
        description: 'Python is the lingua franca of data science.',
        orderIndex: 0,
        isRequired: true,
        estimatedHours: 40,
        courseSlug: 'python-basics',
        prerequisites: [],
      },
      {
        skillName: 'Statistics & Probability',
        description: 'Statistical thinking — distributions, hypothesis testing, regression.',
        orderIndex: 1,
        isRequired: true,
        estimatedHours: 40,
        courseSlug: 'statistics-basics',
        prerequisites: [],
      },
      {
        skillName: 'SQL & Databases',
        description: 'Query and manipulate data in relational databases.',
        orderIndex: 2,
        isRequired: true,
        estimatedHours: 35,
        courseSlug: 'sql-basics',
        prerequisites: [],
      },
      {
        skillName: 'Data Analysis with Pandas',
        description: 'Clean, transform, and analyze data with Python Pandas and NumPy.',
        orderIndex: 3,
        isRequired: true,
        estimatedHours: 45,
        courseSlug: 'pandas-basics',
        prerequisites: ['Python Fundamentals', 'Statistics & Probability'],
      },
      {
        skillName: 'Data Visualization',
        description: 'Create compelling charts and dashboards with Matplotlib, Seaborn, and Plotly.',
        orderIndex: 4,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'data-visualization',
        prerequisites: ['Data Analysis with Pandas'],
      },
      {
        skillName: 'Machine Learning Fundamentals',
        description: 'Supervised and unsupervised learning with scikit-learn.',
        orderIndex: 5,
        isRequired: true,
        estimatedHours: 60,
        courseSlug: 'ml-basics',
        prerequisites: ['Data Analysis with Pandas', 'Statistics & Probability'],
      },
      {
        skillName: 'Deep Learning Introduction',
        description: 'Neural networks and deep learning with TensorFlow or PyTorch.',
        orderIndex: 6,
        isRequired: false,
        estimatedHours: 50,
        courseSlug: 'deep-learning',
        prerequisites: ['Machine Learning Fundamentals'],
      },
    ],
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    description:
      'Bridge development and operations. Automate deployments, manage cloud infrastructure, and ensure system reliability at scale.',
    shortDescription: 'Automate & scale infrastructure',
    industry: 'devops',
    estimatedHours: 250,
    marketDemand: 88,
    salaryImpact: 88,
    analyticalReq: 65,
    color: '#F97316',
    outcomes: ['career_change', 'high_salary', 'job_ready'],
    tags: ['linux', 'bash', 'docker', 'kubernetes', 'cicd', 'cloud', 'python', 'automation'],
    orderIndex: 5,
    nodes: [
      {
        skillName: 'Linux & Command Line',
        description: 'Master the terminal — navigation, scripting, and system administration.',
        orderIndex: 0,
        isRequired: true,
        estimatedHours: 35,
        courseSlug: 'linux-basics',
        prerequisites: [],
      },
      {
        skillName: 'Python for Automation',
        description: 'Write scripts to automate repetitive tasks and system management.',
        orderIndex: 1,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'python-basics',
        prerequisites: [],
      },
      {
        skillName: 'Git & Version Control',
        description: 'Branching, merging, workflows, and collaboration with Git.',
        orderIndex: 2,
        isRequired: true,
        estimatedHours: 15,
        courseSlug: 'git-basics',
        prerequisites: [],
      },
      {
        skillName: 'Docker & Containers',
        description: 'Containerize applications and manage multi-container setups.',
        orderIndex: 3,
        isRequired: true,
        estimatedHours: 35,
        courseSlug: 'docker-basics',
        prerequisites: ['Linux & Command Line'],
      },
      {
        skillName: 'CI/CD Pipelines',
        description: 'Automate testing and deployment with GitHub Actions, Jenkins, or GitLab CI.',
        orderIndex: 4,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'cicd-basics',
        prerequisites: ['Git & Version Control', 'Docker & Containers'],
      },
      {
        skillName: 'Cloud Platforms (AWS/GCP)',
        description: 'Deploy and manage applications on major cloud platforms.',
        orderIndex: 5,
        isRequired: true,
        estimatedHours: 45,
        courseSlug: 'cloud-basics',
        prerequisites: ['Docker & Containers'],
      },
      {
        skillName: 'Kubernetes',
        description: 'Orchestrate containers at scale with Kubernetes.',
        orderIndex: 6,
        isRequired: false,
        estimatedHours: 40,
        courseSlug: 'kubernetes-basics',
        prerequisites: ['Docker & Containers', 'Cloud Platforms (AWS/GCP)'],
      },
      {
        skillName: 'Monitoring & Observability',
        description: 'Set up logging, metrics, alerting, and tracing for production systems.',
        orderIndex: 7,
        isRequired: false,
        estimatedHours: 20,
        courseSlug: 'monitoring-basics',
        prerequisites: ['Cloud Platforms (AWS/GCP)'],
      },
    ],
  },
  {
    slug: 'game-developer',
    title: 'Game Developer',
    description:
      'Create interactive games and simulations. Learn programming, physics, graphics, and game design principles.',
    shortDescription: 'Create interactive games',
    industry: 'games',
    estimatedHours: 280,
    marketDemand: 65,
    salaryImpact: 70,
    analyticalReq: 70,
    color: '#EF4444',
    outcomes: ['hobby', 'creative', 'fun', 'portfolio', 'startup'],
    tags: ['csharp', 'cpp', 'unity', 'graphics', 'math', 'physics', 'games'],
    orderIndex: 6,
    nodes: [
      {
        skillName: 'Programming Fundamentals (C#)',
        description: 'Learn C# — the primary language for Unity game development.',
        orderIndex: 0,
        isRequired: true,
        estimatedHours: 40,
        courseSlug: 'csharp-basics',
        prerequisites: [],
      },
      {
        skillName: 'Math for Game Dev',
        description: 'Vectors, matrices, trigonometry — the math behind game physics and graphics.',
        orderIndex: 1,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'game-math',
        prerequisites: [],
      },
      {
        skillName: 'Game Design Principles',
        description: 'Mechanics, dynamics, aesthetics — what makes games fun and engaging.',
        orderIndex: 2,
        isRequired: true,
        estimatedHours: 20,
        courseSlug: 'game-design',
        prerequisites: [],
      },
      {
        skillName: 'Unity Fundamentals',
        description: 'Build 2D and 3D games with the Unity engine.',
        orderIndex: 3,
        isRequired: true,
        estimatedHours: 60,
        courseSlug: 'unity-basics',
        prerequisites: ['Programming Fundamentals (C#)', 'Game Design Principles'],
      },
      {
        skillName: 'Physics & Collision Systems',
        description: 'Implement realistic movement, gravity, and collision detection.',
        orderIndex: 4,
        isRequired: true,
        estimatedHours: 30,
        courseSlug: 'game-physics',
        prerequisites: ['Unity Fundamentals', 'Math for Game Dev'],
      },
      {
        skillName: 'UI & Audio in Games',
        description: 'Create game menus, HUDs, sound effects, and music integration.',
        orderIndex: 5,
        isRequired: true,
        estimatedHours: 25,
        courseSlug: 'game-ui-audio',
        prerequisites: ['Unity Fundamentals'],
      },
      {
        skillName: 'Multiplayer & Networking',
        description: 'Add online multiplayer functionality to games.',
        orderIndex: 6,
        isRequired: false,
        estimatedHours: 40,
        courseSlug: 'game-multiplayer',
        prerequisites: ['Unity Fundamentals'],
      },
      {
        skillName: 'Publishing & Distribution',
        description: 'Publish games to Steam, App Store, and Google Play.',
        orderIndex: 7,
        isRequired: false,
        estimatedHours: 15,
        courseSlug: 'game-publishing',
        prerequisites: ['UI & Audio in Games'],
      },
    ],
  },
];

async function seedCareerPaths() {
  console.log('🌱 Seeding career paths...\n');

  for (const pathData of CAREER_PATHS) {
    const { nodes: nodeData, ...pathFields } = pathData;

    // Create or update the career path
    const careerPath = await prisma.careerPath.upsert({
      where: { slug: pathFields.slug },
      update: {
        ...pathFields,
        outcomes: pathFields.outcomes as any,
        tags: pathFields.tags as any,
        isPublished: true,
      },
      create: {
        ...pathFields,
        outcomes: pathFields.outcomes as any,
        tags: pathFields.tags as any,
        isPublished: true,
      },
    });

    console.log(`  ✅ Career path: ${careerPath.title} (${careerPath.slug})`);

    // Create nodes
    const createdNodes = new Map<string, string>(); // skillName → nodeId

    for (const node of nodeData) {
      const { courseSlug, prerequisites, ...nodeFields } = node;

      // Try to find linked course
      let courseId: string | undefined;
      if (courseSlug) {
        const course = await prisma.course.findUnique({
          where: { slug: courseSlug },
        });
        if (course) {
          courseId = course.id;
        }
      }

      const createdNode = await prisma.pathNode.upsert({
        where: {
          id: `${careerPath.id}_${nodeFields.orderIndex}`, // Won't match — forces create
        },
        update: {},
        create: {
          careerPathId: careerPath.id,
          skillName: nodeFields.skillName,
          description: nodeFields.description,
          orderIndex: nodeFields.orderIndex,
          isRequired: nodeFields.isRequired,
          estimatedHours: nodeFields.estimatedHours,
          courseId,
        },
      });

      createdNodes.set(nodeFields.skillName, createdNode.id);
      console.log(`     📌 Node: ${nodeFields.skillName}${courseId ? ' → ' + courseSlug : ''}`);
    }

    // Create dependencies
    for (const node of nodeData) {
      if (node.prerequisites.length === 0) continue;

      const dependentId = createdNodes.get(node.skillName);
      if (!dependentId) continue;

      for (const prereqName of node.prerequisites) {
        const prerequisiteId = createdNodes.get(prereqName);
        if (!prerequisiteId) continue;

        await prisma.pathNodeDependency.upsert({
          where: {
            prerequisiteId_dependentId: { prerequisiteId, dependentId },
          },
          update: {},
          create: { prerequisiteId, dependentId },
        });

        console.log(`     🔗 ${prereqName} → ${node.skillName}`);
      }
    }

    console.log('');
  }

  console.log('✨ Career path seeding complete!');
  console.log(`   Total paths: ${CAREER_PATHS.length}`);
  console.log(`   Total nodes: ${CAREER_PATHS.reduce((sum, p) => sum + p.nodes.length, 0)}`);
}

seedCareerPaths()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
