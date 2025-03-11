import { Module } from '@nestjs/common';
import { ProductController } from './product-service.controller';
import { CommonModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { ProductService } from './product-service.service';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductServiceModule {}
