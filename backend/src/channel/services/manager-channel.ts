import { Injectable } from '@nestjs/common';
import { ChannelEntity } from 'src/channel/channel.entity';
import { StatisticsResponseDto } from 'src/statistics/dto/statisctic-response.dto';
import { Channel } from './channel';
import { TelegramChannel } from './telegram';
import { VkChannel } from './vk';
import { WatsAppChannel } from './watsapp';

@Injectable()
export class ManagerChannel {
  private channels: Map<number, Channel> = new Map<number, Channel>();

  constructor(channelsEntity: ChannelEntity[]) {
    this.set(channelsEntity);
  }

  public set(channelsEntity: ChannelEntity[]) {
    channelsEntity.forEach((c) => {
      this.run(c)
    })
  }

  public update(channelEntity: ChannelEntity) {
    if (this.channels.has(channelEntity.id)) {
      this.remove(channelEntity);
    }
    this.run(channelEntity);
    console.log('update')
  }

  public run(channelEntity: ChannelEntity) {
    if (!this.isCanRun(channelEntity)) {
      return;
    }
    if (this.channels.has(channelEntity.id)) {
      return;
    }
    const channel = this.getServiceChannel(channelEntity);
    this.channels.set(channelEntity.id, channel);
    channel.start();
    console.log('run')
  }

  private isCanRun(channelEntity: ChannelEntity) {
    if (!(channelEntity.scenarios || []).length) {
      return false;
    }
    const activeScenario = (channelEntity.scenarios).find((s) => {
      return s.isActive
    })
    if (!activeScenario) {
      return false;
    }
    const startBehavior = activeScenario.behaviors.find((b) => {
      return b.isStart
    })
    if (!startBehavior) {
      return false;
    }
    return true;
  }

  public stop(entity: ChannelEntity) {
    this.stopById(entity.id);
  }

  public stopById(idChannel: number) {
    const channel = this.channels.get(idChannel);
    if (!channel) return;
    console.log('stop')
    channel.stop();
  }
  public remove(entity: ChannelEntity) {
    this.removeById(entity.id);
  }

  public removeById(idChannel: number) {
    this.stopById(idChannel);
    this.channels.delete(idChannel);
  }

  public stopAll() {
    for (const id of this.channels.keys()) {
      this.stopById(id);
    }
  }

  public getStatsctics(): StatisticsResponseDto[] {
    const statistics = []

    for (let channel of this.channels.values()) {
      statistics.push(channel.getStatistic());
    }
    return statistics;
  }

  private getServicesChannel(channelsEntity: ChannelEntity[]) {
    return channelsEntity.map((c) => {
      return this.getServiceChannel(c);
    })
  }

  private getServiceChannel(channelEntity: ChannelEntity) {
    switch (channelEntity.name) {
      case 'telegram':
        return new TelegramChannel(channelEntity);
      case 'watsapp':
        return new WatsAppChannel(channelEntity);
      case 'vk':
        return new VkChannel(channelEntity);
    }
  }
}
