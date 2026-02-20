// ============================================================================
// PathFinder Recommendation Engine Constants
// ============================================================================

/**
 * Weights for the multi-factor path scoring algorithm.
 * Sum should equal 1.0 for normalized scoring.
 */
export const SCORING_WEIGHTS = {
  interestAlignment: 0.18,
  goalAlignment: 0.15,
  dreamProjectAlignment: 0.10,
  personalityFit: 0.10,
  skillGap: 0.12,
  timeViability: 0.12,
  marketDemand: 0.10,
  communityPopularity: 0.06,
  cognitiveMatch: 0.07,
} as const;

/**
 * Maps user motivations to career path outcomes for goal alignment scoring.
 * Each motivation maps to which outcomes it aligns with and a weight.
 */
export const MOTIVATION_OUTCOME_MAP: Record<string, Record<string, number>> = {
  career_change: { career_change: 1.0, high_salary: 0.8, job_ready: 0.9 },
  freelance: { freelance: 1.0, quick_start: 0.7, portfolio: 0.8 },
  hobby: { fun: 1.0, creative: 0.8, quick_start: 0.6 },
  school: { academic: 1.0, fundamentals: 0.9, career_change: 0.5 },
  startup: { startup: 1.0, full_stack: 0.9, quick_start: 0.7 },
  automate_work: { automation: 1.0, scripting: 0.9, quick_start: 0.8 },
};

/**
 * Maps industry interests to career path tags for interest alignment (cosine similarity).
 */
export const INDUSTRY_TAG_MAP: Record<string, string[]> = {
  web: ['html', 'css', 'javascript', 'react', 'frontend', 'backend', 'fullstack', 'nodejs'],
  mobile: ['react-native', 'flutter', 'ios', 'android', 'mobile', 'javascript'],
  data_science: ['python', 'statistics', 'pandas', 'sql', 'data', 'analysis', 'visualization'],
  ai_ml: ['python', 'ml', 'ai', 'tensorflow', 'pytorch', 'data', 'math'],
  games: ['csharp', 'cpp', 'unity', 'unreal', 'graphics', 'math', 'physics'],
  devops: ['linux', 'bash', 'docker', 'kubernetes', 'cicd', 'cloud', 'python'],
  cybersecurity: ['linux', 'networking', 'python', 'security', 'cryptography'],
  embedded: ['c', 'cpp', 'hardware', 'iot', 'realtime', 'low-level'],
};

/**
 * Maps dream project choices to career path tags for alignment scoring.
 */
export const DREAM_PROJECT_TAG_MAP: Record<string, string[]> = {
  personal_website: ['html', 'css', 'javascript', 'react', 'frontend', 'fullstack'],
  mobile_app: ['react-native', 'flutter', 'mobile', 'ios', 'android', 'javascript'],
  game: ['csharp', 'cpp', 'unity', 'unreal', 'graphics', 'games'],
  chatbot: ['python', 'ai', 'ml', 'nlp', 'api'],
  data_dashboard: ['python', 'sql', 'data', 'visualization', 'analysis', 'statistics'],
  automation: ['python', 'scripting', 'bash', 'api', 'devops'],
  social_platform: ['javascript', 'react', 'nodejs', 'fullstack', 'backend', 'database'],
  hardware_project: ['c', 'cpp', 'hardware', 'iot', 'embedded', 'realtime'],
};

/**
 * Maps subject interests to career path tags for enriched interest alignment.
 */
export const SUBJECT_TAG_MAP: Record<string, string[]> = {
  math: ['math', 'statistics', 'data', 'ml', 'ai', 'analysis'],
  art_design: ['frontend', 'ui', 'design', 'css', 'graphics', 'creative'],
  science: ['python', 'data', 'analysis', 'ml', 'statistics'],
  writing: ['frontend', 'content', 'documentation', 'api'],
  music: ['creative', 'audio', 'javascript', 'python'],
  business: ['fullstack', 'startup', 'api', 'database', 'backend'],
  puzzles: ['algorithms', 'backend', 'math', 'python', 'security'],
  social_studies: ['frontend', 'data', 'visualization', 'content'],
};

/**
 * Maps personality types to career path affinity scores (0-1).
 * Keys are career path industries.
 */
