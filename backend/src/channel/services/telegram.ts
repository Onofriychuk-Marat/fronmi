import { ButtonBehaviorEntity } from 'src/behavior/behavior-button.entity';
import { BehaviorEntity } from 'src/behavior/behavior.enttity';
import { ChannelEntity } from 'src/channel/channel.entity';
import { Markup, Telegraf } from 'telegraf';
import { Channel } from './channel';

export class TelegramChannel extends Channel {
  private bot;
  stateNextButtons= {};

  constructor(entity: ChannelEntity) {
    super(entity);
    this.bot = new Telegraf(entity.keyApi);

    this.bot.start((ctx) => {
      const startBehavior = this.getStartBehavior()
      this.saveNextButtons(ctx, startBehavior);
      const payload = this.getPayload(startBehavior)
      ctx.reply(startBehavior.message, payload);
    });

    const handlerAnswer = (ctx) => {
      try {
        const clickedButton = this.getClickedButton(ctx);
        const nextBehavior = this.getBehavior(clickedButton.nextNumber)
        const payload = this.getPayload(nextBehavior)
        this.saveNextButtons(ctx, nextBehavior);
        ctx.reply(nextBehavior.message, payload);
      } catch {
        ctx.reply('Мне нечего на это ответить)');
      }
    }
    this.bot.on('text', handlerAnswer)
    this.bot.on('callback_query', handlerAnswer)
  }

  saveNextButtons(ctx, nextBehavior) {
    const userId = ctx.message?.from?.id || ctx.update.callback_query?.from?.id;
    this.stateNextButtons[userId] = nextBehavior.buttons
  }

  getClickedButton(ctx) {
    const userId = ctx?.message?.from?.id || ctx.update.callback_query?.from?.id;
    const message = ctx?.update?.message?.text || ctx.update.callback_query?.message?.text;
    const buttons = this.stateNextButtons[userId]
    let answer = buttons.find((b) => b.text === message)
    if (!answer) {
      answer = buttons.find((b) => b.nextNumber === Number(ctx.update?.callback_query?.data))
    }
    return answer
  }

  public start() {
    this.bot.launch();
    super.start();
  }

  public stop() {
    this.bot.stop();
    super.stop();
  }

  protected getPayload(behavior: BehaviorEntity) {
    if (behavior.isInlineButton) {
      return Markup.inlineKeyboard(this.getButtonsInline(behavior.buttons))
      
    } else {
      return {
        reply_markup: {
          keyboard: this.getButtonsKeyboard(behavior.buttons),
          one_time_keyboard: true
        }
      }
    }
  }

  protected getButtonsInline(buttons: ButtonBehaviorEntity[]): any[] {
    return buttons.map((b) => {
      if (b.link) {
        return Markup.button.url(b.text, b.link)
      }
      return Markup.button.callback(b.text, String(b.nextNumber))
    })
  }

  protected getButtonsKeyboard(buttons: ButtonBehaviorEntity[]) {
    return buttons.map((b) => {
      return [{ text: b.text, callback_data: b.nextNumber }]
    })
  }
}
