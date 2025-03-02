import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductController {
  @MessagePattern('get_product')
  getProduct() {
    return { id: 1, name: 'Laptop', price: 999 }; // Mock response
  }
}
