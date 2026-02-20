import { PrismaClient, Difficulty, QuizType, UserRole, LeagueTier } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...\n');

  // ============================================
  // DEMO USERS
  // ============================================
  console.log('👤 Seeding demo users...');

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@aralify.com' },
    update: {},
    create: {
      email: 'admin@aralify.com',
      username: 'admin',
      displayName: 'Admin User',
      bio: 'Platform administrator',
      role: UserRole.ADMIN,
      isVerified: true,
      xpTotal: 10000,
      level: 25,
      streakCurrent: 30,
      streakLongest: 45,
      settings: {
        create: {
          theme: 'dark',
          codeEditorTheme: 'vs-dark',
          fontSize: 14,
          dailyGoalMins: 60,
          difficultyPref: Difficulty.HARD,
        },
      },
      notificationSettings: {
        create: {
          emailEnabled: true,
          pushEnabled: true,
          streakReminders: true,
          achievementNotifs: true,
          socialNotifs: true,
        },
      },
      privacySettings: {
        create: {
          profileVisibility: 'PUBLIC',
          showProgress: true,
          showActivity: true,
          allowMessages: 'EVERYONE',
        },
      },
    },
  });

  const modUser = await prisma.user.upsert({
    where: { email: 'mod@aralify.com' },
    update: {},
    create: {
      email: 'mod@aralify.com',
      username: 'moderator',
      displayName: 'Mod User',
      bio: 'Community moderator',
      role: UserRole.MODERATOR,
      isVerified: true,
      xpTotal: 5000,
      level: 15,
      streakCurrent: 14,
      streakLongest: 20,
      settings: {
        create: {
          theme: 'auto',
          codeEditorTheme: 'vs-dark',
          fontSize: 14,
          dailyGoalMins: 45,
          difficultyPref: Difficulty.MEDIUM,
        },
      },
      notificationSettings: { create: {} },
      privacySettings: { create: {} },
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@aralify.com' },
    update: {},
    create: {
      email: 'demo@aralify.com',
      username: 'demo_learner',
      displayName: 'Demo Learner',
      bio: 'Just learning to code!',
      role: UserRole.USER,
      isVerified: true,
      xpTotal: 1500,
      level: 5,
      streakCurrent: 3,
      streakLongest: 7,
      settings: {
        create: {
          theme: 'light',
          codeEditorTheme: 'vs-light',
          fontSize: 16,
          dailyGoalMins: 30,
          difficultyPref: Difficulty.EASY,
        },
      },
      notificationSettings: { create: {} },
      privacySettings: { create: {} },
    },
  });

  console.log(`   ✅ Created ${adminUser.email}, ${modUser.email}, ${demoUser.email}\n`);

  // ============================================
  // COURSES
  // ============================================
  console.log('📚 Seeding courses...');

  const pythonCourse = await prisma.course.upsert({
    where: { slug: 'python-fundamentals' },
    update: {},
    create: {
      slug: 'python-fundamentals',
      title: 'Python Fundamentals',
      titleEn: 'Python Fundamentals',
      titleFil: 'Batayan ng Python',
      description: 'Learn Python from scratch. Master variables, loops, functions, and more!',
      descriptionEn: 'Learn Python from scratch. Master variables, loops, functions, and more!',
      descriptionFil: 'Matuto ng Python mula sa simula. Aralin ang mga variable, loop, function, at marami pa!',
      language: 'python',
      iconUrl: '/icons/python.svg',
      color: '#3776AB',
      orderIndex: 0,
      estimatedHours: 20,
      isPublished: true,
    },
  });

  const jsCourse = await prisma.course.upsert({
    where: { slug: 'javascript-essentials' },
    update: {},
    create: {
      slug: 'javascript-essentials',
      title: 'JavaScript Essentials',
      titleEn: 'JavaScript Essentials',
      titleFil: 'Mga Pangunahing JavaScript',
      description: 'Master JavaScript for web development. DOM, events, async, and more!',
      descriptionEn: 'Master JavaScript for web development. DOM, events, async, and more!',
      descriptionFil: 'Aralin ang JavaScript para sa web development. DOM, events, async, at marami pa!',
      language: 'javascript',
      iconUrl: '/icons/javascript.svg',
      color: '#F7DF1E',
      orderIndex: 1,
      estimatedHours: 25,
      isPublished: true,
    },
  });

  const htmlCssCourse = await prisma.course.upsert({
    where: { slug: 'html-css-basics' },
    update: {},
    create: {
      slug: 'html-css-basics',
      title: 'HTML & CSS Basics',
      titleEn: 'HTML & CSS Basics',
      titleFil: 'Batayan ng HTML at CSS',
      description: 'Build beautiful websites with HTML and CSS. Learn structure and styling!',
      descriptionEn: 'Build beautiful websites with HTML and CSS. Learn structure and styling!',
      descriptionFil: 'Gumawa ng magagandang website gamit ang HTML at CSS!',
      language: 'html',
      iconUrl: '/icons/html5.svg',
      color: '#E34F26',
      orderIndex: 2,
      estimatedHours: 15,
      isPublished: true,
    },
  });

  console.log(`   ✅ Created ${pythonCourse.title}, ${jsCourse.title}, ${htmlCssCourse.title}\n`);

  // ============================================
  // RICH PYTHON LEVELS & LESSONS
  // ============================================
  console.log('📖 Seeding rich Python course content...');

  // ── Level 1: Variables & Data Types ──────────────────────────────────────
  const pyLevel1 = await prisma.level.upsert({
    where: { courseId_slug: { courseId: pythonCourse.id, slug: 'variables-data-types' } },
    update: {},
    create: {
      courseId: pythonCourse.id,
      slug: 'variables-data-types',
      title: 'Variables & Data Types',
      titleEn: 'Variables & Data Types',
      titleFil: 'Mga Variable at Uri ng Data',
      description: 'Learn about variables, strings, numbers, and booleans',
      descriptionEn: 'Learn about variables, strings, numbers, and booleans',
      descriptionFil: 'Matuto tungkol sa mga variable, string, numero, at boolean',
      orderIndex: 0,
      isPublished: true,
    },
  });

  const level1Content = {
    theoryCards: [
      {
        id: 'tc-1-1',
        title: 'What is a Variable?',
        content: 'A **variable** is a named container that stores a value in your computer\'s memory. Think of it like a labeled box — you put something in, and you can get it out later by name.',
        codeExample: 'name = "Maria"\nage = 21\nprint(name)  # Output: Maria',
        tip: 'Variable names should be descriptive. Use `student_name` instead of `x`.',
      },
      {
        id: 'tc-1-2',
        title: 'Naming Rules',
        content: 'Variable names in Python must:\n- Start with a letter or underscore (`_`)\n- Contain only letters, numbers, and underscores\n- Be case-sensitive (`Name` ≠ `name`)\n- Not be a Python keyword (`if`, `for`, `while`, etc.)',
        codeExample: 'my_var = 10       # ✅ Valid\n_private = "hi"   # ✅ Valid\n2fast = True      # ❌ Cannot start with number\nfor = 5           # ❌ "for" is a keyword',
      },
      {
        id: 'tc-1-3',
        title: 'Strings',
        content: 'A **string** is a sequence of characters enclosed in quotes. You can use single quotes (`\'`) or double quotes (`"`) — both work the same way.',
        codeExample: 'greeting = "Kamusta"\nlanguage = \'Python\'\nmessage = f"{greeting}, welcome to {language}!"\nprint(message)  # Kamusta, welcome to Python!',
        tip: 'f-strings (formatted strings) let you embed variables directly inside strings using curly braces.',
      },
      {
        id: 'tc-1-4',
        title: 'Numbers: int and float',
        content: '**Integers** (`int`) are whole numbers without decimals. **Floats** (`float`) are numbers with decimal points. Python handles the type automatically.',
        codeExample: 'count = 42        # int\nprice = 99.99     # float\ntotal = count + price  # = 141.99 (float)\nprint(type(total))     # <class \'float\'>',
      },
      {
        id: 'tc-1-5',
        title: 'Booleans',
        content: '**Booleans** represent `True` or `False`. They\'re used in conditions, comparisons, and logical operations. Note: Python capitalizes `True` and `False`.',
        codeExample: 'is_student = True\nhas_passed = False\nprint(10 > 5)     # True\nprint(10 == 5)    # False',
      },
      {
        id: 'tc-1-6',
        title: 'The type() Function',
        content: 'Use `type()` to check what kind of data a variable holds. This is helpful when debugging or when you\'re unsure about a value\'s type.',
        codeExample: 'x = "hello"\ny = 42\nz = 3.14\nw = True\nprint(type(x))  # <class \'str\'>\nprint(type(y))  # <class \'int\'>\nprint(type(z))  # <class \'float\'>\nprint(type(w))  # <class \'bool\'>',
      },
      {
        id: 'tc-1-7',
        title: 'Type Conversion',
        content: 'You can convert between types using `int()`, `float()`, `str()`, and `bool()`. This is called **type casting**.',
        codeExample: 'age_str = "25"\nage_num = int(age_str)   # 25 (int)\nprice = float("9.99")    # 9.99 (float)\ncount = str(100)         # "100" (string)\nprint(bool(0))           # False\nprint(bool(1))           # True',
        tip: 'Be careful! `int("hello")` will crash. Only convert values that make sense.',
      },
      {
        id: 'tc-1-8',
        title: 'Recap',
        content: '🎉 **Great job!** You learned:\n- Variables store values with meaningful names\n- Python has 4 basic types: `str`, `int`, `float`, `bool`\n- Use `type()` to check types\n- Use `int()`, `float()`, `str()` to convert between types\n\nTime to test your knowledge with a quiz!',
      },
    ],
    quizQuestions: [
      {
        type: 'multiple_choice',
        id: 'qq-1-1',
        question: 'Which of the following is a valid Python variable name?',
        options: ['my_variable', '2nd_place', 'for', 'my-variable'],
        correctIndex: 0,
        explanation: '"my_variable" follows all naming rules. "2nd_place" starts with a number, "for" is a keyword, and "my-variable" contains a hyphen.',
        hint: 'Variable names can only contain letters, numbers, and underscores.',
      },
      {
        type: 'true_false',
        id: 'qq-1-2',
        question: 'In Python, "Name" and "name" refer to the same variable.',
        correctAnswer: false,
        explanation: 'Python is case-sensitive! "Name" and "name" are two completely different variables.',
      },
      {
        type: 'fill_blank',
        id: 'qq-1-3',
        question: 'Complete the code to convert the string "42" to an integer:',
        codeTemplate: 'age = ___BLANK___("42")',
        correctAnswer: 'int',
        explanation: 'The int() function converts a string to an integer. int("42") returns the number 42.',
        hint: 'Think about which type conversion function turns strings into whole numbers.',
      },
      {
        type: 'multiple_choice',
        id: 'qq-1-4',
        question: 'What does type(3.14) return?',
        options: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "<class 'number'>"],
        correctIndex: 0,
        explanation: '3.14 has a decimal point, so Python treats it as a float (floating-point number).',
      },
      {
        type: 'reorder',
        id: 'qq-1-5',
        question: 'Arrange the lines to create a variable, convert it, and print the result:',
        lines: ['print(age_num + 1)', 'age_str = "25"', 'age_num = int(age_str)'],
        correctOrder: [1, 2, 0],
        explanation: 'First create the string, then convert it to int, then use it in a calculation.',
        hint: 'You need to define a variable before you can use it.',
      },
      {
        type: 'true_false',
        id: 'qq-1-6',
        question: 'bool(0) returns True in Python.',
        correctAnswer: false,
        explanation: 'In Python, 0 is "falsy" — bool(0) returns False. Any non-zero number returns True.',
      },
    ],
    tiers: [
      {
        difficulty: 'easy',
        xpMultiplier: 1,
        starterCode: '# Create a variable called "greeting" with the value "Hello, World!"\n# Then print it\n\n',
        description: 'Create and print a simple string variable.',
      },
      {
        difficulty: 'medium',
        xpMultiplier: 2,
        starterCode: '# Create variables for a student profile:\n# - name (string)\n# - age (integer)  \n# - gpa (float)\n# Then print a formatted message like:\n# "Maria is 21 years old with a GPA of 1.25"\n\n',
        description: 'Work with multiple types and f-strings.',
      },
      {
        difficulty: 'hard',
        xpMultiplier: 3,
        starterCode: '# Given user input as strings, convert and calculate:\n# price_str = "149.99"\n# quantity_str = "3"\n# discount_pct_str = "10"\n#\n# Calculate the total after discount and print:\n# "Total: ₱404.97" (formatted to 2 decimal places)\n\nprice_str = "149.99"\nquantity_str = "3"\ndiscount_pct_str = "10"\n\n',
        description: 'Type conversion and arithmetic with formatted output.',
      },
    ],
  };

  // Create 3 lessons for level 1 (Easy, Medium, Hard)
  const difficulties: Difficulty[] = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD];
  const xpRewards = { EASY: 100, MEDIUM: 200, HARD: 300 };

  const level1Lessons: any[] = [];
  for (let d = 0; d < difficulties.length; d++) {
    const difficulty = difficulties[d];
    const lesson = await prisma.lesson.upsert({
      where: { levelId_slug_difficulty: { levelId: pyLevel1.id, slug: 'variables-data-types-lesson', difficulty } },
      update: {
        content: level1Content,
        titleEn: `Variables & Data Types`,
        titleFil: `Mga Variable at Uri ng Data`,
        estimatedTimeMinutes: 15,
      },
      create: {
        levelId: pyLevel1.id,
        slug: 'variables-data-types-lesson',
        title: `Variables & Data Types - ${difficulty}`,
        titleEn: 'Variables & Data Types',
        titleFil: 'Mga Variable at Uri ng Data',
        content: level1Content,
        difficulty,
        xpReward: xpRewards[difficulty],
        orderIndex: d,
        estimatedTimeMinutes: 15,
        isPublished: true,
        minQuizScore: 60,
      },
    });
    level1Lessons.push(lesson);

    // Create quizzes (stored in DB for answer validation)
    await prisma.quiz.upsert({
      where: { id: `quiz-${lesson.id}-0` },
      update: {},
      create: {
        id: `quiz-${lesson.id}-0`,
        lessonId: lesson.id,
        type: QuizType.MULTIPLE_CHOICE,
        question: 'Which of the following is a valid Python variable name?',
        options: ['my_variable', '2nd_place', 'for', 'my-variable'],
        correctAnswer: 'my_variable',
        explanation: '"my_variable" follows all naming rules.',
        orderIndex: 0,
      },
    });

    await prisma.quiz.upsert({
      where: { id: `quiz-${lesson.id}-1` },
      update: {},
      create: {
        id: `quiz-${lesson.id}-1`,
        lessonId: lesson.id,
        type: QuizType.TRUE_FALSE,
        question: 'In Python, "Name" and "name" refer to the same variable.',
        correctAnswer: 'false',
        explanation: 'Python is case-sensitive.',
        orderIndex: 1,
      },
    });

    await prisma.quiz.upsert({
      where: { id: `quiz-${lesson.id}-2` },
      update: {},
      create: {
        id: `quiz-${lesson.id}-2`,
        lessonId: lesson.id,
        type: QuizType.FILL_BLANK,
        question: 'Complete: age = ___("42") to convert string to integer',
        correctAnswer: 'int',
        explanation: 'int() converts strings to integers.',
        orderIndex: 2,
      },
    });

    await prisma.quiz.upsert({
      where: { id: `quiz-${lesson.id}-3` },
      update: {},
      create: {
        id: `quiz-${lesson.id}-3`,
        lessonId: lesson.id,
        type: QuizType.MULTIPLE_CHOICE,
        question: 'What does type(3.14) return?',
        options: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "<class 'number'>"],
        correctAnswer: "<class 'float'>",
        explanation: '3.14 is a float.',
        orderIndex: 3,
      },
    });

    // Create code challenge
    const challengeConfigs = {
      EASY: {
        title: 'Hello Variable',
        description: 'Create a variable called "greeting" with the value "Hello, World!" and print it.',
        starterCode: '# Create a variable called "greeting" with the value "Hello, World!"\n# Then print it\n\n',
        solutionCode: 'greeting = "Hello, World!"\nprint(greeting)\n',
        testCases: [
          { input: '', expectedOutput: 'Hello, World!', description: 'Should print Hello, World!' },
        ],
      },
      MEDIUM: {
        title: 'Student Profile',
        description: 'Create variables name (str), age (int), gpa (float), then print: "Maria is 21 years old with a GPA of 1.25"',
        starterCode: '# Create and print a student profile\nname = "Maria"\nage = 21\ngpa = 1.25\n\n# Print the formatted message below\n',
        solutionCode: 'name = "Maria"\nage = 21\ngpa = 1.25\nprint(f"{name} is {age} years old with a GPA of {gpa}")\n',
        testCases: [
          { input: '', expectedOutput: 'Maria is 21 years old with a GPA of 1.25', description: 'Should print formatted profile' },
        ],
      },
      HARD: {
        title: 'Discount Calculator',
        description: 'Convert string inputs to numbers, calculate total after discount, print formatted result.',
        starterCode: 'price_str = "149.99"\nquantity_str = "3"\ndiscount_pct_str = "10"\n\n# Convert and calculate\n',
        solutionCode: 'price_str = "149.99"\nquantity_str = "3"\ndiscount_pct_str = "10"\n\nprice = float(price_str)\nquantity = int(quantity_str)\ndiscount = float(discount_pct_str)\n\nsubtotal = price * quantity\ntotal = subtotal * (1 - discount / 100)\nprint(f"Total: P{total:.2f}")\n',
        testCases: [
          { input: '', expectedOutput: 'Total: P404.97', description: 'Should calculate discounted total' },
        ],
      },
    };

    const config = challengeConfigs[difficulty];
    await prisma.codeChallenge.upsert({
      where: { id: `challenge-${lesson.id}` },
      update: {},
      create: {
        id: `challenge-${lesson.id}`,
        lessonId: lesson.id,
        title: config.title,
        description: config.description,
        starterCode: config.starterCode,
        solutionCode: config.solutionCode,
        testCases: config.testCases,
        hints: [
          'Remember to use the print() function to output your result.',
          'Use f-strings for formatted output: f"text {variable}"',
          'For type conversion, use int(), float(), or str().',
        ],
        languageId: 71, // Python 3
      },
    });
  }

  // ── Level 2: Control Flow ────────────────────────────────────────────────
  const pyLevel2 = await prisma.level.upsert({
    where: { courseId_slug: { courseId: pythonCourse.id, slug: 'control-flow' } },
    update: {},
    create: {
      courseId: pythonCourse.id,
      slug: 'control-flow',
      title: 'Control Flow',
      titleEn: 'Control Flow',
      titleFil: 'Daloy ng Kontrol',
      description: 'Master if statements, loops, and conditions',
      descriptionEn: 'Master if statements, loops, and conditions',
      descriptionFil: 'Aralin ang mga if statement, loop, at kondisyon',
      orderIndex: 1,
      isPublished: true,
    },
  });

  const level2Content = {
    theoryCards: [
      {
        id: 'tc-2-1',
        title: 'if Statements',
        content: 'An **if statement** lets your program make decisions. If a condition is `True`, the indented code runs. Otherwise, it\'s skipped.',
        codeExample: 'age = 18\nif age >= 18:\n    print("You can vote!")\nprint("Moving on...")',
        tip: 'Indentation matters in Python! Use 4 spaces for each level.',
      },
      {
        id: 'tc-2-2',
        title: 'if/elif/else',
        content: 'Use **elif** (else if) to check multiple conditions, and **else** for the fallback when nothing matches.',
        codeExample: 'score = 85\nif score >= 90:\n    print("Excellent!")\nelif score >= 80:\n    print("Great job!")\nelif score >= 70:\n    print("Good work")\nelse:\n    print("Keep trying!")',
      },
      {
        id: 'tc-2-3',
        title: 'Comparison Operators',
        content: 'Python provides 6 comparison operators that return `True` or `False`:\n- `==` equal to\n- `!=` not equal to\n- `>` greater than\n- `<` less than\n- `>=` greater than or equal\n- `<=` less than or equal',
        codeExample: 'print(5 == 5)   # True\nprint(5 != 3)   # True\nprint(10 > 20)  # False\nprint(3 <= 3)   # True',
      },
      {
        id: 'tc-2-4',
        title: 'Logical Operators',
        content: '**and**, **or**, **not** combine multiple conditions:\n- `and`: both must be True\n- `or`: at least one must be True\n- `not`: flips True↔False',
        codeExample: 'age = 20\nhas_id = True\n\nif age >= 18 and has_id:\n    print("Entry allowed")\n\nif age < 13 or age > 65:\n    print("Free admission")',
      },
      {
        id: 'tc-2-5',
        title: 'while Loops',
        content: 'A **while loop** repeats code as long as a condition is `True`. Be careful — if the condition never becomes False, you get an infinite loop!',
        codeExample: 'count = 1\nwhile count <= 5:\n    print(f"Count: {count}")\n    count += 1\nprint("Done!")',
      },
      {
        id: 'tc-2-6',
        title: 'for Loops and range()',
        content: 'A **for loop** iterates over a sequence. `range(n)` generates numbers from 0 to n-1. `range(start, stop)` lets you specify a start.',
        codeExample: 'for i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\nfor i in range(1, 4):\n    print(i)  # 1, 2, 3\n\nfruits = ["mango", "banana", "calamansi"]\nfor fruit in fruits:\n    print(fruit)',
      },
      {
        id: 'tc-2-7',
        title: 'break and continue',
        content: '**break** exits the loop entirely. **continue** skips the current iteration and moves to the next one.',
        codeExample: 'for i in range(10):\n    if i == 5:\n        break    # Stop at 5\n    if i % 2 == 0:\n        continue # Skip even numbers\n    print(i) # Prints: 1, 3',
      },
      {
        id: 'tc-2-8',
        title: 'Recap',
        content: '🎉 You learned:\n- `if`/`elif`/`else` for decisions\n- Comparison (`==`, `!=`, `>`, `<`) and logical (`and`, `or`, `not`) operators\n- `while` loops for repeated actions\n- `for` loops with `range()` for counting\n- `break` and `continue` for loop control',
      },
    ],
    quizQuestions: [
      {
        type: 'multiple_choice',
        id: 'qq-2-1',
        question: 'What will this code print?\n```python\nx = 15\nif x > 20:\n    print("A")\nelif x > 10:\n    print("B")\nelse:\n    print("C")\n```',
        options: ['A', 'B', 'C', 'Error'],
        correctIndex: 1,
        explanation: 'x is 15, which is not > 20 (skip A), but IS > 10, so "B" prints.',
      },
      {
        type: 'true_false',
        id: 'qq-2-2',
        question: 'The expression `True and False` evaluates to True.',
        correctAnswer: false,
        explanation: 'With "and", BOTH sides must be True. Since one is False, the result is False.',
      },
      {
        type: 'fill_blank',
        id: 'qq-2-3',
        question: 'Complete the loop to print numbers 1 through 5:',
        codeTemplate: 'for i in ___BLANK___(1, 6):\n    print(i)',
        correctAnswer: 'range',
        explanation: 'range(1, 6) generates numbers from 1 to 5 (stop value is exclusive).',
      },
      {
        type: 'multiple_choice',
        id: 'qq-2-4',
        question: 'What does the `break` statement do inside a loop?',
        options: ['Exits the loop entirely', 'Skips the current iteration', 'Pauses the loop', 'Restarts the loop'],
        correctIndex: 0,
        explanation: 'break immediately exits the loop. continue skips the current iteration.',
      },
      {
        type: 'reorder',
        id: 'qq-2-5',
        question: 'Arrange to create a countdown from 3 to 1:',
        lines: ['print("Go!")', 'count = 3', 'while count > 0:', '    print(count)', '    count -= 1'],
        correctOrder: [1, 2, 3, 4, 0],
        explanation: 'Initialize counter, loop while positive, print and decrement, then print "Go!" after loop.',
      },
    ],
    tiers: [
      {
        difficulty: 'easy',
        xpMultiplier: 1,
        starterCode: '# Write a program that checks if a number is positive, negative, or zero\n# Print "Positive", "Negative", or "Zero"\n\nnumber = 7\n\n',
        description: 'Simple if/elif/else branching.',
      },
      {
        difficulty: 'medium',
        xpMultiplier: 2,
        starterCode: '# Print all even numbers from 1 to 20\n# Use a for loop and an if statement\n# Expected output: 2 4 6 8 10 12 14 16 18 20 (each on a new line)\n\n',
        description: 'Combine loops with conditions.',
      },
      {
        difficulty: 'hard',
        xpMultiplier: 3,
        starterCode: '# FizzBuzz: Print numbers 1-20\n# If divisible by 3: print "Fizz"\n# If divisible by 5: print "Buzz"\n# If divisible by both: print "FizzBuzz"\n# Otherwise: print the number\n\n',
        description: 'Classic FizzBuzz with nested conditions.',
      },
    ],
  };

  const level2Lessons: any[] = [];
  for (let d = 0; d < difficulties.length; d++) {
    const difficulty = difficulties[d];
    const lesson = await prisma.lesson.upsert({
      where: { levelId_slug_difficulty: { levelId: pyLevel2.id, slug: 'control-flow-lesson', difficulty } },
      update: {
        content: level2Content,
        titleEn: 'Control Flow',
        titleFil: 'Daloy ng Kontrol',
        estimatedTimeMinutes: 20,
      },
      create: {
        levelId: pyLevel2.id,
        slug: 'control-flow-lesson',
        title: `Control Flow - ${difficulty}`,
        titleEn: 'Control Flow',
        titleFil: 'Daloy ng Kontrol',
        content: level2Content,
        difficulty,
        xpReward: xpRewards[difficulty],
        orderIndex: d,
        estimatedTimeMinutes: 20,
        isPublished: true,
        minQuizScore: 60,
      },
    });
    level2Lessons.push(lesson);

    // Quizzes
    await prisma.quiz.upsert({
      where: { id: `quiz-${lesson.id}-0` },
      update: {},
      create: { id: `quiz-${lesson.id}-0`, lessonId: lesson.id, type: QuizType.MULTIPLE_CHOICE, question: 'What will print when x=15: if x>20 → "A", elif x>10 → "B", else → "C"?', options: ['A', 'B', 'C', 'Error'], correctAnswer: 'B', explanation: '15 > 10 is True, so B prints.', orderIndex: 0 },
    });
    await prisma.quiz.upsert({
      where: { id: `quiz-${lesson.id}-1` },
      update: {},
      create: { id: `quiz-${lesson.id}-1`, lessonId: lesson.id, type: QuizType.TRUE_FALSE, question: 'True and False evaluates to True.', correctAnswer: 'false', explanation: 'Both must be True for "and" to return True.', orderIndex: 1 },
    });
    await prisma.quiz.upsert({
      where: { id: `quiz-${lesson.id}-2` },
      update: {},
      create: { id: `quiz-${lesson.id}-2`, lessonId: lesson.id, type: QuizType.FILL_BLANK, question: 'Complete: for i in ___(1, 6): print(i)', correctAnswer: 'range', explanation: 'range() generates a sequence of numbers.', orderIndex: 2 },
    });

    // Challenges
    const l2Challenges = {
      EASY: {
        title: 'Positive or Negative',
        description: 'Check if number=7 is positive, negative, or zero.',
        starterCode: 'number = 7\n\n',
        solutionCode: 'number = 7\nif number > 0:\n    print("Positive")\nelif number < 0:\n    print("Negative")\nelse:\n    print("Zero")\n',
        testCases: [{ input: '', expectedOutput: 'Positive', description: 'Should print Positive for 7' }],
      },
      MEDIUM: {
        title: 'Even Numbers',
        description: 'Print all even numbers from 1 to 20, one per line.',
        starterCode: '# Print even numbers 1-20\n\n',
        solutionCode: 'for i in range(1, 21):\n    if i % 2 == 0:\n        print(i)\n',
        testCases: [{ input: '', expectedOutput: '2\n4\n6\n8\n10\n12\n14\n16\n18\n20', description: 'Even numbers 1-20' }],
      },
      HARD: {
        title: 'FizzBuzz',
        description: 'Classic FizzBuzz for numbers 1-20.',
        starterCode: '# FizzBuzz 1-20\n\n',
        solutionCode: 'for i in range(1, 21):\n    if i % 3 == 0 and i % 5 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)\n',
        testCases: [{ input: '', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz', description: 'FizzBuzz 1-20' }],
      },
    };

    const cfg = l2Challenges[difficulty];
    await prisma.codeChallenge.upsert({
      where: { id: `challenge-${lesson.id}` },
      update: {},
      create: {
        id: `challenge-${lesson.id}`,
        lessonId: lesson.id,
        title: cfg.title,
        description: cfg.description,
        starterCode: cfg.starterCode,
        solutionCode: cfg.solutionCode,
        testCases: cfg.testCases,
        hints: ['Think about the order of your conditions.', 'Use the modulo operator (%) to check divisibility.', 'Remember: range(1, 21) gives you 1 through 20.'],
        languageId: 71,
      },
    });
  }

  // ── Level 3: Functions ───────────────────────────────────────────────────
  const pyLevel3 = await prisma.level.upsert({
    where: { courseId_slug: { courseId: pythonCourse.id, slug: 'functions' } },
    update: {},
    create: {
      courseId: pythonCourse.id,
      slug: 'functions',
      title: 'Functions',
      titleEn: 'Functions',
      titleFil: 'Mga Function',
      description: 'Create reusable code with functions',
      descriptionEn: 'Create reusable code with functions',
      descriptionFil: 'Gumawa ng reusable code gamit ang mga function',
      orderIndex: 2,
      isPublished: true,
    },
  });

  const level3Content = {
    theoryCards: [
      {
        id: 'tc-3-1',
        title: 'What is a Function?',
        content: 'A **function** is a reusable block of code that performs a specific task. Instead of writing the same code repeatedly, you define it once and call it whenever you need it.',
        codeExample: 'def greet():\n    print("Kumusta!")\n\ngreet()  # Call the function\ngreet()  # Call it again',
      },
      {
        id: 'tc-3-2',
        title: 'Parameters & Arguments',
        content: '**Parameters** are placeholders in the function definition. **Arguments** are the actual values you pass when calling the function.',
        codeExample: 'def greet(name):  # "name" is a parameter\n    print(f"Hello, {name}!")\n\ngreet("Juan")    # "Juan" is an argument\ngreet("Maria")   # "Maria" is an argument',
      },
      {
        id: 'tc-3-3',
        title: 'Return Values',
        content: 'Use `return` to send a value back from a function. Without return, the function returns `None`.',
        codeExample: 'def add(a, b):\n    return a + b\n\nresult = add(3, 5)\nprint(result)  # 8\n\ndef say_hi():\n    print("Hi")\n\nx = say_hi()  # prints "Hi"\nprint(x)      # None',
        tip: 'A function stops executing as soon as it hits a return statement.',
      },
      {
        id: 'tc-3-4',
        title: 'Default Parameters',
        content: 'You can give parameters default values. If the caller doesn\'t provide that argument, the default is used.',
        codeExample: 'def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\n\ngreet("Juan")              # Hello, Juan!\ngreet("Maria", "Kumusta")  # Kumusta, Maria!',
      },
      {
        id: 'tc-3-5',
        title: 'Variable Scope',
        content: 'Variables created inside a function are **local** — they only exist inside that function. Variables outside are **global**.',
        codeExample: 'x = 10  # global\n\ndef my_func():\n    y = 5  # local\n    print(x)  # Can read global\n    print(y)\n\nmy_func()\n# print(y)  # Error! y doesn\'t exist here',
      },
      {
        id: 'tc-3-6',
        title: 'Recap',
        content: '🎉 You learned:\n- `def` keyword to define functions\n- Parameters receive values, `return` sends values back\n- Default parameters provide fallback values\n- Local vs global scope\n\nTime for a quiz!',
      },
    ],
    quizQuestions: [
      {
        type: 'multiple_choice',
        id: 'qq-3-1',
        question: 'What does this function return?\n```python\ndef mystery(x):\n    return x * 2 + 1\n```\nWhen called as mystery(3)',
        options: ['7', '6', '9', 'None'],
        correctIndex: 0,
        explanation: '3 * 2 + 1 = 7',
      },
      {
        type: 'fill_blank',
        id: 'qq-3-2',
        question: 'Complete the function definition:',
        codeTemplate: '___BLANK___ add(a, b):\n    return a + b',
        correctAnswer: 'def',
        explanation: 'The "def" keyword is used to define functions in Python.',
      },
      {
        type: 'true_false',
        id: 'qq-3-3',
        question: 'A function without a return statement returns None.',
        correctAnswer: true,
        explanation: 'If a function doesn\'t explicitly return a value, Python returns None by default.',
      },
      {
        type: 'multiple_choice',
        id: 'qq-3-4',
        question: 'What happens if you call greet() where def greet(name="World")?',
        options: ['Prints using "World"', 'Error: missing argument', 'Prints nothing', 'Returns None'],
        correctIndex: 0,
        explanation: 'The default parameter "World" is used when no argument is provided.',
      },
    ],
    tiers: [
      {
        difficulty: 'easy',
        xpMultiplier: 1,
        starterCode: '# Define a function called "double" that takes a number\n# and returns it multiplied by 2\n\n\n# Test it\nprint(double(5))   # Should print 10\nprint(double(3))   # Should print 6\n',
        description: 'Create a simple function with return.',
      },
      {
        difficulty: 'medium',
        xpMultiplier: 2,
        starterCode: '# Define a function "calculate_grade" that takes a score (0-100)\n# and returns the letter grade:\n# 90-100: "A", 80-89: "B", 70-79: "C", 60-69: "D", below 60: "F"\n\n\n# Test it\nprint(calculate_grade(95))  # A\nprint(calculate_grade(82))  # B\nprint(calculate_grade(45))  # F\n',
        description: 'Function with conditions and multiple returns.',
      },
      {
        difficulty: 'hard',
        xpMultiplier: 3,
        starterCode: '# Define a recursive function "factorial" that calculates n!\n# factorial(0) = 1, factorial(n) = n * factorial(n-1)\n\n\n# Test it\nprint(factorial(5))   # 120\nprint(factorial(0))   # 1\nprint(factorial(3))   # 6\n',
        description: 'Implement recursion.',
      },
    ],
  };

  for (let d = 0; d < difficulties.length; d++) {
    const difficulty = difficulties[d];
    const lesson = await prisma.lesson.upsert({
      where: { levelId_slug_difficulty: { levelId: pyLevel3.id, slug: 'functions-lesson', difficulty } },
      update: { content: level3Content, titleEn: 'Functions', titleFil: 'Mga Function', estimatedTimeMinutes: 20 },
      create: {
        levelId: pyLevel3.id, slug: 'functions-lesson', title: `Functions - ${difficulty}`,
        titleEn: 'Functions', titleFil: 'Mga Function', content: level3Content,
        difficulty, xpReward: xpRewards[difficulty], orderIndex: d, estimatedTimeMinutes: 20, isPublished: true, minQuizScore: 60,
      },
    });

    await prisma.quiz.upsert({ where: { id: `quiz-${lesson.id}-0` }, update: {}, create: { id: `quiz-${lesson.id}-0`, lessonId: lesson.id, type: QuizType.MULTIPLE_CHOICE, question: 'What does mystery(3) return where def mystery(x): return x*2+1?', options: ['7', '6', '9', 'None'], correctAnswer: '7', explanation: '3*2+1=7.', orderIndex: 0 } });
    await prisma.quiz.upsert({ where: { id: `quiz-${lesson.id}-1` }, update: {}, create: { id: `quiz-${lesson.id}-1`, lessonId: lesson.id, type: QuizType.FILL_BLANK, question: 'Complete: ___ add(a, b): return a + b', correctAnswer: 'def', explanation: '"def" defines functions.', orderIndex: 1 } });
    await prisma.quiz.upsert({ where: { id: `quiz-${lesson.id}-2` }, update: {}, create: { id: `quiz-${lesson.id}-2`, lessonId: lesson.id, type: QuizType.TRUE_FALSE, question: 'A function without return returns None.', correctAnswer: 'true', explanation: 'Python returns None by default.', orderIndex: 2 } });

    const l3Challenges = {
      EASY: { title: 'Double Function', description: 'Create a function that doubles a number.', starterCode: 'def double(n):\n    pass\n\nprint(double(5))\nprint(double(3))\n', solutionCode: 'def double(n):\n    return n * 2\n\nprint(double(5))\nprint(double(3))\n', testCases: [{ input: '', expectedOutput: '10\n6', description: 'double(5)=10, double(3)=6' }] },
      MEDIUM: { title: 'Grade Calculator', description: 'Function returning letter grade from score.', starterCode: 'def calculate_grade(score):\n    pass\n\nprint(calculate_grade(95))\nprint(calculate_grade(82))\nprint(calculate_grade(45))\n', solutionCode: 'def calculate_grade(score):\n    if score >= 90: return "A"\n    elif score >= 80: return "B"\n    elif score >= 70: return "C"\n    elif score >= 60: return "D"\n    else: return "F"\n\nprint(calculate_grade(95))\nprint(calculate_grade(82))\nprint(calculate_grade(45))\n', testCases: [{ input: '', expectedOutput: 'A\nB\nF', description: 'Correct grades' }] },
      HARD: { title: 'Factorial', description: 'Recursive factorial function.', starterCode: 'def factorial(n):\n    pass\n\nprint(factorial(5))\nprint(factorial(0))\nprint(factorial(3))\n', solutionCode: 'def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))\nprint(factorial(0))\nprint(factorial(3))\n', testCases: [{ input: '', expectedOutput: '120\n1\n6', description: 'Correct factorials' }] },
    };
    const cfg = l3Challenges[difficulty];
    await prisma.codeChallenge.upsert({ where: { id: `challenge-${lesson.id}` }, update: {}, create: { id: `challenge-${lesson.id}`, lessonId: lesson.id, title: cfg.title, description: cfg.description, starterCode: cfg.starterCode, solutionCode: cfg.solutionCode, testCases: cfg.testCases, hints: ['Define the function with def keyword.', 'Use return to send back a value.', 'For recursion, define a base case first.'], languageId: 71 } });
  }

  // ── Level 4: Lists & Dictionaries ────────────────────────────────────────
  const pyLevel4 = await prisma.level.upsert({
    where: { courseId_slug: { courseId: pythonCourse.id, slug: 'lists-dictionaries' } },
    update: {},
    create: {
      courseId: pythonCourse.id,
      slug: 'lists-dictionaries',
      title: 'Lists & Dictionaries',
      titleEn: 'Lists & Dictionaries',
      titleFil: 'Mga List at Dictionary',
      description: 'Work with collections of data',
      descriptionEn: 'Work with collections of data',
      descriptionFil: 'Magtrabaho sa mga koleksyon ng data',
      orderIndex: 3,
      isPublished: true,
    },
  });

  const level4Content = {
    theoryCards: [
      {
        id: 'tc-4-1',
        title: 'Creating Lists',
        content: 'A **list** is an ordered collection of items. Lists can hold any type and are created with square brackets `[]`.',
        codeExample: 'fruits = ["mango", "banana", "calamansi"]\nnumbers = [1, 2, 3, 4, 5]\nmixed = ["hello", 42, True, 3.14]\nempty = []\nprint(len(fruits))  # 3',
      },
      {
        id: 'tc-4-2',
        title: 'Indexing & Slicing',
        content: 'Access items by index (starting at 0). Use negative indices to count from the end. Slicing creates a sub-list.',
        codeExample: 'colors = ["red", "blue", "green", "yellow"]\nprint(colors[0])     # red\nprint(colors[-1])    # yellow\nprint(colors[1:3])   # ["blue", "green"]\nprint(colors[:2])    # ["red", "blue"]',
      },
      {
        id: 'tc-4-3',
        title: 'List Methods',
        content: 'Lists have built-in methods:\n- `append(x)` — add to end\n- `insert(i, x)` — add at index\n- `remove(x)` — remove first occurrence\n- `pop()` — remove and return last\n- `sort()` — sort in place',
        codeExample: 'items = [3, 1, 4]\nitems.append(5)      # [3, 1, 4, 5]\nitems.insert(0, 0)   # [0, 3, 1, 4, 5]\nitems.sort()         # [0, 1, 3, 4, 5]\nlast = items.pop()   # last = 5',
      },
      {
        id: 'tc-4-4',
        title: 'Dictionaries',
        content: 'A **dictionary** stores data as key-value pairs. Keys must be unique. Access values using their key.',
        codeExample: 'student = {\n    "name": "Juan",\n    "age": 20,\n    "course": "BSCS"\n}\nprint(student["name"])  # Juan\nstudent["gpa"] = 1.5   # Add new key\nprint(len(student))     # 4',
      },
      {
        id: 'tc-4-5',
        title: 'Iterating Collections',
        content: 'Loop through lists directly, or through dictionary keys/values/items.',
        codeExample: '# List iteration\nfor fruit in ["mango", "banana"]:\n    print(fruit)\n\n# Dict iteration\nscores = {"math": 95, "science": 88}\nfor subject, score in scores.items():\n    print(f"{subject}: {score}")',
      },
      {
        id: 'tc-4-6',
        title: 'Recap',
        content: '🎉 You learned:\n- Lists: ordered, indexed, mutable collections\n- Indexing, slicing, and list methods\n- Dictionaries: key-value pairs for structured data\n- Iterating over both collections',
      },
    ],
    quizQuestions: [
      {
        type: 'multiple_choice',
        id: 'qq-4-1',
        question: 'What does `["a", "b", "c"][1]` return?',
        options: ['"b"', '"a"', '"c"', 'Error'],
        correctIndex: 0,
        explanation: 'Lists are 0-indexed. Index 1 is the second item, "b".',
      },
      {
        type: 'fill_blank',
        id: 'qq-4-2',
        question: 'Complete to add "grape" to the end of the list:',
        codeTemplate: 'fruits = ["apple", "banana"]\nfruits.___BLANK___("grape")',
        correctAnswer: 'append',
        explanation: 'The append() method adds an item to the end of a list.',
      },
      {
        type: 'true_false',
        id: 'qq-4-3',
        question: 'Dictionary keys must be unique.',
        correctAnswer: true,
        explanation: 'Each key in a dictionary must be unique. Setting an existing key overwrites the value.',
      },
      {
        type: 'multiple_choice',
        id: 'qq-4-4',
        question: 'How do you access the value "Python" from: `d = {"lang": "Python"}`?',
        options: ['d["lang"]', 'd.lang', 'd[0]', 'd("lang")'],
        correctIndex: 0,
        explanation: 'Use square brackets with the key name to access dictionary values.',
      },
    ],
    tiers: [
      {
        difficulty: 'easy',
        xpMultiplier: 1,
        starterCode: '# Create a list of 5 numbers, calculate and print the sum\nnumbers = [10, 20, 30, 40, 50]\n\n',
        description: 'Basic list operations.',
      },
      {
        difficulty: 'medium',
        xpMultiplier: 2,
        starterCode: '# Given a dictionary of student scores, find and print\n# the student with the highest score\nscores = {"Juan": 88, "Maria": 95, "Pedro": 78, "Ana": 92}\n\n',
        description: 'Dictionary manipulation.',
      },
      {
        difficulty: 'hard',
        xpMultiplier: 3,
        starterCode: '# Given a list of words, create a dictionary counting\n# how many times each word appears\nwords = ["python", "is", "great", "python", "is", "fun", "great", "great"]\n\n# Print the word counts (sorted alphabetically)\n',
        description: 'Nested structures and counting.',
      },
    ],
  };

  for (let d = 0; d < difficulties.length; d++) {
    const difficulty = difficulties[d];
    const lesson = await prisma.lesson.upsert({
      where: { levelId_slug_difficulty: { levelId: pyLevel4.id, slug: 'lists-dictionaries-lesson', difficulty } },
      update: { content: level4Content, titleEn: 'Lists & Dictionaries', titleFil: 'Mga List at Dictionary', estimatedTimeMinutes: 25 },
      create: {
        levelId: pyLevel4.id, slug: 'lists-dictionaries-lesson', title: `Lists & Dictionaries - ${difficulty}`,
        titleEn: 'Lists & Dictionaries', titleFil: 'Mga List at Dictionary', content: level4Content,
        difficulty, xpReward: xpRewards[difficulty], orderIndex: d, estimatedTimeMinutes: 25, isPublished: true, minQuizScore: 60,
      },
    });

    await prisma.quiz.upsert({ where: { id: `quiz-${lesson.id}-0` }, update: {}, create: { id: `quiz-${lesson.id}-0`, lessonId: lesson.id, type: QuizType.MULTIPLE_CHOICE, question: 'What does ["a","b","c"][1] return?', options: ['"b"', '"a"', '"c"', 'Error'], correctAnswer: '"b"', explanation: 'Index 1 is "b".', orderIndex: 0 } });
    await prisma.quiz.upsert({ where: { id: `quiz-${lesson.id}-1` }, update: {}, create: { id: `quiz-${lesson.id}-1`, lessonId: lesson.id, type: QuizType.FILL_BLANK, question: 'Complete: fruits.___(\"grape\") to add to end', correctAnswer: 'append', explanation: 'append() adds to end.', orderIndex: 1 } });
    await prisma.quiz.upsert({ where: { id: `quiz-${lesson.id}-2` }, update: {}, create: { id: `quiz-${lesson.id}-2`, lessonId: lesson.id, type: QuizType.TRUE_FALSE, question: 'Dictionary keys must be unique.', correctAnswer: 'true', explanation: 'Keys must be unique.', orderIndex: 2 } });

    const l4Challenges = {
      EASY: { title: 'Sum a List', description: 'Calculate the sum of [10,20,30,40,50] and print it.', starterCode: 'numbers = [10, 20, 30, 40, 50]\n\n', solutionCode: 'numbers = [10, 20, 30, 40, 50]\nprint(sum(numbers))\n', testCases: [{ input: '', expectedOutput: '150', description: 'Sum is 150' }] },
      MEDIUM: { title: 'Highest Score', description: 'Find and print the student with highest score.', starterCode: 'scores = {"Juan": 88, "Maria": 95, "Pedro": 78, "Ana": 92}\n\n', solutionCode: 'scores = {"Juan": 88, "Maria": 95, "Pedro": 78, "Ana": 92}\nbest = max(scores, key=scores.get)\nprint(f"{best}: {scores[best]}")\n', testCases: [{ input: '', expectedOutput: 'Maria: 95', description: 'Maria has highest score' }] },
      HARD: { title: 'Word Counter', description: 'Count word frequencies and print sorted.', starterCode: 'words = ["python", "is", "great", "python", "is", "fun", "great", "great"]\n\n', solutionCode: 'words = ["python", "is", "great", "python", "is", "fun", "great", "great"]\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1\nfor w in sorted(counts):\n    print(f"{w}: {counts[w]}")\n', testCases: [{ input: '', expectedOutput: 'fun: 1\ngreat: 3\nis: 2\npython: 2', description: 'Correct word counts' }] },
    };
    const cfg = l4Challenges[difficulty];
    await prisma.codeChallenge.upsert({ where: { id: `challenge-${lesson.id}` }, update: {}, create: { id: `challenge-${lesson.id}`, lessonId: lesson.id, title: cfg.title, description: cfg.description, starterCode: cfg.starterCode, solutionCode: cfg.solutionCode, testCases: cfg.testCases, hints: ['Use built-in functions like sum(), max(), len().', 'Use dict.get(key, default) to safely access values.', 'sorted() returns a new sorted list.'], languageId: 71 } });
  }

  console.log('   ✅ Created 4 Python levels with 12 rich lessons\n');

  // ============================================
  // JS & HTML/CSS COURSES (lighter seed)
  // ============================================
  console.log('📖 Seeding JS and HTML/CSS courses (basic)...');

  const jsLevels = [
    { slug: 'js-basics', title: 'JavaScript Basics', description: 'Variables, types, and operators' },
    { slug: 'dom-manipulation', title: 'DOM Manipulation', description: 'Interact with web pages' },
    { slug: 'events-handlers', title: 'Events & Handlers', description: 'Respond to user interactions' },
    { slug: 'async-javascript', title: 'Async JavaScript', description: 'Promises, async/await, and fetch' },
  ];

  const htmlCssLevels = [
    { slug: 'html-structure', title: 'HTML Structure', description: 'Tags, elements, and document structure' },
    { slug: 'css-styling', title: 'CSS Styling', description: 'Colors, fonts, and basic styling' },
    { slug: 'layout-flexbox', title: 'Layout with Flexbox', description: 'Create flexible layouts' },
    { slug: 'responsive-design', title: 'Responsive Design', description: 'Build mobile-friendly websites' },
  ];

  const otherCourses = [
    { course: jsCourse, levels: jsLevels, langId: 63 },
    { course: htmlCssCourse, levels: htmlCssLevels, langId: 63 },
  ];

  let totalOtherLessons = 0;

  for (const { course, levels, langId } of otherCourses) {
    for (let i = 0; i < levels.length; i++) {
      const levelData = levels[i];
      const level = await prisma.level.upsert({
        where: { courseId_slug: { courseId: course.id, slug: levelData.slug } },
        update: {},
        create: {
          courseId: course.id,
          slug: levelData.slug,
          title: levelData.title,
          titleEn: levelData.title,
          description: levelData.description,
          descriptionEn: levelData.description,
          orderIndex: i,
          isPublished: true,
        },
      });

      for (let d = 0; d < difficulties.length; d++) {
        const difficulty = difficulties[d];
        const lessonSlug = `${levelData.slug}-lesson`;

        const lesson = await prisma.lesson.upsert({
          where: { levelId_slug_difficulty: { levelId: level.id, slug: lessonSlug, difficulty } },
          update: {},
          create: {
            levelId: level.id,
            slug: lessonSlug,
            title: `${levelData.title} - ${difficulty}`,
            titleEn: levelData.title,
            content: {
              theoryCards: [
                { id: `tc-${level.id}-1`, title: 'Overview', content: `This lesson covers ${levelData.description.toLowerCase()}.` },
                { id: `tc-${level.id}-2`, title: 'Key Concepts', content: 'Learn the fundamental concepts step by step.' },
                { id: `tc-${level.id}-3`, title: 'Practice', content: 'Apply what you learned with hands-on exercises.' },
              ],
              quizQuestions: [],
              tiers: [
                { difficulty: 'easy', xpMultiplier: 1, starterCode: course.language === 'javascript' ? '// Write your code here\n' : '<!-- Write your HTML here -->\n', description: 'Easy mode' },
                { difficulty: 'medium', xpMultiplier: 2, starterCode: course.language === 'javascript' ? '// Write your code here\n' : '<!-- Write your HTML here -->\n', description: 'Medium mode' },
                { difficulty: 'hard', xpMultiplier: 3, starterCode: course.language === 'javascript' ? '// Write your code here\n' : '<!-- Write your HTML here -->\n', description: 'Hard mode' },
              ],
            },
            difficulty,
            xpReward: xpRewards[difficulty],
            orderIndex: d,
            estimatedTimeMinutes: 15,
            isPublished: true,
          },
        });
        totalOtherLessons++;

        // Basic quizzes
        await prisma.quiz.upsert({
          where: { id: `quiz-${lesson.id}-0` },
          update: {},
          create: { id: `quiz-${lesson.id}-0`, lessonId: lesson.id, type: QuizType.MULTIPLE_CHOICE, question: `What is a key concept in ${levelData.title}?`, options: ['Option A - Correct', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option A - Correct', explanation: `This covers ${levelData.title}.`, orderIndex: 0 },
        });
        await prisma.quiz.upsert({
          where: { id: `quiz-${lesson.id}-1` },
          update: {},
          create: { id: `quiz-${lesson.id}-1`, lessonId: lesson.id, type: QuizType.TRUE_FALSE, question: `${levelData.title} is an important programming concept.`, correctAnswer: 'true', explanation: `Yes, ${levelData.title} is fundamental.`, orderIndex: 1 },
        });

        // Basic challenge
        await prisma.codeChallenge.upsert({
          where: { id: `challenge-${lesson.id}` },
          update: {},
          create: {
            id: `challenge-${lesson.id}`,
            lessonId: lesson.id,
            title: `${levelData.title} Challenge`,
            description: `Apply your knowledge of ${levelData.description.toLowerCase()}`,
            starterCode: course.language === 'javascript' ? '// Write your code here\nfunction solution() {\n  \n}\n' : '<!-- Write your HTML here -->\n',
            solutionCode: course.language === 'javascript' ? 'function solution() {\n  return "Hello, World!";\n}\n' : '<h1>Hello, World!</h1>\n',
            testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
            hints: ['Think about the basics', 'Review the lesson content', 'Try a simple approach first'],
            languageId: langId,
          },
        });
      }
    }
  }

  console.log(`   ✅ Created ${totalOtherLessons} JS/HTML lessons\n`);

  // ============================================
  // ACHIEVEMENTS
  // ============================================
  console.log('🏆 Seeding achievements...');

  const achievements = [
    { slug: 'first-lesson', title: 'First Steps', description: 'Complete your first lesson', category: 'completion', xpReward: 50, criteria: { type: 'lesson_count', count: 1 } },
    { slug: 'ten-lessons', title: 'Getting Started', description: 'Complete 10 lessons', category: 'completion', xpReward: 200, criteria: { type: 'lesson_count', count: 10 } },
    { slug: 'fifty-lessons', title: 'Dedicated Learner', description: 'Complete 50 lessons', category: 'completion', xpReward: 500, criteria: { type: 'lesson_count', count: 50 } },
    { slug: 'hundred-lessons', title: 'Centurion', description: 'Complete 100 lessons', category: 'completion', xpReward: 1000, criteria: { type: 'lesson_count', count: 100 } },
    { slug: 'first-course', title: 'Course Completed', description: 'Complete your first course', category: 'completion', xpReward: 500, criteria: { type: 'course_complete', count: 1 } },
    { slug: 'streak-3', title: 'On Fire', description: 'Maintain a 3-day streak', category: 'streak', xpReward: 100, criteria: { type: 'streak', days: 3 } },
    { slug: 'streak-7', title: 'Week Warrior', description: 'Maintain a 7-day streak', category: 'streak', xpReward: 250, criteria: { type: 'streak', days: 7 } },
    { slug: 'streak-30', title: 'Monthly Master', description: 'Maintain a 30-day streak', category: 'streak', xpReward: 1000, criteria: { type: 'streak', days: 30 } },
    { slug: 'streak-100', title: 'Unstoppable', description: 'Maintain a 100-day streak', category: 'streak', xpReward: 5000, criteria: { type: 'streak', days: 100 }, isSecret: true },
    { slug: 'first-hard', title: 'Challenge Accepted', description: 'Complete your first HARD lesson', category: 'mastery', xpReward: 150, criteria: { type: 'lesson_difficulty', difficulty: 'HARD', count: 1 } },
    { slug: 'ten-hard', title: 'Hardened', description: 'Complete 10 HARD lessons', category: 'mastery', xpReward: 500, criteria: { type: 'lesson_difficulty', difficulty: 'HARD', count: 10 } },
    { slug: 'medium-master', title: 'Balance Keeper', description: 'Complete 25 MEDIUM lessons', category: 'mastery', xpReward: 300, criteria: { type: 'lesson_difficulty', difficulty: 'MEDIUM', count: 25 } },
    { slug: 'xp-1000', title: 'Rising Star', description: 'Earn 1,000 XP', category: 'xp', xpReward: 100, criteria: { type: 'xp_total', amount: 1000 } },
    { slug: 'xp-10000', title: 'XP Hunter', description: 'Earn 10,000 XP', category: 'xp', xpReward: 500, criteria: { type: 'xp_total', amount: 10000 } },
    { slug: 'xp-50000', title: 'XP Legend', description: 'Earn 50,000 XP', category: 'xp', xpReward: 2000, criteria: { type: 'xp_total', amount: 50000 }, isSecret: true },
    { slug: 'level-5', title: 'Apprentice', description: 'Reach level 5', category: 'level', xpReward: 100, criteria: { type: 'level', level: 5 } },
    { slug: 'level-10', title: 'Developer', description: 'Reach level 10', category: 'level', xpReward: 200, criteria: { type: 'level', level: 10 } },
    { slug: 'level-25', title: 'Senior Developer', description: 'Reach level 25', category: 'level', xpReward: 500, criteria: { type: 'level', level: 25 } },
    { slug: 'level-50', title: 'Grandmaster', description: 'Reach level 50', category: 'level', xpReward: 2000, criteria: { type: 'level', level: 50 } },
    { slug: 'first-comment', title: 'Socializer', description: 'Leave your first comment', category: 'social', xpReward: 50, criteria: { type: 'social', action: 'comment', count: 1 } },
    { slug: 'night-owl', title: 'Night Owl', description: 'Complete a lesson after midnight', category: 'secret', xpReward: 100, criteria: { type: 'time_of_day', hour_start: 0, hour_end: 5 }, isSecret: true },
    { slug: 'speed-demon', title: 'Speed Demon', description: 'Complete a lesson in under 2 minutes', category: 'secret', xpReward: 150, criteria: { type: 'fast_completion', max_seconds: 120 }, isSecret: true },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { slug: achievement.slug },
      update: {},
      create: { slug: achievement.slug, title: achievement.title, description: achievement.description, category: achievement.category, xpReward: achievement.xpReward, criteria: achievement.criteria, isSecret: (achievement as any).isSecret || false, iconUrl: `/icons/achievements/${achievement.slug}.svg` },
    });
  }

  console.log(`   ✅ Created ${achievements.length} achievements\n`);

  // ============================================
  // BADGES
  // ============================================
  console.log('🎖️ Seeding badges...');

  const badges = [
    { slug: 'newcomer', title: 'Newcomer', description: 'Welcome to Aralify!', rarity: 'common' },
    { slug: 'quick-learner', title: 'Quick Learner', description: 'Complete 5 lessons in one day', rarity: 'common' },
    { slug: 'night-owl', title: 'Night Owl', description: 'Study after midnight', rarity: 'common' },
    { slug: 'early-bird', title: 'Early Bird', description: 'Study before 6 AM', rarity: 'rare' },
    { slug: 'perfectionist', title: 'Perfectionist', description: 'Get 100% on 10 quizzes', rarity: 'rare' },
    { slug: 'speed-demon', title: 'Speed Demon', description: 'Complete a lesson in under 5 minutes', rarity: 'rare' },
    { slug: 'polyglot', title: 'Polyglot', description: 'Complete lessons in 3 different languages', rarity: 'epic' },
    { slug: 'mentor', title: 'Mentor', description: 'Help 10 learners with comments', rarity: 'epic' },
    { slug: 'legend', title: 'Legend', description: 'Reach level 50', rarity: 'legendary' },
    { slug: 'founder', title: 'Founder', description: 'Early adopter of Aralify', rarity: 'legendary' },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {},
      create: { slug: badge.slug, title: badge.title, description: badge.description, rarity: badge.rarity, iconUrl: `/icons/badges/${badge.slug}.svg` },
    });
  }

  console.log(`   ✅ Created ${badges.length} badges\n`);

  // ============================================
  // LEAGUES
  // ============================================
  console.log('🏅 Seeding leagues...');

  const leagueTiers = [
    { tier: LeagueTier.BRONZE, name: 'Bronze League', description: 'Starting league for all learners.', iconUrl: '/icons/leagues/bronze.svg', minRank: 0 },
    { tier: LeagueTier.SILVER, name: 'Silver League', description: 'Dedicated learners who show consistent progress.', iconUrl: '/icons/leagues/silver.svg', minRank: 1 },
    { tier: LeagueTier.GOLD, name: 'Gold League', description: 'Skilled learners pushing for excellence.', iconUrl: '/icons/leagues/gold.svg', minRank: 2 },
    { tier: LeagueTier.DIAMOND, name: 'Diamond League', description: 'Elite learners among the top performers.', iconUrl: '/icons/leagues/diamond.svg', minRank: 3 },
    { tier: LeagueTier.CHAMPION, name: 'Champion League', description: 'The best of the best. Legends of Aralify.', iconUrl: '/icons/leagues/champion.svg', minRank: 4 },
  ];

  for (const league of leagueTiers) {
    await prisma.league.upsert({ where: { tier: league.tier }, update: {}, create: { tier: league.tier, name: league.name, description: league.description, iconUrl: league.iconUrl, minRank: league.minRank, maxSize: 30 } });
  }

  console.log(`   ✅ Created ${leagueTiers.length} leagues\n`);

  // ============================================
  // DEMO USER PROGRESS
  // ============================================
  console.log('📊 Seeding demo user progress...');

  // Give demo user badges and achievements
  const newcomerBadge = await prisma.badge.findUnique({ where: { slug: 'newcomer' } });
  if (newcomerBadge) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: demoUser.id, badgeId: newcomerBadge.id } },
      update: {},
      create: { userId: demoUser.id, badgeId: newcomerBadge.id },
    });
  }

  const firstLessonAchievement = await prisma.achievement.findUnique({ where: { slug: 'first-lesson' } });
  if (firstLessonAchievement) {
    await prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: demoUser.id, achievementId: firstLessonAchievement.id } },
      update: {},
      create: { userId: demoUser.id, achievementId: firstLessonAchievement.id },
    });
  }

  // Demo user: enrolled in Python course, completed Level 1 EASY, started Level 1 MEDIUM
  await prisma.userCourseProgress.upsert({
    where: { userId_courseId: { userId: demoUser.id, courseId: pythonCourse.id } },
    update: {},
    create: {
      userId: demoUser.id,
      courseId: pythonCourse.id,
      completionPercentage: 8.3, // 1/12 lessons
      totalXpEarned: 100,
      timeSpentSeconds: 900,
      lastActivityAt: new Date(),
    },
  });

  // Unlock Levels 1 and 2
  await prisma.userLevelUnlock.upsert({
    where: { userId_levelId: { userId: demoUser.id, levelId: pyLevel1.id } },
    update: {},
    create: { userId: demoUser.id, levelId: pyLevel1.id },
  });
  await prisma.userLevelUnlock.upsert({
    where: { userId_levelId: { userId: demoUser.id, levelId: pyLevel2.id } },
    update: {},
    create: { userId: demoUser.id, levelId: pyLevel2.id },
  });

  // Complete Level 1 EASY lesson
  const easyLesson = level1Lessons[0];
  if (easyLesson) {
    await prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: demoUser.id, lessonId: easyLesson.id } },
      update: {},
      create: {
        userId: demoUser.id,
        lessonId: easyLesson.id,
        status: 'COMPLETED',
        score: 83,
        xpEarned: 100,
        timeSpent: 720,
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
    });

    // Add XP transaction
    await prisma.xpTransaction.create({
      data: {
        userId: demoUser.id,
        amount: 100,
        source: 'LESSON_COMPLETE',
        sourceId: easyLesson.id,
        description: 'Completed Variables & Data Types (Easy)',
      },
    });
  }

  // Start Level 1 MEDIUM lesson
  const mediumLesson = level1Lessons[1];
  if (mediumLesson) {
    await prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: demoUser.id, lessonId: mediumLesson.id } },
      update: {},
      create: {
        userId: demoUser.id,
        lessonId: mediumLesson.id,
        status: 'IN_PROGRESS',
        xpEarned: 0,
      },
    });
  }

  // Admin badges
  const legendBadge = await prisma.badge.findUnique({ where: { slug: 'legend' } });
  const founderBadge = await prisma.badge.findUnique({ where: { slug: 'founder' } });
  if (legendBadge) {
    await prisma.userBadge.upsert({ where: { userId_badgeId: { userId: adminUser.id, badgeId: legendBadge.id } }, update: {}, create: { userId: adminUser.id, badgeId: legendBadge.id } });
  }
  if (founderBadge) {
    await prisma.userBadge.upsert({ where: { userId_badgeId: { userId: adminUser.id, badgeId: founderBadge.id } }, update: {}, create: { userId: adminUser.id, badgeId: founderBadge.id } });
  }

  console.log('   ✅ Added demo user progress, badges, and achievements\n');

  // ============================================
  // SUMMARY
  // ============================================
  console.log('═══════════════════════════════════════');
  console.log('🎉 Seed completed successfully!');
  console.log('═══════════════════════════════════════');
  console.log('   👤 Users: 3 demo users');
  console.log('   📚 Courses: 3');
  console.log('   📖 Python: 4 levels × 3 difficulties = 12 rich lessons');
  console.log(`   📖 JS/HTML: ${totalOtherLessons} basic lessons`);
  console.log(`   🏆 Achievements: ${achievements.length}`);
  console.log(`   🎖️ Badges: ${badges.length}`);
  console.log(`   🏅 Leagues: ${leagueTiers.length}`);
  console.log('   📊 Demo progress: Level 1 EASY completed, MEDIUM in progress');
  console.log('═══════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
