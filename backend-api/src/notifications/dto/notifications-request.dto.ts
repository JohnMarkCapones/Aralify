import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DeviceType } from '@prisma/client';

export class SubscribePushDto {
  @ApiProperty({
    example: 'ExponentPushToken[xxxxxx]',
    description: 'Push notification device token',
  })
  @IsString()
  @IsNotEmpty()
  deviceToken!: string;

  @ApiProperty({
    example: 'IOS',
    description: 'Device type (IOS or ANDROID)',
    enum: DeviceType,
  })
  @IsEnum(DeviceType)
  deviceType!: DeviceType;

  @ApiPropertyOptional({
    example: 'device-uuid-123',
    description: 'Optional unique device identifier',
  })
  @IsOptional()
  @IsString()
  deviceId?: string;
}

export class UnsubscribePushDto {
  @ApiProperty({
    example: 'ExponentPushToken[xxxxxx]',
    description: 'Push notification device token to unsubscribe',
  })
  @IsString()
  @IsNotEmpty()
  deviceToken!: string;
}
