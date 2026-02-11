// ─── Lesson Flow Types ──────────────────────────────────────────────────────

export interface TheoryCard {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  tip?: string;
}

export interface MultipleChoiceQuestion {
  type: "multiple_choice";
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface FillBlankQuestion {
  type: "fill_blank";
  id: string;
  question: string;
  codeTemplate: string; // contains ___BLANK___
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface ReorderQuestion {
  type: "reorder";
  id: string;
  question: string;
  lines: string[];
  correctOrder: number[];
  explanation: string;
  hint?: string;
}

export interface TrueFalseQuestion {
  type: "true_false";
  id: string;
  question: string;
  correctAnswer: boolean;
  explanation: string;
  hint?: string;
}

export type QuizQuestion =
  | MultipleChoiceQuestion
  | FillBlankQuestion
  | ReorderQuestion
  | TrueFalseQuestion;

export interface LessonFlowData {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  language: string;
  order: number;
  xpReward: number;
  theoryCards: TheoryCard[];
  quizQuestions: QuizQuestion[];
  tiers: {
    difficulty: "easy" | "medium" | "hard";
    xpMultiplier: number;
    starterCode: string;
    description: string;
  }[];
  testCases: {
    input: string;
    expectedOutput: string;
    description: string;
    passed: boolean;
  }[];
  hints: string[];
  prevLessonId: string | null;
  nextLessonId: string | null;
}

export interface LessonCompletionStats {
  xpEarned: number;
  quizScore: number;
  quizTotal: number;
  testsPassed: number;
  testsTotal: number;
  streak: number;
  difficulty: "easy" | "medium" | "hard";
  xpMultiplier: number;
  heartsRemaining: number;
  maxHearts: number;
  maxCombo: number;
  speedBonusXp: number;
  comboBonusXp: number;
  heartsBonusXp: number;
  perfectLesson: boolean;
}

export type LessonStep = "intro" | "learn" | "quiz-brief" | "quiz" | "code" | "complete";

// ─── Gamification Types ─────────────────────────────────────────────────────

export type PowerupType = "eliminate" | "freeze" | "shield" | "hint" | "double_xp" | "extra_time" | "skip";

export interface Powerup {
  type: PowerupType;
  label: string;
  description: string;
  icon: string; // Lucide icon name
  uses: number;
  maxUses: number;
}

export interface QuizGameState {
  hearts: number;
  maxHearts: number;
  combo: number;
  maxCombo: number;
  totalXp: number;
  speedBonusXp: number;
  comboBonusXp: number;
  powerups: Powerup[];
  isShieldActive: boolean;
  isTimerFrozen: boolean;
  eliminatedIndices: number[];
  showHint: boolean;
}

/** Timer duration in seconds per question type */
export const TIMER_DURATIONS: Record<QuizQuestion["type"], number> = {
  true_false: 15,
  multiple_choice: 20,
  fill_blank: 30,
  reorder: 45,
};

/** XP scoring constants */
export const QUIZ_SCORING = {
  BASE_XP_PER_QUESTION: 25,
  MAX_SPEED_BONUS: 15,
  COMBO_BONUS_PER_STREAK: 5,
  HEARTS_BONUS_PER_HEART: 20,
  PERFECT_LESSON_BONUS: 100,
  MAX_HEARTS: 5,
} as const;

/** Default powerups given at the start of every quiz */
export function getDefaultPowerups(): Powerup[] {
  return [
    {
      type: "eliminate",
      label: "50/50",
      description: "Remove 2 wrong answers",
      icon: "Scissors",
      uses: 1,
      maxUses: 1,
    },
    {
      type: "freeze",
      label: "Freeze",
      description: "Pause the timer",
      icon: "Snowflake",
      uses: 1,
      maxUses: 1,
    },
    {
      type: "shield",
      label: "Shield",
      description: "Protect 1 heart",
      icon: "ShieldCheck",
      uses: 1,
      maxUses: 1,
    },
    {
      type: "hint",
      label: "Hint",
      description: "Reveal a helpful hint",
      icon: "Lightbulb",
      uses: 2,
      maxUses: 2,
    },
    {
      type: "double_xp",
      label: "2x XP",
      description: "Double XP on next correct",
      icon: "Zap",
      uses: 1,
      maxUses: 1,
    },
    {
      type: "extra_time",
      label: "+15s",
      description: "Add 15 seconds to timer",
      icon: "Clock",
      uses: 1,
      maxUses: 1,
    },
    {
      type: "skip",
      label: "Skip",
      description: "Skip without losing a heart",
      icon: "SkipForward",
      uses: 1,
      maxUses: 1,
    },
  ];
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

export const mockLessonFlowData: Record<string, LessonFlowData> = {
  les_001: {
    id: "les_001",
    title: "Hello World & print()",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    language: "python",
    order: 1,
    xpReward: 50,
    theoryCards: [
      {
        id: "tc_001_1",
        title: "What is Python?",
        content:
          "Python is one of the world's most popular programming languages, created by **Guido van Rossum** and first released in **1991**. It's used by companies like Google, Netflix, Instagram, and Spotify.\n\nPython is famous for its **clean, readable syntax** — it reads almost like English, which makes it the #1 choice for beginners. Unlike languages like Java or C++, Python doesn't require semicolons or curly braces, so you can focus on **solving problems** instead of fighting syntax.",
        tip: "Python was named after the British comedy show 'Monty Python's Flying Circus', not the snake! Guido van Rossum was reading scripts from the show while developing the language.",
      },
      {
        id: "tc_001_2",
        title: "Why Learn Python?",
        content:
          "Python is incredibly versatile. Here's what you can build with it:\n\n• **Web apps** — using Django or Flask (Instagram runs on Django!)\n• **Data science & AI** — with pandas, NumPy, TensorFlow\n• **Automation** — scripts that do repetitive tasks for you\n• **Games** — using Pygame\n• **Mobile apps** — with Kivy or BeeWare\n\nPython consistently ranks as the **#1 most-wanted language** on developer surveys. Learning it opens doors to almost every area of tech.",
        tip: "The Python community has a saying: 'There should be one — and preferably only one — obvious way to do it.' This philosophy keeps Python code clean and consistent.",
      },
      {
        id: "tc_001_3",
        title: "The print() Function",
        content:
          "The **print()** function is your first tool in Python. It displays text, numbers, or any value on the screen (called the **console** or **terminal**). Everything you want to display goes inside the parentheses.\n\nFor text, you must wrap it in **quotes** — either single `'...'` or double `\"...\"` quotes. Both work exactly the same way.",
        codeExample: 'print("Hello, World!")\nprint(\'This also works!\')\nprint("Python is awesome")',
        tip: "Most Python developers prefer double quotes \" \" for strings, but single quotes ' ' are handy when your text contains double quotes, like: print('She said \"hello\"')",
      },
      {
        id: "tc_001_4",
        title: "Printing Multiple Things",
        content:
          "You can print multiple values in one `print()` call by separating them with **commas**. Python will automatically add a space between each value.\n\nYou can also use the `sep` parameter to change the separator, and the `end` parameter to control what appears at the end (default is a new line).",
        codeExample: 'print("Hello", "World")           # Hello World\nprint("Age:", 21)                  # Age: 21\nprint("A", "B", "C", sep="-")      # A-B-C\nprint("No newline", end=" ")       # stays on same line\nprint("here!")',
      },
      {
        id: "tc_001_5",
        title: "Comments: Notes for Humans",
        content:
          "**Comments** are notes in your code that Python completely ignores. They're written for **you** and other programmers to explain what the code does.\n\nUse the `#` symbol to start a comment. Everything after `#` on that line is ignored by Python. Good comments explain **why** you did something, not just what the code does.",
        codeExample: '# This is a full-line comment\nprint("Hello!")  # This is an inline comment\n\n# The line below is "commented out" — it won\'t run\n# print("I\'m invisible!")\n\nprint("But I still run!")  # Only code runs, not comments',
        tip: "Commenting out code with # is a great way to temporarily disable lines while debugging, without deleting them!",
      },
      {
        id: "tc_001_6",
        title: "Escape Characters",
        content:
          "Sometimes you need to include special characters inside a string. **Escape characters** start with a backslash `\\` and have special meanings:\n\n• `\\n` — **New line** (moves to next line)\n• `\\t` — **Tab** (adds a tab space)\n• `\\\\` — **Backslash** (prints a literal \\)\n• `\\'` — **Single quote** inside single-quoted strings\n• `\\\"` — **Double quote** inside double-quoted strings",
        codeExample: 'print("Line 1\\nLine 2")     # Prints on two lines\nprint("Name:\\tJuan")        # Adds a tab\nprint("She said \\"hi\\"")    # Prints: She said "hi"\nprint("Path: C:\\\\Users")    # Prints: Path: C:\\Users',
      },
      {
        id: "tc_001_7",
        title: "Strings vs. Numbers",
        content:
          "Python treats text and numbers very differently:\n\n• **Strings** (`str`) — text wrapped in quotes: `\"42\"`, `\"hello\"`\n• **Integers** (`int`) — whole numbers without quotes: `42`, `-7`\n• **Floats** (`float`) — decimal numbers: `3.14`, `0.5`\n\nThis matters because `\"5\"` (a string) and `5` (an integer) are **completely different** to Python. You can't do math with strings!",
        codeExample: 'print("5" + "3")    # "53"  (string concatenation!)\nprint(5 + 3)        # 8     (actual math)\nprint(type("hello")) # <class \'str\'>\nprint(type(42))      # <class \'int\'>\nprint(type(3.14))    # <class \'float\'>',
        tip: "Use the type() function to check what type a value is. It's a great debugging tool!",
      },
      {
        id: "tc_001_8",
        title: "Your First Program!",
        content:
          "You now have all the building blocks for your first Python program! Let's recap what you've learned:\n\n• `print()` displays output to the console\n• Strings go inside quotes\n• Use `#` for comments\n• `\\n` creates new lines inside strings\n• Python runs code **top to bottom**, one line at a time\n\nIn the quiz, we'll test your understanding. Then you'll write real code yourself!",
        codeExample: '# My first Python program!\nprint("=============================")  \nprint("  Welcome to Python!")  \nprint("  Created by: Your Name")  \nprint("=============================")  \nprint("\\nLet\'s start coding!")',
        tip: "Every world-class developer started exactly where you are right now — with 'Hello, World!'. You're officially a programmer!",
      },
    ],
    quizQuestions: [
      {
        type: "multiple_choice",
        id: "q_001_1",
        question: "Which function displays output in Python?",
        options: ["echo()", "print()", "console.log()", "System.out.println()"],
        correctIndex: 1,
        explanation:
          "print() is Python's built-in function for displaying output. echo() is PHP, console.log() is JavaScript, and System.out.println() is Java.",
        hint: "It rhymes with 'sprint' and is one of the simplest Python built-ins.",
      },
      {
        type: "true_false",
        id: "q_001_2",
        question: 'The string "42" and the integer 42 are the same thing in Python.',
        correctAnswer: false,
        explanation:
          '"42" is a string (text) while 42 is an integer (number). "42" + "8" gives "428" (concatenation), but 42 + 8 gives 50 (addition). The type() function reveals: type("42") is str, type(42) is int.',
        hint: "Try adding quotes around a number and think about what type() would show.",
      },
      {
        type: "fill_blank",
        id: "q_001_3",
        question: 'Complete the code to print "Hello, World!":',
        codeTemplate: '___BLANK___("Hello, World!")',
        correctAnswer: "print",
        explanation: "The print() function takes a value inside its parentheses and displays it on the console. It's the most commonly used function in Python for output.",
        hint: "This function's name literally describes what it does — it outputs text to the screen.",
      },
      {
        type: "multiple_choice",
        id: "q_001_4",
        question: 'What does print("Ha" * 3) output?',
        options: ['"Ha" * 3', "Ha Ha Ha", "HaHaHa", "Error"],
        correctIndex: 2,
        explanation:
          "The * operator with a string repeats it. \"Ha\" * 3 produces \"HaHaHa\". No spaces are added — it's a direct repetition of the string.",
        hint: "The * operator repeats the string exactly, without adding any spaces between copies.",
      },
      {
        type: "reorder",
        id: "q_001_5",
        question:
          "Arrange these lines to create a program that prints a greeting with a blank line in between:",
        lines: [
          'print("How are you?")',
          'print("Hello, World!")',
          'print("")',
        ],
        correctOrder: [1, 2, 0],
        explanation:
          'First "Hello, World!", then an empty print("") for a blank line, then "How are you?". Python runs code top to bottom, and print("") outputs an empty line.',
        hint: "The greeting comes first, the empty line goes in the middle, and the question goes last.",
      },
      {
        type: "fill_blank",
        id: "q_001_6",
        question: "Complete the code to add a comment explaining the next line:",
        codeTemplate: '___BLANK___ Display a welcome message\nprint("Welcome!")',
        correctAnswer: "#",
        explanation: "Comments in Python start with the # symbol. Everything after # on that line is ignored by Python and serves as a note for developers reading the code.",
        hint: "It is a single special character found on your keyboard's number 3 key (with Shift).",
      },
    ],
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: '# Task: Print "Hello, World!" to the console\n# Use the print() function with the exact text below\n\n',
        description: 'Use the print() function to display "Hello, World!" exactly as shown.',
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: '# Task: Create a program that prints a greeting card\n# 1. Print a row of asterisks: **********************\n# 2. Print "  Welcome to Python!" (with 2 leading spaces)\n# 3. Print "  by [Your Name]" (with 2 leading spaces)\n# 4. Print another row of asterisks\n\n',
        description: "Create a multi-line greeting card using 4 separate print() statements.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: '# Task: Print a mini ASCII art profile card\n# Use escape characters (\\n, \\t) and string operations (* for repeating)\n# Your output should look like this:\n#\n# ====================\n# Name:    Juan\n# Age:     21\n# Status:  Learning Python!\n# ====================\n# *** Have a great day! ***\n\n',
        description: "Build a formatted profile card using escape characters (\\n, \\t), comments, and string repetition.",
      },
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Hello, World!",
        description: 'Should print "Hello, World!" exactly',
        passed: false,
      },
      {
        input: "",
        expectedOutput: "Hello",
        description: "Output should contain a greeting",
        passed: false,
      },
    ],
    hints: [
      "Use print() with text inside quotes: print(\"text here\")",
      'The exact code is: print("Hello, World!") — watch the capitalization!',
      "Make sure you use parentheses () not brackets [], and don't forget the quotes around the text",
      "Python is case-sensitive: Print() won't work, it must be print() with a lowercase p",
    ],
    prevLessonId: null,
    nextLessonId: "les_002",
  },

