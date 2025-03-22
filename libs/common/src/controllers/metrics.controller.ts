import { Controller, Get } from '@nestjs/common';
import { MetricsService } from '../metrics/metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics() {
    return this.metricsService.getRegistry().metrics();
  }
}
