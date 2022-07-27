import { ApiProperty } from '@nestjs/swagger';

export class ButtonBehaviorResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nextNumber: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  link?: string;
}

export class BehaviorResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: number;

  @ApiProperty()
  isInlineButton: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: () => [ButtonBehaviorResponseDto] })
  buttons: ButtonBehaviorResponseDto[];
}
