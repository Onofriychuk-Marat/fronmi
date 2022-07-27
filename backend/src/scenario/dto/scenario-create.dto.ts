import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { BehaviorCreateDto } from 'src/behavior/dto/behavior-create.dto';

export class ScenarioCreateDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  isActive: boolean;

  @IsOptional()
  behaviors: BehaviorCreateDto[];
}
