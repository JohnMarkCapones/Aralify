import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength } from 'class-validator';

export class ExecuteCodeDto {
  @ApiProperty({
    example: 'print(input())',
    description: 'Source code to execute',
    maxLength: 10000,
  })
  @IsString()
  @MaxLength(10000)
  code!: string;

  @ApiProperty({
    example: 71,
    description: 'Judge0 language ID (e.g., 71 = Python 3)',
  })
  @IsInt()
  languageId!: number;
}
