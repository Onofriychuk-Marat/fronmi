import { Body, Controller, Get, Patch } from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/profile')
  @ApiOkResponse({ type: UserResponseDto })
  show(@User() user: UserEntity): Promise<UserResponseDto> {
    return this.service.selectUser(user).show();
  }

  @Patch('/profile')
  @ApiBody({ type: UserDto })
  @ApiOkResponse({ type: UserResponseDto })
  edit(
    @User() user: UserEntity,
    @Body() newDataUser: UserDto,
  ): Promise<UserResponseDto> {
    return this.service.selectUser(user).edit(newDataUser);
  }
}
