import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientNats, ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '../../product-service/src/dto/create-product.dto';
import { catchError } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientNats,
    @Inject('PRODUCT_SERVICE') private productClient: ClientNats,
    @Inject('ORDER_SERVICE') private orderClient: ClientNats,
    @Inject('NATS_CLIENT') private natsClient: ClientProxy,
  ) {}

  @Get('user')
  getUser() {
    return this.userClient.send('get_user', {});
  }

  @Get('product')
  getProduct(@Query('id', ParseIntPipe) id: number) {
    return this.productClient.send('get_product', { id });
  }

  @Post('product')
  createProduct(@Body() productData: CreateProductDto) {
    return this.productClient.send('create_product', productData);
  }

  @Post('order')
  createOrder(@Body() orderData: { userId: number; productId: number }) {
    return this.orderClient.send('create_order', orderData);
  }

  @Get('health')
  async healthCheck() {
    const services = ['user-service', 'product-service', 'order-service'];
    const checks = await Promise.all(
      services.map((svc) =>
        firstValueFrom(
          this.natsClient.send(`health_check.${svc}`, {}).pipe(
            timeout(1000),
            catchError(() => of({ status: 'down', service: svc })),
          ),
        ),
      ),
    );
    return { services: checks };
  }
}
