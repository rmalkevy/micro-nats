import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductServiceModule,
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
  console.log('Product Service is running');
}
bootstrap();
