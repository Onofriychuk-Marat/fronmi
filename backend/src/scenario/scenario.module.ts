import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BehaviorEntity } from 'src/behavior/behavior.enttity';
import { ChannelEntity } from 'src/channel/channel.entity';
import { ChannelModule } from 'src/channel/channel.module';
import { ScenarioController } from './scenario.controller';
import { ScenarioEntity } from './scenario.entity';
import { ScenarioService } from './scenario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BehaviorEntity,
      ScenarioEntity,
      ChannelEntity
    ]),
    ChannelModule
  ],
  controllers: [ScenarioController],
  providers: [ScenarioService],
  exports: [ScenarioService]
})
export class ScenarioModule {}
