import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProduct(data: GetProductDto): Promise<Product> {
    const product: Product | null = await this.prisma.product.findFirst({
      where: { id: data.id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${data.id} not found`);
    }
    return product;
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const product: Product = await this.prisma.product.create({
      data: data,
    });
    return product;
  }
}
