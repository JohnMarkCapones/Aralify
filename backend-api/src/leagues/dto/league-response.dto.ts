import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LeagueGroupEntryDto {
  @ApiProperty({ example: 1 })
  rank!: number;

  @ApiProperty({ example: 'clx1234567890' })
  userId!: string;

  @ApiProperty({ example: 'john_doe' })
  username!: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  displayName!: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
  avatarUrl!: string | null;

  @ApiProperty({ example: 350 })
  weeklyXp!: number;

  @ApiProperty({ example: 12 })
  level!: number;

  @ApiProperty({ example: false })
  isCurrentUser!: boolean;
}

export class UserLeagueInfoDto {
  @ApiProperty({ example: 'GOLD', enum: ['BRONZE', 'SILVER', 'GOLD', 'DIAMOND', 'CHAMPION'] })
  tier!: string;

  @ApiProperty({ example: 'Gold League' })
  name!: string;

  @ApiPropertyOptional({ example: 'Skilled learners pushing for excellence.' })
  description!: string | null;

  @ApiPropertyOptional({ example: '/icons/leagues/gold.svg' })
  iconUrl!: string | null;

  @ApiProperty({ example: 350 })
  weeklyXp!: number;

  @ApiProperty({ example: 5 })
  rankInGroup!: number;

  @ApiProperty({ example: 28 })
  groupSize!: number;

  @ApiProperty({ example: 'grp_abc123' })
  groupId!: string;
}

export class LeagueGroupLeaderboardDto {
  @ApiProperty({ type: [LeagueGroupEntryDto] })
  rankings!: LeagueGroupEntryDto[];

  @ApiProperty({ example: 'GOLD' })
  tier!: string;

  @ApiProperty({ example: 'grp_abc123' })
  groupId!: string;

  @ApiProperty({ example: 5 })
  userRank!: number;
}

export class LeagueHistoryEntryDto {
  @ApiProperty({ example: 'SILVER' })
  fromTier!: string;

  @ApiProperty({ example: 'GOLD' })
  toTier!: string;

  @ApiProperty({ example: 'PROMOTED', enum: ['PROMOTED', 'DEMOTED', 'STAYED'] })
  action!: string;

  @ApiProperty({ example: 3 })
  finalRank!: number;

  @ApiProperty({ example: 450 })
  weeklyXp!: number;

  @ApiProperty()
  weekStart!: string;

  @ApiProperty()
  weekEnd!: string;

  @ApiProperty()
  createdAt!: string;
}

export class LeagueTierInfoDto {
  @ApiProperty({ example: 'GOLD', enum: ['BRONZE', 'SILVER', 'GOLD', 'DIAMOND', 'CHAMPION'] })
  tier!: string;

  @ApiProperty({ example: 'Gold League' })
  name!: string;

  @ApiPropertyOptional({ example: 'Skilled learners pushing for excellence.' })
  description!: string | null;

  @ApiPropertyOptional({ example: '/icons/leagues/gold.svg' })
  iconUrl!: string | null;
}
