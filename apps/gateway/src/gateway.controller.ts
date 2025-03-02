import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientNats,
    @Inject('PRODUCT_SERVICE') private productClient: ClientNats,
    @Inject('ORDER_SERVICE') private orderClient: ClientNats,
  ) {}

  @Get('user')
  getUser() {
    return this.userClient.send('get_user', {});
  }

  @Get('product')
  getProduct() {
    return this.productClient.send('get_product', {});
  }

  @Post('order')
  createOrder(@Body() orderData: { userId: number; productId: number }) {
    return this.orderClient.send('create_order', orderData);
  }
}
