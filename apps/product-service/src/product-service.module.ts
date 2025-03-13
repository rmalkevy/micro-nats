import { Module } from '@nestjs/common';
import { ProductController } from './product-service.controller';
import { CommonModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductService } from './product-service.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    ClientsModule.registerAsync([
      {
        name: 'NATS_CLIENT',
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
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductServiceModule {}
