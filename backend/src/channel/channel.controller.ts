import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { ChannelEntity } from './channel.entity';
import { ChannelService } from './channel.service';
import { ChannelCreateDto } from './dto/channel-create.dto';
import {
  ChannelEmptyResponseDto,
  ChannelResponseDto,
} from './dto/channel-response.dto';
import { ChannelPipe } from './pipes/channel.pipe';

@ApiTags('Channels')
@Controller('/channels')
export class ChannelController {
  constructor(private readonly serviceChannel: ChannelService) {}

  @Get()
  @ApiOkResponse({ type: [ChannelEmptyResponseDto] })
  getAll(@User() user: UserEntity): ChannelEmptyResponseDto[] {
    return this.serviceChannel.selectUser(user).getAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: ChannelEmptyResponseDto })
  get(
    @User() user: UserEntity,
    @Param('id', ChannelPipe) channel: ChannelEntity
  ) {
    return this.serviceChannel
      .selectUser(user)
      .selectChannel(channel)
      .get()
  }

  @Post('/:id')
  @ApiBody({ type: ChannelCreateDto })
  @ApiOkResponse({ type: ChannelResponseDto })
  connected(
    @Param('id', ChannelPipe) channel: ChannelEntity,
    @Body() dataChannel: ChannelCreateDto,
    @User() user: UserEntity,
  ): Promise<ChannelResponseDto> {
    return this.serviceChannel
      .selectUser(user)
      .selectChannel(channel)
      .connected(dataChannel);
  }

  @Patch('/:id')
  @ApiBody({ type: ChannelCreateDto })
  @ApiOkResponse({ type: ChannelResponseDto })
  edit(
    @Param('id', ChannelPipe) channel: ChannelEntity,
    @Body() dataChannel: ChannelCreateDto,
    @User() user: UserEntity,
  ): Promise<ChannelResponseDto> {
    return this.serviceChannel
      .selectUser(user)
      .selectChannel(channel)
      .edit(dataChannel);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: ChannelResponseDto })
  disconnect(
    @Param('id', ChannelPipe) channel: ChannelEntity,
    @User() user: UserEntity,
  ): Promise<ChannelResponseDto> {
    return this.serviceChannel
      .selectUser(user)
      .selectChannel(channel)
      .disconnect();
  }
}
