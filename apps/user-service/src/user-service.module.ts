import { Module } from '@nestjs/common';
import { UserController } from './user-service.controller';

@Module({
  imports: [],
  controllers: [UserController],
})
export class UserServiceModule {}
