import { ButtonBehaviorEntity } from 'src/behavior/behavior-button.entity';
import { BehaviorEntity } from 'src/behavior/behavior.enttity';
import { ChannelEntity } from 'src/channel/channel.entity';
import { Channel } from './channel';

export class WatsAppChannel extends Channel {
  protected getPayload(behavior: BehaviorEntity) {
    throw new Error('Method not implemented.');
  }
  protected getButtonsInline(buttons: ButtonBehaviorEntity[]) {
    throw new Error('Method not implemented.');
  }
  protected getButtonsKeyboard(buttons: ButtonBehaviorEntity[]) {
    throw new Error('Method not implemented.');
  }
  constructor(entity: ChannelEntity) {
    super(entity);
    //
  }

  start() {
    //
  }

  stop() {
    //
  }
}
