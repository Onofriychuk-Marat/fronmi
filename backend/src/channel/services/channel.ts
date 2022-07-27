import { ButtonBehaviorEntity } from 'src/behavior/behavior-button.entity';
import { BehaviorEntity } from 'src/behavior/behavior.enttity';
import { ChannelEntity } from 'src/channel/channel.entity';
import { StatisticsResponseDto } from 'src/statistics/dto/statisctic-response.dto';

export abstract class Channel {
  protected behaviors: BehaviorEntity[];
  protected startBehavior: BehaviorEntity;
  protected channelEntity: ChannelEntity;
  public isWork: boolean = false;

  constructor(channel: ChannelEntity) {
    this.channelEntity = channel;
    const activeScenario = (this.channelEntity.scenarios).find((s) => {
      return s.isActive
    })
    this.startBehavior = activeScenario.behaviors.find((b) => {
      return b.isStart
    })
    this.behaviors = activeScenario.behaviors
  }

  get entity(): ChannelEntity {
    return this.channelEntity;
  }

  public start(): void {
    if (!this.startBehavior) return;

    this.isWork = true;
  }

  public stop(): void {
    if (!this.startBehavior) return;
  
    this.isWork = false;
  }
  public getStatistic(): StatisticsResponseDto {
    return {
      isWork: this.isWork,
      channel: {
        id: this.channelEntity.id,
        keyApi: this.channelEntity.keyApi,
        name: this.channelEntity.name,
      },
      behavior: {
        startId: this.startBehavior.id,
        count: this.behaviors.length
      },
      user: {
        id: this.channelEntity.user.id,
        login: this.channelEntity.user.login
      }
    }
  }

  protected abstract getPayload(behavior: BehaviorEntity): any;
  protected abstract getButtonsInline(buttons: ButtonBehaviorEntity[]): any;
  protected abstract getButtonsKeyboard(buttons: ButtonBehaviorEntity[]): any;

  protected getStartBehavior(): BehaviorEntity {
    if (this.startBehavior) {
      return this.startBehavior;
    }
    const startBehavior = this.behaviors.find((b) => {
      return b.isStart;
    })
    if (startBehavior) {
      return startBehavior;
    }
    throw new Error('Scenario doesn^t has startBehavior!');
  }

  protected getBehavior(nextNumber: number): BehaviorEntity {
    const nextBehavior = this.behaviors.find((b) => {
      return b.number == nextNumber
    })
    if (nextBehavior) {
      return nextBehavior;
    }
    throw new Error(`Not finded behavior with ${nextNumber} id`)
  }
}
