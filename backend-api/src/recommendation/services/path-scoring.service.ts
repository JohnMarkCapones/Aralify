import { Injectable, Logger } from '@nestjs/common';
import { RecommendationRepository } from '../recommendation.repository';
import {
  SCORING_WEIGHTS,
  MOTIVATION_OUTCOME_MAP,
  INDUSTRY_TAG_MAP,
  DREAM_PROJECT_TAG_MAP,
  SUBJECT_TAG_MAP,
  PERSONALITY_PATH_AFFINITY,
  MATH_COMFORT_MAP,
  DAILY_ROUTINE_MINUTES,
  BACKGROUND_SKILL_MAP,
  TIME_HORIZON_HOURS,
} from '../constants/scoring.constants';

interface UserProfile {
  motivation: string[];
  dreamProject: string[];
  subjectInterests: string[];
  personalityType: string | null;
  industryInterests: string[];
  mathComfort: string | null;
  dailyRoutine: string | null;
  background: string;
  timeHorizon: string;
  analyticalScore: number;
  contextProfile: string;
}

interface CareerPathData {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string | null;
  industry: string;
  estimatedHours: number;
  marketDemand: number;
  salaryImpact: number;
  analyticalReq: number;
  outcomes: any;
  tags: any;
  color?: string | null;
  iconUrl?: string | null;
  _count?: { nodes: number; enrollments: number };
}

interface ScoreBreakdown {
  interestAlignment: number;
  goalAlignment: number;
  dreamProjectAlignment: number;
  personalityFit: number;
  skillGap: number;
  timeViability: number;
  marketDemand: number;
  communityPopularity: number;
  cognitiveMatch: number;
}

interface ScoredPath {
  path: CareerPathData;
  score: number;
  breakdown: ScoreBreakdown;
  rank: number;
}

/**
 * Layer 3: Path Scoring Algorithm
 *
 * Implements the multi-factor weighted scoring formula for career path recommendations.
 * Each sub-score is normalized to [0, 1] and combined with configurable weights.
 *
 * PathScore(user, path) =
 *   w1 * InterestAlignment       — cosine similarity between user interests and path tags
 *   w2 * GoalAlignment           — motivation-to-outcome mapping score
 *   w3 * DreamProjectAlignment   — dream project tags vs path tags
 *   w4 * PersonalityFit          — personality type affinity for path industry
 *   w5 * SkillGap                — experience level fit for path difficulty
 *   w6 * TimeViability           — can user complete path in their timeframe?
 *   w7 * MarketDemand            — job market demand signal
 *   w8 * CommunityPopularity     — Bayesian enrollment/completion rate
 *   w9 * CognitiveMatch          — analytical ability vs path requirements
 */
@Injectable()
export class PathScoringService {
  private readonly logger = new Logger(PathScoringService.name);

  constructor(private readonly repository: RecommendationRepository) {}

  /**
   * Score all published career paths for a user and return ranked results.
   */
  async scorePathsForUser(userId: string): Promise<ScoredPath[]> {
    const profile = await this.repository.getLearningProfile(userId);
    if (!profile) {
      throw new Error('User learning profile not found. Complete assessment first.');
    }

    const careerPaths = await this.repository.findAllCareerPaths({ isPublished: true });

    const userProfile: UserProfile = {
      motivation: (profile.motivation as string[]) || [],
      dreamProject: (profile.dreamProject as string[]) || [],
      subjectInterests: (profile.subjectInterests as string[]) || [],
      personalityType: profile.personalityType || null,
      industryInterests: (profile.industryInterests as string[]) || [],
      mathComfort: profile.mathComfort || null,
      dailyRoutine: profile.dailyRoutine || null,
      background: profile.background || 'never',
      timeHorizon: profile.timeHorizon || 'no_rush',
      analyticalScore: profile.analyticalScore,
      contextProfile: profile.contextProfile || 'student_college',
    };

    const scored = await Promise.all(
      careerPaths.map(async (path: any) => {
        const breakdown = await this.calculateScoreBreakdown(userProfile, path);
        const totalScore = this.calculateTotalScore(breakdown);

        return {
          path,
          score: Math.min(1, Math.max(0, totalScore)),
          breakdown,
          rank: 0,
        };
      }),
    );

    scored.sort((a: any, b: any) => b.score - a.score);
    scored.forEach((item: any, index: number) => {
      item.rank = index + 1;
    });

    this.logger.log(
      `Scored ${scored.length} paths for user ${userId}. Top: ${scored[0]?.path.slug} (${scored[0]?.score.toFixed(3)})`,
    );

    return scored;
  }

