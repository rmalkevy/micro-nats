import { connect } from 'nats'; // Via NestJS
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { StorageType } from 'nats/lib/jetstream/jsapi_types';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const natsClient = await connect({
    servers: process.env.NATS_URL || 'nats://nats:4222',
    name: 'gateway',
    user: 'admin',
    pass: 'password',
  });
  const jsm = await natsClient.jetstreamManager();

  // Create a stream
  await jsm.streams.add({
    name: 'EVENTS_STREAM',
    subjects: ['events.>'],
    storage: 'file' as StorageType,
    max_msgs: 1000000,
    max_bytes: 1024 * 1024 * 1024, // 1GB
    max_age: 30 * 24 * 60 * 60 * 1000000000, // 30 days in nanoseconds
  });

  app.connectMicroservice({
    transport: Transport.NATS,
    options: { servers: [process.env.NATS_URL] },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.GATEWAY_PORT || 3000);
}
bootstrap();