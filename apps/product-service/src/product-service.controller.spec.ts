import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product-service.controller';

describe('ProductServiceController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('should return a product', () => {
      expect(productController.getProduct({ id: 1 })).toStrictEqual({
        id: 1,
        name: 'Laptop',
        price: 999,
      });
    });
  });
});
