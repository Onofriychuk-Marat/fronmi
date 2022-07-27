import { HttpException, HttpStatus } from "@nestjs/common";
import { BehaviorCreateDto } from "../dto/behavior-create.dto";

export default function validationBehaviorsForTelegram(behaviors: BehaviorCreateDto[]) {
  behaviors.forEach((b) => {
    if (b.message.length > 4096) {
      const error = `Максимальное кол-во символов 4096. Ошибка в блоке ${b.number}.`
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (b.isInlineButton) {
      b.buttons.forEach((button) => {
        if (button.text.length > 64) {
          const error = `Максимальная длина текста в inline кнопке, 64 символов. Ошибка в блоке ${b.number}.`
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
      })
    } else {
      let countLink = 0
      b.buttons.forEach((button) => {
        if (button.link) countLink++;
      })
      if (countLink > 0) {
        const error = `Максимальная количество ссылок в кнопке 0. Ошибка в блоке ${b.number}.`
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  })
}
