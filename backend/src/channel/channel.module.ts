import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TelegramChannel } from 'src/channel/services/telegram';
import { WatsAppChannel } from 'src/channel/services/watsapp';
import { VkChannel } from 'src/channel/services/vk';
import { ChannelEntity } from './channel.entity';
import { ManagerChannel } from 'src/channel/services/manager-channel';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScenarioEntity } from 'src/scenario/scenario.entity';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChannelEntity,
      ScenarioEntity,
      UserEntity
    ]),
  ],
  providers: [ChannelService],
  controllers: [ChannelController],
  exports: [ChannelService]
})
export class ChannelModule {}
