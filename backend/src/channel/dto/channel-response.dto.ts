import { ApiProperty } from '@nestjs/swagger';
import { ScenarioResponseDto } from 'src/scenario/dto/scenario-response.dto';

export class ChannelResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  keyApi: string;

  @ApiProperty()
  isConnected: boolean;

  @ApiProperty()
  icon: string;

  @ApiProperty({ type: () => [ScenarioResponseDto] })
  scenarios: ScenarioResponseDto[];
}

export class ChannelEmptyResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  isConnected: boolean;
}
