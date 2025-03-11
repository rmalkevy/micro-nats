import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  // Connect to NATS as a client
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL || 'nats://localhost:4222'],
    },
  });

  await app.startAllMicroservices();
  await app.listen(Number(process.env.GATEWAY_PORT) || 3000);
  console.log(`Gateway is running on port ${process.env.GATEWAY_PORT || 3000}`);
}
bootstrap();
