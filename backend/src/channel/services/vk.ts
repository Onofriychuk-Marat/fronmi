import { ButtonBehaviorEntity } from 'src/behavior/behavior-button.entity';
import { BehaviorEntity } from 'src/behavior/behavior.enttity';
import { ChannelEntity } from 'src/channel/channel.entity';
import { Channel } from './channel';
import VkBot from 'node-vk-bot-api'
// import Markup from 'node-vk-bot-api/lib/markup'
// import Markup from 'node-vk-bot-api/lib/markup'
const Markup = require('node-vk-bot-api/lib/markup.js')

export class VkChannel extends Channel {
  private bot;
  stateNextButtons= {};

  constructor(entity: ChannelEntity) {
    super(entity);
    
    this.bot = new VkBot({
      token: entity.keyApi
    });

    this.bot.command('/start', (ctx) => {
      const startBehavior = this.getStartBehavior()
      const payload = this.getPayload(startBehavior)
      this.saveNextButtons(ctx, startBehavior);
      ctx.reply(startBehavior.message, null, payload);
    });


    this.bot.use(async (ctx, next) => {
      try {
        const clickedButton = this.getClickedButton(ctx);
        const nextBehavior = this.getBehavior(clickedButton.nextNumber)
        const payload = this.getPayload(nextBehavior)
        this.saveNextButtons(ctx, nextBehavior);
        ctx.reply(nextBehavior.message, null, payload);
      } catch {
        ctx.reply('Мне нечего на это ответить)');
      }
    });
  }

  saveNextButtons(ctx, nextBehavior) {
    const userId = ctx.message.from_id;
    this.stateNextButtons[userId] = nextBehavior.buttons
  }

  getClickedButton(ctx) {
    const userId = ctx.message.from_id;
    const message = JSON.parse(ctx.message.payload)["button"]
    const buttons = this.stateNextButtons[userId]
    return buttons.find((b) => b.text === message)
  }


  start() {
    this.bot.startPolling();
    super.start()
  }

  stop() {
    this.bot.stop()
    super.stop()
  }

  protected getPayload(behavior: BehaviorEntity) {
    if (behavior.isInlineButton) {
      return this.getButtonsInline(behavior.buttons)
    } else {
      return this.getButtonsKeyboard(behavior.buttons)
    }
  }

  protected getButtonsInline(buttons: ButtonBehaviorEntity[]) {
    return Markup.keyboard(buttons.map(b => this.getButtonOrLink(b)))
      .inline()
  }

  protected getButtonsKeyboard(buttons: ButtonBehaviorEntity[]) {
    return Markup.keyboard(buttons.map(b => this.getButtonOrLink(b)))
    .oneTime()
  }

  private getButtonOrLink(button: ButtonBehaviorEntity) {
    if (button.link) {
      return Markup.button({
        action: {
          type: 'open_link',
          link: button.link,
          label: button.text,
          payload: JSON.stringify({
            url: button.link,
          }),
        },
      })
    } else {
      return Markup.button(button.text)
    }
  }
}
