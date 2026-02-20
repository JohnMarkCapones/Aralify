import {
  Controller,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators';
import { CodeExecutionService } from './services';
import { ExecuteCodeDto, SubmitCodeDto } from './dto';
import { ExecutionResultDto, SubmissionResultDto } from './dto';

@ApiTags('Code Execution')
@Controller('api/v1/challenges')
@ApiBearerAuth()
export class CodeExecutionController {
  constructor(
    private readonly codeExecutionService: CodeExecutionService,
  ) {}

  @Post(':id/execute')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({
    summary: 'Test run code against challenge test cases',
    description:
      'Executes code against all test cases without saving. No XP is awarded.',
  })
  @ApiParam({
    name: 'id',
    example: 'clx1234567890',
    description: 'Challenge ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Code execution results with per-test-case pass/fail',
    type: ExecutionResultDto,
  })
  @ApiResponse({ status: 404, description: 'Challenge not found' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  @ApiResponse({
    status: 503,
    description: 'Code execution service unavailable',
  })
  async executeTestRun(
    @Param('id') challengeId: string,
    @CurrentUser() user: User,
    @Body() dto: ExecuteCodeDto,
  ): Promise<ExecutionResultDto> {
    return this.codeExecutionService.executeTestRun(
      challengeId,
      user.id,
      dto.code,
      dto.languageId,
    );
  }

  @Post(':id/submit')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiOperation({
    summary: 'Submit solution for a challenge',
    description:
      'Executes code, saves the submission, and awards XP if all test cases pass.',
  })
  @ApiParam({
    name: 'id',
    example: 'clx1234567890',
    description: 'Challenge ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'Submission result with test results, XP earned, and gamification data',
    type: SubmissionResultDto,
  })
  @ApiResponse({ status: 404, description: 'Challenge not found' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  @ApiResponse({
    status: 503,
    description: 'Code execution service unavailable',
  })
  async submitSolution(
    @Param('id') challengeId: string,
    @CurrentUser() user: User,
    @Body() dto: SubmitCodeDto,
  ): Promise<SubmissionResultDto> {
    return this.codeExecutionService.submitSolution(
      challengeId,
      user.id,
      dto.code,
      dto.languageId,
      dto.timeSpentSeconds,
    );
  }
}
