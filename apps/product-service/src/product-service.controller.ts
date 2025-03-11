import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @MessagePattern('get_product')
  async getProduct(data: any) {
    let product = await this.prisma.product.findUnique({ where: { id: 1 } });
    if (!product) {
      product = await this.prisma.product.create({
        data: { id: 1, name: 'Laptop', price: 999 },
      });
    }
    return product;
  }
}