  /**
   * Score all published career paths using a transient profile (for guest users).
   */
  async scorePathsForProfile(profile: any): Promise<ScoredPath[]> {
    const careerPaths = await this.repository.findAllCareerPaths({ isPublished: true });

    const userProfile: UserProfile = {
      motivation: (profile.motivation as string[]) || [],
      dreamProject: (profile.dreamProject as string[]) || [],
      subjectInterests: (profile.subjectInterests as string[]) || [],
      personalityType: profile.personalityType || null,
      industryInterests: (profile.industryInterests as string[]) || [],
      mathComfort: profile.mathComfort || null,
      dailyRoutine: profile.dailyRoutine || null,
      background: profile.background || 'never',
      timeHorizon: profile.timeHorizon || 'no_rush',
      analyticalScore: profile.analyticalScore,
      contextProfile: profile.contextProfile || 'student_college',
    };

    const scored = await Promise.all(
      careerPaths.map(async (path: any) => {
        const breakdown = await this.calculateScoreBreakdown(userProfile, path);
        const totalScore = this.calculateTotalScore(breakdown);

        return {
          path,
          score: Math.min(1, Math.max(0, totalScore)),
          breakdown,
          rank: 0,
        };
      }),
    );

    scored.sort((a: any, b: any) => b.score - a.score);
    scored.forEach((item: any, index: number) => {
      item.rank = index + 1;
    });

    this.logger.log(
      `Scored ${scored.length} paths for guest profile. Top: ${scored[0]?.path.slug} (${scored[0]?.score.toFixed(3)})`,
    );

    return scored;
  }

  /**
   * Store scored recommendations in the database.
   */
  async persistRecommendations(userId: string, scoredPaths: ScoredPath[]) {
    await this.repository.clearExpiredRecommendations(userId);

    const recommendations = scoredPaths.slice(0, 5).map((sp) => ({
      userId,
      type: 'CAREER_PATH' as const,
      targetId: sp.path.id,
      score: sp.score,
      reasoning: sp.breakdown as any,
      rank: sp.rank,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }));

    await this.repository.createRecommendations(recommendations);
    return recommendations;
  }

  // ========================================================================
  // Score aggregation
  // ========================================================================

  private calculateTotalScore(breakdown: ScoreBreakdown): number {
    return (
      SCORING_WEIGHTS.interestAlignment * breakdown.interestAlignment +
      SCORING_WEIGHTS.goalAlignment * breakdown.goalAlignment +
      SCORING_WEIGHTS.dreamProjectAlignment * breakdown.dreamProjectAlignment +
      SCORING_WEIGHTS.personalityFit * breakdown.personalityFit +
      SCORING_WEIGHTS.skillGap * breakdown.skillGap +
      SCORING_WEIGHTS.timeViability * breakdown.timeViability +
      SCORING_WEIGHTS.marketDemand * breakdown.marketDemand +
      SCORING_WEIGHTS.communityPopularity * breakdown.communityPopularity +
      SCORING_WEIGHTS.cognitiveMatch * breakdown.cognitiveMatch
    );
  }

  // ========================================================================
  // Sub-score calculations
  // ========================================================================

