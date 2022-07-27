import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty()
  readonly login: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