  les_002: {
    id: "les_002",
    title: "Variables & Data Types",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    language: "python",
    order: 2,
    xpReward: 75,
    theoryCards: [
      {
        id: "tc_002_1",
        title: "What are Variables?",
        content:
          "A **variable** is a named container that stores a value in your computer's memory. Think of it like a labeled box — you choose the label (name), and you put something inside (the value).\n\nYou create a variable using the **assignment operator** `=`. The name goes on the left, the value on the right. Unlike math, `=` doesn't mean 'equals' — it means **'store this value'**.",
        codeExample: 'name = "Maria"      # Store the text "Maria" in a variable called name\nage = 21             # Store the number 21 in a variable called age\ncity = "Manila"      # Store "Manila" in city\n\nprint(name)          # Output: Maria\nprint(age)           # Output: 21',
      },
      {
        id: "tc_002_2",
        title: "Variables Can Change",
        content:
          "Variables are called 'variables' because their values can **vary** — you can reassign them at any time. The old value is replaced with the new one.\n\nYou can also assign the value of one variable to another, or update a variable based on its own current value.",
        codeExample: 'score = 0            # Start at 0\nprint(score)         # 0\n\nscore = 10           # Reassign to 10\nprint(score)         # 10\n\nscore = score + 5    # Add 5 to current value\nprint(score)         # 15\n\n# Copy a value to another variable\nold_score = score\nprint(old_score)     # 15',
        tip: "Python also has shorthand operators: score += 5 is the same as score = score + 5. You'll learn more about these in the Operators lesson!",
      },
      {
        id: "tc_002_3",
        title: "Variable Naming Rules",
        content:
          "Python has strict rules for variable names:\n\n• **Must start** with a letter (a-z, A-Z) or underscore `_`\n• **Can contain** letters, numbers (0-9), and underscores\n• **Cannot start** with a number\n• **Cannot use** spaces or special characters (!, @, #, -, etc.)\n• **Cannot use** Python reserved words (`if`, `for`, `class`, `return`, etc.)\n• **Case-sensitive** — `name`, `Name`, and `NAME` are all different",
        codeExample: '# Valid variable names\nstudent_name = "Juan"     # snake_case (recommended!)\n_private = 100            # leading underscore is valid\nage2 = 25                 # numbers OK, just not at start\nmyVar = "hello"           # camelCase works but not Pythonic\n\n# INVALID variable names (these will cause errors)\n# 2fast = "no"            # can\'t start with number\n# my-name = "bad"         # hyphens not allowed\n# class = "nope"          # \'class\' is a reserved word',
        tip: "Python convention is **snake_case** for variables (words separated by underscores): student_name, total_score, is_active. This is defined in PEP 8, Python's official style guide.",
      },
      {
        id: "tc_002_4",
        title: "The 4 Basic Data Types",
        content:
          "Every value in Python has a **type** that determines what you can do with it. The 4 basic types are:\n\n• **str** (string) — Text. Always in quotes: `\"hello\"`, `'world'`\n• **int** (integer) — Whole numbers: `42`, `-7`, `0`, `1_000_000`\n• **float** — Decimal numbers: `3.14`, `-0.5`, `2.0`\n• **bool** (boolean) — Only two values: `True` or `False`\n\nUse the built-in `type()` function to check any value's type.",
        codeExample: 'greeting = "Kamusta"        # str\ncount = 10                  # int\nprice = 299.99              # float\nis_enrolled = True          # bool\n\nprint(type(greeting))       # <class \'str\'>\nprint(type(count))          # <class \'int\'>\nprint(type(price))          # <class \'float\'>\nprint(type(is_enrolled))    # <class \'bool\'>',
      },
      {
        id: "tc_002_5",
        title: "Strings In Depth",
        content:
          "Strings are one of the most used types. Here are key things to know:\n\n• **Single or double quotes** both work: `'hello'` or `\"hello\"`\n• **Triple quotes** for multi-line strings: `\"\"\"...\"\"\"`\n• **Empty string** is valid: `name = \"\"`\n• **Strings are immutable** — you can't change individual characters (you create a new string instead)\n• **f-strings** let you embed variables directly inside text",
        codeExample: '# f-strings (formatted string literals) — Python 3.6+\nname = "Juan"\nage = 21\n\n# Old way (concatenation)\nprint("My name is " + name + " and I am " + str(age))\n\n# New way (f-string) — much cleaner!\nprint(f"My name is {name} and I am {age}")\nprint(f"Next year I will be {age + 1}")  # Can do math inside {}!\n\n# Multi-line string\nmessage = """This is\na multi-line\nstring!"""\nprint(message)',
        tip: "f-strings (with the f before the quote) are the modern way to format strings in Python. Always prefer them over concatenation with + for readability!",
      },
      {
        id: "tc_002_6",
        title: "Numbers: int vs float",
        content:
          "Python handles two types of numbers:\n\n**Integers** (`int`) — whole numbers with no decimal point. They can be positive, negative, or zero, and have **unlimited size** in Python (no overflow!).\n\n**Floats** (`float`) — numbers with a decimal point. They can sometimes have tiny rounding errors due to how computers store decimals.",
        codeExample: '# Integers\nsmall = 42\nnegative = -100\nhuge = 1_000_000_000    # Underscores for readability!\n\n# Floats\npi = 3.14159\ntemperature = -40.0\ntiny = 0.001\n\n# Important: division always returns float!\nprint(10 / 2)    # 5.0 (not 5!)\nprint(type(10/2)) # <class \'float\'>\n\n# Use // for integer division\nprint(10 // 2)   # 5 (int)',
        tip: "You can use underscores in numbers for readability: 1_000_000 is the same as 1000000 to Python, but much easier for humans to read!",
      },
      {
        id: "tc_002_7",
        title: "Booleans & None",
        content:
          "**Booleans** have only two values: `True` and `False` (capitalized!). They're the result of comparisons and are essential for making decisions in code.\n\nPython also has a special type called **None**, which represents 'nothing' or 'no value'. It's used when a variable exists but doesn't have a meaningful value yet.",
        codeExample: 'is_student = True\nhas_graduated = False\n\nprint(is_student)        # True\nprint(type(True))        # <class \'bool\'>\n\n# Booleans from comparisons\nprint(5 > 3)             # True\nprint(10 == 20)          # False\n\n# None — represents "nothing"\nresult = None\nprint(result)            # None\nprint(type(result))      # <class \'NoneType\'>\nprint(result is None)    # True',
        tip: "In Python, True equals 1 and False equals 0 numerically. So True + True equals 2! But don't rely on this — use proper integers for math.",
      },
      {
        id: "tc_002_8",
        title: "Type Conversion (Casting)",
        content:
          "Sometimes you need to convert between types. This is called **type casting**. Python gives you built-in functions for this:\n\n• `int()` — converts to integer (drops decimals, parses numeric strings)\n• `float()` — converts to float\n• `str()` — converts anything to a string\n• `bool()` — converts to boolean\n\nBe careful: not all conversions are possible — `int(\"hello\")` will crash!",
        codeExample: '# String to number\nage_text = "25"\nage_num = int(age_text)     # 25 (int)\nprint(age_num + 5)          # 30\n\n# Float to int (truncates, doesn\'t round!)\npi = 3.99\nprint(int(pi))              # 3 (not 4!)\n\n# Number to string\nprice = 49.99\nmessage = "The price is $" + str(price)\nprint(message)              # The price is $49.99\n\n# Truthiness — what\'s True and False?\nprint(bool(0))       # False\nprint(bool(42))      # True  (any non-zero number)\nprint(bool(""))      # False (empty string)\nprint(bool("hello")) # True  (non-empty string)\nprint(bool(None))    # False',
        tip: "Python considers these values 'falsy': 0, 0.0, \"\" (empty string), None, False, [] (empty list). Everything else is 'truthy'. This becomes very important when you learn about if-statements!",
      },
      {
        id: "tc_002_9",
        title: "Multiple Assignment & Constants",
        content:
          "Python has handy shortcuts for assigning variables:\n\n• **Multiple assignment** — assign several variables in one line\n• **Swap values** — exchange two variables without a temp variable\n• **Constants** — by convention, use ALL_CAPS for values that shouldn't change (Python won't enforce this, but developers will know not to modify them)",
        codeExample: '# Multiple assignment\nx, y, z = 10, 20, 30\nprint(x, y, z)           # 10 20 30\n\n# Same value to multiple variables\na = b = c = 0\nprint(a, b, c)           # 0 0 0\n\n# Swap two variables (Pythonic way!)\nx, y = 10, 20\nx, y = y, x              # Swap!\nprint(x, y)              # 20 10\n\n# Constants (convention: ALL_CAPS)\nMAX_STUDENTS = 30\nPI = 3.14159\nAPP_NAME = "Aralify"\n# These CAN be changed, but SHOULDN\'T be',
        tip: "The variable swap trick (x, y = y, x) is uniquely Pythonic! In most other languages, you'd need a temporary variable to swap values. Python handles it elegantly.",
      },
    ],
    quizQuestions: [
      {
        type: "multiple_choice",
        id: "q_002_1",
        question: "Which of these is a valid Python variable name?",
        options: ["2nd_place", "my-score", "student_name", "for"],
        correctIndex: 2,
        explanation:
          "student_name is valid — it uses letters and underscores only. 2nd_place starts with a number, my-score contains a hyphen, and 'for' is a Python reserved keyword.",
        hint: "Variable names can only use letters, numbers, and underscores, and cannot start with a number.",
      },
      {
        type: "fill_blank",
        id: "q_002_2",
        question: "Complete the code to store the number 42 in a variable:",
        codeTemplate: "answer ___BLANK___ 42",
        correctAnswer: "=",
        explanation:
          "The = operator is the assignment operator. It stores the value on the right (42) into the variable on the left (answer). Remember: = means 'assign', not 'equals'.",
        hint: "This is a single character that means 'store this value' in programming.",
      },
      {
        type: "true_false",
        id: "q_002_3",
        question: "In Python, the variables Name and name refer to the same variable.",
        correctAnswer: false,
        explanation:
          "Python is case-sensitive. Name (capital N) and name (lowercase n) are two completely different variables. This is a common source of bugs for beginners!",
        hint: "Try typing Name and name in Python — does capitalization matter?",
      },
      {
        type: "multiple_choice",
        id: "q_002_4",
        question: 'What is the data type of the value 3.14?',
        options: ["str", "int", "float", "number"],
        correctIndex: 2,
        explanation: "3.14 has a decimal point, making it a float. In Python, any number with a decimal point is a float, even 3.0. There is no generic 'number' type in Python.",
        hint: "Look at the decimal point — which type is specifically for numbers with decimals?",
      },
      {
        type: "multiple_choice",
        id: "q_002_5",
        question: "What does int(3.99) return?",
        options: ["4", "3", "3.99", "Error"],
        correctIndex: 1,
        explanation: "int() truncates (cuts off) the decimal part — it does NOT round. So int(3.99) returns 3, not 4. If you want rounding, use the round() function instead.",
        hint: "int() chops off the decimal part — it does not round up or down.",
      },
      {
        type: "fill_blank",
        id: "q_002_6",
        question: "Complete the f-string to include the variable name:",
        codeTemplate: 'print(f"Hello, ___BLANK___!")',
        correctAnswer: "{name}",
        explanation:
          "In f-strings, you wrap variable names in curly braces {name} to embed their values. The f before the opening quote tells Python to look for {} expressions inside the string.",
        hint: "f-strings use a pair of curly brackets to embed variables inside text.",
      },
      {
        type: "reorder",
        id: "q_002_7",
        question: "Arrange the code to create a variable, change its value, and print both:",
        lines: [
          "print(f\"New: {score}\")",
          "score = 100",
          "print(f\"Original: {score}\")",
          "score = score + 50",
        ],
        correctOrder: [1, 2, 3, 0],
        explanation:
          "First create score = 100, print it (\"Original: 100\"), then update it (score = score + 50 = 150), then print the new value (\"New: 150\"). Variables must be created before being used or modified.",
        hint: "You must create the variable before you can use it, print it, or change it.",
      },
    ],
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: '# Task: Create a variable called name and set it to your name\n# Then print it using an f-string: "Hello, [name]!"\n\n',
        description: 'Create a name variable and print "Hello, [name]!" using an f-string.',
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: '# Task: Create a mini student profile\n# 1. Create variables: name (str), age (int), gpa (float), is_enrolled (bool)\n# 2. Print each variable with its type\n# 3. Print a formatted summary using an f-string\n#\n# Example output:\n# Name: Juan (type: <class \'str\'>)\n# Summary: Juan, age 21, GPA: 3.85, Enrolled: True\n\n',
        description: "Create 4 variables of different types, print each with type(), then print a formatted summary.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: '# Task: Build a currency converter\n# 1. Create a variable php_amount = 5000 (Philippine Peso)\n# 2. Create a constant USD_RATE = 0.018 (conversion rate)\n# 3. Convert to USD using multiplication\n# 4. Print a formatted result showing both amounts\n# 5. Use type() to prove php_amount is int and usd_amount is float\n# 6. Bonus: Use the round() function to show USD to 2 decimal places\n#\n# Example: "5000 PHP = 90.00 USD"\n\n',
        description: "Build a PHP-to-USD converter demonstrating int/float behavior, constants, f-strings, type(), and round().",
      },
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Hello",
        description: "Should print a greeting with the name variable",
        passed: false,
      },
      {
        input: "",
        expectedOutput: "name",
        description: "Should use a variable called name",
        passed: false,
      },
    ],
    hints: [
      "Create a variable with: name = \"your name here\"",
      'Use an f-string to format: print(f"Hello, {name}!")',
      "Remember: the f must be before the opening quote, and the variable goes inside {curly braces}",
      "Python is case-sensitive — make sure your variable name matches exactly between assignment and print",
    ],
    prevLessonId: "les_001",
    nextLessonId: "les_003",
  },

  les_003: {
    id: "les_003",
    title: "Operators & Expressions",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    language: "python",
    order: 3,
    xpReward: 75,
    theoryCards: [
      {
        id: "tc_003_1",
        title: "Arithmetic Operators",
        content:
          "Python is a powerful calculator! Here are all **7 arithmetic operators**:\n\n• `+` **Addition** — adds two numbers\n• `-` **Subtraction** — subtracts right from left\n• `*` **Multiplication** — multiplies two numbers\n• `/` **Division** — always returns a float!\n• `//` **Floor Division** — divides and rounds down to nearest int\n• `%` **Modulo** — returns the remainder after division\n• `**` **Exponent** — raises to a power",
        codeExample: "print(10 + 3)     # 13\nprint(10 - 3)     # 7\nprint(10 * 3)     # 30\nprint(10 / 3)     # 3.3333333333\nprint(10 // 3)    # 3  (rounded down)\nprint(10 % 3)     # 1  (remainder)\nprint(2 ** 10)    # 1024 (2 to the power of 10)",
        tip: "The modulo operator % is super useful! Use it to check if a number is even (n % 2 == 0), to wrap around values, or to extract digits (n % 10 gives the last digit).",
      },
      {
        id: "tc_003_2",
        title: "Division: / vs //",
        content:
          "Python has **two** division operators, and they behave very differently:\n\n• `/` **True division** — always returns a float, even if the result is a whole number. `10 / 2` gives `5.0`, not `5`.\n• `//` **Floor division** — rounds down to the nearest integer. With positive numbers, it drops the decimal part. With negative numbers, it rounds toward negative infinity.\n\nThis is a common source of bugs — be intentional about which one you use!",
        codeExample: "# True division (always float)\nprint(10 / 2)      # 5.0\nprint(7 / 2)       # 3.5\nprint(type(10/2))   # <class 'float'>\n\n# Floor division (rounds down)\nprint(7 // 2)      # 3\nprint(10 // 3)     # 3\nprint(-7 // 2)     # -4 (rounds toward negative infinity!)\n\n# Real-world example: converting minutes to hours\ntotal_minutes = 135\nhours = total_minutes // 60      # 2\nremaining = total_minutes % 60   # 15\nprint(f\"{hours}h {remaining}m\")  # 2h 15m",
      },
      {
        id: "tc_003_3",
        title: "Comparison Operators",
        content:
          "**Comparison operators** compare two values and return a boolean (`True` or `False`). These are essential for making decisions in code:\n\n• `==` **Equal to** — are the values the same?\n• `!=` **Not equal** — are the values different?\n• `>` **Greater than**\n• `<` **Less than**\n• `>=` **Greater than or equal**\n• `<=` **Less than or equal**\n\nYou can compare numbers, strings (alphabetical order), and more.",
        codeExample: 'print(5 == 5)       # True\nprint(5 != 3)       # True\nprint(10 > 20)      # False\nprint(3 <= 3)       # True (3 is equal to 3)\n\n# String comparison (alphabetical/Unicode order)\nprint("apple" < "banana")   # True (a comes before b)\nprint("cat" == "Cat")       # False (case-sensitive!)\n\n# Chained comparisons (Pythonic!)\nage = 25\nprint(18 <= age <= 65)      # True (is age between 18 and 65?)',
        tip: "The #1 beginner mistake: using = instead of ==. Remember: single = assigns a value (x = 5), double == checks equality (x == 5). If you write 'if x = 5', Python will give you a syntax error!",
      },
      {
        id: "tc_003_4",
        title: "Logical Operators",
        content:
          "**Logical operators** combine multiple conditions. Python uses English words instead of symbols:\n\n• `and` — True only if **both** conditions are True\n• `or` — True if **at least one** condition is True\n• `not` — **Reverses** the boolean value (True becomes False, vice versa)\n\nThese become essential when you learn if-statements and loops.",
        codeExample: 'age = 25\nhas_id = True\n\n# and — both must be True\nprint(age >= 18 and has_id)    # True (both True)\nprint(age >= 30 and has_id)    # False (first is False)\n\n# or — at least one must be True\nprint(age >= 30 or has_id)     # True (second is True)\n\n# not — reverses the value\nprint(not True)                # False\nprint(not (age < 18))          # True (age IS >= 18)\n\n# Combining them\nis_weekend = True\nis_holiday = False\ncan_rest = is_weekend or is_holiday\nprint(f"Can rest: {can_rest}")  # True',
        tip: "Python evaluates 'and' and 'or' with short-circuit logic: for 'and', if the first condition is False, Python doesn't even check the second one (the result is already False). This can be useful for avoiding errors!",
      },
      {
        id: "tc_003_5",
        title: "Assignment Operators (Shortcuts)",
        content:
          "Python has **shorthand operators** that combine arithmetic with assignment. Instead of writing `x = x + 5`, you can write `x += 5`. Here are all of them:\n\n• `+=` Add and assign\n• `-=` Subtract and assign\n• `*=` Multiply and assign\n• `/=` Divide and assign\n• `//=` Floor divide and assign\n• `%=` Modulo and assign\n• `**=` Exponent and assign",
        codeExample: 'score = 100\n\nscore += 25     # score = score + 25 → 125\nprint(score)    # 125\n\nscore -= 10     # score = score - 10 → 115\nprint(score)    # 115\n\nscore *= 2      # score = score * 2 → 230\nprint(score)    # 230\n\nscore //= 3     # score = score // 3 → 76\nprint(score)    # 76\n\n# Also works with strings!\ngreeting = "Hello"\ngreeting += " World"   # "Hello" + " World"\nprint(greeting)        # Hello World',
      },
      {
        id: "tc_003_6",
        title: "Operator Precedence (Order of Operations)",
        content:
          "Just like in math, Python follows an **order of operations** (PEMDAS):\n\n1. `()` **Parentheses** — highest priority\n2. `**` **Exponent**\n3. `+x`, `-x` **Unary plus/minus** (positive/negative sign)\n4. `*`, `/`, `//`, `%` **Multiply, Divide, Floor Div, Modulo**\n5. `+`, `-` **Add, Subtract**\n6. `==`, `!=`, `>`, `<`, `>=`, `<=` **Comparisons**\n7. `not` → `and` → `or` **Logical operators**\n\nWhen in doubt, use **parentheses** to make your intent clear!",
        codeExample: "# Without parentheses — follows precedence\nresult = 2 + 3 * 4      # 3*4 first → 12, then +2 → 14\nprint(result)            # 14\n\n# With parentheses — override precedence\nresult = (2 + 3) * 4    # 2+3 first → 5, then *4 → 20\nprint(result)            # 20\n\n# Exponent before multiplication\nprint(2 * 3 ** 2)       # 3²=9, then 2*9 → 18\nprint((2 * 3) ** 2)     # 2*3=6, then 6² → 36\n\n# Real example: temperature conversion\ncelsius = 37\nfahrenheit = (celsius * 9/5) + 32\nprint(f\"{celsius}°C = {fahrenheit}°F\")  # 37°C = 98.6°F",
        tip: "A good rule: if you have to think about precedence for more than 2 seconds, add parentheses. Clear code is always better than clever code!",
      },
      {
        id: "tc_003_7",
        title: "String Operators",
        content:
          "The `+` and `*` operators work differently with strings:\n\n• `+` **Concatenation** — joins two strings together\n• `*` **Repetition** — repeats a string N times\n• `in` **Membership** — checks if a substring exists within a string\n\nYou **cannot** add a string and a number directly — use `str()` to convert the number first, or better yet, use an f-string!",
        codeExample: '# Concatenation\nfirst = "Hello"\nlast = "World"\nfull = first + " " + last\nprint(full)               # Hello World\n\n# Repetition\nprint("=" * 30)           # ==============================\nprint("Ha" * 3)           # HaHaHa\n\n# Membership testing with \'in\'\nmessage = "Python is fun"\nprint("Python" in message)    # True\nprint("Java" in message)      # False\nprint("fun" not in message)   # False\n\n# You CAN\'T do this:\n# print("Age: " + 25)     # TypeError!\n# Do this instead:\nprint("Age: " + str(25))      # Age: 25\nprint(f"Age: {25}")            # Age: 25 (better!)',
      },
      {
        id: "tc_003_8",
        title: "Putting It All Together",
        content:
          "Let's combine everything into practical examples. Operators are the building blocks of every program — from simple calculations to complex logic.\n\nIn the quiz next, you'll practice identifying operators and predicting their output. Then in the code challenge, you'll build real programs using them!",
        codeExample: '# Practical example: Simple grade calculator\nscore = 85\nmax_score = 100\npercentage = (score / max_score) * 100\n\npassing = percentage >= 75\nhonors = percentage >= 90\n\nprint(f"Score: {score}/{max_score}")\nprint(f"Percentage: {percentage}%")\nprint(f"Passing: {passing}")       # True\nprint(f"Honors: {honors}")         # False\n\n# Is the score between 80 and 89? (B grade range)\nis_grade_b = 80 <= percentage <= 89\nprint(f"Grade B: {is_grade_b}")    # True',
        tip: "Notice how we used comparison operators to get boolean results, then printed them directly. This pattern of 'compute → compare → act' is the foundation of all programming!",
      },
    ],
    quizQuestions: [
      {
        type: "multiple_choice",
        id: "q_003_1",
        question: "What does 10 % 3 return in Python?",
        options: ["3", "1", "3.33", "0.1"],
        correctIndex: 1,
        explanation:
          "The % (modulo) operator returns the remainder after division. 10 ÷ 3 = 3 with a remainder of 1. So 10 % 3 = 1. This operator is commonly used to check if numbers are even/odd (n % 2).",
        hint: "Think about what's left over after dividing 10 by 3.",
      },
      {
        type: "fill_blank",
        id: "q_003_2",
        question: "Complete the comparison to check if x equals 10:",
        codeTemplate: "x ___BLANK___ 10",
        correctAnswer: "==",
        explanation:
          "The == operator checks equality and returns True or False. A single = is the assignment operator which stores a value. Using = instead of == in a comparison is one of the most common beginner mistakes!",
        hint: "Checking equality uses a double version of the assignment operator.",
      },
      {
        type: "reorder",
        id: "q_003_3",
        question: "Arrange the code to calculate and display the area of a rectangle:",
        lines: [
          'print(f"Area: {area}")',
          "width = 5",
          "area = length * width",
          "length = 10",
        ],
        correctOrder: [3, 1, 2, 0],
        explanation:
          "First define length (10), then width (5), then calculate area (length * width = 50), then print. Variables must be defined before they're used in expressions.",
        hint: "Define both dimensions before calculating, and calculate before printing.",
      },
      {
        type: "true_false",
        id: "q_003_4",
        question: 'The expression "Hello" + 5 is valid Python code.',
        correctAnswer: false,
        explanation:
          'Python cannot concatenate a string with an integer — it raises a TypeError. You must convert the number first: "Hello" + str(5) gives "Hello5", or use an f-string: f"Hello{5}".',
        hint: "Can you directly combine text and a number with + without converting?",
      },
      {
        type: "multiple_choice",
        id: "q_003_5",
        question: "What does 2 + 3 * 4 evaluate to?",
        options: ["20", "14", "24", "9"],
        correctIndex: 1,
        explanation:
          "Python follows PEMDAS (order of operations). Multiplication (*) happens before addition (+). So 3 * 4 = 12 first, then 2 + 12 = 14. To get 20, you'd need parentheses: (2 + 3) * 4.",
        hint: "Remember PEMDAS — which operation does Python perform first?",
      },
      {
        type: "fill_blank",
        id: "q_003_3b",
        question: "Complete the shorthand to add 10 to the current score:",
        codeTemplate: "score ___BLANK___ 10",
        correctAnswer: "+=",
        explanation:
          "The += operator adds the right value to the variable and reassigns it. score += 10 is shorthand for score = score + 10. This pattern is used constantly in loops and counters.",
        hint: "Combine the addition symbol with the assignment symbol into one shorthand operator.",
      },
      {
        type: "multiple_choice",
        id: "q_003_6",
        question: "What does 10 / 2 return in Python?",
        options: ["5", "5.0", "5.00", "Error"],
        correctIndex: 1,
        explanation:
          "The / operator (true division) ALWAYS returns a float in Python, even when the result is a whole number. 10 / 2 = 5.0, not 5. Use // for integer division if you need an int result.",
        hint: "The / operator in Python always returns a specific numeric type, even for whole-number results.",
      },
    ],
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: "# Task: Calculate the sum of 15 and 27, print the result\n# Then calculate the product of 8 and 6, print that too\n# Expected output:\n# 42\n# 48\n\n",
        description: "Use + and * operators to perform basic arithmetic and print results.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: '# Task: Build a rectangle calculator\n# Given: length = 12, width = 8\n# Calculate and print:\n# 1. Area (length × width)\n# 2. Perimeter (2 × (length + width))\n# 3. Is it a square? (True/False)\n#\n# Use f-strings for formatted output like:\n# "Area: 96 sq units"\n# "Perimeter: 40 units"\n# "Is square: False"\n\nlength = 12\nwidth = 8\n\n',
        description: "Calculate area, perimeter, and square check for a rectangle using arithmetic and comparison operators.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: '# Task: Build a complete mini calculator\n# Given: a = 17, b = 5\n# Print all 7 arithmetic operations with labels:\n#   17 + 5 = 22\n#   17 - 5 = 12\n#   17 * 5 = 85\n#   17 / 5 = 3.4\n#   17 // 5 = 3\n#   17 % 5 = 2\n#   17 ** 5 = 1419857\n# Then:\n# - Convert 135 total minutes to "Xh Ym" format using // and %\n# - Check if \'a\' is even or odd using %\n# - Calculate a temperature: convert 37°C to Fahrenheit\n\na = 17\nb = 5\n\n',
        description: "Build a calculator showing all 7 operators, plus time conversion, even/odd check, and temperature conversion.",
      },
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "42",
        description: "Should print the sum of 15 and 27",
        passed: false,
      },
      {
        input: "",
        expectedOutput: "48",
        description: "Should print the product of 8 and 6",
        passed: false,
      },
    ],
    hints: [
      "For addition: print(15 + 27) gives 42",
      "For multiplication: print(8 * 6) gives 48",
      "You can store results in variables first: total = 15 + 27",
      "Remember: use print() to display each answer on a separate line",
    ],
    prevLessonId: "les_002",
    nextLessonId: "les_004",
  },

  les_004: {
    id: "les_004",
    title: "Strings & String Methods",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    language: "python",
    order: 4,
    xpReward: 100,
    theoryCards: [
      {
        id: "tc_004_1",
        title: "Strings Are Sequences",
        content:
          "A string is a **sequence of characters**. Each character has a position called an **index**, starting from **0** (not 1!). You can access individual characters using square brackets `[]`.\n\nPython also supports **negative indexing**: `-1` is the last character, `-2` is second-to-last, and so on.",
        codeExample: 'word = "Python"\n\n# Positive indexing (left to right)\nprint(word[0])     # P\nprint(word[1])     # y\nprint(word[5])     # n\n\n# Negative indexing (right to left)\nprint(word[-1])    # n (last char)\nprint(word[-2])    # o (second-to-last)\n\n# Length of a string\nprint(len(word))   # 6',
        tip: "Indexing starts at 0, not 1! So in \"Python\", P is at index 0, y is at index 1, and n is at index 5 (not 6). This is called 'zero-based indexing' and is standard in most programming languages.",
      },
      {
        id: "tc_004_2",
        title: "String Slicing",
        content:
          "**Slicing** lets you extract a portion of a string. The syntax is `string[start:end:step]`:\n\n• `start` — where to begin (inclusive, default 0)\n• `end` — where to stop (exclusive! character at this index is NOT included)\n• `step` — how many characters to skip (default 1)\n\nIf you omit start or end, Python uses the beginning or end of the string.",
        codeExample: 'text = "Hello, World!"\n\nprint(text[0:5])      # Hello    (index 0 to 4)\nprint(text[7:12])     # World    (index 7 to 11)\nprint(text[:5])       # Hello    (from start)\nprint(text[7:])       # World!   (to end)\nprint(text[-6:])      # World!   (last 6 chars)\n\n# With step\nprint(text[::2])      # Hlo ol!  (every 2nd char)\nprint(text[::-1])     # !dlroW ,olleH  (reversed!)\n\n# Copy the entire string\ncopy = text[:]',
        tip: "The slice text[::-1] reverses a string! This is a classic Python trick. In interviews, they might ask you to check if a word is a palindrome — just compare word == word[::-1].",
      },
      {
        id: "tc_004_3",
        title: "Common String Methods",
        content:
          "Strings have tons of built-in **methods** (functions attached to the string). Here are the most important ones:\n\n• `.upper()` / `.lower()` — change case\n• `.strip()` — remove whitespace from both ends\n• `.replace(old, new)` — replace text\n• `.split(separator)` — break into a list\n• `.join(list)` — join a list into a string\n• `.find(text)` — find position of substring (-1 if not found)\n• `.count(text)` — count occurrences",
        codeExample: 'name = "  Juan dela Cruz  "\n\n# Case methods\nprint(name.upper())        # "  JUAN DELA CRUZ  "\nprint(name.lower())        # "  juan dela cruz  "\nprint(name.title())        # "  Juan Dela Cruz  "\n\n# Cleaning\nprint(name.strip())        # "Juan dela Cruz"\nprint(name.lstrip())       # "Juan dela Cruz  " (left only)\n\n# Replacing\ntext = "Hello World"\nprint(text.replace("World", "Python"))  # "Hello Python"\n\n# Splitting and joining\ncsv = "apple,banana,cherry"\nfruits = csv.split(",")     # ["apple", "banana", "cherry"]\nprint(" | ".join(fruits))   # "apple | banana | cherry"',
      },
      {
        id: "tc_004_4",
        title: "Checking String Content",
        content:
          "Python has methods that **check** what a string contains. They all return `True` or `False`:\n\n• `.startswith(text)` / `.endswith(text)` — check beginning/end\n• `.isdigit()` — all characters are digits?\n• `.isalpha()` — all characters are letters?\n• `.isalnum()` — all characters are letters or digits?\n• `.isspace()` — all characters are whitespace?\n• `.isupper()` / `.islower()` — all uppercase/lowercase?",
        codeExample: 'email = "juan@email.com"\nprint(email.startswith("juan"))   # True\nprint(email.endswith(".com"))     # True\n\npin = "1234"\nprint(pin.isdigit())              # True\nprint(pin.isalpha())              # False\n\nusername = "Player1"\nprint(username.isalnum())         # True\nprint(username.isalpha())         # False (has a digit)\n\n# Useful for validation\nuser_input = "  "\nif user_input.isspace() or len(user_input.strip()) == 0:\n    print("Input cannot be empty!")',
        tip: "These checking methods are incredibly useful for validating user input. Before converting a string to int(), check if it's all digits with .isdigit() to avoid crashes!",
      },
      {
        id: "tc_004_5",
        title: "f-Strings: Advanced Formatting",
        content:
          "You already know basic f-strings. Here are **advanced features**:\n\n• **Expressions** — do math inside `{}`\n• **Format specs** — control decimal places, padding, alignment\n• **Padding** — `{value:>10}` right-aligns in 10 chars\n• **Decimals** — `{value:.2f}` shows 2 decimal places\n• **Thousands** — `{value:,}` adds comma separators",
        codeExample: 'name = "Juan"\nscore = 95.678\ntotal = 1234567\n\n# Expressions inside {}\nprint(f"Score + 5 = {score + 5}")        # Score + 5 = 100.678\n\n# Decimal formatting\nprint(f"Score: {score:.2f}")              # Score: 95.68\nprint(f"Score: {score:.0f}")              # Score: 96\n\n# Thousands separator\nprint(f"Total: {total:,}")                # Total: 1,234,567\n\n# Padding and alignment\nprint(f"|{name:<10}|")    # |Juan      | (left)\nprint(f"|{name:>10}|")    # |      Juan| (right)\nprint(f"|{name:^10}|")    # |   Juan   | (center)\n\n# Zero-padding numbers\nday = 5\nprint(f"Day {day:03d}")   # Day 005',
        tip: "The .2f in f\"{value:.2f}\" means: 'format as float with 2 decimal places'. The f stands for 'fixed-point'. This is essential for displaying money: f\"${price:.2f}\" gives \"$9.99\".",
      },
      {
        id: "tc_004_6",
        title: "Strings Are Immutable",
        content:
          "An important concept: strings are **immutable** — you cannot change individual characters. Any 'modification' actually creates a **brand new string**.\n\nThis means `text[0] = \"h\"` will cause an error! Instead, you build a new string using slicing, concatenation, or methods like `.replace()`.",
        codeExample: 'text = "Hello"\n\n# This will NOT work:\n# text[0] = "h"     # TypeError: strings are immutable!\n\n# Instead, create a new string:\ntext = "h" + text[1:]     # "h" + "ello" → "hello"\nprint(text)               # hello\n\n# Or use replace:\noriginal = "Hello World"\nnew = original.replace("H", "h")\nprint(original)           # Hello World (unchanged!)\nprint(new)                # hello World (new string)\n\n# Methods return NEW strings, they never modify the original\nname = "juan"\nshout = name.upper()\nprint(name)               # juan (still lowercase)\nprint(shout)              # JUAN (new string)',
        tip: "Since string methods return new strings (they don't modify the original), you need to save the result: name = name.upper() if you want to keep the change.",
      },
    ],
    quizQuestions: [
      {
        type: "multiple_choice",
        id: "q_004_1",
        question: 'What does "Python"[0] return?',
        options: ["P", "y", "Python", "Error"],
        correctIndex: 0,
        explanation:
          "String indexing starts at 0 in Python. So \"Python\"[0] returns 'P', the first character. [1] would return 'y', [2] would return 't', and so on.",
        hint: "Index 0 refers to the very first character in the string.",
      },
      {
        type: "fill_blank",
        id: "q_004_2",
        question: "Complete the code to reverse the string:",
        codeTemplate: 'text = "Hello"\nreversed_text = text[___BLANK___]',
        correctAnswer: "::-1",
        explanation:
          "The slice [::-1] reverses a string. The -1 step means 'go backwards one character at a time'. text[::-1] starts from the end and works backward to the beginning.",
        hint: "Use a slice with a negative step to walk backwards through the string.",
      },
      {
        type: "true_false",
        id: "q_004_3",
        question: "Calling name.upper() permanently changes the original variable name to uppercase.",
        correctAnswer: false,
        explanation:
          "Strings are immutable — .upper() returns a NEW string, it does not modify the original. To update the variable, you'd need: name = name.upper()",
        hint: "Remember that strings in Python are immutable — they cannot be changed in place.",
      },
      {
        type: "multiple_choice",
        id: "q_004_4",
        question: 'What does "apple,banana,cherry".split(",") return?',
        options: [
          "\"apple banana cherry\"",
          "[\"apple\", \"banana\", \"cherry\"]",
          "\"apple\", \"banana\", \"cherry\"",
          "Error",
        ],
        correctIndex: 1,
        explanation:
          "The .split() method breaks a string into a list based on the separator. Splitting \"apple,banana,cherry\" by comma gives the list [\"apple\", \"banana\", \"cherry\"].",
        hint: "The split method breaks a string apart and returns the pieces inside square brackets.",
      },
      {
        type: "fill_blank",
        id: "q_004_5",
        question: "Complete the f-string to show a price with 2 decimal places:",
        codeTemplate: 'price = 9.9\nprint(f"Price: ${price___BLANK___}")',
        correctAnswer: ":.2f",
        explanation:
          "The format spec :.2f means 'fixed-point with 2 decimal places'. So f\"{9.9:.2f}\" outputs \"9.90\". The : separates the variable from its format instructions.",
        hint: "The format specifier starts with a colon, then the number of decimal places, then a letter for 'fixed-point'.",
      },
      {
        type: "reorder",
        id: "q_004_6",
        question: "Arrange the code to clean user input and validate it:",
        lines: [
          'print(f"Valid username: {cleaned}")',
          'cleaned = raw.strip().lower()',
          'raw = "  JuanGamer123  "',
          'is_valid = cleaned.isalnum()',
        ],
        correctOrder: [2, 1, 3, 0],
        explanation:
          "First store the raw input, then clean it (strip whitespace + lowercase), then validate with .isalnum(), then print the result. Methods can be chained: raw.strip().lower().",
        hint: "Start with the raw data, clean it, then validate, then display the result.",
      },
    ],
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: '# Task: Given a name, print it in uppercase, lowercase, and its length\n# Example output for "Python":\n# PYTHON\n# python\n# Length: 6\n\nname = "Python"\n\n',
        description: "Use .upper(), .lower(), and len() on a string and print each result.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: '# Task: Build a username generator\n# 1. Start with full_name = "Juan Dela Cruz"\n# 2. Convert to lowercase\n# 3. Replace spaces with underscores\n# 4. Add a number suffix: "_2026"\n# 5. Print the result and verify it\'s valid with .isalnum() after removing underscores\n# Expected: "juan_dela_cruz_2026"\n\nfull_name = "Juan Dela Cruz"\n\n',
        description: "Generate a username from a full name using .lower(), .replace(), concatenation, and validation.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: '# Task: Build a text analyzer\n# Given the paragraph below, find and print:\n# 1. Total characters (with and without spaces)\n# 2. Total words (hint: split by space and count)\n# 3. How many times "Python" appears (case-insensitive)\n# 4. The first and last word\n# 5. The paragraph reversed\n# 6. The paragraph in title case\n# 7. Replace all "Python" with "🐍 Python"\n\nparagraph = "Python is an amazing language. Python is used by millions. Learning Python is fun and rewarding."\n\n',
        description: "Analyze a text paragraph using len(), split(), count(), slicing, title(), replace(), and more.",
      },
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "PYTHON",
        description: "Should print the name in uppercase",
        passed: false,
      },
      {
        input: "",
        expectedOutput: "python",
        description: "Should print the name in lowercase",
        passed: false,
      },
      {
        input: "",
        expectedOutput: "6",
        description: "Should print the correct length",
        passed: false,
      },
    ],
    hints: [
      "Use .upper() to convert to uppercase: print(name.upper())",
      "Use .lower() to convert to lowercase: print(name.lower())",
      "Use len() to get the length: print(f\"Length: {len(name)}\")",
      "String methods don't change the original — they return new strings",
    ],
    prevLessonId: "les_003",
    nextLessonId: "les_005",
  },

  les_005: {
    id: "les_005",
    title: "User Input & Type Conversion",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    language: "python",
    order: 5,
    xpReward: 100,
    theoryCards: [
      {
        id: "tc_005_1",
        title: "Getting User Input",
        content:
          "So far, all our values have been hardcoded. The **input()** function lets your program ask the user for information! It displays a **prompt** (message) and waits for the user to type something and press Enter.\n\nThe result is **always a string**, even if the user types a number. This is important to remember!",
        codeExample: '# Basic input\nname = input("What is your name? ")\nprint(f"Hello, {name}!")\n\n# The result is ALWAYS a string\nage = input("How old are you? ")\nprint(type(age))   # <class \'str\'> — even if user types 25!\n\n# User types: Juan\n# Output: Hello, Juan!',
        tip: "Always add a space at the end of your prompt string, like \"Enter name: \" instead of \"Enter name:\". This makes it look cleaner when the user types their answer right after the prompt.",
      },
      {
        id: "tc_005_2",
        title: "Converting Input to Numbers",
        content:
          "Since `input()` always returns a string, you **must convert** it if you need a number. Use `int()` for whole numbers and `float()` for decimals.\n\nYou can wrap the conversion around the input call in one line, or do it in two steps — both are valid.",
        codeExample: '# Two-step conversion\nage_text = input("Enter your age: ")\nage = int(age_text)    # Convert string to int\n\n# One-step conversion (more concise)\nage = int(input("Enter your age: "))\nheight = float(input("Enter your height in meters: "))\n\n# Now you can do math!\nbirth_year = 2026 - age\nprint(f"You were born around {birth_year}")\n\n# What happens if user types "abc" instead of a number?\n# int("abc")  →  ValueError! The program crashes.\n# We\'ll learn how to handle this with try/except later.',
        tip: "A common pattern is: int(input(\"...\")) — this gets the input and converts it to an integer in one line. You'll see this pattern everywhere in Python programs!",
      },
      {
        id: "tc_005_3",
        title: "Building Interactive Programs",
        content:
          "Now you can build programs that **talk** to the user! The flow is:\n\n1. **Ask** for input with a clear prompt\n2. **Convert** the type if needed (int/float)\n3. **Process** the data (calculations, logic)\n4. **Display** the result\n\nThis is the foundation of every interactive application.",
        codeExample: '# Interactive greeting\nname = input("Enter your name: ")\nage = int(input("Enter your age: "))\ncity = input("Enter your city: ")\n\nprint(f"\\n--- Profile ---")\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"City: {city}")\nprint(f"In 10 years, you\'ll be {age + 10}!")\n\n# Simple calculator\nprint("\\n--- Calculator ---")\na = float(input("First number: "))\nb = float(input("Second number: "))\nprint(f"{a} + {b} = {a + b}")\nprint(f"{a} × {b} = {a * b}")',
      },
      {
        id: "tc_005_4",
        title: "Input Validation Basics",
        content:
          "Users can type **anything** — so you should validate their input before using it. Here are some simple checks you can do right now (before learning if-statements):\n\n• Check if input is empty with `len()` or `.strip()`\n• Check if it's a number with `.isdigit()`\n• Check length with `len()`\n• Use `.strip()` to remove accidental spaces\n\nLater, you'll learn `try/except` for proper error handling and `if/else` for branching logic.",
        codeExample: '# Clean the input first\nraw = input("Enter username: ")\nclean = raw.strip().lower()    # Remove spaces, lowercase\n\nprint(f"Cleaned input: \'{clean}\'")\nprint(f"Is alphanumeric: {clean.isalnum()}")\nprint(f"Length: {len(clean)}")\n\n# Check if numeric input is valid\nage_input = input("Enter age: ")\nprint(f"Is a number: {age_input.strip().isdigit()}")\n\n# Safe conversion pattern\nnum_str = "42"\nif num_str.isdigit():\n    num = int(num_str)\n    print(f"Converted: {num}")\nelse:\n    print("Not a valid number!")',
        tip: "Always .strip() user input before processing! Users often accidentally add spaces before or after their input, and this can cause unexpected bugs.",
      },
      {
        id: "tc_005_5",
        title: "Practical Conversion Examples",
        content:
          "Type conversion is used everywhere in real programs. Here are patterns you'll use constantly:\n\n• **String ↔ Number** — for calculations with user input\n• **Number → String** — for building messages\n• **Float → Int** — for rounding (watch out: int() truncates, round() rounds!)\n• **Any → Bool** — for truthiness checks",
        codeExample: '# Temperature converter\ncelsius = float(input("Temperature in °C: "))\nfahrenheit = (celsius * 9/5) + 32\nprint(f"{celsius}°C = {fahrenheit:.1f}°F")\n\n# Tip calculator\nbill = float(input("Bill amount: $"))\ntip_percent = float(input("Tip %: "))\ntip = bill * (tip_percent / 100)\ntotal = bill + tip\nprint(f"Tip: ${tip:.2f}")\nprint(f"Total: ${total:.2f}")\n\n# round() vs int()\nprint(round(3.7))     # 4 (rounds normally)\nprint(int(3.7))       # 3 (truncates/cuts off)\nprint(round(3.14159, 2))  # 3.14 (round to 2 places)',
        tip: "For money calculations, always use round(value, 2) or f\"{value:.2f}\" to show exactly 2 decimal places. Floating-point math can give results like 0.30000000000000004 instead of 0.3!",
      },
      {
        id: "tc_005_6",
        title: "Multiple Inputs & Unpacking",
        content:
          "Sometimes you need multiple values on one line. You can use `.split()` to break a single input into multiple values, then **unpack** them into separate variables.\n\nThis is handy for competitive programming and quick scripts where you want compact input.",
        codeExample: '# Multiple values on one line\ndata = input("Enter name and age (space-separated): ")\nparts = data.split()    # Split by space\nname = parts[0]\nage = int(parts[1])\nprint(f"{name} is {age} years old")\n\n# Shorter: unpack directly\nfirst, last = input("First and last name: ").split()\nprint(f"Hello, {first} {last}!")\n\n# Multiple numbers\nx, y = input("Enter two numbers: ").split()\nx, y = int(x), int(y)    # Convert both to int\nprint(f"Sum: {x + y}")\n\n# Using map() for cleaner number input\na, b, c = map(int, input("Three numbers: ").split())\nprint(f"Average: {(a + b + c) / 3:.1f}")',
        tip: "The map(int, input().split()) pattern is a Python favorite! It takes each piece from split() and converts them all to int at once. You'll see this everywhere in coding challenges.",
      },
    ],
    quizQuestions: [
      {
        type: "multiple_choice",
        id: "q_005_1",
        question: "What type does the input() function always return?",
        options: ["int", "float", "str", "It depends on what the user types"],
        correctIndex: 2,
        explanation:
          "input() ALWAYS returns a string (str), regardless of what the user types. Even if the user types 42, input() returns \"42\" (a string). You must explicitly convert with int() or float() if you need a number.",
        hint: "No matter what the user types, input() treats everything as text.",
      },
      {
        type: "fill_blank",
        id: "q_005_2",
        question: "Complete the code to get a number from the user:",
        codeTemplate: 'age = ___BLANK___(input("Enter age: "))',
        correctAnswer: "int",
        explanation:
          "Wrapping input() with int() converts the string input to an integer. This int(input(\"...\")) pattern is the standard way to get numeric input in Python.",
        hint: "You need to convert the text into a whole number — which built-in function does that?",
      },
      {
        type: "true_false",
        id: "q_005_3",
        question: "int(3.9) returns 4 because it rounds to the nearest integer.",
        correctAnswer: false,
        explanation:
          "int() truncates (removes the decimal part), it does NOT round. int(3.9) returns 3, not 4. To round properly, use round(3.9) which returns 4.",
        hint: "Does int() round, or does it simply cut off everything after the decimal point?",
      },
      {
        type: "multiple_choice",
        id: "q_005_4",
        question: 'What does "42".isdigit() return?',
        options: ["42", "True", "False", "\"True\""],
        correctIndex: 1,
        explanation:
          "The .isdigit() method checks if all characters in the string are digits (0-9). Since \"42\" contains only digits, it returns True (a boolean, not the string \"True\").",
        hint: "The method checks whether every character is a digit and returns a boolean value.",
      },
      {
        type: "reorder",
        id: "q_005_5",
        question: "Arrange the code for an interactive temperature converter:",
        lines: [
          'print(f"{celsius}°C = {fahrenheit:.1f}°F")',
          'celsius = float(input("Temperature in °C: "))',
          'fahrenheit = (celsius * 9/5) + 32',
        ],
        correctOrder: [1, 2, 0],
        explanation:
          "First get the input and convert to float, then calculate Fahrenheit using the formula, then print the result. Each step depends on the previous one.",
        hint: "Follow the logical flow: get data, process it, then display the result.",
      },
      {
        type: "fill_blank",
        id: "q_005_6",
        question: "Complete the code to split user input into two variables:",
        codeTemplate: 'first, last = input("Full name: ").___BLANK___()',
        correctAnswer: "split",
        explanation:
          "The .split() method breaks a string into a list wherever there are spaces. With unpacking (first, last = ...), each piece goes into a separate variable.",
        hint: "This string method breaks text apart at spaces and returns a list of pieces.",
      },
    ],
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: '# Task: Ask the user for their name and age, then greet them\n# 1. Use input() to get their name\n# 2. Use int(input()) to get their age\n# 3. Print: "Hello, [name]! You are [age] years old."\n# 4. Print: "In 5 years, you will be [age+5]."\n\n',
        description: 'Get name and age from the user, print a greeting and "in 5 years" calculation.',
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: '# Task: Build an interactive tip calculator\n# 1. Ask for the bill amount (float)\n# 2. Ask for the tip percentage (float)\n# 3. Ask for the number of people splitting (int)\n# 4. Calculate: tip amount, total bill, amount per person\n# 5. Print all results formatted to 2 decimal places\n#\n# Example: Bill $120, Tip 15%, 4 people\n# Tip: $18.00, Total: $138.00, Per person: $34.50\n\n',
        description: "Build a tip calculator that splits the bill, using float input, arithmetic operators, and f-string formatting.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: '# Task: Build a Student Grade Report Generator\n# 1. Ask for the student\'s name\n# 2. Ask for 3 quiz scores (on one line, space-separated)\n#    Use: map(int, input("Scores: ").split())\n# 3. Calculate: average, highest, lowest\n# 4. Determine pass/fail (average >= 75 is passing)\n# 5. Print a formatted report card:\n#\n# ============================\n#   Report Card: [Name]\n# ============================\n# Quiz 1:    85\n# Quiz 2:    92\n# Quiz 3:    78\n# ----------------------------\n# Average:   85.00\n# Highest:   92\n# Lowest:    78\n# Status:    PASSING\n# ============================\n\n',
        description: "Build a grade report using multiple inputs, map(), min/max(), formatted output, and comparison operators.",
      },
    ],
    testCases: [
      {
        input: "Juan\n21",
        expectedOutput: "Hello, Juan!",
        description: "Should greet the user with their name",
        passed: false,
      },
      {
        input: "Juan\n21",
        expectedOutput: "26",
        description: "Should calculate age + 5 correctly",
        passed: false,
      },
    ],
    hints: [
      "Use input(\"prompt\") to get text from the user",
      "Convert to number with int(): age = int(input(\"Enter age: \"))",
      "Use f-strings for output: print(f\"Hello, {name}!\")",
      "Math with variables: future_age = age + 5",
    ],
    prevLessonId: "les_004",
    nextLessonId: "les_006",
  },

  les_006: {
    id: "les_006",
    title: "Conditionals: if, elif, else",
    courseId: "crs_001",
    courseTitle: "Python Fundamentals",
    language: "python",
    order: 6,
    xpReward: 125,
    theoryCards: [
      {
        id: "tc_006_1",
        title: "Making Decisions with if",
        content:
          "Until now, Python has run every line of code from top to bottom. **Conditionals** let your program make **decisions** — running different code based on whether a condition is True or False.\n\nThe `if` statement checks a condition. If it's `True`, the **indented block** below runs. If it's `False`, the block is skipped entirely.",
        codeExample: 'age = 18\n\nif age >= 18:\n    print("You are an adult!")       # This runs\n    print("You can vote!")            # This also runs\n\nprint("This always runs")            # Outside the if block\n\n# When condition is False:\ntemperature = 15\nif temperature > 30:\n    print("It\'s hot!")                # Skipped!\n\nprint("Moving on...")                 # This runs regardless',
        tip: "Indentation is NOT optional in Python — it's how Python knows which lines belong inside the if block. Use 4 spaces (the standard). If your indentation is wrong, you'll get an IndentationError!",
      },
      {
        id: "tc_006_2",
        title: "if-else: Two Paths",
        content:
          "The `else` block runs when the `if` condition is **False**. Together, `if-else` creates **two paths** — exactly one of them will always execute.\n\nThink of it like a fork in the road: the condition decides which path to take.",
        codeExample: 'score = 72\n\nif score >= 75:\n    print("Passed! ✅")\n    print("Great job!")\nelse:\n    print("Failed. ❌")\n    print(f"You needed {75 - score} more points.")\n\n# Output: Failed. ❌\n#         You needed 3 more points.\n\n# Another example: even or odd\nnumber = 7\nif number % 2 == 0:\n    print(f"{number} is even")\nelse:\n    print(f"{number} is odd")\n# Output: 7 is odd',
      },
      {
        id: "tc_006_3",
        title: "elif: Multiple Conditions",
        content:
          "What if you have more than two options? Use `elif` (short for 'else if') to check **additional conditions**. Python checks each condition from top to bottom and runs the **first** one that's True.\n\n• You can have as many `elif` blocks as you want\n• The `else` at the end is optional (catches everything else)\n• Only **one** block will ever execute",
        codeExample: 'score = 85\n\nif score >= 97:\n    grade = "A+"\nelif score >= 93:\n    grade = "A"\nelif score >= 90:\n    grade = "A-"\nelif score >= 87:\n    grade = "B+"\nelif score >= 83:\n    grade = "B"\nelif score >= 75:\n    grade = "C"\nelse:\n    grade = "F"\n\nprint(f"Score: {score} → Grade: {grade}")\n# Output: Score: 85 → Grade: B',
        tip: "Order matters in elif chains! Python stops at the FIRST True condition. If you put score >= 75 first, a score of 95 would get 'C' instead of 'A' because 95 >= 75 is True and Python would stop there.",
      },
      {
        id: "tc_006_4",
        title: "Nested Conditionals",
        content:
          "You can put an `if` inside another `if` — this is called **nesting**. Each nested level requires an additional 4 spaces of indentation.\n\nUse nesting when you need to check a second condition only if the first condition is True. But don't nest too deeply — it makes code hard to read!",
        codeExample: 'age = 20\nhas_id = True\n\nif age >= 18:\n    print("Age OK!")\n    if has_id:\n        print("ID verified — access granted! ✅")\n    else:\n        print("Please bring your ID next time.")\nelse:\n    print("Sorry, you must be 18+.")\n\n# Cleaner alternative using \'and\':\nif age >= 18 and has_id:\n    print("Access granted!")\nelif age >= 18:\n    print("Bring your ID!")\nelse:\n    print("Must be 18+.")',
        tip: "If you find yourself nesting more than 2-3 levels deep, it's a sign you should refactor. Using 'and'/'or' to combine conditions or splitting into separate functions makes code much more readable.",
      },
      {
        id: "tc_006_5",
        title: "Combining Conditions",
        content:
          "Use **logical operators** to combine multiple conditions in a single if-statement:\n\n• `and` — both conditions must be True\n• `or` — at least one must be True\n• `not` — reverses True/False\n\nYou can also use **chained comparisons** like `18 <= age <= 65`, which is unique to Python!",
        codeExample: '# Using \'and\'\nage = 25\nhas_license = True\nif age >= 16 and has_license:\n    print("You can drive!")\n\n# Using \'or\'\nday = "Saturday"\nif day == "Saturday" or day == "Sunday":\n    print("It\'s the weekend! 🎉")\n\n# Using \'not\'\nis_banned = False\nif not is_banned:\n    print("Welcome to the game!")\n\n# Chained comparison (Pythonic!)\nscore = 85\nif 80 <= score <= 89:\n    print("Grade: B")\n\n# Complex condition\nhas_ticket = True\nis_vip = False\nif (has_ticket and age >= 18) or is_vip:\n    print("Entry allowed!")',
      },
      {
        id: "tc_006_6",
        title: "Ternary Operator (One-Line if)",
        content:
          "For simple if-else choices, Python has a **ternary operator** — a one-line shorthand:\n\n`value_if_true if condition else value_if_false`\n\nIt's great for simple assignments but shouldn't be used for complex logic.",
        codeExample: 'age = 20\n\n# Regular if-else (4 lines)\nif age >= 18:\n    status = "adult"\nelse:\n    status = "minor"\n\n# Ternary operator (1 line — same result!)\nstatus = "adult" if age >= 18 else "minor"\nprint(status)    # adult\n\n# More examples\ntemp = 35\nweather = "hot" if temp > 30 else "nice" if temp > 20 else "cold"\nprint(weather)   # hot\n\nscore = 82\nresult = "PASS" if score >= 75 else "FAIL"\nprint(f"Result: {result}")  # Result: PASS\n\n# Inside an f-string!\nprint(f"You are {\"old enough\" if age >= 18 else \"too young\"}")',
        tip: "The ternary operator is perfect for simple value assignments. But if your condition is complex or you need to run multiple lines, use a regular if-else. Readability > cleverness!",
      },
    ],
    quizQuestions: [
      {
        type: "multiple_choice",
        id: "q_006_1",
        question: "What keyword is used to check an additional condition after 'if'?",
        options: ["else if", "elif", "elseif", "elsif"],
        correctIndex: 1,
        explanation:
          "Python uses 'elif' (short for 'else if') to check additional conditions. Other languages use 'else if' (JavaScript), 'elsif' (Ruby), or 'elseif' (PHP), but Python's is unique.",
        hint: "Python shortens 'else if' into a single compact keyword.",
      },
      {
        type: "true_false",
        id: "q_006_2",
        question: "In an if-elif-else chain, multiple blocks can execute if their conditions are True.",
        correctAnswer: false,
        explanation:
          "Only ONE block executes in an if-elif-else chain. Python checks conditions top to bottom and runs ONLY the first one that is True. After that, it skips all remaining elif and else blocks.",
      },
      {
        type: "fill_blank",
        id: "q_006_3",
        question: "Complete the condition to check if age is between 13 and 19 (inclusive):",
        codeTemplate: "if 13 ___BLANK___ 19:",
        correctAnswer: "<= age <=",
        explanation:
          "Python allows chained comparisons: 13 <= age <= 19 checks that age is at least 13 AND at most 19. This is equivalent to (age >= 13 and age <= 19) but much more readable.",
      },
      {
        type: "multiple_choice",
        id: "q_006_4",
        question: "What is the output of: print(\"yes\" if 5 > 3 else \"no\")?",
        options: ["yes", "no", "True", "Error"],
        correctIndex: 0,
        explanation:
          "This is a ternary expression. The condition 5 > 3 is True, so the value before 'if' is used: \"yes\". If the condition were False, it would print \"no\".",
      },
      {
        type: "reorder",
        id: "q_006_5",
        question: "Arrange the code for a grade checker (A: 90+, B: 80+, C: 75+, F: below 75):",
        lines: [
          'grade = "F"',
          'grade = "B"',
          'grade = "A"',
          'grade = "C"',
        ],
        correctOrder: [2, 1, 3, 0],
        explanation:
          "In an if-elif-else chain for grades, check the highest threshold first (A: 90+), then B (80+), then C (75+), then F (else). This ensures each grade range is correctly matched.",
      },
      {
        type: "fill_blank",
        id: "q_006_6",
        question: "Complete the code so BOTH conditions must be True:",
        codeTemplate: "if age >= 18 ___BLANK___ has_id:",
        correctAnswer: "and",
        explanation:
          "The 'and' operator requires both conditions to be True. 'or' would only need one to be True. In this case, we want BOTH age check AND ID check to pass before granting access.",
      },
    ],
    tiers: [
      {
        difficulty: "easy",
        xpMultiplier: 1,
        starterCode: '# Task: Check if a number is positive, negative, or zero\n# 1. Set number = -5 (or any number you like)\n# 2. Use if-elif-else to print:\n#    "Positive" if > 0\n#    "Negative" if < 0\n#    "Zero" if == 0\n\nnumber = -5\n\n',
        description: "Use if-elif-else to classify a number as positive, negative, or zero.",
      },
      {
        difficulty: "medium",
        xpMultiplier: 2,
        starterCode: '# Task: Build a grade calculator\n# 1. Set score = 85 (or use input)\n# 2. Determine the letter grade:\n#    A+: 97-100 | A: 93-96 | A-: 90-92\n#    B+: 87-89  | B: 83-86 | B-: 80-82\n#    C+: 77-79  | C: 73-76 | C-: 70-72\n#    D: 60-69   | F: below 60\n# 3. Determine pass/fail (60+ is passing)\n# 4. Print: "Score: 85 → Grade: B, Status: PASS"\n\nscore = 85\n\n',
        description: "Build a detailed grade calculator with letter grades, +/- modifiers, and pass/fail status.",
      },
      {
        difficulty: "hard",
        xpMultiplier: 3,
        starterCode: '# Task: Build a movie ticket pricing system\n# Rules:\n# - Base price: $12.00\n# - Children (under 12): 50% off\n# - Seniors (65+): 40% off\n# - Students (with student ID): 20% off\n# - Matinee shows (before 5 PM): extra $2 off\n# - Weekend surcharge: +$3\n# - VIP seat: +$5\n#\n# Use variables for: age, is_student, show_hour (24h), is_weekend, is_vip\n# Calculate and print the final ticket price\n# Show all discounts/surcharges applied\n\nage = 25\nis_student = True\nshow_hour = 14    # 2 PM (24-hour format)\nis_weekend = True\nis_vip = False\nbase_price = 12.00\n\n',
        description: "Build a movie ticket pricing system with multiple conditional discounts, surcharges, and formatted output.",
      },
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Negative",
        description: "Should correctly identify -5 as negative",
        passed: false,
      },
      {
        input: "",
        expectedOutput: "Positive",
        description: "Should correctly identify positive numbers",
        passed: false,
      },
    ],
    hints: [
      "Start with: if number > 0:",
      "Don't forget the colon : at the end of if/elif/else lines",
      "The body of each block must be indented with 4 spaces",
      "Use elif for the second condition, else for the default case",
    ],
    prevLessonId: "les_005",
    nextLessonId: null,
  },
};
