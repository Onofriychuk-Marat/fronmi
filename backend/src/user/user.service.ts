import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { UseIfHave } from 'src/decorators/use-if-have';
import { ChannelService } from 'src/channel/channel.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  user: UserEntity;

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private channelService: ChannelService
  ) {}

  selectUser(user: UserEntity): UserService {
    this.user = user;
    return this;
  }

  @UseIfHave(['user'])
  async show(): Promise<UserResponseDto> {
    return this.user.getResponse();
  }

  @UseIfHave(['user'])
  async edit(editedUser: UserDto): Promise<UserResponseDto> {
    const user = await this.repository.findOne({
      where: { login: editedUser.login },
    });
    if (user && user.id !== this.user.id) {
      throw new HttpException(
        'Пользователь с таким логином уже есть!',
        HttpStatus.BAD_REQUEST,
      );
    }
    Object.assign(this.user, editedUser);
    this.user.password =  await hash(this.user.password, 10);
    this.repository.save(this.user);
    return this.user.getResponse();
  }

  async create(newUser: UserDto): Promise<UserEntity> {
    const user = new UserEntity();
    Object.assign(user, newUser);
    user.channels = await this.channelService.createNewAllChannels();
    await this.repository.save(user);
    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findByLogin(login: string): Promise<UserEntity> {
    return this.repository.findOne({
      where: { login },
    });
  }
}
