import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string) {
    return this.userService.validateUsernamePassword(username, password);
  }
}
