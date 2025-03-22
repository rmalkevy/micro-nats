import { Module, Global } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from '../prisma.service';
import { AllExceptionsFilter } from '../exceptions/all-exceptions.filter';
import { NatsModule } from '../nats.module';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { MetricsModule } from '../metrics/metrics.module';
import { MetricsInterceptor } from '../interceptors/metrics.interceptor';
import { MetricsController } from '../controllers/metrics.controller';

@Global()
@Module({
  imports: [NatsModule, MetricsModule],
  controllers: [MetricsController],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor, // Global metrics
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // Global logging
    },
  ],
  exports: [PrismaService, NatsModule, MetricsModule],
})
export class CommonModule {}
