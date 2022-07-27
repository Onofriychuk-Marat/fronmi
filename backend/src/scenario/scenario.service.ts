import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BehaviorEntity } from 'src/behavior/behavior.enttity';
import { ChannelEntity } from 'src/channel/channel.entity';
import { ChannelService } from 'src/channel/channel.service';
import { UseIfHave } from 'src/decorators/use-if-have';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ScenarioCreateDto } from './dto/scenario-create.dto';
import {
  ItemScenarioResponseDto,
  ScenarioResponseDto,
} from './dto/scenario-response.dto';
import { ScenarioEntity } from './scenario.entity';

@Injectable()
export class ScenarioService {
  user: UserEntity;
  channel: ChannelEntity;
  scenario: ScenarioEntity;

  constructor(
    @InjectRepository(ScenarioEntity)
    private readonly respository: Repository<ScenarioEntity>,
    private readonly channelService: ChannelService,
  ) {}

  selectUser(user: UserEntity): ScenarioService {
    this.user = user;
    return this;
  }

  selectChannel(channel: ChannelEntity): ScenarioService {
    this.channel = channel;
    return this;
  }

  selectScenario(scenario: ScenarioEntity): ScenarioService {
    this.scenario = scenario;
    return this;
  }

  findById(id: number): Promise<ScenarioEntity> {
    return this.respository.findOne({
      where: { id },
    });
  }

  @UseIfHave(['user', 'channel'])
  getAll(): ItemScenarioResponseDto[] {
    this.channelService.checkUserHaveChannel(this.user, this.channel);
    return this.channel.scenarios.map((s) => s.getItemResponse());
  }

  @UseIfHave(['user', 'scenario'])
  get(): ScenarioResponseDto {
    // this.channelService.checkUserHaveChannel(this.user, this.channel);
    // this.checkScenario(this.channel, this.scenario);
    return this.scenario.getResponse();
  }

  @UseIfHave(['user', 'channel'])
  async create(newScenario: ScenarioCreateDto): Promise<ScenarioResponseDto> {
    this.channelService.checkUserHaveChannel(this.user, this.channel);
    const isHave = Boolean(this.channel.scenarios.find((s) => s.name === newScenario.name))
    if (isHave) {
      const error = 'Сценарий с таким именем уже есть!';
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    const scenario = new ScenarioEntity();
    Object.assign(scenario, newScenario);
    if (!scenario.isActive) scenario.isActive = false;
    if (!scenario.behaviors) scenario.behaviors = []
    const createdScenario = await this.respository.save(scenario);
    await this.channelService.addScenario(this.channel, createdScenario)
    return scenario.getResponse();
  }

  @UseIfHave(['user', 'scenario'])
  async edit(newScenario: ScenarioCreateDto): Promise<ScenarioResponseDto> {
    const channel = await this.channelService.findById(this.scenario.channelId)
    const isHave = Boolean(channel.scenarios.find((s) => s.name === newScenario.name))
    if (isHave) {
      const error = 'Сценарий с таким именем уже есть!';
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    Object.assign(this.scenario, newScenario);
    const updatedScenario = await this.respository.save(this.scenario);
    return updatedScenario.getResponse();
  }

  @UseIfHave(['user', 'scenario'])
  async delete(): Promise<ScenarioResponseDto> {
    // this.channelService.checkUserHaveChannel(this.user, this.channel);
    // this.checkScenario(this.channel, this.scenario);
    const channel = await this.channelService.findById(this.scenario.channelId)

    const answer = this.scenario.getResponse();
    await this.respository.delete(this.scenario.id);
    return answer;
  }

  @UseIfHave(['user', 'scenario'])
  async activity(): Promise<ScenarioResponseDto> {
    let channel = await this.channelService.findById(this.scenario.channelId)
    for (const s of channel.scenarios) {
      if (s.isActive && s.id !== this.scenario.id) {
        s.isActive = false;
        await this.respository.save(s);
      }
    }
    this.scenario.isActive = true;
    await this.respository.save(this.scenario);
    channel = await this.channelService.findById(this.scenario.channelId)
    try {
      this.channelService.manager.update(channel);
    } catch {
      const error = 'Не удалось запустить канал! Проверьте настройки!';
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return this.scenario.getResponse();
  }

  @UseIfHave(['user', 'scenario'])
  async unactivity(): Promise<ScenarioResponseDto> {
    this.scenario.isActive = false;
    this.respository.save(this.scenario);
    const channel = await this.channelService.findById(this.scenario.channelId)
    this.channelService.manager.stop(channel);
    return this.scenario.getResponse();
  }

  async setBehaviour(scenario: ScenarioEntity, behaviors: BehaviorEntity[]) {
    scenario.startBehavior = behaviors[0];
    scenario.behaviors = behaviors;
    await this.respository.save(scenario);
  }

  async save(scenario: ScenarioEntity) {
    await this.respository.save(scenario);
  }

  checkScenario(channel: ChannelEntity, scenario: ScenarioEntity) {
    if (!this.isChannelHave(channel, scenario)) {
      const error = 'Выбранный канал не содержит этот сценарий!';
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  isChannelHave(channel: ChannelEntity, scenario: ScenarioEntity): boolean {
    const findedScenario = channel.scenarios.find((s) => s.id === scenario.id);
    return Boolean(findedScenario);
  }
}
