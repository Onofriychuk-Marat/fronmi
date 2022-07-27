import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from 'src/config';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { ChannelService } from 'src/channel/channel.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  async login(userDto: UserDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByLogin(userDto.login);
    if (!user) {
      throw new HttpException(
        'Не правильный логин!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordCorrect = await compare(userDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(
        'Не правильный пароль!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const token = this.generateJwt(user);
    return user.getAuthResponse(token);
  }

  async registration(newUser: UserDto): Promise<AuthResponseDto> {
    const findedUser = await this.userService.findByLogin(newUser.login);
    if (findedUser) {
      throw new HttpException(
        'Пользователь с таким логином уже есть!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user: UserEntity = await this.userService.create(newUser);
    const token = this.generateJwt(user);
    return user.getAuthResponse(token);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.login,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION },
    );
  }
}
