import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [
              configService.get<string>('NATS_URL', 'nats://localhost:4222'),
            ],
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'PRODUCT_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [
              configService.get<string>('NATS_URL', 'nats://localhost:4222'),
            ],
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'ORDER_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [
              configService.get<string>('NATS_URL', 'nats://localhost:4222'),
            ],
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
