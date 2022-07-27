import { ApiProperty } from "@nestjs/swagger";

export class StatisticChannelResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  keyApi: string;

  @ApiProperty()
  name: 'telegram' | 'watsapp' | 'vk';
}

export class StatiscticBehaviorResponseDto {
  @ApiProperty()
  startId: number;

  @ApiProperty()
  count: number;
}

export class StatisticUserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  login: string;
}

export class StatisticsResponseDto {
  @ApiProperty()
  isWork: boolean;

  @ApiProperty({ type: () => StatisticChannelResponseDto })
  channel: StatisticChannelResponseDto;

  @ApiProperty({ type: () => StatiscticBehaviorResponseDto })
  behavior: StatiscticBehaviorResponseDto;

  @ApiProperty({ type: () => StatisticUserResponseDto })
  user: StatisticUserResponseDto;
}