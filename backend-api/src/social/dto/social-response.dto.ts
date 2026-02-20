import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FollowStatusDto {
  @ApiProperty({ example: true })
  isFollowing!: boolean;

  @ApiProperty({ example: false })
  isFollowedBy!: boolean;
}

export class FollowResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty()
  followStatus!: FollowStatusDto;
}

export class UserSummaryDto {
  @ApiProperty({ example: 'clxyz123' })
  userId!: string;

  @ApiProperty({ example: 'johndoe' })
  username!: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  displayName?: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatarUrl?: string | null;

  @ApiProperty({ example: 5 })
  level!: number;

  @ApiProperty({ example: 1200 })
  xpTotal!: number;
}

export class FollowListResponseDto {
  @ApiProperty({ type: [UserSummaryDto] })
  users!: UserSummaryDto[];

  @ApiProperty({ example: 42 })
  total!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;

  @ApiProperty({ example: true })
  has_more!: boolean;
}

export class UserSearchResponseDto {
  @ApiProperty({ type: [UserSummaryDto] })
  users!: UserSummaryDto[];

  @ApiProperty({ example: 10 })
  total!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;

  @ApiProperty({ example: false })
  has_more!: boolean;
}

export class ActivityEntryDto {
  @ApiProperty({ example: 'clxyz456' })
  id!: string;

  @ApiProperty({ example: 'LESSON_COMPLETED' })
  type!: string;

  @ApiPropertyOptional({ example: { lessonTitle: 'Variables 101', xpEarned: 50 } })
  data?: any;

  @ApiProperty()
  user!: UserSummaryDto;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  createdAt!: string;
}

export class ActivityFeedResponseDto {
  @ApiProperty({ type: [ActivityEntryDto] })
  activities!: ActivityEntryDto[];

  @ApiProperty({ example: 100 })
  total!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;

  @ApiProperty({ example: true })
  has_more!: boolean;
}
