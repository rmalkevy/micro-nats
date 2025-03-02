import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  @MessagePattern('get_user')
  getUser() {
    return { id: 1, name: 'John Doe' }; // Mock response
  }
}
