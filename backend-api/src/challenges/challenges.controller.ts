import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ChallengesService } from './challenges.service';
import { Public } from '../auth/decorators';
import {
  ChallengeListItemDto,
  DailyChallengeDto,
  ChallengeDetailDto,
  GetChallengesQueryDto,
} from './dto';

@ApiTags('Challenges')
@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'List all code challenges with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of challenges',
    type: [ChallengeListItemDto],
  })
  async findAll(
    @Query() query: GetChallengesQueryDto,
  ): Promise<{ data: ChallengeListItemDto[]; total: number; page: number; limit: number }> {
    return this.challengesService.findAll({
      difficulty: query.difficulty,
      language: query.language,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    });
  }

  @Get('daily')
  @Public()
  @ApiOperation({ summary: "Get today's daily challenge" })
  @ApiResponse({
    status: 200,
    description: 'Returns the daily challenge for today',
    type: DailyChallengeDto,
  })
  @ApiResponse({ status: 404, description: 'No daily challenge set for today' })
  async getDailyChallenge(): Promise<DailyChallengeDto> {
    return this.challengesService.getDailyChallenge();
  }

  @Get(':id/detail')
  @Public()
  @ApiOperation({ summary: 'Get full challenge detail (solution code excluded)' })
  @ApiParam({ name: 'id', example: 'clx1234567890', description: 'Challenge ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns challenge details without solution code',
    type: ChallengeDetailDto,
  })
  @ApiResponse({ status: 404, description: 'Challenge not found' })
  async findById(@Param('id') id: string): Promise<ChallengeDetailDto> {
    return this.challengesService.findById(id);
  }
}
