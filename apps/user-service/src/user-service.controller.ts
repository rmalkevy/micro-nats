import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  @MessagePattern('get_user')
  getUser() {
    return { id: 1, name: 'John Doe' }; // Mock response
  }

  @MessagePattern('health_check.user-service')
  healthCheck() {
    return { status: 'ok', service: 'user-service' };
  }
}
