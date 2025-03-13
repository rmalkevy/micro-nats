import { Module } from '@nestjs/common';
import { OrderController } from './order-service.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common';
import { OrderService } from './order-service.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderServiceModule {}
