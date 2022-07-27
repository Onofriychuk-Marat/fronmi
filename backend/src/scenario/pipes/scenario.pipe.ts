import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ScenarioEntity } from '../scenario.entity';
import { ScenarioService } from '../scenario.service';

@Injectable()
export class ScenarioPipe implements PipeTransform {
  constructor(private readonly scenarioService: ScenarioService) {}

  async transform(value: any): Promise<ScenarioEntity> {
    if (Number(value) === NaN) {
      throw new HttpException('Id is not number!', HttpStatus.BAD_REQUEST);
    }
    const scenario = await this.scenarioService.findById(value);
    if (!scenario) {
      throw new HttpException('Not finded scenario!', HttpStatus.NOT_FOUND);
    }
    return scenario;
  }
}
