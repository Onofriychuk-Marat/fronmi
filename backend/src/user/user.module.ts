import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from 'src/channel/channel.entity';
import { ChannelModule } from 'src/channel/channel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ChannelEntity
    ]),
    ChannelModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
