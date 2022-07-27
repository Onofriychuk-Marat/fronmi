import { ApiProperty } from '@nestjs/swagger';
import { ChannelResponseDto } from 'src/channel/dto/channel-response.dto';

export class UserResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly login: string;

  @ApiProperty({ type: () => [ChannelResponseDto] })
  readonly channels: ChannelResponseDto[];
}
