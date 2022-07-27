import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ChannelEntity } from '../channel.entity';
import { ChannelService } from '../channel.service';

@Injectable()
export class ChannelPipe implements PipeTransform {
  constructor(private readonly channelService: ChannelService) {}

  async transform(value: any): Promise<ChannelEntity> {
    if (Number(value) === NaN) {
      throw new HttpException('Id is not number!', HttpStatus.BAD_REQUEST);
    }
    const channel = await this.channelService.findById(value);
    if (!channel) {
      throw new HttpException('Not finded channel!', HttpStatus.NOT_FOUND);
    }
    return channel;
  }
}
