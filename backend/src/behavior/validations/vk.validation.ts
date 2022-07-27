import { HttpException, HttpStatus } from "@nestjs/common";
import { BehaviorCreateDto } from "../dto/behavior-create.dto";

export default function validationBehaviorsForVk(behaviors: BehaviorCreateDto[]) {
  behaviors.forEach((b) => {
    if (b.message.length > 4096) {
      const error = `Максимальное кол-во символов 4096. Ошибка в блоке ${b.number}.`
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (b.isInlineButton) {
      if (b.buttons.length > 10) {
        const error = `Максимальное кол-во кнопок, 10 шт. Ошибка в блоке ${b.number}.`
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    } else {
      if (b.buttons.length > 40) {
        const error = `Максимальное кол-во кнопок, 40 шт. Ошибока в блоке ${b.number}.`
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  })
}
