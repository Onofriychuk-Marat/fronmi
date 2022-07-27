import { Injectable } from '@nestjs/common';
import { ChannelService } from 'src/channel/channel.service';
import { StatisticsResponseDto } from './dto/statisctic-response.dto';

@Injectable()
export class StatisticsService {
  constructor(private channelService: ChannelService) {}

  get(): StatisticsResponseDto[] {
    return this.channelService.manager.getStatsctics()
  }
}
