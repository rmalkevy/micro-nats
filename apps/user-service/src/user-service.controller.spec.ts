import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user-service.controller';
import { UserServiceService } from './user-service.service';

describe('UserServiceController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserServiceService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('getUser', () => {
    it('should return a user', () => {
      expect(userController.getUser()).toStrictEqual({
        id: 1,
        name: 'John Doe',
      });
    });
  });
});
