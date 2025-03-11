import { Module } from '@nestjs/common';
import { ProductController } from './product-service.controller';
import { CommonModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule],
  controllers: [ProductController],
})
export class ProductServiceModule {}
