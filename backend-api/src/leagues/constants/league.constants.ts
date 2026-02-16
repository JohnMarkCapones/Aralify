import { LeagueTier } from '@prisma/client';

export const LEAGUE_CONFIG = {
  PROMOTION_SLOTS: 10,
  DEMOTION_SLOTS: 5,
  GROUP_SIZE: 30,
} as const;

export const LEAGUE_TIERS = [
  {
    tier: LeagueTier.BRONZE,
    name: 'Bronze League',
    description: 'Starting league for all learners. Keep learning to climb!',
    iconUrl: '/icons/leagues/bronze.svg',
    minRank: 0,
  },
  {
    tier: LeagueTier.SILVER,
    name: 'Silver League',
    description: 'Dedicated learners who show consistent progress.',
    iconUrl: '/icons/leagues/silver.svg',
    minRank: 1,
  },
  {
    tier: LeagueTier.GOLD,
    name: 'Gold League',
    description: 'Skilled learners pushing for excellence.',
    iconUrl: '/icons/leagues/gold.svg',
    minRank: 2,
  },
  {
    tier: LeagueTier.DIAMOND,
    name: 'Diamond League',
    description: 'Elite learners among the top performers.',
    iconUrl: '/icons/leagues/diamond.svg',
    minRank: 3,
  },
  {
    tier: LeagueTier.CHAMPION,
    name: 'Champion League',
    description: 'The best of the best. Legends of Aralify.',
    iconUrl: '/icons/leagues/champion.svg',
    minRank: 4,
  },
] as const;

const TIER_ORDER: LeagueTier[] = [
  LeagueTier.BRONZE,
  LeagueTier.SILVER,
  LeagueTier.GOLD,
  LeagueTier.DIAMOND,
  LeagueTier.CHAMPION,
];

export function getNextTier(tier: LeagueTier): LeagueTier | null {
  const index = TIER_ORDER.indexOf(tier);
  if (index === -1 || index >= TIER_ORDER.length - 1) return null;
  return TIER_ORDER[index + 1];
}

export function getPreviousTier(tier: LeagueTier): LeagueTier | null {
  const index = TIER_ORDER.indexOf(tier);
  if (index <= 0) return null;
  return TIER_ORDER[index - 1];
}

export function getTierIndex(tier: LeagueTier): number {
  return TIER_ORDER.indexOf(tier);
}
