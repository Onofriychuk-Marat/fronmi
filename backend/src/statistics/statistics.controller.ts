import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { StatisticsResponseDto } from './dto/statisctic-response.dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get()
  @ApiOkResponse({ type: [StatisticsResponseDto] })
  get(): StatisticsResponseDto[] {
    return this.statisticsService.get()
  }
}
