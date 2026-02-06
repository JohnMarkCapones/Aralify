import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ReportReason } from '@prisma/client';

export class CreateCommentDto {
  @ApiProperty({
    example: 'This lesson was really helpful!',
    description: 'Comment content (max 1000 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content!: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    example: 'Updated comment content',
    description: 'Updated comment content (max 1000 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content!: string;
}

export class CreateReplyDto {
  @ApiProperty({
    example: 'Thanks for sharing!',
    description: 'Reply content (max 1000 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content!: string;
}

export class ReportCommentDto {
  @ApiProperty({
    enum: ReportReason,
    example: ReportReason.SPAM,
    description: 'Reason for reporting the comment',
  })
  @IsEnum(ReportReason)
  reason!: ReportReason;

  @ApiPropertyOptional({
    example: 'This comment contains spam links',
    description: 'Additional details about the report',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  details?: string;
}
