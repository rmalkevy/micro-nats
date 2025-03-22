import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
