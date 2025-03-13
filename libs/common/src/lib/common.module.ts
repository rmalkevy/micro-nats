import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../../exceptions/all-exceptions.filter';
import { NatsModule } from '../nats.module';

@Module({
  imports: [NatsModule],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [PrismaService, NatsModule],
})
export class CommonModule {}
