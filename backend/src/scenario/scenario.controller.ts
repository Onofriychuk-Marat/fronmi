import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChannelEntity } from 'src/channel/channel.entity';
import { ChannelPipe } from 'src/channel/pipes/channel.pipe';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { ScenarioCreateDto } from './dto/scenario-create.dto';
import {
  ItemScenarioResponseDto,
  ScenarioResponseDto,
} from './dto/scenario-response.dto';
import { ScenarioPipe } from './pipes/scenario.pipe';
import { ScenarioEntity } from './scenario.entity';
import { ScenarioService } from './scenario.service';

@ApiTags('Scenarios')
@Controller('/scenarios')
export class ScenarioController {
  constructor(private readonly serviceScenario: ScenarioService) {}

  @Get()
  @ApiOkResponse({ type: [ItemScenarioResponseDto] })
  getAll(
    @Query('channelId', ChannelPipe) channel: ChannelEntity,
    @User() user: UserEntity,
  ): ItemScenarioResponseDto[] {
    return this.serviceScenario
      .selectUser(user)
      .selectChannel(channel)
      .getAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: ScenarioResponseDto })
  show(
    @User() user: UserEntity,
    @Param('id', ScenarioPipe) scenario: ScenarioEntity,
  ): ScenarioResponseDto {
    return this.serviceScenario
      .selectUser(user)
      .selectScenario(scenario)
      .get();
  }

  @Post()
  @ApiBody({ type: ScenarioCreateDto })
  @ApiCreatedResponse({ type: ScenarioResponseDto })
  create(
    @Query('channelId', ChannelPipe) channel: ChannelEntity,
    @User() user: UserEntity,
    @Body() newScenario: ScenarioCreateDto,
  ): Promise<ScenarioResponseDto> {
    return this.serviceScenario
      .selectUser(user)
      .selectChannel(channel)
      .create(newScenario);
  }

  @Patch('/:id')
  @ApiBody({ type: ScenarioCreateDto })
  @ApiCreatedResponse({ type: ScenarioResponseDto })
  edit(
    @Param('id', ScenarioPipe) channel: ScenarioEntity,
    @User() user: UserEntity,
    @Body() newScenario: ScenarioCreateDto,
  ): Promise<ScenarioResponseDto> {
    return this.serviceScenario
      .selectUser(user)
      .selectScenario(channel)
      .edit(newScenario);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: ScenarioResponseDto })
  delete(
    @User() user: UserEntity,
    @Param('id', ScenarioPipe) scenario: ScenarioEntity,
  ): Promise<ScenarioResponseDto> {
    return this.serviceScenario
      .selectUser(user)
      .selectScenario(scenario)
      .delete();
  }

  @Post('/:id/activity')
  @ApiOkResponse({ type: ScenarioResponseDto})
  activity(
    @User() user: UserEntity,
    @Param('id', ScenarioPipe) scenario: ScenarioEntity,
  ): Promise<ScenarioResponseDto> {
    return this.serviceScenario
      .selectUser(user)
      .selectScenario(scenario)
      .activity();
  }

  @Delete('/:id/unactivity')
  @ApiOkResponse({ type: ScenarioResponseDto})
  unactivity(
    @User() user: UserEntity,
    @Param('id', ScenarioPipe) scenario: ScenarioEntity,
  ): Promise<ScenarioResponseDto> {
    return this.serviceScenario
      .selectUser(user)
      .selectScenario(scenario)
      .unactivity();
  }
}
