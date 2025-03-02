import { Module } from '@nestjs/common';
import { OrderController } from './order-service.controller';

@Module({
  imports: [],
  controllers: [OrderController],
})
export class OrderServiceModule {}
