import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';

describe('GatewayController', () => {
  let gatewayController: GatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
    }).compile();

    gatewayController = app.get<GatewayController>(GatewayController);
  });

  describe('root', () => {
    it('should return a user', () => {
      expect(gatewayController.getUser()).toStrictEqual({
        id: 1,
        name: 'John Doe',
      });
    });

    it('should return a product', () => {
      expect(gatewayController.getProduct()).toStrictEqual({
        id: 1,
        name: 'Product 1',
      });
    });

    it('should return a order', () => {
      expect(
        gatewayController.createOrder({ userId: 1, productId: 1 }),
      ).toStrictEqual({
        id: 1,
        name: 'Order 1',
      });
    });
  });
});
