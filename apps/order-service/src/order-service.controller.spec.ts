import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order-service.controller';

describe('OrderServiceController', () => {
  let orderController: OrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
  });

  describe('root', () => {
    it('should return a order', () => {
      expect(
        orderController.createOrder({ userId: 1, productId: 1 }),
      ).toStrictEqual({
        id: 1,
        userId: 1,
        productId: 1,
        status: 'created',
      });
    });
  });
});
