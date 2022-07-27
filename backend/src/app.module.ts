import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { ScenarioController } from './scenario/scenario.controller';
import { ScenarioModule } from './scenario/scenario.module';
import { BehaviorService } from './behavior/behavior.service';
import { BehaviorController } from './behavior/behavior.controller';
import { BehaviorModule } from './behavior/behavior.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StatisticsController } from './statistics/statistics.controller';
import { StatisticsService } from './statistics/statistics.service';
import { StatisticsModule } from './statistics/statistics.module';
import { ormconfig } from './config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true
    }),
    AuthModule,
    UserModule,
    ChannelModule,
    ScenarioModule,
    BehaviorModule,
    StatisticsModule,
  ],
  controllers: [AppController, StatisticsController],
  providers: [AppService, StatisticsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/login', method: RequestMethod.POST },
        { path: '/registration', method: RequestMethod.DELETE },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
    // consumer
    //   .apply(UpdateTokenMiddleware)
    //   .exclude(
    //     { path: '/login', method: RequestMethod.POST },
    //     { path: '/registration', method: RequestMethod.POST },
    //     { path: '/logout', method: RequestMethod.DELETE },
    //   )
    //   .forRoutes({
    //     path: '*',
    //     method: RequestMethod.ALL,
    //   });
  }
}
