import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class OrderController {
  @MessagePattern('create_order')
  createOrder(data: CreateOrderDto) {
    return {
      id: 1,
      userId: data.userId,
      productId: data.productId,
      status: 'created',
    };
  }
}
