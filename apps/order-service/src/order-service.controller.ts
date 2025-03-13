import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { PrismaService } from '@app/common';
import { Order } from '@prisma/client';

@Controller()
export class OrderController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
  ) {}

  @MessagePattern('create_order')
  async createOrder(data: { id: number }): Promise<Order> {
    const order = await this.prisma.order.create({
      data: { id: data.id, status: 'created', userId: 1, productId: 1 },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${data.id} not found`);
    }
    // Publish to NATS JetStream
    this.natsClient.emit('events.order.created', {
      orderId: order.id,
      status: order.status,
    });
    return order;
  }

  @MessagePattern('health_check.order-service')
  healthCheck() {
    return { status: 'ok', service: 'order-service' };
  }
}
