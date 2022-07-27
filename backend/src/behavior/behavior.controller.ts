import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ScenarioPipe } from 'src/scenario/pipes/scenario.pipe';
import { ScenarioEntity } from 'src/scenario/scenario.entity';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { BehaviorEntity } from './behavior.enttity';
import { BehaviorService } from './behavior.service';
import { BehaviorCreateDto } from './dto/behavior-create.dto';
import { BehaviorResponseDto } from './dto/behavior-respnse.dto';

@ApiTags('Behavior')
@Controller('/behavior')
export class BehaviorController {
  constructor(private readonly behaviorService: BehaviorService) {}

  @Post()
  @ApiBody({ type: [BehaviorCreateDto] })
  @ApiCreatedResponse({ type: BehaviorResponseDto })
  create(
    @Body(new ParseArrayPipe({ items: BehaviorCreateDto })) newBehaviors: BehaviorCreateDto[],
    @Query('scenarioId', ScenarioPipe) scenario: ScenarioEntity,
    @User() user: UserEntity,
  ): Promise<BehaviorResponseDto[]> {
    return this.behaviorService
      .selectUser(user)
      .selectScenario(scenario)
      .create(newBehaviors);
  }

  @Patch()
  @ApiBody({ type: [BehaviorCreateDto] })
  @ApiOkResponse({ type: BehaviorResponseDto })
  edit(
    @Body(new ParseArrayPipe({ items: BehaviorCreateDto })) newBehaviors: BehaviorCreateDto[],
    @Query('scenarioId', ScenarioPipe) scenario: ScenarioEntity,
    @User() user: UserEntity,
  ): Promise<BehaviorResponseDto[]> {
    return this.behaviorService
      .selectUser(user)
      .selectScenario(scenario)
      .edit(newBehaviors);
  }

  @Delete()
  @ApiOkResponse({ type: [BehaviorResponseDto] })
  delete(
    @Query('scenarioId', ScenarioPipe) scenario: ScenarioEntity,
    @User() user: UserEntity,
  ): Promise<BehaviorResponseDto[]> {
    return this.behaviorService
      .selectUser(user)
      .selectScenario(scenario)
      .delete();
  }

  @Get()
  @ApiOkResponse({ type: [BehaviorResponseDto] })
  getAll(
    @Query('scenarioId', ScenarioPipe) scenario: ScenarioEntity,
    @User() user: UserEntity,
  ): Promise<BehaviorResponseDto[]> {
    return this.behaviorService
      .selectUser(user)
      .selectScenario(scenario)
      .getAll();
  }
}
