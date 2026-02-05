import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser, Public } from '../auth/decorators';
import { SocialService } from './social.service';
import {
  ActivityFeedQueryDto,
  ActivityFeedResponseDto,
  FollowListResponseDto,
  FollowResponseDto,
  FollowStatusDto,
  PaginationQueryDto,
  UserSearchQueryDto,
  UserSearchResponseDto,
} from './dto';

@ApiTags('Social')
@Controller('api/v1/social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  // ── Follow / Unfollow ──────────────────────────────────

  @Post('follow/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Follow a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user to follow' })
  @ApiResponse({ status: 200, description: 'Follow successful', type: FollowResponseDto })
  @ApiResponse({ status: 400, description: 'Cannot follow yourself' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async followUser(
    @Param('userId') targetUserId: string,
    @CurrentUser() user: User,
  ): Promise<FollowResponseDto> {
    return this.socialService.followUser(user.id, targetUserId);
  }

  @Delete('follow/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user to unfollow' })
  @ApiResponse({ status: 200, description: 'Unfollow successful', type: FollowResponseDto })
  async unfollowUser(
    @Param('userId') targetUserId: string,
    @CurrentUser() user: User,
  ): Promise<FollowResponseDto> {
    return this.socialService.unfollowUser(user.id, targetUserId);
  }

  @Get('follow-status/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get follow status with a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user to check status with' })
  @ApiResponse({ status: 200, description: 'Follow status', type: FollowStatusDto })
  async getFollowStatus(
    @Param('userId') targetUserId: string,
    @CurrentUser() user: User,
  ): Promise<FollowStatusDto> {
    return this.socialService.getFollowStatus(user.id, targetUserId);
  }

  // ── Own Followers / Following ──────────────────────────

  @Get('followers')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get authenticated user's followers" })
  @ApiResponse({ status: 200, description: 'Followers list', type: FollowListResponseDto })
  async getFollowers(
    @Query() query: PaginationQueryDto,
    @CurrentUser() user: User,
  ): Promise<FollowListResponseDto> {
    return this.socialService.getFollowers(user.id, query.limit, query.offset);
  }

  @Get('following')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get authenticated user's following" })
  @ApiResponse({ status: 200, description: 'Following list', type: FollowListResponseDto })
  async getFollowing(
    @Query() query: PaginationQueryDto,
    @CurrentUser() user: User,
  ): Promise<FollowListResponseDto> {
    return this.socialService.getFollowing(user.id, query.limit, query.offset);
  }

  // ── Public Followers / Following (privacy-aware) ───────

  @Get('users/:username/followers')
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a user's followers (privacy-aware)" })
  @ApiParam({ name: 'username', description: 'Username of the user' })
  @ApiResponse({ status: 200, description: 'Followers list', type: FollowListResponseDto })
  @ApiResponse({ status: 404, description: 'User not found or not accessible' })
  async getUserFollowers(
    @Param('username') username: string,
    @Query() query: PaginationQueryDto,
    @CurrentUser() user: User | null,
  ): Promise<FollowListResponseDto> {
    return this.socialService.getUserFollowers(
      username,
      user?.id,
      query.limit,
      query.offset,
    );
  }

  @Get('users/:username/following')
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a user's following (privacy-aware)" })
  @ApiParam({ name: 'username', description: 'Username of the user' })
  @ApiResponse({ status: 200, description: 'Following list', type: FollowListResponseDto })
  @ApiResponse({ status: 404, description: 'User not found or not accessible' })
  async getUserFollowing(
    @Param('username') username: string,
    @Query() query: PaginationQueryDto,
    @CurrentUser() user: User | null,
  ): Promise<FollowListResponseDto> {
    return this.socialService.getUserFollowing(
      username,
      user?.id,
      query.limit,
      query.offset,
    );
  }

  // ── Search ─────────────────────────────────────────────

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Search users by username or display name' })
  @ApiResponse({ status: 200, description: 'Search results', type: UserSearchResponseDto })
  async searchUsers(
    @Query() query: UserSearchQueryDto,
  ): Promise<UserSearchResponseDto> {
    return this.socialService.searchUsers(query.q, query.limit, query.offset);
  }

  // ── Activity Feed ──────────────────────────────────────

  @Get('feed')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get activity feed from followed users' })
  @ApiResponse({ status: 200, description: 'Activity feed', type: ActivityFeedResponseDto })
  async getActivityFeed(
    @Query() query: ActivityFeedQueryDto,
    @CurrentUser() user: User,
  ): Promise<ActivityFeedResponseDto> {
    return this.socialService.getActivityFeed(
      user.id,
      query.limit,
      query.offset,
      query.type,
    );
  }

  @Get('users/:username/activity')
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a user's activity timeline (privacy-aware)" })
  @ApiParam({ name: 'username', description: 'Username of the user' })
  @ApiResponse({ status: 200, description: 'Activity timeline', type: ActivityFeedResponseDto })
  @ApiResponse({ status: 404, description: 'User not found or not accessible' })
  async getUserActivity(
    @Param('username') username: string,
    @Query() query: ActivityFeedQueryDto,
    @CurrentUser() user: User | null,
  ): Promise<ActivityFeedResponseDto> {
    return this.socialService.getUserActivity(
      username,
      user?.id,
      query.limit,
      query.offset,
      query.type,
    );
  }
}
