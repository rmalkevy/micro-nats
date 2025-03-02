import { Module } from '@nestjs/common';
import { ProductController } from './product-service.controller';

@Module({
  imports: [],
  controllers: [ProductController],
})
export class ProductServiceModule {}
