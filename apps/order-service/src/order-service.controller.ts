import { Controller } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { PrismaService } from '@app/common';

@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
  ) {}

  @MessagePattern('create_order')
  async createOrder(data: { id: number }) {
    const order = await this.prisma.order.create({
      data: { id: data.id, status: 'created' },
    });
    // Publish to NATS JetStream
    this.natsClient.emit('events.order.created', {
      orderId: order.id,
      status: order.status,
    });
    return order;
  }
}
