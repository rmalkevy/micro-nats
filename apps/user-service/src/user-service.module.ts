import { Module } from '@nestjs/common';
import { UserController } from './user-service.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common';
import { UserService } from './user-service.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserServiceModule {}
