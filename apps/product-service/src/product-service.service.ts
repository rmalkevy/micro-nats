import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/common';
import { MessagePattern } from '@nestjs/microservices';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  @MessagePattern('get_product')
  async getProduct(data: { id: number }): Promise<Product> {
    const product: Product | null = await this.prisma.product.findFirst({
      where: { id: data.id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${data.id} not found`);
    }
    return product;
  }
}
