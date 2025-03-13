import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product-service.service';
import { Product } from '@prisma/client';
import { GetProductDto } from './dto/get-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('get_product')
  async getProduct(data: GetProductDto): Promise<Product> {
    return this.productService.getProduct(data);
  }

  @MessagePattern('create_product')
  async createProduct(data: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(data);
  }
}