export const PERSONALITY_PATH_AFFINITY: Record<string, Record<string, number>> = {
  creative: { web: 0.9, mobile: 0.7, games: 0.9, ai_ml: 0.4, data_science: 0.3, devops: 0.2, cybersecurity: 0.3, embedded: 0.4 },
  analytical: { web: 0.5, mobile: 0.5, games: 0.5, ai_ml: 0.9, data_science: 0.9, devops: 0.6, cybersecurity: 0.8, embedded: 0.7 },
  organizer: { web: 0.5, mobile: 0.5, games: 0.3, ai_ml: 0.4, data_science: 0.6, devops: 0.9, cybersecurity: 0.7, embedded: 0.5 },
  communicator: { web: 0.8, mobile: 0.7, games: 0.5, ai_ml: 0.4, data_science: 0.5, devops: 0.3, cybersecurity: 0.4, embedded: 0.3 },
  builder: { web: 0.7, mobile: 0.8, games: 0.7, ai_ml: 0.6, data_science: 0.4, devops: 0.6, cybersecurity: 0.5, embedded: 0.9 },
};

/**
 * Maps math comfort levels to a numerical score (0-1) used for cognitive/analytical weighting.
 */
export const MATH_COMFORT_MAP: Record<string, number> = {
  love_it: 1.0,
  comfortable: 0.75,
  neutral: 0.5,
  avoid: 0.25,
  struggle: 0.1,
};

/**
 * Maps daily routine to realistic available study minutes per day.
 */
export const DAILY_ROUTINE_MINUTES: Record<string, number> = {
  student_full: 60,
  working_full: 30,
  working_part: 45,
  stay_home: 90,
  busy_parent: 20,
};

/**
 * Background experience -> skill gap multiplier.
 * Higher value = more advanced content appropriate.
 */
export const BACKGROUND_SKILL_MAP: Record<string, number> = {
  never: 0.0,
  tried_once: 0.15,
  some_tutorials: 0.35,
  school_course: 0.55,
  professional: 0.85,
};

/**
 * Time horizon -> maximum viable path hours.
 * Assumes daily commitment average of ~30 mins.
 */
export const TIME_HORIZON_HOURS: Record<string, number> = {
  '1_month': 15,
  '3_months': 45,
  '6_months': 90,
  '1_year': 180,
  no_rush: 9999,
};

/**
 * Adaptive Difficulty Calibration (ADC) constants.
 */
export const ADC = {
  /** Weights for each performance signal */
  weights: {
    recentPerformance: 0.30,
    quizAccuracy: 0.25,
    timeEfficiency: 0.20,
    hintDependency: 0.15,
    retryRate: 0.10,
  },

  /** Number of recent items to consider */
  recentLessonWindow: 10,
  recentQuizWindow: 20,

  /** Difficulty score thresholds */
  thresholds: {
    easy: { min: 0.0, max: 0.3 },
    medium: { min: 0.3, max: 0.6 },
    hard: { min: 0.6, max: 0.85 },
    hardPlus: { min: 0.85, max: 1.0 },
  },

  /** Expected average completion time per lesson (seconds) */
  expectedCompletionTime: 900, // 15 minutes

  /** Minimum data points before calibration is meaningful */
  minimumDataPoints: 3,
} as const;

/**
 * Engagement monitoring thresholds.
 */
export const ENGAGEMENT = {
  /** Days of inactivity before "we miss you" nudge */
  inactivityThresholdDays: 3,

  /** Consecutive quiz failures before difficulty drop */
  failureThreshold: 3,

  /** Consecutive fast completions before difficulty bump */
  fastCompletionThreshold: 3,

  /** % of expected time considered "fast" */
  fastCompletionRatio: 0.5,

  /** % of expected time considered "slow" (struggling) */
  slowCompletionRatio: 2.0,

  /** Minimum lessons skipped to trigger re-evaluation */
  skipThreshold: 3,
} as const;

/**
 * Study plan generation constants.
 */
export const STUDY_PLAN = {
  /** Insert a review session every N days */
  reviewIntervalDays: 5,

  /** Insert a rest day every N days */
  restIntervalDays: 14,

  /** Default daily commitment in minutes */
  defaultDailyMinutes: 30,

  /** Average lesson duration in minutes */
  avgLessonDurationMins: 15,

  /** Review session duration in minutes */
  reviewDurationMins: 10,

  /** Maximum plan length in days */
  maxPlanDays: 365,
} as const;

/**
 * Collaborative filtering constants.
 */
export const COLLABORATIVE = {
  /** Minimum similar users needed for recommendations */
  minSimilarUsers: 5,

  /** Maximum similar users to consider */
  maxSimilarUsers: 50,

  /** Minimum similarity score to consider a user "similar" */
  minSimilarityScore: 0.3,

  /** Features used for user similarity vector */
  features: [
    'skillLevel',
    'industryInterests',
    'completedCourseCount',
    'avgDifficulty',
    'xpRate',
    'streakAvg',
  ] as const,
} as const;