  private async calculateScoreBreakdown(
    user: UserProfile,
    path: CareerPathData,
  ): Promise<ScoreBreakdown> {
    return {
      interestAlignment: this.calcInterestAlignment(user, path),
      goalAlignment: this.calcGoalAlignment(user, path),
      dreamProjectAlignment: this.calcDreamProjectAlignment(user, path),
      personalityFit: this.calcPersonalityFit(user, path),
      skillGap: this.calcSkillGap(user, path),
      timeViability: this.calcTimeViability(user, path),
      marketDemand: this.calcMarketDemand(path),
      communityPopularity: await this.calcCommunityPopularity(path),
      cognitiveMatch: this.calcCognitiveMatch(user, path),
    };
  }

  /**
   * Cosine similarity between user's interest vector and path's tag vector.
   * Merges industry interests + subject interests into the user tag set.
   */
  private calcInterestAlignment(user: UserProfile, path: CareerPathData): number {
    const userTags = new Set<string>();

    // Expand industry interests into tags
    for (const interest of user.industryInterests) {
      const tags = INDUSTRY_TAG_MAP[interest];
      if (tags) tags.forEach((t) => userTags.add(t));
    }

    // Merge subject interest tags
    for (const subject of user.subjectInterests) {
      const tags = SUBJECT_TAG_MAP[subject];
      if (tags) tags.forEach((t) => userTags.add(t));
    }

    const pathTags = new Set<string>();
    const rawTags = (path.tags as string[]) || [];
    rawTags.forEach((t) => pathTags.add(t));
    pathTags.add(path.industry);

    if (userTags.size === 0 || pathTags.size === 0) return 0.5;

    // Cosine similarity (binary vectors)
    const allTags = new Set([...userTags, ...pathTags]);
    let dotProduct = 0;
    let userMag = 0;
    let pathMag = 0;

    for (const tag of allTags) {
      const uVal = userTags.has(tag) ? 1 : 0;
      const pVal = pathTags.has(tag) ? 1 : 0;
      dotProduct += uVal * pVal;
      userMag += uVal * uVal;
      pathMag += pVal * pVal;
    }

    const magnitude = Math.sqrt(userMag) * Math.sqrt(pathMag);
    return magnitude > 0 ? dotProduct / magnitude : 0;
  }

  /**
   * Score how well user's motivations align with the path's outcomes.
   */
  private calcGoalAlignment(user: UserProfile, path: CareerPathData): number {
    const pathOutcomes = (path.outcomes as string[]) || [];
    if (user.motivation.length === 0 || pathOutcomes.length === 0) return 0.5;

    let totalScore = 0;
    let maxPossible = 0;

    for (const motivation of user.motivation) {
      const outcomeWeights = MOTIVATION_OUTCOME_MAP[motivation];
      if (!outcomeWeights) continue;

      for (const outcome of pathOutcomes) {
        const weight = outcomeWeights[outcome] || 0;
        totalScore += weight;
      }

      maxPossible += Object.values(outcomeWeights).reduce((a, b) => a + b, 0);
    }

    return maxPossible > 0 ? Math.min(1, totalScore / maxPossible) : 0.5;
  }

  /**
   * Cosine similarity between user's dream project tags and path's tags.
   */
  private calcDreamProjectAlignment(user: UserProfile, path: CareerPathData): number {
    if (user.dreamProject.length === 0) return 0.5; // neutral if not answered

    const userTags = new Set<string>();
    for (const project of user.dreamProject) {
      const tags = DREAM_PROJECT_TAG_MAP[project];
      if (tags) tags.forEach((t) => userTags.add(t));
    }

    const pathTags = new Set<string>();
    const rawTags = (path.tags as string[]) || [];
    rawTags.forEach((t) => pathTags.add(t));
    pathTags.add(path.industry);

    if (userTags.size === 0 || pathTags.size === 0) return 0.5;

    const allTags = new Set([...userTags, ...pathTags]);
    let dotProduct = 0;
    let userMag = 0;
    let pathMag = 0;

    for (const tag of allTags) {
      const uVal = userTags.has(tag) ? 1 : 0;
      const pVal = pathTags.has(tag) ? 1 : 0;
      dotProduct += uVal * pVal;
      userMag += uVal * uVal;
      pathMag += pVal * pVal;
    }

    const magnitude = Math.sqrt(userMag) * Math.sqrt(pathMag);
    return magnitude > 0 ? dotProduct / magnitude : 0;
  }

