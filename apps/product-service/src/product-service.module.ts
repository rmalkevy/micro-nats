import { Module } from '@nestjs/common';
import { ProductController } from './product-service.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [PrismaService],
})
export class ProductServiceModule {}
