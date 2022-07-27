import { ApiProperty } from '@nestjs/swagger';

export class ChannelCreateDto {
  @ApiProperty()
  keyApi: string;
}
