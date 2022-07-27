import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CHANNELS } from 'src/config';
import { UseIfHave } from 'src/decorators/use-if-have';
import { ScenarioEntity } from 'src/scenario/scenario.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ChannelEntity } from './channel.entity';
import { ChannelCreateDto } from './dto/channel-create.dto';
import {
  ChannelEmptyResponseDto,
  ChannelResponseDto,
} from './dto/channel-response.dto';
import { ManagerChannel } from './services/manager-channel';

@Injectable()
export class ChannelService {
  public manager: ManagerChannel;
  private channel: ChannelEntity;
  private user: UserEntity;

  constructor(
    @InjectRepository(ChannelEntity)
    private readonly repository: Repository<ChannelEntity>,
  ) {
    this.setupManager();
  }

  async setupManager() {
    const activeChannels = await this.findAllActive();
    this.manager = new ManagerChannel(activeChannels)
  }

  selectChannel(channel: ChannelEntity): ChannelService {
    this.channel = channel;
    return this;
  }

  selectUser(user: UserEntity): ChannelService {
    this.user = user;
    return this;
  }

  findById(id: number): Promise<ChannelEntity> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findAllActive(): Promise<ChannelEntity[]> {
    return this.repository.find({
      where: { scenarios: { isActive: true } },
    });
  }

  save(channel: ChannelEntity): Promise<ChannelEntity> {
    return this.repository.save(channel);
  }

  @UseIfHave(['user'])
  getAll(): ChannelEmptyResponseDto[] {
    const availableChannels = this.user.channels.filter((channel) => {
      if (CHANNELS.find((c) => c.name === channel.name)) {
        return true;
      } else {
        return false;
      }
    })
    return availableChannels.map((c) => c.getResponse());
  }

  @UseIfHave(['user', 'channel'])
  get(): ChannelEmptyResponseDto {
    return this.channel.getResponse()
  }

  @UseIfHave(['user', 'channel'])
  async connected(
    updatedChannel: ChannelCreateDto,
  ): Promise<ChannelResponseDto> {
    this.checkUserHaveChannel(this.user, this.channel);
    Object.assign(this.channel, updatedChannel);
    this.channel.isConnected = true;
    await this.repository.save(this.channel);
    return this.channel.getResponse();
  }

  @UseIfHave(['user', 'channel'])
  async edit(updatedChannel: ChannelCreateDto): Promise<ChannelResponseDto> {
    await this.checkFronmiHaveKeyChannel(updatedChannel.keyApi);
    this.checkUserHaveChannel(this.user, this.channel);
    Object.assign(this.channel, updatedChannel);
    await this.repository.save(this.channel);
    return this.channel.getResponse();
  }

  async checkFronmiHaveKeyChannel(keyApi: string) {
    const channel = await this.repository.findOne({
      where: { keyApi }
    })
    if (channel) {
      const error = 'Данный ключ api уже занят!';
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseIfHave(['user', 'channel'])
  async disconnect(): Promise<ChannelResponseDto> {
    this.checkUserHaveChannel(this.user, this.channel);
    this.channel.isConnected = false;
    this.channel.scenarios = this.channel.scenarios.map((s) => {
      s.isActive = false
      return s;
    })
    await this.repository.save(this.channel);
    this.manager.remove(this.channel);
    return this.channel.getResponse();
  }

  checkUserHaveChannel(user: UserEntity, channel: ChannelEntity) {
    const channelUser = user.channels.find((c) => c.id === channel.id);
    if (!channelUser) {
      const error = 'Пользователь не подключен к каналу!';
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async addScenario(channel: ChannelEntity, scenario: ScenarioEntity) {
    channel.scenarios.push(scenario);
    await this.repository.save(channel);
  }

  async createNewAllChannels(): Promise<ChannelEntity[]> {
    const channelsEntity = []
    for (const channel of CHANNELS) {
      const entity = new ChannelEntity()
      Object.assign(entity, {
        ...channel,
        keyApi: '',
        isConnected: false,
        isActive: false,
        scenarios: [],
      })
      await this.repository.save(entity)
      channelsEntity.push(entity)
    }
    return channelsEntity;
  }
}
