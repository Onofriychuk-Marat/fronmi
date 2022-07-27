import { ApiProperty } from '@nestjs/swagger';
import { BehaviorResponseDto } from 'src/behavior/dto/behavior-respnse.dto';

export class ItemScenarioResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;
}

export class ScenarioResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ type: () => BehaviorResponseDto })
  startBehavior: BehaviorResponseDto;

  @ApiProperty({ type: () => [BehaviorResponseDto] })
  behaviors: BehaviorResponseDto[];
}
