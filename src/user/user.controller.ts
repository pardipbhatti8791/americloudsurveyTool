import { Controller, Get } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger'
import { UserService } from './user.service';

@ApiTags("User Module")
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async me() {
    return this.userService.me(1);
  }
}
