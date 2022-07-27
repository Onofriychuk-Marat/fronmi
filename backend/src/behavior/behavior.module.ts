import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelModule } from 'src/channel/channel.module';
import { ScenarioEntity } from 'src/scenario/scenario.entity';
import { ScenarioModule } from 'src/scenario/scenario.module';
import { ButtonBehaviorEntity } from './behavior-button.entity';
import { BehaviorController } from './behavior.controller';
import { BehaviorEntity } from './behavior.enttity';
import { BehaviorService } from './behavior.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BehaviorEntity,
      ButtonBehaviorEntity,
      ScenarioEntity
    ]),
    ScenarioModule,
    ChannelModule
  ],
  controllers: [BehaviorController],
  providers: [BehaviorService],
  exports: [BehaviorService]
})
export class BehaviorModule {
}
