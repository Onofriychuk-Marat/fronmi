import { Module } from '@nestjs/common';
import { ChannelModule } from 'src/channel/channel.module';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [ChannelModule],
  providers: [StatisticsService],
})
export class StatisticsModule {}
