import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: UserDto })
  @ApiOkResponse({ type: AuthResponseDto })
  login(@Body() dto: UserDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @Post('/registration')
  @ApiBody({ type: UserDto })
  @ApiOkResponse({ type: AuthResponseDto })
  registration(@Body() dto: UserDto): Promise<AuthResponseDto> {
    return this.authService.registration(dto);
  }
}
