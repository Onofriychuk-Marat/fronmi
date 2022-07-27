import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelService } from 'src/channel/channel.service';
import { UseIfHave } from 'src/decorators/use-if-have';
import { ScenarioEntity } from 'src/scenario/scenario.entity';
import { ScenarioService } from 'src/scenario/scenario.service';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ButtonBehaviorEntity } from './behavior-button.entity';
import { BehaviorEntity } from './behavior.enttity';
import { BehaviorCreateDto, ButtonBehaviorCreateDto } from './dto/behavior-create.dto';
import { BehaviorResponseDto } from './dto/behavior-respnse.dto';
import { validationBehaviorsForTelegram, validationBehaviorsForVk, validationBehaviorsForWatsapp } from './validations';

@Injectable()
export class BehaviorService {
  user: UserEntity;
  scenario: ScenarioEntity;

  constructor(
    @InjectRepository(BehaviorEntity)
    private repositoryBehavior: Repository<BehaviorEntity>,
    @InjectRepository(ButtonBehaviorEntity)
    private respositoryButton: Repository<ButtonBehaviorEntity>,
    private scenarioService: ScenarioService,
    private channelService: ChannelService,
  ) {}

  selectUser(user: UserEntity): BehaviorService {
    this.user = user;
    return this;
  }

  selectScenario(scenario: ScenarioEntity): BehaviorService {
    this.scenario = scenario;
    return this;
  }

  @UseIfHave(['user', 'scenario'])
  async create(
    newBehaviors: BehaviorCreateDto[],
  ): Promise<BehaviorResponseDto[]> {
    this.validationBehaviors(newBehaviors);
    if (this.scenario.behaviors.length) {
      await this.deleteAllForScneario(this.scenario);
    }
    const behaviors: BehaviorEntity[] = [];
    const answer: BehaviorResponseDto[] = [];
    for (const behavior of newBehaviors) {
      let entity = new BehaviorEntity();
      Object.assign(entity, behavior);
      entity.buttons = await this.createButton(behavior.buttons);
      entity = await this.repositoryBehavior.save(entity);
      behaviors.push(entity);
      answer.push(entity.getResponse());
    }
    await this.scenarioService.setBehaviour(this.scenario, behaviors);
    const channel = await this.channelService.findById(this.scenario.channelId)
    this.channelService.manager.update(channel);
    return answer;
  }

  async createButton(newButtons: ButtonBehaviorCreateDto[]): Promise<ButtonBehaviorEntity[]> {
    const buttons: ButtonBehaviorEntity[] = []
    
    for (const button of newButtons) {
      let entity = new ButtonBehaviorEntity()
      Object.assign(entity, button)
      entity = await this.respositoryButton.save(entity);
      buttons.push(entity);
    }
    return buttons;
  }

  @UseIfHave(['user', 'scenario'])
  edit(newBehavior: BehaviorCreateDto[]): Promise<BehaviorResponseDto[]> {
    return this.create(newBehavior);
  }

  @UseIfHave(['user', 'scenario'])
  async delete(): Promise<BehaviorResponseDto[]> {
    const answer = this.scenario.behaviors.map((b) => b.getResponse());
    await this.deleteAllForScneario(this.scenario);
    return answer;
  }

  @UseIfHave(['user', 'scenario'])
  async getAll(): Promise<BehaviorResponseDto[]> {
    return this.scenario.behaviors.map((b) => b.getResponse());;
  }

  @UseIfHave(['scenario'])
  validationBehaviors(newBehaviors: BehaviorCreateDto[]) {
    if (this.scenario.name === 'telegram') {
      validationBehaviorsForTelegram(newBehaviors);
    } else if (this.scenario.name === 'watsapp') {
      validationBehaviorsForWatsapp(newBehaviors);
    } else if (this.scenario.name === 'vk') {
      validationBehaviorsForVk(newBehaviors);
    }
  }

  async deleteAllForScneario(scenario: ScenarioEntity) {
    scenario.behaviors = []
    await this.scenarioService.save(scenario);
    for (const b of scenario.behaviors) {
      await this.repositoryBehavior.delete(b.id);
    }
    await this.scenarioService.save(scenario);
  }
}