  /**
   * Personality-to-path affinity scoring.
   * Returns the affinity score for the user's personality type and the path's industry.
   */
  private calcPersonalityFit(user: UserProfile, path: CareerPathData): number {
    if (!user.personalityType) return 0.5; // neutral if not answered

    const affinities = PERSONALITY_PATH_AFFINITY[user.personalityType];
    if (!affinities) return 0.5;

    return affinities[path.industry] ?? 0.5;
  }

  /**
   * Skill gap scoring — measures how appropriate the path difficulty is for the user.
   */
  private calcSkillGap(user: UserProfile, path: CareerPathData): number {
    const userSkill = BACKGROUND_SKILL_MAP[user.background] ?? 0;
    const pathDifficulty = path.analyticalReq / 100;

    const optimalSkill = pathDifficulty * 0.8;
    const diff = Math.abs(userSkill - optimalSkill);

    const sigma = 0.4;
    return Math.exp(-(diff * diff) / (2 * sigma * sigma));
  }

  /**
   * Time viability — sigmoid function scoring whether path fits user's timeline.
   * Enhanced: uses daily routine minutes when available to better estimate available hours.
   */
  private calcTimeViability(user: UserProfile, path: CareerPathData): number {
    let availableHours = TIME_HORIZON_HOURS[user.timeHorizon] ?? 9999;

    // If daily routine is specified, recalculate available hours more accurately
    if (user.dailyRoutine) {
      const dailyMins = DAILY_ROUTINE_MINUTES[user.dailyRoutine] ?? 30;
      const horizonDays: Record<string, number> = {
        '1_month': 30,
        '3_months': 90,
        '6_months': 180,
        '1_year': 365,
        no_rush: 9999,
      };
      const days = horizonDays[user.timeHorizon] ?? 9999;
      const routineHours = (dailyMins * days) / 60;
      // Use the more constrained estimate
      availableHours = Math.min(availableHours, routineHours);
    }

    const pathHours = path.estimatedHours;

    if (pathHours <= availableHours) return 1.0;

    const ratio = pathHours / availableHours;
    return 1 / (1 + Math.exp(3 * (ratio - 1.5)));
  }

  /**
   * Market demand — simple normalization of the path's market demand score.
   */
  private calcMarketDemand(path: CareerPathData): number {
    return path.marketDemand / 100;
  }

  /**
   * Community popularity — Bayesian average of enrollment and completion rates.
   */
  private async calcCommunityPopularity(path: CareerPathData): Promise<number> {
    const enrollments = path._count?.enrollments || 0;
    const completionRate = await this.repository.getCareerPathCompletionRate(path.id);

    const priorWeight = 50;
    const globalMeanScore = 0.5;
    const observedScore = completionRate * 0.6 + Math.min(1, enrollments / 100) * 0.4;

    return (priorWeight * globalMeanScore + enrollments * observedScore) /
      (priorWeight + enrollments);
  }

  /**
   * Cognitive match — how well user's analytical ability matches path requirements.
   * Enhanced: factors in math comfort when available.
   */
  private calcCognitiveMatch(user: UserProfile, path: CareerPathData): number {
    let userAnalytical = user.analyticalScore / 100;

    // Blend in math comfort if available
    if (user.mathComfort) {
      const mathScore = MATH_COMFORT_MAP[user.mathComfort] ?? 0.5;
      userAnalytical = userAnalytical * 0.7 + mathScore * 0.3;
    }

    const pathReq = path.analyticalReq / 100;

    const optimalLevel = pathReq * 0.85;
    const diff = Math.abs(userAnalytical - optimalLevel);

    const sigma = 0.35;
    return Math.exp(-(diff * diff) / (2 * sigma * sigma));
  }
}
