import { HttpException, HttpStatus } from "@nestjs/common";
import { BehaviorCreateDto } from "../dto/behavior-create.dto";

export default function validationBehaviorsForWatsapp(behaviors: BehaviorCreateDto[]) {
  behaviors.forEach((b) => {
    if (b.message.length > 1000) {
      const error = `Максимальное кол-во символов 4096. Ошибка в блоке ${b.number}.`
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (b.isInlineButton) {
      if (b.buttons.length > 3) {
        const error = `Максимальное кол-во inline кнопок 3 шт. Ошибка в блоке ${b.number}.`
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      let countLink = 0
      b.buttons.forEach((button) => {
        if (button.text.length > 20) {
          const error = `Максимальная длина текста в inline кнопке, 20 символов. Ошибка в блоке ${b.number}.`
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
        if (button.link) countLink++;
      })
      if (countLink > 1) {
        const error = `Максимальная количество ссылок в inline кнопке 1. Ошибка в блоке ${b.number}.`
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    } else {
      if (b.buttons.length > 10) {
        const error = `Максимальное кол-во кнопок 10 шт. Ошибка в блоке ${b.number}.`
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      let countLink = 0
      b.buttons.forEach((button) => {
        if (button.text.length > 20) {
          const error = `Максимальная длина текста кнопки, 20 символов. Ошибка в блоке ${b.number}.`
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
        if (button.link) countLink++;
      })
      if (countLink > 0) {
        const error = `Максимальная количество ссылок в кнопке 0. Ошибка в блоке ${b.number}.`
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  })
}
