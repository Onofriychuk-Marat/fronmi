import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ButtonBehaviorCreateDto {
  @IsNumber()
  @ApiProperty()
  nextNumber: number;

  @IsString()
  @ApiProperty()
  text: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  link?: string;
}

export class BehaviorCreateDto {
  @IsNumber()
  @ApiProperty()
  number: number;

  @IsBoolean()
  @ApiProperty()
  isInlineButton: boolean;

  @IsBoolean()
  @ApiProperty()
  isStart: boolean;

  @IsString()
  @ApiProperty()
  message: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ButtonBehaviorCreateDto)
  @ApiProperty({ type: () => [ButtonBehaviorCreateDto] })
  buttons: ButtonBehaviorCreateDto[] = [];
}
