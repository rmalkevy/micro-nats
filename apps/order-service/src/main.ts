import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [
          new ConfigService().get<string>('NATS_URL', 'nats://localhost:4222'),
        ],
      },
    },
  );

  await app.listen();
  console.log('Order Service is running');
}
bootstrap();
